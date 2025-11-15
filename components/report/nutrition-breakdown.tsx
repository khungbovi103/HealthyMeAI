"use client"

import { Card, Empty } from "antd"
import { Pie } from "@ant-design/charts"
import type { PieConfig } from "@ant-design/charts"

interface NutritionBreakdownProps {
  data: any
}

export function NutritionBreakdown({ data }: NutritionBreakdownProps) {
  const nutritionData = data.nutrition || []

  const config: PieConfig = {
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

  return (
    <Card title="Nutrition Breakdown">
      {nutritionData.length > 0 ? <Pie {...config} /> : <Empty description="No nutrition data available" />}
    </Card>
  )
}
