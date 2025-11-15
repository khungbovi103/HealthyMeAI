"use client"

import { Card, Descriptions, Typography } from "antd"

interface HealthSummaryProps {
  data: any
}

export function HealthSummary({ data }: HealthSummaryProps) {
  const bmi = data.bmi
  const bmiCategory = bmi < 18.5 ? "underweight" : bmi < 25 ? "normal" : bmi < 30 ? "overweight" : "obese"

  return (
    <Card title="Summary" bordered={false}>
      <Descriptions column={1} size="small" colon labelStyle={{ fontWeight: 600 }}>
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Age">{data.age}</Descriptions.Item>
        <Descriptions.Item label="Current Weight">{data.currentWeight} kg</Descriptions.Item>
        <Descriptions.Item label="Goal Weight">{data.goalWeight} kg</Descriptions.Item>
      </Descriptions>

      <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
        Current health is {data.healthStatus}. Body Mass Index (BMI) is {bmi.toFixed(1)}, which is considered {bmiCategory}.
      </Typography.Paragraph>
    </Card>
  )
}
