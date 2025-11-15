"use client"

import { Card, Typography } from "antd"

interface AIInsightsProps {
  data: any
}

export function AIInsights({ data }: AIInsightsProps) {
  const insights = data.aiInsights || ""

  return (
    <Card title="AI-Powered Health Insights">
      <Typography.Paragraph style={{ whiteSpace: "pre-wrap" }}>
        {insights || "No insights available"}
      </Typography.Paragraph>
    </Card>
  )
}
