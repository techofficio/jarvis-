'use client';

import { useState } from 'react';
import Renderer from './Renderer';
import { UIBlock } from '../lib/schema';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [blocks, setBlocks] = useState<UIBlock[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (Array.isArray(data.blocks)) {
        setBlocks((prev) => [...prev, ...data.blocks]);
      }
      setPrompt('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <Renderer blocks={blocks} />
      <div className="flex gap-2">
        <input
          className="flex-grow border rounded px-2 py-1 text-black"
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendPrompt();
          }}
          disabled={loading}
        />
        <button
          onClick={sendPrompt}
          className="bg-blue-600 text-white px-3 py-1 rounded"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
