export type ProgrammeEntry = {
  jour: string;
  heure: string;
  activite: string;
  lieu: string;
};

export const PROGRAMME_2026: ProgrammeEntry[] = [
  {
    jour: 'Vendredi',
    heure: 'V 20',
    activite: '',
    lieu: 'Chemin de Croix',
  },
  {
    jour: 'Samedi',
    heure: 'S 21',
    activite: '',
    lieu: '17:00 Repetitions du Troisieme Scrutin',
  },
  {
    jour: 'Dimanche',
    heure: 'D 22',
    activite: '5e DIMANCHE DE CAREME A',
    lieu: '11:30 Troisieme scrutin\nGroupes liturgiques : Depot de tous les programmes de Paques.',
  },
  {
    jour: 'Mardi',
    heure: 'M 24',
    activite: '',
    lieu: '17:30 CEV S. Jean Baptiste : Rencontre mensuelle',
  },
  {
    jour: 'Mercredi',
    heure: 'M 25',
    activite: '(SOL) ANNONCIATION',
    lieu: '17:00 Soiree paroissiale de la Charite fraternelle : "Tous invites"',
  },
  {
    jour: 'Jeudi',
    heure: 'J 26',
    activite: '',
    lieu: 'Journee sacerdotale & Messe chrismale',
  },
  {
    jour: 'Vendredi',
    heure: 'V 27',
    activite: '',
    lieu: 'Chemin de Croix',
  },
  {
    jour: 'Samedi',
    heure: 'S 28',
    activite: '',
    lieu: '17:00 Fin de l\'enregistrement aux Sacrements',
  },
  {
    jour: 'Dimanche',
    heure: 'D 29',
    activite: 'DIMANCHE DES RAMEAUX ET DE LA PASSION DU SEIGNEUR - ANNEE A',
    lieu: '06:00 Messe en anglais\n08:00 Messe en ewondo\n10:00 Messe en francais',
  },
  {
    jour: 'Lundi',
    heure: 'L 30',
    activite: 'Lundi Saint',
    lieu: '08:00 Retraite candidats retenus aux sacrements\n18:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Mardi',
    heure: 'M 31',
    activite: 'Mardi Saint',
    lieu: '06:15 Messe du Matin + Confessions\n09:00 Visite aux malades\n08:00 Retraite de tous les candidats retenus aux sacrements\n17:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Mercredi',
    heure: 'M 01',
    activite: 'Mercredi Saint',
    lieu: '06:15 Messe du Matin + Confessions\n08:00 Retraite candidats retenus aux sacrements\n17:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Jeudi',
    heure: 'J 02',
    activite: 'JEUDI SAINT : CENE DU SEIGNEUR',
    lieu: '06:30 Confessions (pas de messe le matin)\n09:00 Visite aux malades dans les CEV\n16:00 Dames Apostoliques : Repas au Clerge\n17:00 Repetitions preparatoires au bapteme des petits enfants\n18:00 Messe de la Cene & Adoration communautaire',
  },
  {
    jour: 'Vendredi',
    heure: 'V 03',
    activite: 'VENDREDI SAINT : CELEBRATION DE LA PASSION ET DE LA MORT DU SEIGNEUR',
    lieu: '07:00 Chemin de Croix communautaire\n08:00 Confession des fideles (Sacrement de reconciliation)\n15:00 Celebration de la Passion',
  },
  {
    jour: 'Samedi',
    heure: 'S 04',
    activite: 'SAMEDI SAINT',
    lieu: '07:00 Confessions des Premiers Communiants\n07:00 Proprete de la concession paroissiale ; preparation du feu ; decoration de l\'eglise\n14:00 Activite de la Caritas paroissiale dans les CEV\n17:00 Elig Essomballa : Reunion de Secteur\n20:00 Messe de la Vigile Pascale ; Sacrements des Catechumenes',
  },
  {
    jour: 'Dimanche',
    heure: 'D 05',
    activite: 'DIMANCHE DE PAQUES : RESURRECTION DU SEIGNEUR',
    lieu: '05:45 Dames Apostoliques : Reveil pascal du Clerge\nDepot de l\'Effort de Careme a toutes les messes\nOffrandes : tous les fideles a toutes les messes\n11:30 Bapteme des petits enfants & 1ere Communion',
  },
];

const programmeOrder = PROGRAMME_2026.map((entry) => `${entry.jour}-${entry.heure}`);

export function sortProgrammeEntries<T extends ProgrammeEntry>(entries: T[]) {
  return [...entries].sort((left, right) => {
    const leftIndex = programmeOrder.indexOf(`${left.jour}-${left.heure}`);
    const rightIndex = programmeOrder.indexOf(`${right.jour}-${right.heure}`);

    if (leftIndex === -1 && rightIndex === -1) {
      return `${left.jour}-${left.heure}`.localeCompare(`${right.jour}-${right.heure}`, 'fr');
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}
