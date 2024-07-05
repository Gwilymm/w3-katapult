<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
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
            <v-btn type="submit" class="red-btn">S'inscrire</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { ApiService } from '@/services/apiServices';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';

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


async function submitSignUp() {
  try {
    let response = await ApiService.signUp(user.value)
    useAuthStore().setToken(response.data.token);
    useAuthStore().setUser(user.value)
    router.push('/')
  } catch(e) {
    console.error(e)
  }

}

</script>

<style scoped lang="scss">
@import '../styles/settings.scss';
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
