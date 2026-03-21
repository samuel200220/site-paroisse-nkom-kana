export type ProgrammeEntry = {
  jour: string;
  heure: string;
  activite: string;
  lieu: string;
};

export const PROGRAMME_2026: ProgrammeEntry[] = [
  {
    jour: 'Vendredi',
    heure: '20/03/2026',
    activite: '',
    lieu: 'Chemin de Croix',
  },
  {
    jour: 'Samedi',
    heure: '21/03/2026',
    activite: '',
    lieu: '17:00 Repetitions du Troisieme Scrutin',
  },
  {
    jour: 'Dimanche',
    heure: '22/03/2026',
    activite: '5e DIMANCHE DE CAREME A',
    lieu: '11:30 Troisieme scrutin\nGroupes liturgiques : Depot de tous les programmes de Paques.',
  },
  {
    jour: 'Mardi',
    heure: '24/03/2026',
    activite: '',
    lieu: '17:30 CEV S. Jean Baptiste : Rencontre mensuelle',
  },
  {
    jour: 'Mercredi',
    heure: '25/03/2026',
    activite: '(SOL) ANNONCIATION',
    lieu: '17:00 Soiree paroissiale de la Charite fraternelle : "Tous invites"',
  },
  {
    jour: 'Jeudi',
    heure: '26/03/2026',
    activite: '',
    lieu: 'Journee sacerdotale & Messe chrismale',
  },
  {
    jour: 'Vendredi',
    heure: '27/03/2026',
    activite: '',
    lieu: 'Chemin de Croix',
  },
  {
    jour: 'Samedi',
    heure: '28/03/2026',
    activite: '',
    lieu: '17:00 Fin de l\'enregistrement aux Sacrements',
  },
  {
    jour: 'Dimanche',
    heure: '29/03/2026',
    activite: 'DIMANCHE DES RAMEAUX ET DE LA PASSION DU SEIGNEUR - ANNEE A',
    lieu: '06:00 Messe en anglais\n08:00 Messe en ewondo\n10:00 Messe en francais',
  },
  {
    jour: 'Lundi',
    heure: '30/03/2026',
    activite: 'Lundi Saint',
    lieu: '08:00 Retraite candidats retenus aux sacrements\n18:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Mardi',
    heure: '31/03/2026',
    activite: 'Mardi Saint',
    lieu: '06:15 Messe du Matin + Confessions\n09:00 Visite aux malades\n08:00 Retraite de tous les candidats retenus aux sacrements\n17:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Mercredi',
    heure: '01/04/2026',
    activite: 'Mercredi Saint',
    lieu: '06:15 Messe du Matin + Confessions\n08:00 Retraite candidats retenus aux sacrements\n17:00 Catechese preparatoire au bapteme des petits enfants',
  },
  {
    jour: 'Jeudi',
    heure: '02/04/2026',
    activite: 'JEUDI SAINT : CENE DU SEIGNEUR',
    lieu: '06:30 Confessions (pas de messe le matin)\n09:00 Visite aux malades dans les CEV\n16:00 Dames Apostoliques : Repas au Clerge\n17:00 Repetitions preparatoires au bapteme des petits enfants\n18:00 Messe de la Cene & Adoration communautaire',
  },
  {
    jour: 'Vendredi',
    heure: '03/04/2026',
    activite: 'VENDREDI SAINT : CELEBRATION DE LA PASSION ET DE LA MORT DU SEIGNEUR',
    lieu: '07:00 Chemin de Croix communautaire\n08:00 Confession des fideles (Sacrement de reconciliation)\n15:00 Celebration de la Passion',
  },
  {
    jour: 'Samedi',
    heure: '04/04/2026',
    activite: 'SAMEDI SAINT',
    lieu: '07:00 Confessions des Premiers Communiants\n07:00 Proprete de la concession paroissiale ; preparation du feu ; decoration de l\'eglise\n14:00 Activite de la Caritas paroissiale dans les CEV\n17:00 Elig Essomballa : Reunion de Secteur\n20:00 Messe de la Vigile Pascale ; Sacrements des Catechumenes',
  },
  {
    jour: 'Dimanche',
    heure: '05/04/2026',
    activite: 'DIMANCHE DE PAQUES : RESURRECTION DU SEIGNEUR',
    lieu: '05:45 Dames Apostoliques : Reveil pascal du Clerge\nDepot de l\'Effort de Careme a toutes les messes\nOffrandes : tous les fideles a toutes les messes\n11:30 Bapteme des petits enfants & 1ere Communion',
  },
];

export type ProgrammeSortDirection = 'desc' | 'asc';

export function parseProgrammeDate(dateString: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateString.trim());

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  if (
    parsedDate.getUTCFullYear() !== Number(year) ||
    parsedDate.getUTCMonth() !== Number(month) - 1 ||
    parsedDate.getUTCDate() !== Number(day)
  ) {
    return null;
  }

  return parsedDate.getTime();
}

export function sortProgrammeEntries<T extends ProgrammeEntry>(entries: T[], direction: ProgrammeSortDirection = 'asc') {
  return entries
    .map((entry, index) => ({ entry, index, timestamp: parseProgrammeDate(entry.heure) }))
    .sort((left, right) => {
      if (left.timestamp === null && right.timestamp === null) {
        return left.index - right.index;
      }

      if (left.timestamp === null) {
        return 1;
      }

      if (right.timestamp === null) {
        return -1;
      }

      return direction === 'desc'
        ? right.timestamp - left.timestamp
        : left.timestamp - right.timestamp;
    })
    .map(({ entry }) => entry);
}