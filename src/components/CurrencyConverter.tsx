import { useEffect, useMemo, useState } from 'react'
import { currencies, popularCurrencies } from '../data/currencies'
import {
  fetchExchangeRate,
  fetchPopularRates,
} from '../services/exchangeApi'
import PopularRates from './PopularRates'

function CurrencyConverter() {
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
    const convertCurrency = async () => {
      if (amount <= 0) {
        setConvertedAmount(null)
        setError('')
        setIsLoading(false)
        return
      }

      if (fromCurrency === toCurrency) {
        setConvertedAmount(amount)
        setLastUpdated('')
        setError('')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const data = await fetchExchangeRate(fromCurrency, toCurrency)
        const result = amount * data.rate

        setConvertedAmount(result)
        setLastUpdated(data.date ?? '')
      } catch {
        setError('Could not load exchange rates. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  useEffect(() => {
    const loadPopularRates = async () => {
      try {
        const targetCurrencies = popularCurrencies.filter(
          (currency) => currency !== fromCurrency
        )

        const rates = await fetchPopularRates(fromCurrency, targetCurrencies)
        setPopularRates(rates)
      } catch {
        setPopularRates({})
      }
    }

    loadPopularRates()
  }, [fromCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <>
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

      <PopularRates fromCurrency={fromCurrency} popularRates={popularRates} />
    </>
  )
}

export default CurrencyConverter