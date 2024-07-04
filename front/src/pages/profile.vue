<template>
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
          <!-- <v-btn color="primary">Save</v-btn> --> 
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  import { ref,onMounted, watch } from 'vue';
  import { useAuthStore } from '@/stores/authStore';

  const authStore = useAuthStore();
  const profile = ref({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const loadUserProfile = () => {
  const userInfo = authStore.getUserInfo;
  profile.value = { ...userInfo };
};

watch(
  () => authStore.getUserInfo,
  (newValue) => {
    profile.value = { ...newValue };
  },
  { immediate: true }
);

onMounted(() => {
  loadUserProfile();
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
