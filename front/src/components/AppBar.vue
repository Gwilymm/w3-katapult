<template>
  <v-app-bar :elevation="2">
    <v-container class="iconTxt">
      <v-icon icon="mdi mdi-home" @click="goToHome" color="red"></v-icon>
      <v-app-bar-title class="ml-3">ADRESS Normandie Incubateur Katapult</v-app-bar-title>
    </v-container>
    <template v-slot:append>
      <v-btn v-if="!isUserConnected" @click="goToSignUp">S'inscrire</v-btn>
      <v-btn v-if="!isUserConnected" @click="goToLogin">Se connecter</v-btn>
      <v-btn v-if="isUserConnected" @click="goToProfile" icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();
const isUserConnected = computed(() => authStore.isAuthenticated);

function goToProfile() {
  router.push('/profile');
}

function goToHome() {
  router.push('/');
}

function goToSignUp() {
  router.push('/signup');
}

function goToLogin() {
  router.push('/login');
}
</script>
<style scoped>
.iconTxt {
  display: flex;
  width: 80%;
  justify-content: space-around;
}
</style>
