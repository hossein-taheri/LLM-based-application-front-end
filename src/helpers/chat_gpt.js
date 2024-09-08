import {OpenAI} from 'openai'

const openai = new OpenAI({
  apiKey: api_key,
  dangerouslyAllowBrowser: true
});
const conversationHistory = [];

export async function sendMessage(message) {
  conversationHistory.push({role: 'user', content: message});

  // Construct the conversation context from history
  const messages = conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  try {
    // Make a request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'ft:gpt-4o-mini-2024-07-18:personal::A093zQF2',
      messages: messages
    });

    // Extract the response message
    const assistantMessage = response.choices[0].message.content;

    // Add the assistant's response to the conversation history
    conversationHistory.push({role: 'assistant', content: assistantMessage});

    return assistantMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export function getMessages() {
  return conversationHistory;

}

export function convertDiseasesToFirstPrompt(myArray) {
  const allStrings = Object.values(myArray).flat();
  const uniqueStrings = [...new Set(allStrings)];
  return `What disease is associated with these symptoms: ${uniqueStrings}`
}
