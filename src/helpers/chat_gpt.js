import {OpenAI} from 'openai'
import {Converter} from 'showdown'

const openai = new OpenAI({
  apiKey: api_key,
  dangerouslyAllowBrowser: true
});
const conversationHistory = [];
const converter = new Converter()

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
    let assistantMessage = response.choices[0].message.content;
    try {
      assistantMessage = converter.makeHtml(assistantMessage);
    } catch (e) {
      console.log(e)
    }
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
  return `What disease is associated with these symptoms: ${uniqueStrings} ,

  if you think the provided symptoms are not enough to detect disease with a proper accuracy then don't detect anything and write "Please provide more information about your symptoms or medical situation"

  Also In case of disease detection explain why you have choose this answer based on your knowledge in separate section named "Explanation for my detection".
  And if you did not detect any specific disease then dont write any "Explanation for my detection" section

  And don't use any h1 tag in your response`
}
