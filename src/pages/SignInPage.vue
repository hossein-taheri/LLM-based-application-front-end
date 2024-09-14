<template>
  <q-page class="flex flex-center">
    <q-card class="blurred-background q-pa-md" style="width: 400px;" dark>
      <q-card-section>
        <div class="text-h6">Sign In</div>
      </q-card-section>

      <q-card-section class="transparent_background">
        <q-form @submit="onSubmit">
          <q-input
            v-model="form.email"
            label="Email"
            dark
            type="email"
            :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Email must be valid']"
            filled
            clearable
            lazy-rules
          />

          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[val => !!val || 'Password is required']"
            filled
            dark
            clearable
            lazy-rules
            class="q-mt-md"
          />


          <q-btn
            label="Sign In"
            type="submit"
            color="deep-purple-10"
            class="shadow-3 q-mt-lg full-width"
            dark
          />
          <div class="q-mt-md">
            <q-btn
              flat
              label="Forgot Password?"
              color="white"
              @click="goToForgotPassword"
            />
          </div>

          <div class="q-mt-md">
            <q-btn
              flat
              label="Don't have an account? Sign Up"
              color="white"
              @click="goToSignUp"
            />
          </div>
        </q-form>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import {login} from "src/helpers/auth";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    onSubmit() {
      login(this.form.email, this.form.password).then(data => {
        this.$router.push('/');
      })
    },
    goToForgotPassword() {
      this.$router.push('/auth/forgot-password');
    },
    goToSignUp() {
      this.$router.push('/auth/sign-up');
    }
  }
}
</script>

