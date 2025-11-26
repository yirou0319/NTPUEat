import { GoogleGenAI } from "@google/genai";
import { FoodItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFoodRecommendation = async (
  currentHour: number,
  location: string,
  foodItems: FoodItem[]
): Promise<string> => {
  try {
    const prompt = `
      You are a smart sustainability assistant for the "NTPU Eats+" app.
      
      Context:
      - Current Time: ${currentHour}:00
      - User Location: ${location}
      - Available Surplus Food: ${JSON.stringify(foodItems.map(f => ({ name: f.name, restaurant: f.restaurant, price: f.discountedPrice, qty: f.quantity })))}
      
      Task:
      Analyze the current time and available food. 
      Provide a short, 2-sentence recommendation to the student.
      If it's near meal times (11-13 or 17-19), encourage grabbing a meal.
      If it's late, warn about shops closing soon.
      Mention specific high-value deals (low price or low quantity).
      Keep the tone friendly, encouraging, and focused on saving food waste.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "無法連接 AI 助理，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "目前無法取得 AI 建議，請直接瀏覽下方列表。";
  }
};

export const predictSurplus = async (restaurantName: string): Promise<string> => {
  try {
     const prompt = `
      Predict the likelihood of food surplus for "${restaurantName}" at a university campus.
      Return a JSON object with 'prediction' (High/Medium/Low) and 'reason' (short string).
      Assume typical peak hours are 12:00 and 18:00.
      Just make a reasonable guess based on the name (e.g., Buffet usually has high surplus, Café medium).
    `;
    
    // Simulating a structured response since we can't force JSON mode easily on all models without config, 
    // but Flash 2.5 is good at it.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text; 
  } catch (error) {
    return "Prediction unavailable";
  }
}
