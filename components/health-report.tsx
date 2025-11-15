"use client"

import { Col, Row, Space, Typography } from "antd"
import { HealthSummary } from "./report/health-summary"
import { WeightProgress } from "./report/weight-progress"
import { ExerciseCalendar } from "./report/exercise-calendar"
import { NutritionBreakdown } from "./report/nutrition-breakdown"
import { AIInsights } from "./report/ai-insights"
import { PDFExport } from "./report/pdf-export"
import { BodyComposition } from "@/components/report/body-composition";

interface HealthReportProps {
  data: any
}

export function HealthReport({ data }: HealthReportProps) {
  return (
    <Space direction="vertical" size={32} style={{ width: "100%" }}>
      <Row align="middle" justify="space-between" gutter={[16, 16]}>
        <Col flex="auto">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Your Health Report
          </Typography.Title>
        </Col>
        <Col>
          <PDFExport data={data} />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <HealthSummary data={data} />
        </Col>
        <Col xs={24} lg={12}>
          <WeightProgress data={data} />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <ExerciseCalendar data={data} />
        </Col>
        <Col xs={24} lg={12}>
          <NutritionBreakdown data={data} />
        </Col>
      </Row>
        <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
                <BodyComposition data={data} />
            </Col>
        </Row>

      <AIInsights data={data} />
    </Space>
  )
}
