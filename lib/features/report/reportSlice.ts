import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface HealthFormValues {
  name: string
  age: number
  currentWeight: number
  goalWeight: number
  height: number
  activityLevel: string
  exerciseFrequency?: string
  dietType?: string
  healthConcerns?: string
}

export interface ReportState {
  formValues: Partial<HealthFormValues>
  reportData: any | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
}

interface GenerateReportError {
  message: string
}

export const generateReport = createAsyncThunk<any, HealthFormValues, { rejectValue: GenerateReportError }>(
  "report/generateReport",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        const message = typeof errorBody?.error === "string" ? errorBody.error : "Failed to generate report"
        return rejectWithValue({ message })
      }

      return response.json()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate report"
      return rejectWithValue({ message })
    }
  },
)

const initialState: ReportState = {
  formValues: { activityLevel: "moderate" },
  reportData: null,
  status: "idle",
}

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReport(state) {
      state.reportData = null
      state.status = "idle"
      state.error = undefined
    },
    setFormValues(state, action: PayloadAction<Partial<HealthFormValues>>) {
      state.formValues = { ...state.formValues, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateReport.pending, (state, action) => {
        state.status = "loading"
        state.error = undefined
        state.formValues = action.meta.arg
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.reportData = action.payload
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload?.message ?? "Failed to generate report"
      })
  },
})

export const { resetReport, setFormValues } = reportSlice.actions

export const selectReportData = (state: { report: ReportState }) => state.report.reportData
export const selectReportStatus = (state: { report: ReportState }) => state.report.status
export const selectReportError = (state: { report: ReportState }) => state.report.error
export const selectFormValues = (state: { report: ReportState }) => state.report.formValues

export default reportSlice.reducer
