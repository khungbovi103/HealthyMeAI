"use client"

import { DownloadOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import { useMemo } from "react"
import { usePDF } from "react-to-pdf"

import {Line, LineConfig, Pie, PieConfig} from "@ant-design/charts";

interface PDFExportProps {
  data: any
}

export function PDFExport({ data }: PDFExportProps) {
  const filename = useMemo(
    () => `healthyme-report-${data?.name ?? "report"}-${new Date().toISOString().split("T")[0]}.pdf`,
    [data?.name],
  )

  const { toPDF, targetRef } = usePDF({ filename, page: { format: 'A4' } })

  const handleDownload = async () => {
    try {
      await toPDF()
    } catch (error) {
      console.error("Failed to export PDF", error)
      message.error("Failed to export PDF. Please try again.")
    }
  }

  const summaryRows = [
    ["Name", data?.name ?? "N/A"],
    ["Age", data?.age ?? "N/A"],
    ["Current Weight", data?.currentWeight ? `${data.currentWeight} kg` : "N/A"],
    ["Goal Weight", data?.goalWeight ? `${data.goalWeight} kg` : "N/A"],
    ["Height", data?.height ? `${data.height} cm` : "N/A"],
    ["BMI", data?.bmi ? Number(data.bmi).toFixed(1) : "N/A"],
    ["Health Status", data?.healthStatus ?? "N/A"],
  ]

  const exercises: any[] = Array.isArray(data?.exercises) ? data.exercises : []
  const insights = data?.aiInsights ? String(data.aiInsights) : "No insights available"
    const nutritionData = Array.isArray(data?.nutrition) ? data.nutrition : [];
    const weeklyWeightProgressData = Array.isArray(data?.weeklyWeightProgress) ? data.weeklyWeightProgress : [];
    const bodyCompositionData = data?.bodyComposition ? data.bodyComposition : [];
    const nutritionConfig: PieConfig = {
        data: nutritionData,
        angleField: "value",
        colorField: "name",
        radius: 0.9,
        innerRadius: 0.5,
        label: {
            text: ({ name, value }: {name: string, value: number}) => {
                return `${Math.round(value * 100)}%`;
            },
            fill: '#fff',
            fontSize: 18,
        },
        legend: {
            position: "bottom" as const,
        },
        tooltip: false,
        color: ["#10b981", "#14b8a6", "#fb923c", "#3b82f6", "#a855f7"],
    }

    const weeklyWeightProgressConfig: LineConfig = {
        data: weeklyWeightProgressData,
        xField: "week",
        yField: "weight",
        smooth: true,
        height: 280,
        autoFit: true,
        point: {
            size: 4,
            shape: "circle" as const,
        },
        tooltip: { showMarkers: true },
        color: "#10b981",
        lineStyle: { lineWidth: 2 },
    }

    const bodyCompositionConfig: PieConfig = {
        data: bodyCompositionData,
        angleField: "value",
        colorField: "name",
        radius: 0.9,
        innerRadius: 0.5,
        label: {
            text: ({ name, value }: {name: string, value: number}) => {
                return `${Math.round(value * 100)}%`;
            },
            fill: '#fff',
            fontSize: 18,
        },
        legend: {
            position: "bottom" as const,
        },
        tooltip: false,
        color: ["#10b981", "#14b8a6", "#fb923c", "#3b82f6", "#a855f7"],
    }

  return (
    <>
      <div
        ref={targetRef}
        style={{
          position: "absolute",
          left: "-10000px",
          top: 0,
          width: "794px",
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "40px",
          fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#0f172a" }}>HealthyMe AI Report</h1>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>Generated on {new Date().toLocaleDateString()}</p>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "12px", color: "#0f172a" }}>Summary</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    width: "35%",
                  }}
                >
                  Metric
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                  }}
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map(([label, value], index) => (
                <tr key={label} style={{ backgroundColor: index % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                  <td style={{ padding: "10px", fontWeight: 600 }}>{label}</td>
                  <td style={{ padding: "10px" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {exercises.length > 0 && (
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "12px", color: "#0f172a" }}>Recommended Exercises</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr>
                  {[
                    { label: "Day", width: "20%" },
                    { label: "Activity", width: "50%" },
                    { label: "Duration", width: "30%" },
                  ].map((column) => (
                    <th
                      key={column.label}
                      style={{
                        textAlign: "left",
                        padding: "10px",
                        backgroundColor: "#10b981",
                        color: "#ffffff",
                        width: column.width,
                      }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={`${exercise.day}-${index}`} style={{ backgroundColor: index % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                    <td style={{ padding: "10px", fontWeight: 600 }}>{exercise.day}</td>
                    <td style={{ padding: "10px" }}>{exercise.activity}</td>
                    <td style={{ padding: "10px" }}>{exercise.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
          <section style={{ marginBottom: "24px", marginTop: "250px" }}>
              <div style={{ marginBottom: '30px' }}>
                  <h2>Weight Progress</h2>
                  <Line {...weeklyWeightProgressConfig} />
              </div>
              <div style={{ marginBottom: '30px' }}>
                  <h2>Nutrition Breakdown</h2>
                  <Pie {...nutritionConfig} />
              </div>
              <div style={{ marginBottom: '30px', marginTop: '150px' }}>
                  <h2>Body Composition</h2>
                  <Pie {...bodyCompositionConfig} />
              </div>
          </section>

        <section>
          <h2 style={{ fontSize: "20px", marginBottom: "12px", color: "#0f172a" }}>AI Health Insights</h2>
          <p style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>{insights}</p>
        </section>
      </div>

      <Button onClick={handleDownload} icon={<DownloadOutlined />}>Download as PDF</Button>
    </>
  )
}
