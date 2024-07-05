<template>
  <v-dialog v-model="localIsActive" max-width="500">
    <v-card>
      <v-card-title>Attention</v-card-title>
      <v-card-text>
        Afin d'acceder au formulaire de candidature, veuillez vous connecter ou vous inscrire.
      </v-card-text>
      <v-card-actions>
        <v-btn class="red-btn" @click="goToSignUp">S'inscrire</v-btn>
        <v-btn class="red-btn" @click="goToLogin">Se connecter</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import router from '@/router';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isActive: Boolean,
});

const emit = defineEmits(['close']);

const localIsActive = ref(props.isActive);

watch(() => props.isActive, (newVal) => {
  localIsActive.value = newVal;
});

function closeDialog() {
  emit('close');
  localIsActive.value = false;
}

function goToSignUp() {
  router.push('/signup');
  closeDialog();
}

function goToLogin() {
  router.push('/login');
  closeDialog();
}
</script>

<style scoped lang="scss">
@import '../styles/settings.scss';
.red-btn {
  background-color: $red !important;
  color: white;
}
</style>
