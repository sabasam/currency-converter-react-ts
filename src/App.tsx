import { useEffect, useMemo, useState } from 'react'
import './App.css'

type RateResponse = {
  base?: string
  quote?: string
  date?: string
  rate: number
}

type CurrencyOption = {
  code: string
  name: string
}

const API_BASE_URL = 'https://api.frankfurter.dev'

const currencies: CurrencyOption[] = [
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

const popularCurrencies = ['USD', 'EUR', 'JPY', 'CAD', 'AUD', 'CHF']

function App() {
  const [amount, setAmount] = useState<number>(100)
  const [fromCurrency, setFromCurrency] = useState<string>('GBP')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [popularRates, setPopularRates] = useState<Record<string, number>>({})
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const conversionRate = useMemo(() => {
    if (convertedAmount === null || amount <= 0) {
      return null
    }

    return convertedAmount / amount
  }, [convertedAmount, amount])

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (amount <= 0) {
        setConvertedAmount(null)
        setError('')
        return
      }

      if (fromCurrency === toCurrency) {
        setConvertedAmount(amount)
        setLastUpdated('')
        setError('')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(
          `${API_BASE_URL}/v2/rate/${fromCurrency}/${toCurrency}`
        )

        if (!response.ok) {
          throw new Error('Unable to fetch exchange rate')
        }

        const data: RateResponse = await response.json()
        const result = amount * data.rate

        setConvertedAmount(result)
        setLastUpdated(data.date ?? '')
      } catch {
        setError('Could not load exchange rates. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRate()
  }, [amount, fromCurrency, toCurrency])

  useEffect(() => {
    const fetchPopularRates = async () => {
      try {
        const targetCurrencies = popularCurrencies.filter(
          (currency) => currency !== fromCurrency
        )

        const rateEntries = await Promise.all(
          targetCurrencies.map(async (currency) => {
            const response = await fetch(
              `${API_BASE_URL}/v2/rate/${fromCurrency}/${currency}`
            )

            if (!response.ok) {
              throw new Error(`Unable to fetch ${currency} rate`)
            }

            const data: RateResponse = await response.json()
            return [currency, data.rate] as const
          })
        )

        setPopularRates(Object.fromEntries(rateEntries))
      } catch {
        setPopularRates({})
      }
    }

    fetchPopularRates()
  }, [fromCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Live exchange rate tool</p>
        <h1>Currency Converter</h1>
        <p className="hero-text">
          Convert currencies instantly using live exchange rate data. Built with
          React, TypeScript, API integration, and responsive UI design.
        </p>
      </section>

      <section className="converter-card">
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
        </div>

        <div className="currency-row">
          <div className="input-group">
            <label htmlFor="fromCurrency">From</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(event) => setFromCurrency(event.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button className="swap-button" onClick={swapCurrencies} type="button">
            ⇄
          </button>

          <div className="input-group">
            <label htmlFor="toCurrency">To</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(event) => setToCurrency(event.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-box">
          {isLoading && <p>Loading latest rate...</p>}

          {!isLoading && error && <p className="error-message">{error}</p>}

          {!isLoading && !error && convertedAmount !== null && (
            <>
              <p className="result-label">Converted amount</p>
              <h2>
                {convertedAmount.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '}
                {toCurrency}
              </h2>

              {conversionRate !== null && (
                <p className="rate-text">
                  1 {fromCurrency} ={' '}
                  {conversionRate.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}{' '}
                  {toCurrency}
                </p>
              )}

              {lastUpdated && (
                <p className="date-text">Rates updated: {lastUpdated}</p>
              )}
            </>
          )}
        </div>
      </section>

      <section className="rates-section">
        <div>
          <p className="eyebrow">Popular rates</p>
          <h2>Exchange rates from {fromCurrency}</h2>
        </div>

        <div className="rates-grid">
          {Object.entries(popularRates).map(([currency, rate]) => (
            <article className="rate-card" key={currency}>
              <p>1 {fromCurrency}</p>
              <h3>
                {rate.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}{' '}
                {currency}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App