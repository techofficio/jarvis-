const colorMap = {
  info: 'blue',
  warn: 'yellow',
  error: 'red',
} as const;

export default function Note({ severity, markdown }: { severity: 'info' | 'warn' | 'error'; markdown: string }) {
  const color = colorMap[severity];
  const className = `border-l-4 border-${color}-500 pl-4 text-${color}-100`;
  return <div className={className}>{markdown}</div>;
}
