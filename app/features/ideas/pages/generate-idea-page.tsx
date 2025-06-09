import { z } from "zod";
import { insertIdeas } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/generate-idea-page";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string().max(100),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "tech",
    "business",
    "health",
    "education",
    "finance",
    "other",
  ]),
});

const ResponseSchema = z.object({
  potato: z.array(IdeaSchema),
});

export const action = async ({ request }: Route.ActionArgs) => {
  // endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  //필요한 헤더 있는지
  const headers = request.headers.get("X-POTATO");
  if (!headers) {
    return new Response(null, { status: 401 });
  }

  const prompt = `
Give me 10 startup ideas that can be built by small teams.
Each idea should be formatted in JSON like this:
{
  "title": "string",
  "description": "string, max 100 characters",
  "problem": "string",
  "solution": "string",
  "category": "tech | business | health | education | finance | other"
}

Wrap them in an object like: { "potato": [ ... ] }
Just return the JSON — no markdown, no explanation.
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return Response.json({ error: "No response from Gemini" }, { status: 400 });
  }

  let jsonString: string | null = extractJsonFromText(text);

  if (!jsonString) {
    return null;
  }
  // JSON 파싱
  let parsedJson;
  try {
    parsedJson = JSON.parse(jsonString);
  } catch (e) {
    return Response.json(
      { error: "Invalid JSON format from Gemini" },
      { status: 400 }
    );
  }

  // Zod 검증
  const result = ResponseSchema.safeParse(parsedJson);
  if (!result.success) {
    return Response.json(
      { error: "Response validation failed", issues: result.error.format() },
      { status: 400 }
    );
  }

  const descriptions = result.data.potato.map((idea) => idea.description);
  await insertIdeas(adminClient, descriptions);
  return Response.json({ ok: true });
};

function extractJsonFromText(text: string): string | null {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return null;
  return text.slice(firstBrace, lastBrace + 1);
}
