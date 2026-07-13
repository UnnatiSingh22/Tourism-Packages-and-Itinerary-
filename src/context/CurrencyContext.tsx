import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (valueINR: number | string, decimals?: number, compact?: boolean) => string;
  convert: (valueINR: number) => number;
  symbol: string;
  activeHeaderTab: 'overview' | 'reports';
  setActiveHeaderTab: (tab: 'overview' | 'reports') => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rates relative to INR (base is INR)
const CONVERSION_RATES = {
  INR: 1,
  USD: 0.012, // 1 INR = 0.012 USD (approx 1 USD = 83.33 INR)
  EUR: 0.011, // 1 INR = 0.011 EUR (approx 1 EUR = 90.91 INR)
};

const SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

const LOCALE_FORMATS = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('eh_selected_currency');
    return (saved as CurrencyCode) || 'INR';
  });
  const [activeHeaderTab, setActiveHeaderTab] = useState<'overview' | 'reports'>('overview');

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('eh_selected_currency', code);
  };

  const convert = (valueINR: number): number => {
    const val = typeof valueINR === 'number' ? valueINR : parseFloat(String(valueINR));
    if (isNaN(val)) return 0;
    return val * CONVERSION_RATES[currency];
  };

  const format = (valueINR: number | string, decimals: number = 0, compact: boolean = false): string => {
    const num = typeof valueINR === 'number' ? valueINR : parseFloat(String(valueINR));
    if (isNaN(num)) return typeof valueINR === 'string' ? valueINR : `${SYMBOLS[currency]}0`;
    
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const converted = absNum * CONVERSION_RATES[currency];
    
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    };
    
    if (compact) {
      options.notation = 'compact';
      options.compactDisplay = 'short';
    }
    
    return new Intl.NumberFormat(LOCALE_FORMATS[currency], options).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      format,
      convert,
      symbol: SYMBOLS[currency],
      activeHeaderTab,
      setActiveHeaderTab
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
