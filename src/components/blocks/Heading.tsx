export default function Heading({ level, text }: { level: '1' | '2' | '3'; text: string }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="font-bold text-white text-xl">{text}</Tag>;
}
