import type { RateResponse } from '../types/currency'

const API_BASE_URL = 'https://api.frankfurter.dev'

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<RateResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/v2/rate/${fromCurrency}/${toCurrency}`
  )

  if (!response.ok) {
    throw new Error('Unable to fetch exchange rate')
  }

  return response.json()
}

export const fetchPopularRates = async (
  fromCurrency: string,
  targetCurrencies: string[]
): Promise<Record<string, number>> => {
  const rateEntries = await Promise.all(
    targetCurrencies.map(async (currency) => {
      const data = await fetchExchangeRate(fromCurrency, currency)
      return [currency, data.rate] as const
    })
  )

  return Object.fromEntries(rateEntries)
}