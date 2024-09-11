import {OpenAI} from 'openai'
import {Converter} from 'showdown'
import {sendRequest} from "src/helpers/request";
import {setToken} from "src/helpers/auth";

const conversationHistory = [];
const converter = new Converter()


export async function loadChatMessages(chat_id) {
  try {
    const data = await sendRequest(
      "chat/get-all-messages?chat_id=" + chat_id,
      "GET",
    )
    console.log(data)
    for (const i in data["messages"]) {
      data["messages"][i]['sent'] = data["messages"][i]['is_users']
    }
    return data["messages"]
  } catch (err) {
    throw err;
  }
}

export async function createChat(chat_id) {
  try {
    const data = await sendRequest(
      "chat/create",
      "POST",
    )
    return data["chat_id"]
  } catch (err) {
    throw err;
  }
}

export async function sendMessage(chat_id, message) {
  try {
    const data = await sendRequest(
      "chat/send-message",
      "POST",
      {
        "chat_id": chat_id,
        "message": message,
      }
    )
    return data["data"]["text"]
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

  Also In case of disease detection explain why you have choose this answer based on your knowledge in separate section named "Explanation for my detection".
  And if you did not detect any specific disease then dont write any "Explanation for my detection" section

  And don't use any h1 tag in your response`
}

//if you think the provided symptoms are not enough to detect disease with a proper accuracy then don't detect anything and write "Please provide more information about your symptoms or medical situation"


export async function getAllChats() {
  try {
    const data = await sendRequest(
      "chat/list",
      "GET",
    )
    console.log("data", data)
    return data
  } catch (err) {
    throw err;
  }
}

