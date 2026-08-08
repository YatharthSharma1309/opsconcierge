// Minimal Gemini client using fetch (avoids adding new npm dependencies).

export type GeminiChatCompletionArgs = {
  model?: string;
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  maxOutputTokens?: number;
};

const DEFAULT_GEMINI_CHAT_MODEL = "gemini-2.0-flash";

export function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  return key || null;
}

export function isGeminiConfigured() {
  return Boolean(getGeminiApiKey());
}

export function getGeminiChatModel() {
  return (
    process.env.GEMINI_CHAT_MODEL?.trim() ||
    process.env.GEMINI_MODEL?.trim() ||
    DEFAULT_GEMINI_CHAT_MODEL
  );
}

export async function geminiChatCompletion({
  model = getGeminiChatModel(),
  systemPrompt,
  userPrompt,
  temperature = 0.2,
  maxOutputTokens = 1024,
}: GeminiChatCompletionArgs): Promise<{
  text: string;
  model: string;
  latencyMs: number;
}> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Gemini API key not configured (GEMINI_API_KEY missing)");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body: Record<string, unknown> = {
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  if (systemPrompt?.trim()) {
    Object.assign(body, {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    });
  }

  const start = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const latencyMs = Date.now() - start;

  if (!res.ok) {
    let details = "";
    try {
      const data = await res.json();
      details = data?.error?.message
        ? String(data.error.message)
        : JSON.stringify(data);
    } catch {
      details = await res.text().catch(() => "");
    }

    throw new Error(`Gemini API request failed (${res.status}): ${details}`);
  }

  type GeminiPart = { text?: string };
  type GeminiResponse = {
    candidates?: Array<{
      content?: {
        parts?: GeminiPart[];
      };
    }>;
  };

  const data = (await res.json().catch(() => null)) as GeminiResponse | null;
  const text: string =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text)
      ?.filter((value): value is string => Boolean(value))
      ?.join("") ?? "";

  if (!text.trim()) {
    throw new Error("Gemini returned an empty completion");
  }

  return { text, model, latencyMs };
}
