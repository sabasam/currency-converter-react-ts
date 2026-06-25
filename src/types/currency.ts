export type RateResponse = {
  base?: string
  quote?: string
  date?: string
  rate: number
}

export type CurrencyOption = {
  code: string
  name: string
}