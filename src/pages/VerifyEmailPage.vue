<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
import {verifyEmail} from "src/helpers/auth";
import {Notify} from "quasar";

export default {
  data() {
    return {
      email: null,
      verificationToken: null,
    }
  },
  mounted() {
    this.email = this.$route.query.user_email;
    this.verificationToken = this.$route.query.verification_token;
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      verifyEmail(this.email, this.verificationToken).then(data => {
        Notify.create({
          type: 'positive',
          message: "Your email verified successfully, Please log in",
          icon: 'check',
          position: 'top',
        });
        this.$router.push('/auth/sign-in');
      })
    },
  }
}
</script>
