<template>
<v-app-bar :elevation="5">
    <div class="">
        <v-app-bar-nav-icon @click="goToHome"></v-app-bar-nav-icon>
        <v-app-bar-title>ADRESS Normandie Incabateur Katapult</v-app-bar-title>
    </div>
    <template v-slot:append>
        <v-btn  @click="goToSignUp">Sign Up</v-btn>
        <v-btn  @click="goToProfile"  icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const isUserConnected = ref(false)
  const router = useRouter()

  function signIn() {
    console.log('Sign in')
    isUserConnected.value = true
  }

  function goToProfile() {
    router.push('/profile')
  }

  function goToHome() {
    router.push('/')
  }

  function goToSignUp() {
    router.push('/signup')
  }
  </script>

  <style>

  
  </style>