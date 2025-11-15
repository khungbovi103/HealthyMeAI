import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import '@ant-design/v5-patch-for-react-19';
import "antd/dist/reset.css"
import { App as AntApp, ConfigProvider } from "antd"
import { Providers } from "@/components/providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthyMe AI",
  description: "AI-powered personalized health report generator",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 font-sans">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#10b981",
              borderRadius: 10,
            },
          }}
        >
          <AntApp>
            <Providers>{children}</Providers>
          </AntApp>
        </ConfigProvider>
      </body>
    </html>
  )
}
