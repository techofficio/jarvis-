import { z } from 'zod';

export const HeadingBlock = z.object({
  kind: z.literal('heading'),
  level: z.union([z.literal('1'), z.literal('2'), z.literal('3')]),
  text: z.string(),
});

export const NoteBlock = z.object({
  kind: z.literal('note'),
  severity: z.union([z.literal('info'), z.literal('warn'), z.literal('error')]),
  markdown: z.string(),
});

export const BarChartBlock = z.object({
  kind: z.literal('bar_chart'),
  title: z.string(),
  data: z.array(z.object({ x: z.string(), y: z.number() })),
});

export const ImageBlock = z.object({
  kind: z.literal('image'),
  alt: z.string(),
  url: z.string(),
});

export const UIBlockSchema = z.discriminatedUnion('kind', [
  HeadingBlock,
  NoteBlock,
  BarChartBlock,
  ImageBlock,
]);

export type UIBlock = z.infer<typeof UIBlockSchema>;
