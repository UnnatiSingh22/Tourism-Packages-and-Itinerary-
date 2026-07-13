import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupee(value: number | string, decimals: number = 0, compact: boolean = false): string {
  const currency = localStorage.getItem('eh_selected_currency') || 'INR';
  const num = typeof value === 'number' ? value : parseFloat(String(value));
  if (isNaN(num)) return typeof value === 'string' ? value : `${currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€'}0`;
  
  const CONVERSION_RATES = { INR: 1, USD: 0.012, EUR: 0.011 };
  const SYMBOLS = { INR: '₹', USD: '$', EUR: '€' };
  const LOCALES = { INR: 'en-IN', USD: 'en-US', EUR: 'de-DE' };

  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const converted = absNum * CONVERSION_RATES[currency as keyof typeof CONVERSION_RATES];

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: compact ? 1 : decimals,
    maximumFractionDigits: compact ? 1 : decimals,
  };
  if (compact) {
    options.notation = 'compact';
    options.compactDisplay = 'short';
  }

  const formatted = new Intl.NumberFormat(LOCALES[currency as keyof typeof LOCALES], options).format(converted);

  return `${isNegative ? '-' : ''}${SYMBOLS[currency as keyof typeof SYMBOLS]}${formatted}`;
}

export const formatCurrency = formatRupee;

