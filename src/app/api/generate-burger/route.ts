/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Primary and fallback API keys
const API_KEYS = [
  "AIzaSyA6w4BfTTHY_0bn9R0wWZ0SH9yIucp1pec",
  "AIzaSyAbxglHbzf50uwmlBkIc4hGGv9ZXIzpX4M",
];

const SYSTEM_PROMPT = `You are a creative gourmet burger chef AI. Generate a unique, creative burger recipe.
{
  "name": "Creative Burger Name",
  "tagline": "Short catchy tagline (max 8 words)",
  "description": "A 1-2 sentence mouth-watering description",
  "config": {
    "bun": "<one of: classic, sesame, brioche, whole-wheat, cheese-burst, gluten-free>",
    "toastLevel": "<one of: light, medium, crispy>",
    "patty": "<one of: chicken, beef, veggie, fish, plant-based>",
    "pattyCount": "<one of: single, double, triple>",
    "pattyStyle": "<one of: grilled, smash>",
    "cheese": "<one of: american, cheddar, mozzarella, swiss>",
    "cheeseCount": "<one of: single, double>",
    "meltLevel": "<one of: light, extra>",
    "toppings": ["<array from: lettuce, tomato, onion, pickles, jalapenos, caramelized-onion, mushrooms, coleslaw>"],
    "premiumAddons": ["<array from: bacon, egg, avocado, extra-patty, onion-rings>"],
    "sauces": [{"id": "<from: mayo, bbq, ketchup, mustard, spicy, garlic>", "amount": "<one of: light, regular, extra>"}],
    "spicyLevel": <number 0-5>,
    "seasonings": ["<array from: black-pepper, peri-peri, herbs>"],
    "mealOption": "<one of: burger-only, with-fries, with-drink, full-meal>"
  }
}
Be creative with combinations! Give it a fun, unique name. Make the description appetizing.
Consider flavor balance — don't just max everything out.`;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const theme =
      body.theme || "surprise me with something creative and delicious";

    let responseText = "";
    let lastError: any = null;

    // Try each API key until one works
    for (const apiKey of API_KEYS) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent([
          { text: SYSTEM_PROMPT },
          {
            text: `Generate a burger recipe with this theme/mood: "${theme}". Remember: respond with ONLY valid JSON, no markdown.`,
          },
        ]);

        responseText = result.response.text().trim();
        lastError = null;
        break; 
      } catch (err: any) {
        lastError = err;
        console.warn(`API key failed, trying next...`, err.message);
        continue;
      }
    }

    if (lastError || !responseText) {
      throw lastError || new Error("All API keys failed");
    }

  
    let jsonStr = responseText;
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const recipe = JSON.parse(jsonStr);

    // Validate the config values
    const validBuns = [
      "classic",
      "sesame",
      "brioche",
      "whole-wheat",
      "cheese-burst",
      "gluten-free",
    ];
    const validPatties = ["chicken", "beef", "veggie", "fish", "plant-based"];
    const validCheeses = ["american", "cheddar", "mozzarella", "swiss"];
    const validToppings = [
      "lettuce",
      "tomato",
      "onion",
      "pickles",
      "jalapenos",
      "caramelized-onion",
      "mushrooms",
      "coleslaw",
    ];
    const validAddons = [
      "bacon",
      "egg",
      "avocado",
      "extra-patty",
      "onion-rings",
    ];
    const validSauces = [
      "mayo",
      "bbq",
      "ketchup",
      "mustard",
      "spicy",
      "garlic",
    ];
    const validSeasonings = ["black-pepper", "peri-peri", "herbs"];

    const config = recipe.config;
    if (!validBuns.includes(config.bun)) config.bun = "brioche";
    if (!validPatties.includes(config.patty)) config.patty = "beef";
    if (!validCheeses.includes(config.cheese)) config.cheese = "cheddar";
    config.toppings = (config.toppings || []).filter((t: string) =>
      validToppings.includes(t),
    );
    config.premiumAddons = (config.premiumAddons || []).filter((a: string) =>
      validAddons.includes(a),
    );
    config.sauces = (config.sauces || [])
      .filter((s: any) => validSauces.includes(s.id))
      .map((s: any) => ({
        id: s.id,
        amount: ["light", "regular", "extra"].includes(s.amount)
          ? s.amount
          : "regular",
      }));
    config.seasonings = (config.seasonings || []).filter((s: string) =>
      validSeasonings.includes(s),
    );
    config.spicyLevel = Math.max(
      0,
      Math.min(5, Number(config.spicyLevel) || 0),
    );
    if (!["single", "double", "triple"].includes(config.pattyCount))
      config.pattyCount = "single";
    if (!["grilled", "smash"].includes(config.pattyStyle))
      config.pattyStyle = "grilled";
    if (!["single", "double"].includes(config.cheeseCount))
      config.cheeseCount = "single";
    if (!["light", "extra"].includes(config.meltLevel))
      config.meltLevel = "light";
    if (!["light", "medium", "crispy"].includes(config.toastLevel))
      config.toastLevel = "medium";
    if (
      !["burger-only", "with-fries", "with-drink", "full-meal"].includes(
        config.mealOption,
      )
    )
      config.mealOption = "burger-only";

    return NextResponse.json({
      success: true,
      recipe: {
        name: recipe.name || "AI Mystery Burger",
        tagline: recipe.tagline || "A unique creation by AI Chef",
        description:
          recipe.description ||
          "A delicious burger crafted by artificial intelligence",
        config,
      },
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate burger recipe",
      },
      { status: 500 },
    );
  }
}
