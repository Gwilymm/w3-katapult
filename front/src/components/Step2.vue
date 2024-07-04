<template>
  <v-card title="Votre projet et son utilité sociale" flat>
  <v-form ref="form2" v-model="valid" @submit.prevent="nextStep">
      <v-card title="Expliquez la genèse de votre projet (environ 10 lignes)">
        <v-textarea
          v-model="formData.projectDescription"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card title="Résumez votre projet (10 lignes maximum)">
        <v-textarea
          v-model="formData.resume"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="À quel problème social et/ou environnemental souhaitez-vous répondre ?"
        subtitle="Décrivez précisément l’ampleur du problème auquel vous souhaitez apporter une solution,
              à l’échelle globale mais aussi et surtout précisez le besoin à l’échelle de votre
              territoire d’intervention. Soyez le plus précis possible
              (chiffres parlants à l’appui si vous en avez) !  (environ 20 lignes)"
      >
        <v-textarea
          v-model="formData.ampleur"
          :rules="[rules.required]"
          label="
              "
        ></v-textarea>
      </v-card>
      <v-card
        title="Qui est concerné ?
        • Qui seront les bénéficiaires de votre projet (ceux à qui le projet va profiter) ?
        • Qui seront les clients (ceux qui vont payer - s’ils sont différents des bénéficiaires) ?"
        subtitle="Idem, soyez le plus précis possible : les réponses « tout le monde » et « le grand public » sont à proscrire.
        Pouvez-vous les quantifier, définir le périmètre géographique touché…?"
      >
        <v-textarea
          v-model="formData.socialUtility"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="Quelle solution souhaitez-vous proposer ? Quelle sera votre offre ?"
        subtitle="Décrivez ce que vous imaginez comme offre, ce que vous pensez proposer à vos clients /
    bénéficiaires. Vous pouvez imaginer plusieurs phases de développement de l’activité."
      >
        <v-textarea
          v-model="formData.solution"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="En quoi votre projet est-il différent et/ou complémentaire des solutions existantes sur le territoire considéré ?"
        subtitle="Pour en savoir plus sur l’innovation sociale : Grille de caractérisation de l'AVISE "
      >
        <v-textarea
          v-model="formData.difference"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="Quels seraient les premiers indicateurs d’impact social pertinents pour évaluer votre projet ?"
        subtitle="C’est-à-dire, comment pourriez-vous mesurer les changements durables provoqués par la mise en place de votre projet ?
  Pour en savoir plus sur l’impact social : Dossier AVISE - L’impact social, de quoi parle-t-on?
  Notez 5 indicateurs qui vous sembleraient pertinents à suivre :"
      >
        <v-textarea
          v-model="formData.indicateurs"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
    </v-form>
  </v-card>
</template>
<script setup>
import {ref, reactive} from "vue";

const valid = ref(false);
const formData = reactive({
  projectDescription:'',
  resume:'',
  ampleur:'',
  socialUtility:'',
  solution:'',
  difference:'',
  indicateurs:''
})
const rules = {
  required: (value) => !!value || "Requis",
};
const nextStep = () => {
  if (valid.value) {
    emit("next");
  }
};

const savedData = localStorage.getItem("step2");
if (savedData) {
  Object.assign(formData, JSON.parse(savedData));
}
</script>
