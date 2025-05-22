# PALF Assistant Chatbot

This is a web chatbot ("PALF Assistant") built with Remix, Tailwind CSS, Supabase, and the Vercel AI SDK. It allows users to query social media metrics from Supabase and provides the latest news related to "Pase a la Fama" or "PALF" in each response.

## Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Create and configure `.env`:**

    Create a `.env` file in the project root and add your Supabase and News API keys.

    ```env
    VITE_SUPABASE_URL=https://reilyngaidrxfsoglnqz.supabase.co
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY # Replace with your actual Supabase Anon Key
    NEWSAPI_KEY=YOUR_NEWSAPI_KEY # Replace with your actual NewsAPI or GNews API Key
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY # Replace with your actual OpenAI API Key
    MODEL_NAME=gpt-4o-2024-08-06 # Or your preferred model
    ```
    **Note:** The `keys.py` and `lib/load_keys.py` files are included for demonstration purposes within the WebContainer environment's limitations. In a real deployment, environment variables (`process.env`) should be used directly in the Node.js/Edge function code (`app/routes/api.chat.tsx`).

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

## Features

*   **Supabase Integration:** Connects to specified Supabase tables to retrieve social media metrics. (Note: The current implementation has basic logic for querying; a more advanced version would require sophisticated natural language processing to SQL conversion).
*   **News Integration:** Fetches the latest news about "Pase a la Fama" or "PALF" using the NewsAPI.
*   **Chat Interface:** Minimalist white theme interface inspired by bolt.new.
*   **AI Chat:** Uses the Vercel AI SDK and OpenAI for chat completions.

## Project Structure

*   `app/routes/_index.tsx`: The main chat interface.
*   `app/routes/api.chat.tsx`: The API endpoint for chat completions, integrating Supabase and News API.
*   `lib/news.ts`: Helper function to fetch news.
*   `lib/supabase.ts`: Helper for Supabase client and query execution (basic implementation).
*   `components/ChatBubble.tsx`: Component for displaying chat messages.
*   `components/ChatInput.tsx`: Component for the message input area.
*   `keys.py`: (Demonstration) Stores API keys.
*   `lib/load_keys.py`: (Demonstration) Loads keys from `keys.py`.
*   `tailwind.config.ts`: Tailwind CSS configuration for the white theme.

## Deployment

Build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Remember to configure your environment variables on your hosting platform.
