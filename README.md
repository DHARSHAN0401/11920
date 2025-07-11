# URL Shortener Frontend

A beginner-friendly React application for shortening URLs, with centralized logging and simple CSS styling.

## Features
- Shorten URLs and view click statistics
- Centralized logging using a custom logger
- Minimal, clean code structure
- Simple CSS styling

## Prerequisites
- Node.js and npm installed

## Installation
1. Clone or download this repository to your local machine.
2. Open a terminal in the project folder.
3. Run:
   ```
   npm install
   ```

## Running the App
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and go to:
   [http://localhost:3000](http://localhost:3000)

## Project Structure
- `public/index.html` — Main HTML file
- `public/main.css` — CSS styles
- `src/App.jsx` — Main React app
- `src/logger.js` — Logging utility
- Other React components in `src/`

## Logging
- All significant events are logged using the custom logger.
- Logs are displayed at the bottom right of the app.

## Notes
- For production deployment, use a static server like Vercel, Netlify, or serve with Express.
- For backend integration, see the logging middleware and database wrapper examples in `src/`.

## Troubleshooting
- If you see errors, check your terminal for details.
- Make sure all dependencies are installed with `npm install`.
- If the app does not start, ensure you are using Node.js v16 or newer.

---

Enjoy your URL Shortener app!
>>>>>>> df13137 (Initial commit)
