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
  }
}
</script>

<style scoped>
.q-page {
  background-color: #00000000;
}

.blurred-background {
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  padding: 20px;
  border-radius: 10px;
}
</style>
