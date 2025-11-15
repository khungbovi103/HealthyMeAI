import {generateObject} from "ai"
import { google } from "@ai-sdk/google"
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.height || !body.currentWeight || !body.goalWeight) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate BMI
    const heightInMeters = body.height / 100
    const bmi = body.currentWeight / (heightInMeters * heightInMeters)

    // Determine health status
    let healthStatus = "good"
    if (bmi > 30) healthStatus = "at-risk"
    else if (bmi > 25) healthStatus = "moderate"

    // Generate AI insights using Gemini
    const promptInsight = `Based on this health profile, provide personalized health insights and recommendations:

Name: ${body.name}
Age: ${body.age || "Not provided"}
Current Weight: ${body.currentWeight} kg
Goal Weight: ${body.goalWeight} kg
Height: ${body.height} cm
BMI: ${bmi.toFixed(1)}
Activity Level: ${body.activityLevel}
Exercise Frequency: ${body.exerciseFrequency}
Diet Type: ${body.dietType}
Health Concerns: ${body.healthConcerns}

Please provide exercise calendar; nutrition breakdown in percentages from protein, carbs, fat; body composition in percentages from muscle, fat, water, bone mass; progress timeline and the concerns to address based on health concerns follow the json format

Format the response in clear sections.`

    // Default values
    let weeklyWeightProgress;
    let exercises;
    let nutrition;
    let calories;
    let bodyComposition;
    let concernToAddress;

    try {
      const aiGenerated = await generateObject({
        model: google("gemini-2.0-flash"),
        schema: z.object({
          recipe: z.object({
            weeklyWeightProgress: z.array(z.object({week: z.number(), weight: z.number()})),
            exercises: z.array(z.object({ day: z.string(), activity: z.string(), duration: z.string() })),
            nutrition: z.array(z.object({name: z.string(), value: z.number().describe('percent in decimal and the sum of the values of all the composition must equal 1')})),
            bodyComposition: z.array(z.object({name: z.string(), value: z.number().describe('percent in decimal and the sum of the values of all the composition must equal 1')})),
            concernToAddress: z.string()
          }),
        }),
        prompt: promptInsight,
      });
      ({
        weeklyWeightProgress,
        exercises,
        nutrition,
        bodyComposition,
        concernToAddress
      } = aiGenerated.object.recipe);

    } catch (aiError) {
      console.error("AI generation error:", aiError);
    }

    const reportData = {
      name: String(body.name),
      age: Number(body.age) || 0,
      currentWeight: Number(body.currentWeight),
      goalWeight: Number(body.goalWeight),
      height: Number(body.height),
      bmi: Number.parseFloat(bmi.toFixed(1)),
      healthStatus: String(healthStatus),
      weeklyWeightProgress,
      exercises,
      nutrition,
      bodyComposition,
      aiInsights: JSON.stringify(concernToAddress),
      activityLevel: String(body.activityLevel),
      exerciseFrequency: String(body.exerciseFrequency),
      dietType: String(body.dietType),
    }

    return Response.json(reportData)
  } catch (error) {
    console.error("Error generating report:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return Response.json({ error: `Failed to generate report: ${errorMessage}` }, { status: 500 })
  }
}