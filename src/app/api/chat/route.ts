import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { experimental_streamObject, StreamingTextResponse } from 'ai'
import { z } from 'zod'
import { UIBlockSchema } from '@/lib/schema'

export const runtime = 'edge'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

const systemPrompt = `You are Jarvis-Lite. Respond only with a JSON array of UI blocks.
Each block is one of:
- { "kind": "heading", "level": "1" | "2" | "3", "text": string }
- { "kind": "note", "severity": "info" | "warn" | "error", "markdown": string }
- { "kind": "bar_chart", "title": string, "data": { "x": string, "y": number }[] }
- { "kind": "image", "alt": string, "url": string }`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
  })

  const stream = experimental_streamObject(response, z.array(UIBlockSchema))
  return new StreamingTextResponse(stream)
}
