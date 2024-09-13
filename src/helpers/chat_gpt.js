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
      if (data["messages"][i]['sent'] === false) {
        data["messages"][i]["text"] = converter.makeHtml(data["messages"][i]["text"])
      }
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
    return converter.makeHtml(data["data"]["text"])
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
  return `what disease it can be related with these symptoms: ${uniqueStrings} ?`
}


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

