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
import { useAuthStore } from "@/stores/authStore";
import { ApiService } from "@/services/apiServices";

let firstName = ref("");
let lastName = ref("");
let birthDate = ref("");
let email = ref("");
let adress = ref("");
let phoneNbr = ref("");

onMounted(async () => {
  try {
    let user = useAuthStore().user;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    birthDate.value = user.birthDate;
    email.value = user.email;
    phoneNbr.value = user.phoneNumber;
    adress.value = user.address;
    let app = await ApiService.getApp(user.id);
    let details = null;
    let economic = null;
    if(app == undefined){
      app = await ApiService.createApp(user.id)
      details = await ApiService.createProjectDetails(app.id)
      economic = await ApiService.createEconomicModel(app.id)
    }
    else{
      details = await ApiService.getProjectDetails(app.id)
      economic = await ApiService.getEconomicModel(app.id)
    }
    useAuthStore().appId = app.id
    useAuthStore().projectDetailId = details.data[0].id
    useAuthStore().economicModelId = economic.id
  } catch (e) {
    console.error(e);
  }
});
</script>
