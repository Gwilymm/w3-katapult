<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <App-Bar></App-Bar>
          <v-form @submit.prevent ="submitSignUp">
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
            v-model="user.phoneNumber"
            label="Numero de telephone"
            prepend-icon="mdi-phone"
            >
            </v-text-field>
            <v-text-field
              v-model="user.siret"
              label="siret"
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
import { ApiService } from '@/services/apiServices';

const user = ref({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  address: '',
  phoneNumber: '',
  siret: '',
  birthDate: '',
})


function submitSignUp() {
  ApiService.signUp(user.value)
    .then((response) => {
      console.log(response)
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
