<template>
  <v-container>
    <v-alert class="mb-4" variant="flat">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      euismod, nisi eu consectetur consectetur, nisl nisl consectetur nisl, eu
      consectetur nisl nisl eu nisl.
    </v-alert>
    <v-alert v-if="errors.length" type="error" class="mb-4">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </v-alert>
    <v-stepper v-model="step" :items="stepItems">
      <template v-slot:item.1>
        <Step0 @next="nextStep" />
      </template>
      <template v-slot:item.2>
        <Step1 @next="nextStep" />
      </template>
      <template v-slot:item.3>
        <Step2 @next="nextStep" />
      </template>
      <template v-slot:item.4>
        <Step3 @next="nextStep" />
      </template>
      <template v-slot:item.5>
        <Step4 @next="nextStep" />
      </template>
      <template v-slot:item.6>
        <Step5 @next="nextStep" />
      </template>
      <template v-slot:item.7>
        <Step6 @next="submitForm" />
      </template>

      <template v-slot:actions="{ prev, next, finish }">
        <v-btn v-if="step > 1" @click="prevStep">Précédent</v-btn>
        <v-btn v-if="step < stepItems.length" @click="nextStep">Suivant</v-btn>
        <v-btn v-if="step === 7" @click="submitForm" color="primary">Terminer</v-btn>
        <v-btn @click="saveForm" color="secondary">Sauvegarder</v-btn>
      </template>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Step1 from "../components/Step1.vue";
import Step2 from "../components/Step2.vue";
import Step3 from "../components/Step3.vue";
import Step4 from "../components/Step4.vue";
import Step5 from "../components/Step5.vue";
import Step6 from "../components/Step6.vue";
import Step0 from "../components/Step0.vue";
import { useAuthStore } from "../stores/authStore";
import { ApiService } from "@/services/apiServices";


const stepItems = [
  "Étape 0",
  "Étape 1",
  "Étape 2",
  "Étape 3",
  "Étape 4",
  "Étape 5",
  "Étape finale",
];
const step = ref(1);
const errors = ref([]);
const authStore = useAuthStore();


const nextStep = () => {
  if (step.value < stepItems.length) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const submitForm = () => {
  const formData = {
    ...JSON.parse(localStorage.getItem("step1")),
    ...authStore.step2,
    ...JSON.parse(localStorage.getItem("step3")),
    ...JSON.parse(localStorage.getItem("step4")),
    ...JSON.parse(localStorage.getItem("step5")),
    ...JSON.parse(localStorage.getItem("step6")),
  };
};

const saveForm = async () => {
  try{
    await ApiService.updateProjectDetails(authStore.projectDetailId, authStore.appId, authStore.step2)
    await ApiService.updateEconomicModel(authStore.economicModelId, authStore.appId, authStore.step3)
  } catch(e){
    console.error(e)
  }
  // const formData = {
  //   ...JSON.parse(localStorage.getItem("step1")),
  //   ...authStore.step2,
  //   ...JSON.parse(localStorage.getItem("step3")),
  //   ...JSON.parse(localStorage.getItem("step4")),
  //   ...JSON.parse(localStorage.getItem("step5")),
  //   ...JSON.parse(localStorage.getItem("step6")),
  // };
  // localStorage.setItem('savedForm', JSON.stringify(formData));
  alert('Formulaire sauvegardé!');
};
</script>
