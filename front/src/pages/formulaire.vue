<template>
  <v-container>
    <v-alert type="info" class="mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      euismod, nisi eu consectetur consectetur, nisl nisl consectetur nisl, eu
      consectetur nisl nisl eu nisl.
    </v-alert>
    <v-alert v-if="errors.length" type="error" class="mb-4">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </v-alert>
    <v-stepper v-model="step" :items="stepItems">
      <template v-slot:item.1>
        <v-card title="Fiche d'identité" flat>
          <v-form ref="form1" v-model="valid" @submit.prevent="nextStep">
            <v-card title="Nom du projet">
              <v-text-field
                v-model="formData.projectName"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card>
            <v-card title="AVez-vous un numéro de SIRET">
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
                    >Zone géographique d'intervention (périmètre touché par
                    votre projet)</v-list-subheader
                  >
                  <v-checkbox-group
                    v-model="formData.geographicZone"
                    :rules="[rules.required]"
                    label=""
                  >
                    <v-checkbox value="Quartier" label="Quartier"></v-checkbox>
                    <v-checkbox
                      value="Ville/village"
                      label="Ville/village"
                    ></v-checkbox>
                    <v-checkbox
                      value="Agglomération/Métropole"
                      label="Agglomération/Métropole"
                    ></v-checkbox>
                    <v-checkbox
                      value="Département"
                      label="Département"
                    ></v-checkbox>
                    <v-checkbox value="Région" label="Région"></v-checkbox>
                    <v-checkbox value="National" label="National"></v-checkbox>
                    <v-checkbox
                      value="International"
                      label="International"
                    ></v-checkbox>
                  </v-checkbox-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-list-subheader
                    >Comment avez-vous eu connaissance de l'appel à candidatures
                    ?</v-list-subheader
                  >
                  <v-checkbox-group
                    v-model="formData.discoveryMethod"
                    :rules="[rules.required]"
                    label=""
                  >
                    <v-checkbox
                      value="Bouche à oreilles (réseau personnel ou professionnel)"
                      label="Bouche à oreilles (réseau personnel ou professionnel)"
                    ></v-checkbox>
                    <v-checkbox
                      value="Contenu sur Facebook"
                      label="Contenu sur Facebook"
                    ></v-checkbox>
                    <v-checkbox
                      value="Contenu sur Linkedin"
                      label="Contenu sur Linkedin"
                    ></v-checkbox>
                    <v-checkbox
                      value="Contenu sur le web"
                      label="Contenu sur le web"
                    ></v-checkbox>
                    <v-checkbox
                      value="Information par un tiers (structure d'accompagnement, collectivité...)"
                      label="Information par un tiers (structure d'accompagnement, collectivité...)"
                    ></v-checkbox>
                    <v-checkbox
                      value="Presse/Radio"
                      label="Presse/Radio"
                    ></v-checkbox>
                  </v-checkbox-group>
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
            <v-card
              title="Structure juridique déjà existante (si c'est le cas)"
            >
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

      <template v-slot:item.2>
        <v-form ref="form2" v-model="valid" @submit.prevent="nextStep">
          <v-card title="Votre projet et son utilité sociale" flat>
            <v-card
              title="Expliquez la genèse de votre projet (environ 10 lignes)"
            >
              <v-textarea
                v-model="formData.projectDescription"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
            <v-card title="Résumez votre projet (10 lignes maximum)">
              <v-textarea
                v-model="formData.socialUtility"
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
                v-model="formData.difference"
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
                v-model="formData.socialUtility"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
            <v-card
              title="En quoi votre projet est-il différent et/ou complémentaire des solutions existantes sur le territoire considéré ?"
              subtitle="Pour en savoir plus sur l’innovation sociale : Grille de caractérisation de l'AVISE "
            >
              <v-textarea
                v-model="formData.socialUtility"
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
                v-model="formData.socialUtility"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
          </v-card>
        </v-form>
      </template>
      <template v-slot:item.3>
        <v-form ref="form3" v-model="valid" @submit.prevent="nextStep">
          <v-card title="Le modèle économique" flat>
            <v-card title="Le marché et le potentiel économique du projet">
              <v-card
                title="Quelles sont les sources de revenus envisagées pour votre projet ? Concrètement, qu’allez-vous vendre? Comment imaginez-vous assurer la viabilité économique du prohet sur le long terme ? "
              >
                <v-textarea
                  v-model="formData.projectDescription"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-card>
              <v-card
                title="Combien d’emplois pensez-vous créer sur les premières années d’activités ? Sur quels types de postes / missions ? "
              >
                <v-textarea
                  v-model="formData.projectDescription"
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
                  v-model="formData.projectDescription"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-card>
              <v-card
                title="Quels pourraient être les projets de diversification et de développement économique de l’activité à moyen/long terme ? "
              >
                <v-textarea
                  v-model="formData.projectDescription"
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
                  v-model="formData.projectDescription"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-card>
              <v-card
                title="Quels autres contacts ou partenariats recherchez-vous aujourd’hui ? "
              >
                <v-textarea
                  v-model="formData.projectDescription"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-card>
              <v-card
                title="Quel rôle voudriez-vous que jouent ces différents acteurs dans le projet à terme ? "
                subtitle="Ex: Structuration d’un collectif restreint sur la prise de décisions stratégiques pour le projet, ou au contraire souhait d’une gouvernance très large, impliquant plusieurs des acteurs précités. "
              >
                <v-textarea
                  v-model="formData.projectDescription"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-card>
            </v-card>
          </v-card>
        </v-form>
      </template>
      <template v-slot:item.4>
        <v-card title="Vous et votre équipe">
          <v-card title="Présentation de l’équipe">
            <v-card
              title="Présentez-vous succinctement "
              subtitle="(1 paragraphe par personne réellement impliquée dans le projet, max 8 lignes)
