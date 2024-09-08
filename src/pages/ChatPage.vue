<template>
  <q-page class="flex flex-center  main_page">
    <q-card class="chat-container q-pa-xl blurred-background">
      <div class="chat-messages">
        <q-chat-message
          v-for="(message, index) in messages"
          :key="index"
          :text="[message['text']]"
          :sent="message['sent']"
          bg-color="blue-2"
        />
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
               @click="sendMessage" />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
import {QChatMessage, QInput, QBtn, QCard, QPage} from 'quasar'; // Import necessary components

export default {
  data() {
    return {
      userMessage: '',
      messages: [
        {
          text: "Hi! How can I assist you?",
          sent: false
        },
      ],
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userMessage) return;

      const userText = this.userMessage;
      this.messages.push({text: userText, sent: true});

      // Clear input
      this.userMessage = '';

      // try {
      //   const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      //     model: "gpt-4",
      //     messages: [{role: "user", content: userText}],
      //   }, {
      //     headers: {
      //       Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      //       'Content-Type': 'application/json'
      //     }
      //   });
      //
      //   const botReply = response.data.choices[0].message.content;
      //   this.messages.push({text: botReply, sent: false});
      //
      //   // Scroll to the latest message
      //   this.$nextTick(() => {
      //     this.$refs.inputField.focus();
      //   });
      //
      // } catch (error) {
      //   console.error(error);
      //   this.messages.push({text: "Something went wrong. Please try again.", sent: false});
      // }
    },
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
