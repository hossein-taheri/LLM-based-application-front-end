<template>
  <q-layout class="main_page" view="hhh lpR fFf">

    <q-header reveal elevated class="custom_header text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          <q-avatar rounded size="xl">
            <img src="/icons/big-icon.svg">
          </q-avatar>
          Medical AssistPro
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      dark
      elevated>
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple @click="this.refreshSession">
            <q-item-section avatar>
              <q-icon name="add"/>
            </q-item-section>
            <q-item-section>
              New Chat
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <template v-for="(menuItem, index) in this.chats" :key="index">
            <q-separator></q-separator>
            <q-item clickable v-ripple @click="goToChatId(menuItem.chat_id)">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator"/>
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        name="fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <router-view :loadAllChats="loadAllChats"/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import {ref} from 'vue'
import {getAllChats} from "src/helpers/chat_gpt";
import {isLoggedIn} from "src/helpers/auth";

export default {
  data() {
    return {
      chats: []
    }
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted() {
    this.loadAllChats()
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = 1;
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = 0;
      done();
    },
    refreshSession() {
      this.$router.push({path: '/'});
    },
    goToChatId(chat_id) {
      const jsonArray = JSON.stringify({
        "chat_id": chat_id
      });
      console.log({data: jsonArray})
      this.$router.push({path: '/chat-page', query: {data: jsonArray}}).then(data => {
        window.location.reload();
      });
    },
    loadAllChats() {
      getAllChats().then(
        data => {
          this.chats = []
          for (const chat in data['chats']) {
            this.chats.push({
              icon: 'chat',
              label: data['chats'][chat]['created_at'],
              separator: false,
              chat_id: data['chats'][chat]['chat_id'],
            })
          }
          this.chats = this.chats.reverse()
        });
    },
  },
}
</script>
<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
