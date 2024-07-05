<template>
  <v-card title="Le modèle économique" flat>
  <v-form ref="form3" v-model="valid" @submit.prevent="nextStep">
      <v-card title="Le marché et le potentiel économique du projet">
        <v-card
          title="Quelles sont les sources de revenus envisagées pour votre projet ? Concrètement, qu’allez-vous vendre? Comment imaginez-vous assurer la viabilité économique du prohet sur le long terme ? "
        >
          <v-textarea
            v-model="formData.revenus"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
        <v-card
          title="Combien d’emplois pensez-vous créer sur les premières années d’activités ? Sur quels types de postes / missions ? "
        >
          <v-textarea
            v-model="formData.emplois"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
        <v-card
          title="À ce stade, quels sont les éléments vous permettant d’affirmer la viabilité économique du projet ?"
          subtitle="Citez maximum 5 éléments dont vous disposez sur :
    • L’état du marché (acteurs principaux, volumes, tendances)
    • Vos concurrents directs et indirects. Que proposent-ils ? En quoi votre offre se différencie-t-elle ?
    • Des facteurs réglementaires en votre faveur
    • ...
… qui vous permettent de penser que votre projet peut avoir une place sur le marché. "
        >
          <v-textarea
            v-model="formData.viabilite"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
        <v-card
          title="Quels pourraient être les projets de diversification et de développement économique de l’activité à moyen/long terme ? "
        >
          <v-textarea
            v-model="formData.diversification"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
      </v-card>
      <v-card
        title="La place des parties prenantes dans votre projet"
        subtitle="Les entreprises sociales cherchent à intégrer différents acteurs de l’écosystème le plus tôt possible dans la réflexion autour du projet, et travaillent ensuite à la place qu’ils veulent leur donner dans la gouvernance du projet. "
      >
        <v-card
          title="Avez-vous déjà établi des contacts ou partenariats pour contribuer au projet ? Si oui, de quelle manière ? "
          subtitle="Ce peut être des futurs clients, bénéficiaires, financeurs, partenaires opérationnels… toute personne qui aurait un intérêt dans votre projet. Par exemple, vous pourriez avoir sollicité une mairie pour obtenir un prêt ponctuel de locaux, des habitants pour vous aider à organiser un événement… "
        >
          <v-textarea
            v-model="formData.partenariat"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
        <v-card
          title="Quels autres contacts ou partenariats recherchez-vous aujourd’hui ? "
        >
          <v-textarea
            v-model="formData.autreContact"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
        <v-card
          title="Quel rôle voudriez-vous que jouent ces différents acteurs dans le projet à terme ? "
          subtitle="Ex: Structuration d’un collectif restreint sur la prise de décisions stratégiques pour le projet, ou au contraire souhait d’une gouvernance très large, impliquant plusieurs des acteurs précités. "
        >
          <v-textarea
            v-model="formData.role"
            :rules="[rules.required]"
          ></v-textarea>
        </v-card>
      </v-card>
    </v-form>
  </v-card>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { ApiService } from '@/services/apiServices';

const authStore = useAuthStore();

const valid = ref(false)
const formData = reactive({
  revenus:'',
  emplois:'',
  viabilite:'',
  diversification:'',
  partenariat:'',
  autreContact:'',
  role:'',
})

onMounted(async ()=>{
  let economicModel = await ApiService.getEconomicModel(authStore.appId)
  let data = economicModel[0]
  formData.revenus= data.revenueSources
  formData.emplois= data.jobCreation
  formData.viabilite=data.economicViability
  formData.diversification=data.diversificationProjects
  formData.partenariat=data.partnerships
  formData.autreContact=data.partnershipsResearch
  formData.role=data.stakeholderRoles
})

const rules = {
  required: (value) => !!value || "Requis",
};

const nextStep = () => {
  if (valid.value) {
    emit("next");
  }
};


// Watchers for each field
watch(
  () => formData.revenus,
  (newVal) => {
    authStore.setStep3({ ...formData, revenus: newVal });
  }
);
watch(
  () => formData.emplois,
  (newVal) => {
    authStore.setStep3({ ...formData, emplois: newVal });
  }
);
watch(
  () => formData.viabilite,
  (newVal) => {
    authStore.setStep3({ ...formData, viabilite: newVal });
  }
);
watch(
  () => formData.diversification,
  (newVal) => {
    authStore.setStep3({ ...formData, diversification: newVal });
  }
);
watch(
  () => formData.partenariat,
  (newVal) => {
    authStore.setStep3({ ...formData, partenariat: newVal });
  }
);
watch(
  () => formData.autreContact,
  (newVal) => {
    authStore.setStep3({ ...formData, autreContact: newVal });
  }
);
watch(
  () => formData.role,
  (newVal) => {
    authStore.setStep3({ ...formData, role: newVal });
  }
);
</script>
