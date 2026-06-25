import type { CurrencyOption } from '../types/currency'

export const currencies: CurrencyOption[] = [
  { code: 'GBP', name: 'British Pound' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'TRY', name: 'Turkish Lira' },
]

export const popularCurrencies = ['USD', 'EUR', 'JPY', 'CAD', 'AUD', 'CHF']