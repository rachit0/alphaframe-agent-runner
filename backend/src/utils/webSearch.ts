import axios from 'axios';

export async function webSearch(query: string) {
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    const result = response.data.RelatedTopics[0] || {};
    return { title: result.Text || 'No results found', link: result.FirstURL || '' };
  } catch (error) {
    throw new Error('Web search failed');
  }
}