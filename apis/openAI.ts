// openAI.ts
import OpenAI from "openai";
import { API_CONFIG } from "../config/api.config";

interface OpenAIResponse {
  text: string;
  error?: string;
}

const openai = new OpenAI({
  apiKey: API_CONFIG.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Enable in React Native
});

export async function generateResponse(
  prompt: string
): Promise<OpenAIResponse> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 1000,
    });

    return {
      text: completion.choices[0].message.content || "",
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      text: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
