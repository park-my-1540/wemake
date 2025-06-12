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
  //   endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  //   필요한 헤더 있는지
  const headers = request.headers.get("X-POTATO");
  if (!headers || headers !== "X-TOMATO") {
    return new Response("Unauthorized", { status: 401 });
  }

  const prompt = `
작은 팀이 만들 수 있는 스타트업 아이디어 10개를 알려주세요.
각 아이디어는 JSON 형식으로 작성해주세요:
{
  "title": "문자열",
  "description": "문자열, 최대 100자",
  "problem": "문자열",
  "solution": "문자열",
  "category": "tech | business | health | education | finance | other"
}

아이디어들을 { "potato": [ ... ] } 형태의 객체로 감싸서 반환해주세요.
오직 JSON만 반환하고, 마크다운이나 설명은 포함하지 마세요.
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
