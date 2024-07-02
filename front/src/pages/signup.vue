<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <App-Bar></App-Bar>
          <v-form @submit.prevent="signUp">
            <v-text-field
              v-model="user.username"
              label="Username"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              label="Email"
              prepend-icon="mdi-email"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Mot de passe"
              type="password"
              prepend-icon="mdi-lock"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.firstName"
              label="Prénom"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.lastName"
              label="Nom"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.profilePicture"
              label="Photo de profile"
              prepend-icon="mdi-image"
            ></v-text-field>
            <v-text-field
              v-model="user.address"
              label="Address"
              prepend-icon="mdi-home"
            ></v-text-field>
            <v-text-field
              v-model="user.iban"
              label="Siret"
              prepend-icon="mdi-bank"
            ></v-text-field>
            <v-text-field
              v-model="user.birthDate"
              label="Date de naissance"
              type="date"
              prepend-icon="mdi-calendar"
            ></v-text-field>
            <v-btn type="submit" color="primary">S'inscrire</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  address: '',
  iban: '',
  birthDate: '',
})
  function signUp(user) {
  console.log("User Data:", user);
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
