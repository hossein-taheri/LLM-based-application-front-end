<template>
  <q-page class="flex flex-center">
    <q-card class="blurred-background q-pa-md" style="width: 400px;" dark>
      <q-card-section>
        <div class="text-h6">Forgot Password</div>
      </q-card-section>
      <q-card-section class="transparent_background">
        <q-form @submit="this.onSubmit()">
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
          <q-btn
            label="Send Email"
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
          label="Sign In"
          color="white"
          @click="this.goToSignIn()"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {forgotPassword} from "src/helpers/auth";
import {Notify} from "quasar";

export default {
  data() {
    return {
      form: {
        email: '',
      }
    }
  },
  methods: {
    onSubmit() {
      forgotPassword(this.form.email).then(data => {
        Notify.create({
          type: 'positive',
          message: "Forgot password email has been sent",
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
