import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import "../AdminDashboard.css";
import jsPDF from "jspdf";

interface AlertRecord {
  id: number;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface OutletContext {
  darkMode: boolean;
  alertHistory: AlertRecord[];
  alerts: any[];
}

const Compliance: React.FC = () => {
  const { alertHistory, alerts } = useOutletContext<OutletContext>();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF();
      
      // Report header
      doc.setFontSize(20);
      doc.text("DISASTER PREPAREDNESS REPORT", 105, 20, { align: "center" });
      
      doc.setFontSize(14);
      doc.text("City Central High School", 105, 30, { align: "center" });
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" });
      
      // Separator line
      doc.line(20, 45, 190, 45);
      
      // Key metrics
      doc.setFontSize(16);
      doc.text("KEY METRICS", 20, 60);
      doc.setFontSize(12);
      
      doc.text(`Management Dashboard Score: 87%`, 20, 70);
      doc.text(`Average Preparedness: 76%`, 20, 80);
      doc.text(`Compliance Reports: 124`, 20, 90);
      doc.text(`Mass Alerts Sent: ${alerts.length}`, 20, 100);
      
      // Alert history
      if (alertHistory.length > 0) {
        doc.setFontSize(16);
        doc.text("ALERT HISTORY", 20, 120);
        doc.setFontSize(10);
        
        let yPos = 130;
        alertHistory.forEach(alert => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(`${alert.timestamp.toLocaleDateString()} - ${alert.emergency}`, 20, yPos);
          yPos += 7;
          doc.text(`Message: ${alert.message}`, 20, yPos, { maxWidth: 170 });
          yPos += 10;
        });
      }
      
      // Save the PDF
      doc.save(`Disaster_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="compliance-container">
      <div className="compliance-header">
        <h2>Compliance Reports</h2>
        <p>Download official disaster preparedness reports</p>
      </div>

      <div className="compliance-card">
        <h3>Generate PDF Report</h3>
        <p>Create a formal disaster preparedness report with all key metrics and alert history.</p>
        
        <button 
          className="download-btn"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          <FaDownload /> 
          {isGenerating ? "Generating..." : "Download Report"}
        </button>
        
        <div className="report-info">
          <h4>Report includes:</h4>
          <ul>
            <li>School information and report date</li>
            <li>Key preparedness metrics</li>
            <li>Alert history ({alertHistory.length} alerts)</li>
            <li>Official formatting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Compliance;