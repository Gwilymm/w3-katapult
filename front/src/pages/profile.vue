<template>
    <App-Bar></App-Bar>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-form>
            <v-text-field
              label="Prénom"
              v-model="profile.firstName"
              outlined
              dense
              type="text"
            ></v-text-field>
            <v-text-field
              label="Nom"
              v-model="profile.lastName"
              outlined
              dense
              type="text"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="profile.email"
              outlined
              dense
              type="email"
            ></v-text-field>
            <v-text-field
              label="Numéro de téléphone"
              v-model="profile.phoneNumber"
              outlined
              dense
              type="number"
            ></v-text-field>
            <v-btn color="primary">Save</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  import { ref } from 'vue';

  const profile = ref({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  </script>
  <style scoped>
  .v-container {
    height : 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
