"use client"

import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Typography } from "antd"
import type { HealthFormValues } from "@/lib/features/report/reportSlice"
import { setFormValues } from "@/lib/features/report/reportSlice"
import { useAppDispatch } from "@/hooks/use-store"

interface HealthFormProps {
  onSubmit: (data: HealthFormValues) => void
  isLoading: boolean
  initialValues?: Partial<HealthFormValues>
}

const activityOptions = [
  { label: "Sedentary", value: "sedentary" },
  { label: "Light", value: "light" },
  { label: "Moderate", value: "moderate" },
  { label: "Active", value: "active" },
  { label: "Very Active", value: "very-active" },
]

const exerciseOptions = [
  { label: "Never", value: "never" },
  { label: "1-2 times per week", value: "1-2" },
  { label: "3-4 times per week", value: "3-4" },
  { label: "5-6 times per week", value: "5-6" },
  { label: "Daily", value: "daily" },
]

const dietOptions = [
  { label: "Omnivore", value: "omnivore" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Keto", value: "keto" },
  { label: "Low Carb", value: "low-carb" },
]

export function HealthForm({ onSubmit, isLoading, initialValues }: HealthFormProps) {
  const [form] = Form.useForm<HealthFormValues>()
  const dispatch = useAppDispatch()

  return (
    <Card title="Health Profile" style={{ boxShadow: "0 8px 24px rgba(15, 118, 110, 0.1)" }}>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Provide your details so we can tailor your report.
      </Typography.Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ activityLevel: "moderate", ...initialValues }}
        onFinish={onSubmit}
        onValuesChange={(_, values) => dispatch(setFormValues(values))}
        requiredMark="optional"
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" autoComplete="name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <InputNumber
                placeholder="Age"
                min={1}
                max={120}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Height (cm)"
              name="height"
              rules={[{ required: true, message: "Please enter your height" }]}
            >
              <InputNumber min={50} max={250} style={{ width: "100%" }} placeholder="Height" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Current Weight (kg)"
              name="currentWeight"
              rules={[{ required: true, message: "Please enter your current weight" }]}
            >
              <InputNumber min={20} max={250} style={{ width: "100%" }} placeholder="Current weight" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Goal Weight (kg)"
              name="goalWeight"
              rules={[{ required: true, message: "Please enter your goal weight" }]}
            >
              <InputNumber min={20} max={250} style={{ width: "100%" }} placeholder="Goal weight" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Activity Level"
              name="activityLevel"
              rules={[{ required: true, message: "Please select your activity level" }]}
            >
              <Select options={activityOptions} placeholder="Select activity level" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Exercise Frequency" name="exerciseFrequency">
              <Select
                options={exerciseOptions}
                placeholder="Select exercise frequency"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Diet Type" name="dietType">
          <Select options={dietOptions} placeholder="Select diet type" allowClear />
        </Form.Item>

        <Form.Item label="Health Concerns" name="healthConcerns">
          <Input.TextArea rows={4} placeholder="Any specific health concerns or goals?" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            {isLoading ? "Generating Report..." : "Generate Health Report"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
