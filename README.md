# Currency Converter App

A clean and responsive currency converter built with React and TypeScript. The app allows users to convert between currencies using live exchange rate data and view popular exchange rates from their selected base currency.

This project was built as a frontend portfolio project to practise React, TypeScript, API integration, component structure, and responsive UI design.

## Live Demo

[View the live app](https://currency-converter-react-ts.vercel.app)

## Features

* Convert between major currencies instantly
* Fetch live exchange rates from an external API
* View popular exchange rates from the selected base currency
* Swap source and target currencies
* Responsive design for desktop and mobile screens
* Loading and error handling for API requests
* Clean React component structure
* TypeScript types for currency and API data

## Tech Stack

* React
* TypeScript
* Vite
* CSS
* REST API integration
* Git and GitHub

## Project Structure

```txt
src
├── components
│   ├── CurrencyConverter.tsx
│   └── PopularRates.tsx
├── data
│   └── currencies.ts
├── services
│   └── exchangeApi.ts
├── types
│   └── currency.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## What I Learned

This project helped me practise building a real-world frontend application using React and TypeScript. I worked with component structure, state management, API integration, error handling, and responsive UI design.

I also practised organising a React project into reusable folders such as components, services, data, and types, which makes the code easier to read, maintain, and extend.

## How to Run the Project

Clone the repository:

```bash
git clone https://github.com/sabasam/currency-converter-react-ts.git
```

Go into the project folder:

```bash
cd currency-converter-react-ts
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Future Improvements

* Add unit tests with Vitest or Jest
* Add end-to-end tests with Cypress
* Add a currency search/filter feature
* Add historical exchange rate charts
* Add favourite currency pairs
* Improve accessibility and keyboard navigation

## Status

The main version of the app is complete. Future improvements will focus on testing, extra features, and further UI enhancements.
