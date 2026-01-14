# Are You Rekt Yet? (AYRY)

**A viral, memetic daily sentiment ritual for the crypto market.**

AYRY is a decentralized "confessional" app where users track their daily trading performance (Up, Down, Flat) and behavior (Held, Traded, Out).

Powered by **Google Gemini AI**, the "Chain Oracle" generates unique, roasting, or encouraging blessings based on your daily status.

## ⚡ Features

- **Daily Ritual**: One entry per day, aligned with Singapore Time (SGT).
- **AI Oracle**: Dynamic, slang-heavy crypto commentary powered by Gemini.
- **Global Consensus**: See real-time stats of how the market is feeling (Rekt vs. Printing).
- **Shareable Identity**: Generate a daily "Designation" (e.g., "Diamond Hand God", "Rekt Gambler").

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **AI**: Google GenAI SDK
- **Charts**: Recharts
- **Storage**: LocalStorage (MVP)

## 🚀 Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/socialdoodle/AYRY.git
    cd AYRY
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment**
    Create a `.env` file in the root (do not commit this file):
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 🌍 Deployment

This project is optimized for **Vercel**.

1.  Import this repository to Vercel.
2.  Add your `API_KEY` in the Vercel **Environment Variables** settings.
3.  Deploy!
