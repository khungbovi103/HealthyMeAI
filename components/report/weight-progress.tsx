"use client"

import { Card, Empty } from "antd"
import { Line } from "@ant-design/charts"
import type { LineConfig } from "@ant-design/charts"

interface WeightProgressProps {
  data: any
}

export function WeightProgress({ data }: WeightProgressProps) {
  const weeklyData = data.weeklyWeightProgress || []

  const config: LineConfig = {
    data: weeklyData,
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

  return (
    <Card title="Weight Progress">
      {weeklyData.length > 0 ? <Line {...config} /> : <Empty description="No weight data available" />}
    </Card>
  )
}
