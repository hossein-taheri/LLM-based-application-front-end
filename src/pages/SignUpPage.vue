<template>
  <q-page class="flex flex-center">
    <q-card class="blurred-background q-pa-md" style="width: 400px;" dark>
      <q-card-section>
        <div class="text-h6">Sign Up</div>
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
          <q-input
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            :rules="[val => !!val || 'Password confirmation is required', val => val === form.password || 'Passwords must match']"
            filled
            dark
            clearable
            lazy-rules
            class="q-mt-md"
          />
          <q-btn
            label="Sign Up"
            type="submit"

            color="deep-purple-10"
            class="shadow-3 q-mt-lg full-width"
            dark
          />
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-btn
          flat
          label="Already have an account? Sign In"
          color="white"
          @click="goToSignIn"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {register} from "src/helpers/auth";
import {Notify} from "quasar";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        Notify.create({
          type: 'negative',
          message: "Passwords dont match",
          icon: 'error',
          position: 'top',
        });
        return
      }
      register(this.form.email, this.form.password).then(data => {
        Notify.create({
          type: 'positive',
          message: "Please verify your email",
          icon: 'check',
          position: 'top',
        });
        this.$router.push('/auth/sign-in');

      })
    },
    goToSignIn() {
      this.$router.push('/auth/sign-in');
    }
  }
}
</script>
