<template>
  <q-page class="flex flex-center  main_page">
    <q-card class="chat-container q-pa-xl blurred-background">
      <div class="chat-messages">
        <q-chat-message
          v-for="(message, index) in messages"
          :key="index"
          :text="[message['text']]"
          :sent="message['sent']"
          :bg-color="message['color']"
        />
        <!--          bg-color=""-->
      </div>
      <div class="row">
        <q-input
          class="col-11 "
          v-model="userMessage"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
          ref="inputField"
          filled
          outlined
          dense
        />
        <q-btn class="col-1" icon="send"
               flat
               @click="sendMessage"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
import {QChatMessage, QInput, QBtn, QCard, QPage} from 'quasar'; // Import necessary components
import {convertDiseasesToFirstPrompt, sendMessage, getMessages} from 'src/helpers/chat_gpt.js'

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
    };
  },
  mounted() {
    const serializedArray = this.$route.query.data;
    const myArray = JSON.parse(serializedArray);
    const firstPrompt = convertDiseasesToFirstPrompt(myArray)
    this.addUserMessage(firstPrompt)
    sendMessage(
      firstPrompt
    ).then(message => {
      this.addSystemMessage(message)
    })

  },
  methods: {
    async sendMessage() {
      if (!this.userMessage) return;

      const userText = this.userMessage;
      this.addUserMessage(userText)
      this.userMessage = '';

      sendMessage(
        convertDiseasesToFirstPrompt(userText)
      ).then(message => {
        this.addSystemMessage(message)
      })
    },
    addSystemMessage(message) {
      this.messages.push(
        {
          text: message,
          sent: false,
          color: "amber-2",
        }
      )
    },
    addUserMessage(message) {
      this.messages.push(
        {
          text: message,
          sent: true,
          color: "cyan-2",
        }
      )
    }
  },
};
</script>

<style scoped>
.chat-container {
  width: 85%;
  height: 83vh;
  display: flex;
  flex-direction: column;
  background: #00000000;
}

.blurred-background {
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  padding: 20px;
  border-radius: 10px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.user_input {
  background: rgba(255, 255, 255, 0.3);
}

.user_click {
  background-color: #007bff;
  color: white;
  padding: 0 16px;
  font-size: 16px;
  height: 48px;
  width: auto;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user_click:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
