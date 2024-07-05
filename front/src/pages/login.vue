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
            <v-btn type="submit" class="red-btn">Se connecter</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { ApiService } from "@/services/apiServices";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const loginDetails = ref({
  username: "",
  password: "",
});

async function submitLogin() {
  ApiService.login(loginDetails.value)
    .then((response) => {
      let user = {
        id:response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        address: response.address,
        phoneNumber: response.phoneNumber,
        birthDate: response.birthDate,
      }
      useAuthStore().setToken(response.token);
      useAuthStore().setUser(user);
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
v-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

v-row {
  width: 100%;
}
.red-btn {
  background-color: $red !important;
  color: white;
}
</style>
