<template>
  <q-page class="flex flex-center">
    <q-card class="blurred-background q-pa-md" style="width: 400px;" dark>
      <q-card-section>
        <div class="text-h6">Update Password</div>
      </q-card-section>
      <q-card-section class="transparent_background">
        <q-form @submit="this.onSubmit">
          <q-input
            v-model="this.password"
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
            v-model="this.confirmPassword"
            label="Confirm Password"
            type="password"
            :rules="[val => !!val || 'Password confirmation is required', val => val === this.password || 'Passwords must match']"
            filled
            dark
            clearable
            lazy-rules
            class="q-mt-md"
          />
          <q-btn
            label="Set New Password"
            type="submit"
            color="deep-purple-10"
            class="shadow-3 q-mt-lg full-width"
            dark
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {forgotPasswordChangePassword, login} from "src/helpers/auth";
import {Notify} from "quasar";

export default {
  data() {
    return {
      email: null,
      forgotPasswordToken: null,
      password: null,
      confirmPassword: null,
    }
  },
  mounted() {
    this.email = this.$route.query.user_email;
    this.forgotPasswordToken = this.$route.query.forgot_password_token;
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      forgotPasswordChangePassword(this.email, this.password, this.forgotPasswordToken).then(data => {
        Notify.create({
          type: 'positive',
          message: "Your password has been changes successfully, Please log in",
          icon: 'check',
          position: 'top',
        });
        this.$router.push('/auth/sign-in');
      })
    },
  }
}
</script>
