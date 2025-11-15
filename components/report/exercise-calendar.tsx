"use client"

import { Card, Empty, Table, type TableColumnsType } from "antd"

interface ExerciseCalendarProps {
  data: any
}

interface ExerciseRow {
  key: string
  day: string
  activity: string
  duration: string
}

const columns: TableColumnsType<ExerciseRow> = [
  { title: "Day", dataIndex: "day", key: "day" },
  { title: "Activity", dataIndex: "activity", key: "activity" },
  { title: "Duration", dataIndex: "duration", key: "duration" },
]

export function ExerciseCalendar({ data }: ExerciseCalendarProps) {
  const exercises = data.exercises || []
  const dataSource: ExerciseRow[] = exercises.map((exercise: any, index: number) => ({
    key: `${exercise.day}-${index}`,
    day: exercise.day,
    activity: exercise.activity,
    duration: exercise.duration,
  }))

  return (
    <Card title="Exercise Calendar" bordered={false}>
      {dataSource.length > 0 ? (
        <Table<ExerciseRow>
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="small"
        />
      ) : (
        <Empty description="No exercises scheduled" />
      )}
    </Card>
  )
}
