// src/data/districtBounds.ts
import { LatLngBoundsExpression } from "leaflet";

/**
 * Approximate bounding boxes for each district in Punjab.
 * Tuned to avoid excessive overlaps.
 */
export const districtBounds: Record<string, LatLngBoundsExpression> = {
  Amritsar: [
    [31.55, 74.75],
    [32.05, 75.15],
  ],
  Barnala: [
    [30.30, 75.40],
    [30.75, 76.00],
  ],
  Bathinda: [
    [29.85, 74.90],
    [30.50, 75.55],
  ],
  Faridkot: [
    [30.55, 74.75],
    [31.00, 75.35],
  ],
  FatehgarhSahib: [
    [30.50, 76.15],
    [30.85, 76.55],
  ],
  Fazilka: [
    [30.00, 73.80],
    [30.65, 74.55],
  ],
  Ferozepur: [
    [30.65, 74.10],
    [31.15, 74.75],
  ],
  Gurdaspur: [
    [31.85, 75.25],
    [32.40, 76.00],
  ],
  Hoshiarpur: [
    [31.25, 75.70],
    [31.85, 76.35],
  ],
  Jalandhar: [
    [31.00, 75.35],
    [31.50, 76.05],
  ],
  Kapurthala: [
    [31.15, 75.20],
    [31.50, 75.75],
  ],
  Ludhiana: [
    [30.70, 75.60],
    [31.15, 76.25],
  ],
  Mansa: [
    [29.90, 75.10],
    [30.45, 75.65],
  ],
  Moga: [
    [30.85, 75.05],
    [31.35, 75.65],
  ],
  Mohali: [
    [30.55, 76.45],
    [30.95, 76.85],
  ],
  Muktsar: [
    [30.05, 74.35],
    [30.65, 75.00],
  ],
  Pathankot: [
    [32.15, 75.40],
    [32.55, 75.95],
  ],
  Patiala: [
    [30.15, 75.65],
    [30.85, 76.30],
  ],
  Rupnagar: [
    [30.95, 76.35],
    [31.35, 76.85],
  ],
  Sangrur: [
    [30.30, 75.55],
    [30.85, 76.10],
  ],
  ShahidBhagatSinghNagar: [
    [31.05, 76.05],
    [31.35, 76.55],
  ],
  TarnTaran: [
    [31.15, 74.75],
    [31.65, 75.25],
  ],
};