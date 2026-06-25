type PopularRatesProps = {
  fromCurrency: string
  popularRates: Record<string, number>
}

function PopularRates({ fromCurrency, popularRates }: PopularRatesProps) {
  return (
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
  )
}

export default PopularRates