Parcours (formation, professionnel et bénévole), compétences et motivations, ainsi que ceux des membres de l’équipe, en mettant en évidence vos compétences et atouts pour mener à bien le projet (joindre les CV). "
            >
              <v-textarea
                v-model="formData.projectDescription"
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
                v-model="formData.referentRoleDuration"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card>
            <v-card
              title="Quelles sont selon vous les compétences manquantes dans l’équipe pour mener à bien ce projet ? Comment comptez-vous y pallier ?"
            >
              <v-textarea
                v-model="formData.projectDescription"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card>
            <v-card
              title="Qui suivra le parcours d’incubation ? Une ou plusieurs personnes ?"
            >
              <v-textarea
                v-model="formData.projectDescription"
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
              >Créez autant de tableaux que de porteurs de projets déclarés dans
              le dossier, posez-vous la question de votre rôle et de l’évolution
              de votre situation à plus ou moins long terme.
            </v-card-text>
            <v-btn @click="addPersonInfo">Ajouter un tableau</v-btn>
            <div
              v-for="(person, index) in formData.otherPeopleInfo"
              :key="index"
            >
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
                      <v-radio
                        value="actBen"
                        label="Activité bénévole"
                      ></v-radio>
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
                      <v-radio
                        value="actBen"
                        label="Activité bénévole"
                      ></v-radio>
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
                      <v-radio
                        value="actBen"
                        label="Activité bénévole"
                      ></v-radio>
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
                  Si vous êtes en activité, veuillez préciser le volume horaire
                  dédié à cette activité. Avez-vous des jours particuliers
                  d’indisponibilité ? Si oui lesquels ?
                </p>
                <v-textarea
                  v-model="person.profSituation"
                  :rules="[rules.required]"
                  label="Précisions sur vos missions:"
                ></v-textarea>
              </v-row>
              <v-row>
                <p>
                  Afin d’adapter au mieux l’accompagnement et de fixer avec vous
                  les objectifs temporels en termes de création, pouvez-vous
                  nous indiquer quels seront vos revenus durant la période
                  d’incubation ?
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
                  Quel volume horaire hebdomadaire pouvez-vous dédier au
                  parcours d’incubation incluant les rendez-vous Katapult, la
                  formalisation du projet et les temps de rencontre partenaires
                  afin de réaliser votre projet ?
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
            <v-card title="Pourquoi souhaitez-vous intégrer l’incubateur de l’ADRESS ? Quels sont vos besoins et vos attentes en termes d’accompagnement ? ">
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
        </v-card>
      </template>
      <template v-slot:item.5>
        <v-card title="Etat d’avancement du projet ">
          <v-card title="Avez-vous été ou êtes-vous accompagnés par ailleurs ? Si oui, par quel organisme et sur quels sujets ?">
            <v-textarea
                  v-model="formData.accompagnement"
                  :rules="[rules.required]"
                ></v-textarea>
          </v-card>
          <v-card title="Quelles sont les étapes déjà réalisées ? ">
            <v-row>
              <v-col cols="12" md="3">
              </v-col>
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
                <p>Diagnostic territorial, étude du besoin  social / environnemental</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="diagOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="diagNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="diagEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="diagPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <p>Constitution d’un collectif moteur</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="collOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="collNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="collEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="collPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <p>Expérimentation terrain - 1ers résultats</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="expOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="expNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="expEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="expPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <p>Etude de marché</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="etuOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="etuNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="etuEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="etuPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <p>Formalisation de l’offre</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="offrOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="offrNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="offrEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="offrPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <p>Premier chiffrage</p>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="chiffrOui"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="chiffrNon"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="2">
                <v-radio
                value="chiffrEncours"
                ></v-radio>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="chiffrPrec"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-card title="Quel est le premier risque que vous ayez pris à ce jour pour votre projet ? ">
            <v-textarea
                  v-model="formData.risques"
                  :rules="[rules.required]"
                ></v-textarea>
          </v-card>
          <v-card title="Quelle analyse faites-vous de votre projet à ce stade ?">
            <v-card>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card title="Forces" subtitle="Facteurs positifs d’origine interne (à hiérarchiser)">
                    <v-textarea
                      v-model="formData.forces"
                      :rules="[rules.required]"
                    ></v-textarea>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card title="Faiblesses" subtitle="Facteurs négatifs d’origine interne (à hiérarchiser)">
                    <v-textarea
                      v-model="formData.faiblesses"
                      :rules="[rules.required]"
                    ></v-textarea>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card title="Opportunités" subtitle="Facteurs positifs d’origine externe (à hiérarchiser)">
                    <v-textarea
                      v-model="formData.opportunites"
                      :rules="[rules.required]"
                    ></v-textarea>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card title="Menaces" subtitle="Facteurs négatifs d’origine externes (à hiérarchiser)">
                    <v-textarea
                      v-model="formData.menaces"
                      :rules="[rules.required]"
                    ></v-textarea>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card title="Comment palliez-vous vos faiblesses et contournez-vous les menaces ?">
              <v-textarea
                  v-model="formData.pallier"
                  :rules="[rules.required]"
                ></v-textarea>
            </v-card>
            <v-card title="A quelle échéance souhaitez-vous créer ? Pour ce faire, quel est votre plan d’action / calendrier prévisionnel ?">
              <v-textarea
                  v-model="formData.calendrier"
                  :rules="[rules.required]"
                ></v-textarea>
            </v-card>
          </v-card>
        </v-card>
      </template>
      <template v-slot:item.6>
        <v-card title="Engagement" flat>
          <v-form ref="form8" v-model="valid" @submit.prevent="submitForm">
            <v-radio-group v-model="formData.engagDepl" label="Êtes-vous prêts à vous déplacer en Normandie pour suivre les formations collectives, des événementiels pour présenter votre projet, favoriser la mise en réseau, le développement de votre projet ?">
                <v-radio value="non" label="Non"></v-radio>
                <v-radio value="oui" label="Oui"></v-radio>
              </v-radio-group>
              <v-radio-group v-model="formData.engagCom" label="Afin de favoriser le développement du projet, des présentations du projet et des mises en relation auront lieu, êtes-vous prêt à communiquer sur votre projet ? ">
                <v-radio value="non" label="Non"></v-radio>
                <v-radio value="oui" label="Oui"></v-radio>
              </v-radio-group>
              <v-radio-group v-model="formData.engagIntens" label="Le parcours d’incubation proposé est un accompagnement intensif et renforcé ayant pour objectif de développer la création d’entreprises sociales innovantes, viables et pérennes. Avez-vous bien pris connaissance de l’offre et êtes-vous prêt à vous engager dans un parcours intensif d’un an ? ">
                <v-radio value="non" label="Non"></v-radio>
                <v-radio value="oui" label="Oui"></v-radio>
              </v-radio-group>
          </v-form>
        </v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const step = ref(1);
