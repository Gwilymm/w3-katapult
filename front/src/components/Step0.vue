<template>
  <v-card title="Vérification de votre identité">
    <v-alert type="info" class="mb-4"
      >Avant de commencer à remplir votre dossier, veuillez vérifier les
      informations que vous nous avez fourni.</v-alert
    >
    <v-row>
      <v-col cols="12" md="4">
        <v-card subtitle="Nom">
          <v-text-field v-model="lastName"></v-text-field>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card subtitle="Prenom">
          <v-text-field v-model="firstName"></v-text-field>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card subtitle="Date de naissance">
          <v-text-field v-model="birthDate" type="date"></v-text-field>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card subtitle="Email">
          <v-text-field v-model="email" type="email"></v-text-field>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card subtitle="Adresse">
          <v-text-field v-model="adress"></v-text-field>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card subtitle="Numéro de téléphone">
          <v-text-field v-model="phoneNbr"></v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';

let firstName = ref("");
let lastName = ref("");
let birthDate = ref("");
let email = ref("");
let adress = ref("");
let phoneNbr = ref("");

onMounted(() => {
  let user = useAuthStore().user
  firstName.value = user.firstName
  lastName.value = user.lastName
  birthDate.value = user.birthDate
  email.value = user.email
  phoneNbr.value = user.phoneNumber
  adress.value = user.address
})
</script>
