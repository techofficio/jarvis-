# Jarvis‑Lite

> A Next.js 15 proof‑of‑concept that lets **GPT‑4o** stream JSON UI blocks which React renders on‑the‑fly. Think *Iron‑Man‑Jarvis*—in 2‑D—inside your browser.

---

## ✨  Key Features

| Capability                   | Details                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Visual‑first chat**        | The AI is instructed to answer with **structured UI blocks** (heading, note, bar‑chart, image, …) instead of raw text. |
| **Streaming UI**             | Blocks arrive via Server‑Sent Events and are mounted instantly—no page flicker.                                        |
| **Strict schema validation** | `zod` enforces a shared contract so hallucinated components are rejected before render.                                |
| **Edge‑native**              | The `/api/chat` route runs in Vercel Edge Functions for <100 ms p50 latency in US‑EAST.                                |
| **Tailwind‑powered canvas**  | Utility classes + dark UI by default.                                                                                  |
| **Easily extensible**        | Add a new block with **one file** and a schema update—no rewrites.                                                     |

---

## 🖼  Quick Demo (GIF)

*(drop a 10‑second screen capture here once you have one)*

---

## 🏗  Architecture Diagram

```
Browser (Next.js ⇄ React 19)
   │ 1. prompt           ▲ 2b. JSON blocks
   ▼                     │
Edge Function /api/chat  │
   │ 2a. OpenAI stream   │
   ▼                     │
GPT‑4o  ←––––––––––––––––┘
```

1. **User** enters a prompt.
2. The **Edge Function** attaches function‑calling definitions and streams the response.
3. **GPT‑4o** sends a JSON array of UI blocks.
4. **Renderer** component hydrates each block to the canvas.

---

## 🗂  Tech Stack

* **Next.js 15 / React 19** – App Router + Turbopack
* **Vercel AI SDK** (`ai`) – stream helpers & React hooks
* **OpenAI** – `gpt-4o-mini` now, full `gpt-4o` later
* **Zod** – runtime schema validation
* **Tailwind 3** – utility‑first CSS
* **Chart.js 4** & **react-chartjs-2 5** – data viz
* **uuid** – stable array keys

---

## 📁  Directory Structure

```
jarvis-chat/
├─ src/
│  ├─ app/
│  │  ├─ api/chat/route.ts   ← Edge function
│  │  ├─ layout.tsx          ← Root layout
│  │  └─ page.tsx            ← Home page
│  ├─ components/
│  │  ├─ Renderer.tsx
│  │  └─ blocks/
│  │     ├─ Heading.tsx
│  │     ├─ Note.tsx
│  │     ├─ BarChart.tsx
│  │     └─ Image.tsx
│  ├─ lib/schema.ts          ← Zod UI‑DSL
│  └─ styles/globals.css
├─ tailwind.config.js
└─ README.md
```

---

## 🚀  Getting Started

### Prerequisites

* **Node ≥ 18.18.0**
* **npm ≥ 9** (or pnpm/yarn)
* OpenAI account + API key

### Installation

```bash
# 1. Clone
git clone https://github.com/<your-handle>/jarvis-chat.git
cd jarvis-chat

# 2. Install deps
npm install

# 3. Environment variables
cp .env.local.example .env.local
# then add your key inside .env.local
OPENAI_API_KEY=sk-...

# 4. Dev server
npm run dev
# visit http://localhost:3000
```

### Available Scripts

| Command         | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start local dev with Hot Module Reload (Turbopack) |
| `npm run build` | Static & server build for production               |
| `npm start`     | Run the prod build locally                         |
| `npm run lint`  | ESLint + Next lint rules                           |

---

## 🔑  Environment Variables

| Name             | Required | Description                                                                     |
| ---------------- | -------- | ------------------------------------------------------------------------------- |
| `OPENAI_API_KEY` | ✅        | Your secret key from [https://platform.openai.com](https://platform.openai.com) |

*(Nothing else is needed; Vercel provides `VERCEL_REGION` automatically.)*

---

## 📐  UI‑DSL Reference

```ts
// src/lib/schema.ts (excerpt)

export type UIBlock =
  | { kind: "heading"; level: "1" | "2" | "3"; text: string }
  | { kind: "note"; severity: "info" | "warn" | "error"; markdown: string }
  | { kind: "bar_chart"; title: string; data: { x: string; y: number }[] }
  | { kind: "image"; alt: string; url: string };
```

**Adding a new block**

1. Extend the `z.discriminatedUnion` in `schema.ts`.
2. Create `src/components/blocks/MyNewBlock.tsx`.
3. Add a `case "my_new_block"` in `Renderer.tsx`.
4. Include the new function definition in `/api/chat/route.ts` (optional).

Total ≈ 10 lines of code.

---

## 🛠  How It Works (Step‑by‑Step)

1. **User submits** a prompt from the input box.
2. **`useChat`** hook POSTs to `/api/chat`.
3. **Edge function** enriches the prompt with a **system message** that instructs GPT to emit *only* valid JSON matching the schema.
4. **OpenAI API (`stream: true`)** streams partial chunks → parsed by `experimental_streamObject`.
5. Each validated block is **pushed to React state**, triggering an immediate render in `Renderer`.
6. **Tailwind** handles styling; Chart.js draws interactive graphs.

---

## ☁️  Deployment (Vercel)

```bash
# 1. Commit to GitHub/GitLab/Bitbucket
# 2. In Vercel dashboard → New Project → import the repo
# 3. Set env var OPENAI_API_KEY in both *Production* and *Preview*
# 4. Click Deploy → done (first build ~60 s)
```

Vercel auto‑detects Next 15 and the Edge runtime—no config files required.

---

## 🧩  Troubleshooting

| Issue                                  | Fix                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Splash screen shows instead of app** | `page.tsx` failed to compile or path typo. Restart dev server and read first red error.           |
| **Turbopack “Cannot resolve module”**  | Import path casing mismatch—Linux is case‑sensitive.                                              |
| **Blank chart / JSON error**           | GPT returned invalid data; check Edge logs. Tighten the Zod schema if needed.                     |
| **Tailwind classes missing**           | Ensure `globals.css` is imported in `layout.tsx` and `tailwind.config.js` exists at project root. |

---

## 🛣  Roadmap

* 🔊 **Voice I/O** via Whisper & Vercel Speech API
* 🖼 **Inline image generation** (DALL·E‑3) when block type = `image_gen`
* 🗃 **Session history** persisted to KV store
* 🔄 **Drag‑to‑re‑layout** with `tldraw`
* 🧩 **Plugin system** for user‑authorable components

---

## 🤝  Contributing

PRs welcome! Open an issue with a feature idea or bug, or fork & send a pull request. Please run `npm run lint` and ensure all CI checks pass.

---

## 📜  License

MIT © 2025 Your Name
