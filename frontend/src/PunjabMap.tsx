// src/components/PunjabMap.tsx
import React, { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import L, { Map as LeafletMap, LatLngExpression } from "leaflet"
import { useNavigate } from "react-router-dom"
// @ts-ignore - allow JSON import
import punjabGeo from "../data/districts.json"
import "./PunjabMap.css"

type DistrictProps = {
  name?: string
  riskLevel?: string
  riskIntensity?: string | number
  riskDescription?: string
  riskTags?: string[]
  preparednessScore?: number
  safetyTip?: string
  activeAlert?: boolean
}

const TAG_META: Record<string, { color: string; label: string }> = {
  Flood: { color: "#1f78b4", label: "Flood" },
  Fire: { color: "#b30000", label: "Fire" },
  Industrial: { color: "#228B22", label: "Industrial" },
}

function getRiskPercent(props?: DistrictProps) {
  if (!props) return 0
  if (typeof props.riskIntensity === "number") {
    return Math.max(0, Math.min(100, Number(props.riskIntensity)))
  }
  if (typeof props.riskIntensity === "string") {
    const s = props.riskIntensity.toLowerCase()
    if (s.includes("low")) return 20
    if (s.includes("medium")) return 50
    if (s.includes("high")) return 80
    if (s.endsWith("%")) return parseInt(s, 10) || 0
  }
  if (typeof props.preparednessScore === "number") {
    return Math.max(0, Math.min(100, 100 - props.preparednessScore))
  }
  return 0
}

export default function PunjabMap(): JSX.Element {
  const navigate = useNavigate()
  const mapRef = useRef<LeafletMap | null>(null)
  const layerRef = useRef<L.GeoJSON<any> | null>(null)
  const [hovered, setHovered] = useState<DistrictProps | null>(null)

  const styleFeature = (feature: any) => {
    const p: DistrictProps = feature.properties || {}
    const tags = p.riskTags || []
    const baseColor = tags.includes("Fire")
      ? TAG_META.Fire.color
      : tags.includes("Flood")
      ? TAG_META.Flood.color
      : TAG_META.Industrial.color

    return {
      color: baseColor,
      weight: hovered?.name === p.name ? 3.5 : 2,
      fillColor: baseColor,
      fillOpacity: hovered?.name === p.name ? 0.5 : 0.28,
      dashArray: p.activeAlert ? "4 4" : undefined,
      className: `district-path ${p.activeAlert ? "district-pulse" : ""}`,
    } as L.PathOptions
  }

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const p: DistrictProps = feature.properties || {}
    const title = p.name || "Unknown"

    layer.bindTooltip(title, { direction: "top", offset: [0, -8], opacity: 0.95 })

    layer.bindPopup(
      `<div style="font-size:13px">
        <strong>${title}</strong><br/>
        <b>Risk:</b> ${p.riskLevel || "N/A"}<br/>
        <b>Description:</b> ${p.riskDescription || "—"}<br/>
        <b>Preparedness Score:</b> ${p.preparednessScore ?? "—"}<br/>
        <b>Active Alert:</b> ${p.activeAlert ? "✅ Yes" : "No"}<br/>
        <b>Tags:</b> ${(p.riskTags || []).join(", ")}
      </div>`,
      { minWidth: 220 }
    )

    layer.on({
      mouseover: () => {
        ;(layer as any).setStyle?.({ weight: 3, fillOpacity: 0.6 })
        setHovered(p)
      },
      mouseout: () => {
        if (layerRef.current) {
          layerRef.current.resetStyle(layer as any)
        }
        setHovered(null)
      },
      click: () => {
        try {
          const bounds = (layer as any).getBounds?.()
          if (bounds && bounds.isValid && bounds.isValid()) {
            mapRef.current?.fitBounds(bounds, { maxZoom: 11, padding: [20, 20] })
          }
        } catch {}
        navigate(`/dashboard/maps/${encodeURIComponent(title)}`)
      },
    })
  }

  useEffect(() => {
    if (!mapRef.current) return

    if (layerRef.current) {
      try {
        mapRef.current.removeLayer(layerRef.current)
      } catch {}
      layerRef.current = null
    }

    const geoLayer = L.geoJSON(punjabGeo as any, {
      style: styleFeature,
      onEachFeature,
    })
    geoLayer.addTo(mapRef.current)
    layerRef.current = geoLayer

    try {
      const bounds = geoLayer.getBounds()
      if (bounds && bounds.isValid && bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 9 })
      }
    } catch {}

    return () => {
      try {
        if (layerRef.current) {
          mapRef.current?.removeLayer(layerRef.current)
          layerRef.current = null
        }
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered])

  useEffect(() => {
    if (!mapRef.current) return
    const t = setTimeout(() => {
      try {
        mapRef.current?.invalidateSize()
      } catch {}
    }, 200)
    return () => clearTimeout(t)
  }, [])

  // ✅ correct LatLngExpression type
  const punjabCenter: LatLngExpression = [31.0, 75.5]

  return (
    <div className="map-layout">
      <div className="map-header">
        <h1>Punjab Districts Risk Map</h1>
        <p className="muted">Hover to preview • Click a district to open its module</p>
      </div>

      <div className="map-body">
        <aside className="side-panel">
          {hovered ? (
            <>
              <h2 className="district-title">{hovered.name}</h2>
              <div className="tags-row">
                {(hovered.riskTags || []).map((t) => (
                  <span
                    key={t}
                    className="tag"
                    style={{ background: TAG_META[t]?.color || "#6b7280" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="desc">{hovered.riskDescription}</p>
              <div>
                <strong>Risk Intensity</strong>
                <div className="risk-gradient" aria-hidden>
                  <div
                    className="risk-marker"
                    style={{ left: `${getRiskPercent(hovered)}%` }}
                  />
                </div>
                <div className="risk-label">
                  {hovered.riskLevel ??
                    (typeof hovered.preparednessScore === "number"
                      ? `${getRiskPercent(hovered)}%`
                      : "N/A")}
                </div>
              </div>
              <em className="tip">Tip: {hovered.safetyTip || "Stay alert!"}</em>
              <div style={{ marginTop: 12 }}>
                <button
                  className="primary-btn"
                  onClick={() =>
                    navigate(`/dashboard/maps/${encodeURIComponent(hovered.name || "")}`)
                  }
                >
                  Open Module
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>District Details</h3>
              <p className="muted">Hover over a district to see quick info here.</p>
              <div style={{ marginTop: 12 }}>
                <strong>Quick links</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  {(punjabGeo as any).features.slice(0, 8).map((f: any) => (
                    <button
                      key={f.properties.name}
                      className="link-btn"
                      onClick={() =>
                        navigate(`/dashboard/maps/${encodeURIComponent(f.properties.name)}`)
                      }
                    >
                      {f.properties.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </aside>

        <div className="map-wrapper">
          <MapContainer
            center={punjabCenter}
            zoom={8}
            minZoom={6}
            maxZoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef as any}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}