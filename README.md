# Weather Intelligence App (L2 Assignment)

A responsive, production-ready Weather Intelligence web application built in **Google AI Studio App Build**, powered by the public, keyless **Open-Meteo Geocoding & Forecast APIs**, and configured for direct deployment to **Cloudflare Pages** via **GitHub**.

---

## 🚀 Key Features

1. **Global City Search & Geocoding**:
   - Live search querying the public Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`).
   - Autocomplete suggestions with country, administrative region, and GPS coordinates.
   - Quick-select buttons for world benchmark cities (London, New York, Tokyo, Paris, Bengaluru, Sydney).
   - "GPS / Use My Location" support with browser Geolocation fallback.

2. **Current Atmospheric Conditions**:
   - Real-time temperature with dynamic high/low of the day.
   - WMO weather condition code interpretation with contextual icons and themes.
   - Feels-like temperature (apparent heat/wind chill index).
   - Six key atmospheric metrics: Relative Humidity, Wind Speed & Compass Direction, Precipitation, Surface Pressure, Maximum UV Index, and Day/Night cycle.

3. **24-Hour Atmospheric Timeline**:
   - Scrollable hourly forecast cards tracking temperatures, weather conditions, and precipitation probability over the next 24 hours.

4. **7-Day Extended Forecast**:
   - Day-by-day forecast cards featuring high/low temperatures, relative temperature range bar, precipitation probability, and weather condition badges.

5. **Weather Intelligence & Planning Engine**:
   - **Outdoor Activity Score** (0-100) dynamically calculated from temperature, rainfall probability, wind gusts, and UV intensity.
   - **Apparel & Layering Advice** (e.g. thermal wear, jacket, breathable cotton).
   - **Umbrella & Precipitation Alerts** based on real-time and daily rain probabilities.
   - **UV Protection Advisory** highlighting peak exposure hours and sunscreen requirements.
   - **Commute & Roadway Safety Advisory** identifying fog, hydroplaning risks, or high crosswinds.

6. **User Preferences & Controls**:
   - Seamless temperature toggle (°C / °F).
   - Wind speed toggle (km/h / mph).
   - Live refresh button with last updated timestamp.
   - In-app interactive Deployment Guide modal.

7. **Error & Edge-Case Handling**:
   - Graceful feedback for non-existent city queries (e.g. "NonExistentCityXYZ") to fulfill assignment testing requirements.
   - Offline / network timeout fallbacks with retry actions.

---

## 📋 Cloudflare Pages Deployment Guide

Follow these exact steps to deploy this repository from Google AI Studio to Cloudflare Pages:

### Step 1: Connect AI Studio App to GitHub
1. In the Google AI Studio top bar or settings menu, select **Connect to GitHub** / **Export to GitHub**.
2. Authorize GitHub and select or create your designated repository (e.g., `weather-intelligence-app`).
3. Confirm that all source files (`package.json`, `src/`, `index.html`, `vite.config.ts`, `README.md`) are pushed to the repository.

### Step 2: Connect GitHub to Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, navigate to **Compute (Workers) > Workers & Pages**.
3. Click **Create application** and select the **Pages** tab.
4. Click **Connect to Git** and select your GitHub account and the `weather-intelligence-app` repository.

### Step 3: Configure Cloudflare Build Settings
Apply the following build parameters:
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty or default)
- **Environment variables**: *None required* (this app uses the public Open-Meteo API which requires no secrets or API keys).

### Step 4: Deploy & Verify Live URL
1. Click **Save and Deploy**.
2. Wait for the build logs to complete with green checks.
3. Open your generated live Cloudflare Pages URL (e.g., `https://<your-project>.pages.dev`).

---

## 🧪 Testing Checklist for Assignment Evidence

Capture screenshots for each of the following required scenarios:

| Test Case | Description | Expected Outcome |
| :--- | :--- | :--- |
| **Valid City 1** | Search for "Tokyo" or "London" | App displays live weather, 24h timeline, 7-day forecast, and outdoor score. |
| **Valid City 2** | Search for "New York" or "Bengaluru" | App updates location, metrics, and apparel recommendations. |
| **Invalid City / Error** | Search for "NonExistentCityXYZ" | App displays "No location found" error message without crashing. |
| **Cloudflare Build Settings** | Screenshot of Cloudflare Dashboard | Shows `npm run build` and `dist` output directory configured. |
| **Cloudflare Live Deployment** | Browser view of `*.pages.dev` URL | App runs live on the Cloudflare Pages domain. |

---

## 📦 Submission Packaging

Before uploading to your LMS, compress your assignment materials into a single ZIP archive:

- **Naming Convention**: `empid_emp_name_appbuilding_L2.zip`
- **Contents**:
  1. Completed `AI-Assisted App Building Evaluation Rubric - L2` sheet.
  2. Screenshots of GitHub repository, Cloudflare Pages build logs, and live `pages.dev` testing.
  3. Live Cloudflare Pages URL.
