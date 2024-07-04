<template>
  <v-card title="Engagement" flat>
    <v-form ref="form8" v-model="valid" @submit.prevent>
      <v-radio-group
        v-model="formData.engagDepl"
        label="Êtes-vous prêts à vous déplacer en Normandie pour suivre les formations collectives, des événementiels pour présenter votre projet, favoriser la mise en réseau, le développement de votre projet ?"
      >
        <v-radio value="non" label="Non"></v-radio>
        <v-radio value="oui" label="Oui"></v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="formData.engagCom"
        label="Afin de favoriser le développement du projet, des présentations du projet et des mises en relation auront lieu, êtes-vous prêt à communiquer sur votre projet ? "
      >
        <v-radio value="non" label="Non"></v-radio>
        <v-radio value="oui" label="Oui"></v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="formData.engagIntens"
        label="Le parcours d’incubation proposé est un accompagnement intensif et renforcé ayant pour objectif de développer la création d’entreprises sociales innovantes, viables et pérennes. Avez-vous bien pris connaissance de l’offre et êtes-vous prêt à vous engager dans un parcours intensif d’un an ? "
      >
        <v-radio value="non" label="Non"></v-radio>
        <v-radio value="oui" label="Oui"></v-radio>
      </v-radio-group>
    </v-form>
  </v-card>
</template>
<script setup>
import {ref, reactive} from "vue";

const valid = ref(false);
const formData = reactive({
  engagDepl:'',
  engagCom:'',
  engagIntens:''
})
const rules = {
  required: (value) => !!value || "Requis",
};

const savedData = localStorage.getItem("step6");
if (savedData) {
  Object.assign(formData, JSON.parse(savedData));
}
</script>