const valid = ref(false);
const errors = ref([]);

const formData = ref({
  projectName: "",
  siretNbrRsp: "",
  siretNbr: "",
  sector: "",
  location: "",
  geographicZone: [],
  discoveryMethod: [],
  referentLastName: "",
  referentFirstName: "",
  referentBirthdate: "",
  referentAddress: "",
  referentEmail: "",
  referentPhone: "",
  otherPeople: [],
  otherPeopleInfo: [],
  legalStructureExist: "",
  legalStructureName: "",
  legalStructureStatus: "",
  legalStructureOther: "",
  referentRoleExist: "",
  referentRole: "",
  referentRoleDuration: "",
  step2Field: "",
  step3Field: "",
  step4Field: "",
  step5Field: "",
  step6Field: "",
  step7Field: "",
  step8Field: "",
  expEntre: "",
});

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
};

const stepItems = [
  "Étape 1",
  "Étape 2",
  "Étape 3",
  "Étape 4",
  "Étape 5",
  "Étape finale",
];

const nextStep = () => {
  const form =
    step.value === 1
      ? form1
      : step.value === 2
      ? form2
      : step.value === 3
      ? form3
      : step.value === 4
      ? form4
      : step.value === 5
      ? form5
      : step.value === 6
      ? form6
      : step.value === 7
      ? form7
      : form8;
  if (form.value.validate()) {
    step.value++;
  }
};

