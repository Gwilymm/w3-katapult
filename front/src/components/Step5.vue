<template>
  <v-card title="Etat d’avancement du projet ">
  <v-form ref="form5" v-model="valid" @submit.prevent="nextStep">

    <v-card
      title="Avez-vous été ou êtes-vous accompagnés par ailleurs ? Si oui, par quel organisme et sur quels sujets ?"
    >
      <v-textarea
        v-model="formData.accompagnement"
        :rules="[rules.required]"
      ></v-textarea>
    </v-card>
    <v-card title="Quelles sont les étapes déjà réalisées ? ">
      <v-row>
        <v-col cols="12" md="3"> </v-col>
        <v-col cols="12" md="2">
          <p>Oui</p>
        </v-col>
        <v-col cols="12" md="2">
          <p>Non</p>
        </v-col>
        <v-col cols="12" md="2">
          <p>En cours</p>
        </v-col>
        <v-col cols="12" md="3">
          <p>Précision si besoin</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>
            Diagnostic territorial, étude du besoin social / environnemental
          </p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.diag" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.diag" value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.diag" value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.diagPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>Constitution d’un collectif moteur</p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.collectif" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.collectif" value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.collectif" value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.collPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>Expérimentation terrain - 1ers résultats</p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.expe" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio  v-model="formData.expe" value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio  v-model="formData.expe"value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.expPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>Etude de marché</p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.etude" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.etude"  value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.etude" value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.etuPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>Formalisation de l’offre</p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.offre" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.offre" value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.offre" value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.offrPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <p>Premier chiffrage</p>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.chiffrage" value="Oui"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.chiffrage" value="Non"></v-radio>
        </v-col>
        <v-col cols="12" md="2">
          <v-radio v-model="formData.chiffrage" value="Encours"></v-radio>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="formData.chiffrPrec"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      title="Quel est le premier risque que vous ayez pris à ce jour pour votre projet ? "
    >
      <v-textarea
        v-model="formData.risques"
        :rules="[rules.required]"
      ></v-textarea>
    </v-card>
    <v-card title="Quelle analyse faites-vous de votre projet à ce stade ?">
      <v-card>
        <v-row>
          <v-col cols="12" md="6">
            <v-card
              title="Forces"
              subtitle="Facteurs positifs d’origine interne (à hiérarchiser)"
            >
              <v-textarea
                v-model="formData.forces"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              title="Faiblesses"
              subtitle="Facteurs négatifs d’origine interne (à hiérarchiser)"
            >
              <v-textarea
                v-model="formData.faiblesses"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card
              title="Opportunités"
              subtitle="Facteurs positifs d’origine externe (à hiérarchiser)"
            >
              <v-textarea
                v-model="formData.opportunites"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              title="Menaces"
              subtitle="Facteurs négatifs d’origine externes (à hiérarchiser)"
            >
              <v-textarea
                v-model="formData.menaces"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        title="Comment palliez-vous vos faiblesses et contournez-vous les menaces ?"
      >
        <v-textarea
          v-model="formData.pallier"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="A quelle échéance souhaitez-vous créer ? Pour ce faire, quel est votre plan d’action / calendrier prévisionnel ?"
      >
        <v-textarea
          v-model="formData.calendrier"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
    </v-card>
    </v-form>
  </v-card>
</template>
<script setup>
import {ref, reactive} from "vue";

const valid = ref(false);

const formData = reactive({
  accompagnement:'',
  diag:'',
  diagPrec:'',
  collectif:'',
  collPrec:'',
  expe:'',
  expPrec:'',
  etude:'',
  etuPrec:'',
  offre:'',
  offrPrec:'',
  chiffrage:'',
  chiffrPrec:'',
  risques:'',
  forces:'',
  faiblesses:'',
  opportunites:'',
  menaces:'',
  pallier:'',
  calendrier:'',
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
