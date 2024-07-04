<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-container class="fill-height align-center justify-center">
          <v-row>
            <v-col cols="12" md="6" lg="6" class="text-center mx-auto">
              <h1>Bienvenue à l'incubateur Katapult</h1>
              <p>
                Nous lançons un appel à projets pour l'année 2024. Découvrez les conditions et participez pour transformer vos idées innovantes en réalité.
              </p>
              <v-btn class="red-btn" @click="handleDialog">S'inscrire</v-btn>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-xl-10">
            <v-col cols="4" md="6">
              <h2>Qu'est-ce que Katapult ?</h2>
              <p>
                Katapult est un incubateur dédié aux projets innovants et durables. Nous accompagnons les entrepreneurs dans le développement de leurs idées en offrant un soutien personnalisé et des ressources adaptées.
              </p>
            </v-col>
            <v-col cols="6" md="6">
              <h2>Nos Objectifs</h2>
              <p>
                Nous visons à créer un écosystème dynamique où les idées novatrices peuvent prospérer. Notre objectif est de soutenir la croissance de projets à fort impact social et environnemental.
              </p>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-xl-10">
            <v-col cols="8" md="6" lg="6">
              <h2>Les Critères de Sélection</h2>
              <ul>
                <li>Avoir un projet innovant et durable</li>
                <li>Être basé en Normandie</li>
                <li>Montrer un potentiel de croissance et d'impact positif</li>
              </ul>
            </v-col>
            <v-col cols="4" md="6">
              <h2>Les Avantages de l'Incubation</h2>
              <p>
                En étant incubé par Katapult, vous bénéficierez de :
              </p>
              <ul>
                <li>Un accompagnement personnalisé</li>
                <li>Des formations et ateliers spécialisés</li>
                <li>Un accès à un réseau d'experts et de partenaires</li>
              </ul>
            </v-col>
          </v-row>

          <v-row class="mt-12 justify-center">
            <v-col cols="12" md="6" lg="6" class="text-center">
              <h2>Comment Postuler ?</h2>
              <p>
                Pour postuler, remplissez le formulaire de candidature disponible sur notre site. Notre équipe examinera votre projet et vous contactera pour un entretien.
              </p>
              <v-btn class="red-btn" @click="handleDialog">S'inscrire</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <ModalForm :isActive="isDialogActive" @close="isDialogActive = false" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import ModalForm from '@/components/ModalForm.vue';

const authStore = useAuthStore();
const isUserConnected = computed(() => authStore.isAuthenticated);
const isDialogActive = ref(false);

function handleDialog() {
  if (!isUserConnected.value) {
    isDialogActive.value = true;
  } else {
    goToFormulaire();
  }
}

function goToFormulaire(){
  router.push('/formulaire')
}
</script>

<style scoped lang="scss">
@import '../styles/settings.scss';
.red-btn {
  background-color: $red !important;
  color: white;
}
</style>
