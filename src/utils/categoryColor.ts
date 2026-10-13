// Cor do chip por categoria (texto branco por cima: todas passam de 4.5:1).
const COLORS: Record<string, string> = {
  "AI": '#6d28d9',
  "Gaming": '#be123c',
  "Reviews": '#b45309',
  "Tools": '#2563eb',
  "Guides": '#0f766e',
  "Security": '#15803d',
  "Trends": '#a21caf',
};

export const categoryColor = (category: string): string => COLORS[category] ?? '#6d28d9';
