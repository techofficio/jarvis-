'use client'

import { useChat } from 'ai/react'
import Renderer from './Renderer'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: '/api/chat' })

  return (
    <div className="flex flex-col space-y-4 max-w-xl w-full mx-auto p-4">
      <div className="flex-1 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : ''}>
            {m.role === 'user' ? (
              <p className="text-blue-400 whitespace-pre-wrap">{m.content}</p>
            ) : (
              <Renderer blocks={JSON.parse(m.content)} />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Jarvis..."
          className="flex-1 rounded bg-gray-800 p-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4"
        >
          Send
        </button>
      </form>
    </div>
  )
}

