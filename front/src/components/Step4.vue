<template>
  <v-card title="Vous et votre équipe">
  <v-form ref="form4" v-model="valid" @submit.prevent="nextStep">
    <v-card title="Présentation de l’équipe">
      <v-card
        title="Présentez-vous succinctement "
        subtitle="(1 paragraphe par personne réellement impliquée dans le projet, max 8 lignes)
Parcours (formation, professionnel et bénévole), compétences et motivations, ainsi que ceux des membres de l’équipe, en mettant en évidence vos compétences et atouts pour mener à bien le projet (joindre les CV). "
      >
        <v-textarea
          v-model="formData.presentation"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="Avez-vous une expérience entrepreneuriale ? Si oui, précisez."
      >
        <v-radio-group
          v-model="formData.expEntre"
          :rules="[rules.required]"
          label=""
        >
          <v-radio value="non" label="Non"></v-radio>
          <v-radio value="oui" label="Oui"></v-radio>
        </v-radio-group>
        <template v-if="formData.expEntre === 'oui'">
          <v-text-field
            v-model="formData.referentRoleDuration"
            :rules="[rules.required]"
            label="Précisez"
          ></v-text-field>
        </template>
      </v-card>
      <v-card
        title="Citez un entrepreneur social qui vous inspire particulièrement"
      >
        <v-text-field
          v-model="formData.entrepreneur"
          :rules="[rules.required]"
        ></v-text-field>
      </v-card>
      <v-card
        title="Quelles sont selon vous les compétences manquantes dans l’équipe pour mener à bien ce projet ? Comment comptez-vous y pallier ?"
      >
        <v-textarea
          v-model="formData.competences"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card
        title="Qui suivra le parcours d’incubation ? Une ou plusieurs personnes ?"
      >
        <v-textarea
          v-model="formData.incubation"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
    </v-card>
    <v-card
      title="Place de chacun des membres de l’équipe projet"
      text="De manière individuelle, considérez-vous ce projet comme :
    • Une activité principale rémunérée - Vous espérez vivre de ce projet en tant qu’activité principale, vous n’aurez pas d’autre activité professionnelle à priori
    • Une activité secondaire rémunérée - Vous espérez en tirer une rémunération mais cela restera une activité secondaire (car vous souhaitez maintenir une autre activité en parallèle)Une activité bénévole - Vous n’attendez pas de vous rémunérer sur cette activité"
    >
      <v-card-text
        >Créez autant de tableaux que de porteurs de projets déclarés dans le
        dossier, posez-vous la question de votre rôle et de l’évolution de votre
        situation à plus ou moins long terme.
      </v-card-text>
      <v-btn @click="addPersonInfo">Ajouter un tableau</v-btn>
      <div v-for="(person, index) in formData.otherPeopleInfo" :key="index">
        <v-row>
          <p>Porteur de projet :</p>
          <v-text-field
            v-model="person.name"
            :rules="[rules.required]"
            label="Prénom"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-card subtitle="Court terme (1 ans)">
              <v-radio-group v-model="person.shortTime">
                <v-radio
                  value="actPrRem"
                  label="Activité principale rémunérée"
                ></v-radio>
                <v-radio
                  value="actSndRem"
                  label="Activité secondaire rémunérée"
                ></v-radio>
                <v-radio value="actBen" label="Activité bénévole"></v-radio>
              </v-radio-group>
              <v-textarea
                v-model="person.shortTimePrecision"
                :rules="[rules.required]"
                label="Précisions sur vos missions:"
              ></v-textarea>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card subtitle="Moyen terme (3 ans)">
              <v-radio-group v-model="person.midTime">
                <v-radio
                  value="actPrRem"
                  label="Activité principale rémunérée"
                ></v-radio>
                <v-radio
                  value="actSndRem"
                  label="Activité secondaire rémunérée"
                ></v-radio>
                <v-radio value="actBen" label="Activité bénévole"></v-radio>
              </v-radio-group>
              <v-textarea
                v-model="person.midTimePrecision"
                :rules="[rules.required]"
                label="Précisions sur vos missions:"
              ></v-textarea>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card subtitle="Long terme (10 ans)">
              <v-radio-group v-model="person.longTime">
                <v-radio
                  value="actPrRem"
                  label="Activité principale rémunérée"
                ></v-radio>
                <v-radio
                  value="actSndRem"
                  label="Activité secondaire rémunérée"
                ></v-radio>
                <v-radio value="actBen" label="Activité bénévole"></v-radio>
              </v-radio-group>
              <v-textarea
                v-model="person.longTimePrecision"
                :rules="[rules.required]"
                label="Précisions sur vos missions:"
              ></v-textarea>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <p>Quelle est votre situation professionnelle actuelle ?</p>
          <p>
            Si vous êtes en activité, veuillez préciser le volume horaire dédié
            à cette activité. Avez-vous des jours particuliers d’indisponibilité
            ? Si oui lesquels ?
          </p>
          <v-textarea
            v-model="person.profSituation"
            :rules="[rules.required]"
            label="Précisions sur vos missions:"
          ></v-textarea>
        </v-row>
        <v-row>
          <p>
            Afin d’adapter au mieux l’accompagnement et de fixer avec vous les
            objectifs temporels en termes de création, pouvez-vous nous indiquer
            quels seront vos revenus durant la période d’incubation ?
          </p>
          <p>
            (salaire à temps plein /partiel, indemnités pôle emploi,
            allocations, revenus locatifs, RSA, etc.).
          </p>
          <v-textarea
            v-model="person.revenusInfo"
            :rules="[rules.required]"
            label="Précisions sur vos missions:"
          ></v-textarea>
        </v-row>
        <v-row>
          <p>
            Quel volume horaire hebdomadaire pouvez-vous dédier au parcours
            d’incubation incluant les rendez-vous Katapult, la formalisation du
            projet et les temps de rencontre partenaires afin de réaliser votre
            projet ?
          </p>
          <v-textarea
            v-model="person.volumeHoraire"
            :rules="[rules.required]"
            label="Précisions sur vos missions:"
          ></v-textarea>
        </v-row>
      </div>
    </v-card>
    <v-card title="L’équipe et le parcours d’incubation">
      <v-card
        title="Pourquoi souhaitez-vous intégrer l’incubateur de l’ADRESS ? Quels sont vos besoins et vos attentes en termes d’accompagnement ? "
      >
        <v-textarea
          v-model="formData.attentes"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
      <v-card title="Que pouvez-vous apporter à l’incubateur et aux incubés ?">
        <v-textarea
          v-model="formData.entraide"
          :rules="[rules.required]"
        ></v-textarea>
      </v-card>
    </v-card>
    </v-form>
  </v-card>
</template>
<script setup>
import { ref, reactive } from 'vue';

const valid = ref(false)
const formData = reactive({
  presentation:'',
  expEntre:'',
  referentRoleDuration:'',
  entrepreneur:'',
  competences:'',
  incubation:'',
  otherPeopleInfo : [],
  attentes: '',
  entraide:''

})
const rules = {
  required: (value) => !!value || "Requis",
};
const addPersonInfo = () => {
  formData.otherPeopleInfo.push({
    name: "",
    shortTime: "",
    shortTimePrecision: "",
    midTime: "",
    midTimePrecision: "",
    longTime: "",
    longTimePrecision: "",
    profSituation: "",
    revenusInfo: "",
    volumeHoraire: "",
  });
};
const nextStep = () => {
  if (valid.value) {
    emit("next");
  }
};

const savedData = localStorage.getItem("step4");
if (savedData) {
  Object.assign(formData, JSON.parse(savedData));
}
</script>
