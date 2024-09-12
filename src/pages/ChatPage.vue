<template>
  <q-page class="flex flex-center">
    <q-card class="chat-container q-pa-xl blurred-background">
      <div class="chat-messages">
        <q-chat-message
          v-for="(message, index) in this.messages"
          :key="index"
          :sent="message['sent']"
          :bg-color="colorize(message['sent'])"
        >
          <div v-html="message['text']" style="font-size: 18px;" ></div>
        </q-chat-message>
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
import {
  convertDiseasesToFirstPrompt,
  sendMessage,
  getMessages,
  loadChatMessages,
  createChat, getAllChats
} from 'src/helpers/chat_gpt.js'

export default {
  props: [
    'loadAllChats'
  ],
  data() {
    return {
      userMessage: '',
      messages: [],
      chat_id: null,
    };
  },
  mounted() {
    const totalData = JSON.parse(this.$route.query.data)
    if (totalData['chat_id'] != null) {
      this.chat_id = totalData['chat_id']
      loadChatMessages(this.chat_id).then(data => {
        console.log(data)
        this.messages = data
        console.log("this.messages", this.messages)
        if (this.messages.length === 0) {
          const symptoms = totalData['symptoms'];
          const firstPrompt = convertDiseasesToFirstPrompt(symptoms)
          this.addUserMessage(firstPrompt)
          sendMessage(
            this.chat_id,
            firstPrompt
          ).then(message => {
            this.addSystemMessage(message)
          })
        }
      })
    } else {
      createChat().then(chat_id => {
        this.chat_id = chat_id
        totalData['chat_id'] = this.chat_id
        this.loadAllChats()
        let jsonArray = JSON.stringify(totalData)
        this.$router.push({path: '/chat-page', query: {data: jsonArray}}).then(data=>{
            window.location.reload();
        });
      })
    }


  },
  methods: {
    async sendMessage() {
      if (!this.userMessage) return;

      const userText = this.userMessage;
      this.addUserMessage(userText)
      this.userMessage = '';

      sendMessage(
        this.chat_id,
        userText
      ).then(message => {
        this.addSystemMessage(message)
      })
    },
    addSystemMessage(message) {
      this.messages.push(
        {
          text: message,
          sent: false,
        }
      )
    },
    addUserMessage(message) {
      this.messages.push(
        {
          text: message,
          sent: true,
        }
      )
    },
    colorize(sent) {
      return sent ? "amber-2" : "cyan-2"
    }
  },
  watch: {
    '$route.query.param': {
      handler(newValue) {
        this.$router.go()
      },
    },
  }
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