const prevStep = () => {
  step.value--;
};

const saveStep = (stepNumber) => {
  const form =
    stepNumber === 1
      ? form1
      : stepNumber === 2
      ? form2
      : stepNumber === 3
      ? form3
      : stepNumber === 4
      ? form4
      : stepNumber === 5
      ? form5
      : stepNumber === 6
      ? form6
      : stepNumber === 7
      ? form7
      : form8;
  if (form.value.validate()) {
    console.log("Form data:", JSON.stringify(formData.value));
  }
};

const submitForm = () => {
  errors.value = [];
  const form1Valid = form1.value.validate();
  const form2Valid = form2.value.validate();
  const form3Valid = form3.value.validate();
  const form4Valid = form4.value.validate();
  const form5Valid = form5.value.validate();
  const form6Valid = form6.value.validate();
  const form7Valid = form7.value.validate();
  const form8Valid = form8.value.validate();

  if (
    form1Valid &&
    form2Valid &&
    form3Valid &&
    form4Valid &&
    form5Valid &&
    form6Valid &&
    form7Valid &&
    form8Valid
  ) {
    console.log("Form submitted:", JSON.stringify(formData.value));
  } else {
    if (!form1Valid) errors.value.push("Étape 1 est incomplète.");
    if (!form2Valid) errors.value.push("Étape 2 est incomplète.");
    if (!form3Valid) errors.value.push("Étape 3 est incomplète.");
    if (!form4Valid) errors.value.push("Étape 4 est incomplète.");
    if (!form5Valid) errors.value.push("Étape 5 est incomplète.");
    if (!form6Valid) errors.value.push("Étape 6 est incomplète.");
    if (!form7Valid) errors.value.push("Étape 7 est incomplète.");
    if (!form8Valid) errors.value.push("Étape finale est incomplète.");
  }
};

const goToStep = (stepNumber) => {
  if (
    stepNumber <= step.value ||
    (stepNumber > step.value && isComplete(stepNumber - 1))
  ) {
    step.value = stepNumber;
  }
};

const isComplete = (stepNumber) => {
  const form =
    stepNumber === 1
      ? form1
      : stepNumber === 2
      ? form2
      : stepNumber === 3
      ? form3
      : stepNumber === 4
      ? form4
      : stepNumber === 5
      ? form5
      : stepNumber === 6
      ? form6
      : stepNumber === 7
      ? form7
      : form8;
  return form && form.value && form.value.validate();
};

const form1 = ref(null);
const form2 = ref(null);
const form3 = ref(null);
const form4 = ref(null);
const form5 = ref(null);
const form6 = ref(null);
const form7 = ref(null);
const form8 = ref(null);

const addPerson = () => {
  formData.value.otherPeople.push({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
};
const addPersonInfo = () => {
  formData.value.otherPeopleInfo.push({
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
</script>

<style scoped></style>
