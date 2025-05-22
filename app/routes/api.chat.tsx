import { json } from "@remix-run/node";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { fetchLatestNews } from "~/lib/news";
import { executeSupabaseQuery } from "~/lib/supabase";
import { OPENAI_API_KEY, MODEL_NAME } from "~/lib/load_keys.py"; // Simulate loading from Python file

// In a real app, use process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // Replace with process.env.OPENAI_API_KEY in a real deployment
});

export async function action({ request }: { request: Request }) {
  const { messages } = await request.json();

  // System Prompt
  const systemPrompt = `Eres **PALF Assistant**. Tu misión:
• Genera reportes breves y accionables basados en los datos de Supabase.
• Usa SQL via supabase-js cuando el usuario pregunte por cifras o tendencias.
• Después de preparar la respuesta, adjunta una “Nota de actualidad” con la
  noticia más reciente sobre “Pase a la Fama” o “PALF” (título, medio, fecha, URL).
• Responde SIEMPRE en español y en tono profesional/respetuoso.
• Si no hay noticias en <24 h di:
  «No se encontraron noticias nuevas sobre PALF en las últimas 24 h.»`;

  // Check for numerical/data requests to trigger Supabase query
  let supabaseData = null;
  const lastUserMessage = messages[messages.length - 1]?.content;
  if (lastUserMessage && /\d+|metrics|cifras|tendencias|datos|reporte/i.test(lastUserMessage)) {
     // This is a very basic check. A more sophisticated approach would use function calling
     // or more advanced prompt engineering to guide the model to request data.
     supabaseData = await executeSupabaseQuery(lastUserMessage);
  }


  // Fetch latest news
  const news = await fetchLatestNews("Pase a la Fama OR PALF");
  let newsNote = "";
  if (news) {
    newsNote = `\n\n---\nNota de actualidad:\n"${news.title}" - ${news.source} (${news.date})\n${news.link}`;
  } else {
    newsNote = "\n\n---\nNota de actualidad:\nNo se encontraron noticias nuevas sobre PALF en las últimas 24 h.";
  }

  // Append Supabase data and news to the last user message for context
  const messagesWithContext = messages.map((msg: any, index: number) => {
    if (index === messages.length - 1 && msg.role === 'user') {
      let content = msg.content;
      if (supabaseData) {
        content += `\n\n[Supabase Data]:\n${supabaseData}`;
      }
      content += newsNote;
      return { ...msg, content };
    }
    return msg;
  });


  const stream = OpenAIStream(openai, {
    model: MODEL_NAME, // Replace with process.env.MODEL_NAME in a real deployment
    messages: [{ role: 'system', content: systemPrompt }, ...messagesWithContext],
    temperature: 0.3,
    stream: true,
  });

  return new StreamingTextResponse(stream);
}
