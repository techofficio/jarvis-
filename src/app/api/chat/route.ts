import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { UIBlockSchema } from '../../../lib/schema';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const messages = [
      {
        role: 'system',
        content:
          'You are a UI designer. Respond ONLY with JSON representing an array of UI blocks.',
      },
      { role: 'user', content: prompt || '' },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0].message.content || '[]';
    const blocks = UIBlockSchema.array().parse(JSON.parse(text));

    return NextResponse.json({ blocks });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate blocks' }, { status: 500 });
  }
}
