<template>
  <v-card title="Fiche d'identité" flat>
    <v-form ref="form1" v-model="valid" @submit.prevent="nextStep">
      <v-card subtitle="Nom du projet">
        <v-text-field
          v-model="formData.projectName"
          :rules="[rules.required]"
        ></v-text-field>
      </v-card>
      <v-card subtitle="Avez-vous un numéro de SIRET">
        <v-text-field :rules="[rules.required]"></v-text-field>
        <v-radio-group v-model="formData.siretNbrRsp">
          <v-radio value="non" label="Non"></v-radio>
          <v-radio value="oui" label="Oui"></v-radio>
        </v-radio-group>
        <template v-if="formData.siretNbrRsp === 'oui'">
          <v-text-field
            v-model="formData.siretNbr"
            :rules="[rules.required]"
          ></v-text-field>
        </template>
      </v-card>
      <v-card>
        <v-row>
          <v-col cols="12" md="6">
            <v-list-subheader>Secteur d'activité</v-list-subheader>
            <v-text-field
              v-model="formData.sector"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-subheader
              >Territoire d'implantation (ville, agglomération,
              département...)</v-list-subheader
            >
            <v-text-field
              v-model="formData.location"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row>
          <v-col cols="12" md="6">
            <v-list-subheader
              >Zone géographique d'intervention (périmètre touché par votre
              projet)</v-list-subheader
            >

            <v-checkbox
              v-model="formData.geographicZone"
              value="Quartier"
              label="Quartier"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="Ville/village"
              label="Ville/village"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="Agglomération/Métropole"
              label="Agglomération/Métropole"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="Département"
              label="Département"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="Région"
              label="Région"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="National"
              label="National"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.geographicZone"
              value="International"
              label="International"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-subheader
              >Comment avez-vous eu connaissance de l'appel à candidatures
              ?</v-list-subheader
            >
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Bouche à oreilles (réseau personnel ou professionnel)"
              label="Bouche à oreilles (réseau personnel ou professionnel)"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Contenu sur Facebook"
              label="Contenu sur Facebook"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Contenu sur Linkedin"
              label="Contenu sur Linkedin"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Contenu sur le web"
              label="Contenu sur le web"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Information par un tiers (structure d'accompagnement, collectivité...)"
              label="Information par un tiers (structure d'accompagnement, collectivité...)"
            ></v-checkbox>
            <v-checkbox
              v-model="formData.discoveryMethod"
              value="Presse/Radio"
              label="Presse/Radio"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card>
      <v-card title="L'équipe du projet">
        <v-list-subheader>Personne référente</v-list-subheader>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentLastName"
              :rules="[rules.required]"
              label="Nom"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentFirstName"
              :rules="[rules.required]"
              label="Prénom"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentBirthdate"
              :rules="[rules.required]"
              label="Date de naissance"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentAddress"
              :rules="[rules.required]"
              label="Adresse"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentEmail"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.referentPhone"
              :rules="[rules.required]"
              label="Téléphone"
              type="tel"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-list-subheader
          >Autres personnes impliquées dans le projet</v-list-subheader
        >
        <v-btn @click="addPerson">Ajouter une personne</v-btn>
        <div v-for="(person, index) in formData.otherPeople" :key="index">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="person.firstName"
                :rules="[rules.required]"
                label="Prénom"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="person.lastName"
                :rules="[rules.required]"
                label="Nom"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="person.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="person.phone"
                :rules="[rules.required]"
                label="Téléphone"
                type="tel"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-card title="Structure juridique déjà existante (si c'est le cas)">
        <v-list-subheader
          >Avez-vous une structure juridique existante ?</v-list-subheader
        >
        <v-radio-group
          v-model="formData.legalStructureExist"
          :rules="[rules.required]"
          label=""
        >
          <v-radio value="non" label="Non"></v-radio>
          <v-radio value="oui" label="Oui"></v-radio>
        </v-radio-group>
        <template v-if="formData.legalStructureExist === 'oui'">
          <v-text-field
            v-model="formData.legalStructureName"
            :rules="[rules.required]"
            label="Nom de la structure"
          ></v-text-field>
          <v-radio-group
            v-model="formData.legalStructureStatus"
            :rules="[rules.required]"
            label="Statut juridique"
          >
            <v-radio value="association" label="Association"></v-radio>
            <v-radio value="coopérative" label="Coopérative"></v-radio>
            <v-radio
              value="société commerciale de l'ESS"
              label="Société commerciale de l'ESS"
            ></v-radio>
            <v-radio
              value="société commerciale hors ESS"
              label="Société commerciale hors ESS"
            ></v-radio>
            <v-radio value="autre" label="Autre"></v-radio>
          </v-radio-group>
          <v-text-field
            v-if="formData.legalStructureStatus === 'autre'"
            v-model="formData.legalStructureOther"
            :rules="[rules.required]"
            label="Précisez"
          ></v-text-field>
          <v-radio-group
            v-model="formData.referentRoleExist"
            :rules="[rules.required]"
            label="La personne référente pour le projet est-elle salariée par la structure ou bénévole ?"
          >
            <v-radio value="non" label="Non"></v-radio>
            <v-radio value="oui" label="Oui"></v-radio>
          </v-radio-group>
          <template v-if="formData.referentRoleExist === 'oui'">
            <v-radio-group
              v-model="formData.referentRole"
              :rules="[rules.required]"
              label=""
            >
              <v-radio value="Salarié" label="Salarié"></v-radio>
              <v-radio value="Bénévole" label="Bénévole"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="formData.referentRoleDuration"
              :rules="[rules.required]"
              label="Depuis combien de temps"
            ></v-text-field>
          </template>
        </template>
      </v-card>
    </v-form>
  </v-card>
</template>
<script setup>
import { ref, reactive, watch } from "vue";

const valid = ref(false);
const formData = reactive({
  projectName: "",
  siretNbrRsp: "",
  siretNbr: "",
  sector: "",
  location: "",
  geographicZone: "",
  territory: "",
  discoveryMethod: "",
  referentLastName: "",
  referentFirstName: "",
  referentBirthdate: "",
  referentAddress: "",
  referentEmail: "",
  referentPhone: "",
  otherPeople: [],
  legalStructureExist: "",
  legalStructureName: "",
  legalStructureStatus: "",
  legalStructureOther: "",
  referentRoleExist: "",
  referentRole: "",
  referentRoleDuration: "",
});

const rules = {
  required: (value) => !!value || "Requis",
};
const addPerson = () => {
  formData.value.otherPeople.push({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
};

const nextStep = () => {
  if (valid.value) {
    emit("next");
  }
};

const savedData = localStorage.getItem("step1");
if (savedData) {
  Object.assign(formData, JSON.parse(savedData));
}
</script>
