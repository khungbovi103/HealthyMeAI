"use client"

import { Card, Empty } from "antd"
import { Pie } from "@ant-design/charts"
import type { PieConfig } from "@ant-design/charts"

interface BodyCompositionProps {
    data: any
}

export function BodyComposition({ data }: BodyCompositionProps) {
    const bodyCompositionData = data.bodyComposition || []

    const config: PieConfig = {
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
        <Card title="Body Composition">
            {bodyCompositionData.length > 0 ? <Pie {...config} /> : <Empty description="No body composition data available" />}
        </Card>
    )
}
