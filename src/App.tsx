import './App.css'
import CurrencyConverter from './components/CurrencyConverter'

function App() {
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

      <CurrencyConverter />
    </main>
  )
}

export default App