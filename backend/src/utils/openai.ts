import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function formatResponse(prompt: string, tool: string, result: any) {
  const content = tool === 'web-search'
    ? `Based on my search for "${prompt}", here's what I found: ${result.title} (${result.link})`
    : `The answer to your calculation "${prompt}" is ${result}`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
    });
    return completion.choices[0].message.content || 'No response from LLM';
  } catch (error) {
    return content; // Fallback if OpenAI fails
  }
}