<template>
    <v-app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-form @submit.prevent="submitLogin">
              <v-text-field
                v-model="loginDetails.username"
                label="Username"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginDetails.password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Se conntecter</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { ApiService } from '@/services/apiServices';
  import router from '@/router';

  const loginDetails = ref({
    username: '',
    password: '',
  })

  async function submitLogin() {
    ApiService.login(loginDetails.value)
      .then((response) => {
        console.log(response)
        router.push({ path: '/' })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  </script>

  <style scoped>
  v-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  v-row {
    width: 100%;
  }
  </style>
