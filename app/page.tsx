"use client"
import '@ant-design/v5-patch-for-react-19';

import { Button, Layout, Space, Typography, Alert } from "antd"
import { generateReport, resetReport, selectFormValues, selectReportData, selectReportError, selectReportStatus } from "@/lib/features/report/reportSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/use-store"
import { HealthForm } from "@/components/health-form"
import { HealthReport } from "@/components/health-report"

const { Content } = Layout
const { Title, Paragraph } = Typography

export default function Home() {
  const dispatch = useAppDispatch()
  const reportData = useAppSelector(selectReportData)
  const status = useAppSelector(selectReportStatus)
  const error = useAppSelector(selectReportError)
  const formValues = useAppSelector(selectFormValues)

  const handleGenerateReport = (values: any) => {
    dispatch(generateReport(values))
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Content style={{ padding: "48px 16px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div>
              <Title level={1} style={{ marginBottom: 8 }}>
                HealthyMe AI
              </Title>
              <Paragraph type="secondary" style={{ fontSize: 16, margin: 0 }}>
                Get personalized health insights powered by AI
              </Paragraph>
            </div>

            {error && status === "failed" && <Alert type="error" message={error} showIcon />}

            {!reportData ? (
              <HealthForm
                onSubmit={handleGenerateReport}
                isLoading={status === "loading"}
                initialValues={formValues}
              />
            ) : (
              <Space direction="vertical" size={32} style={{ width: "100%" }}>
                <HealthReport data={reportData} />
                <Button type="primary" size="large" onClick={() => dispatch(resetReport())}>
                  Generate New Report
                </Button>
              </Space>
            )}
          </Space>
        </div>
      </Content>
    </Layout>
  )
}
