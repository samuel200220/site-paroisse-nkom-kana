# Resume du projet `nkom-kana`

## Vue d'ensemble

`nkom-kana` est une application web Next.js 16 construite avec l'App Router. Le projet sert de site vitrine et de mini back-office pour une eglise locale nommee "Eglise Nkom Kana".

Le site se divise en deux espaces :

- un espace public pour consulter les annonces, chorales, organisations, programme hebdomadaire et localisation ;
- un espace d'administration pour creer, modifier et supprimer ces contenus.

Le projet combine :

- `Next.js 16.1.6`
- `React 19.2.3`
- `TypeScript`
- `Tailwind CSS 4`
- `Prisma 7` avec PostgreSQL
- `react-leaflet` et `leaflet` pour la carte
- `next-themes` pour le mode clair/sombre
- `lucide-react` pour les icones

## Etat actuel du depot

- Le depot contient `34` fichiers suivis dans `src`, `prisma` et `public`.
- Le `README.md` est encore le README par defaut de `create-next-app` et ne documente pas le projet reel.
- Le workspace Git est deja modifie sur plusieurs fichiers avant la generation de ce document ; ce resume decrit l'etat courant du code present dans le depot, sans supposer qu'il est propre ou finalise.

## Structure principale

### Racine

- `package.json` : scripts et dependances.
- `next.config.ts` : configuration Next.js.
- `tsconfig.json` : configuration TypeScript.
- `postcss.config.mjs` : branchement PostCSS/Tailwind.
- `eslint.config.mjs` : configuration ESLint.
- `prisma.config.ts` : configuration Prisma.
- `.env` et `.env.production` : variables d'environnement presentes.

### Base de donnees

- `prisma/schema.prisma` : schema des modeles.
- `prisma/migrations/20260310125243_init/migration.sql` : migration initiale.

### Application

- `src/app` : pages App Router, layouts et routes API.
- `src/components` : composants reutilisables UI et admin.
- `src/lib/prisma.ts` : client Prisma partage.
- `public` : SVG par defaut, presque pas exploites par le produit.

## Modele de donnees

Le schema Prisma contient 4 modeles :

### `Annonce`

- `id`
- `titre`
- `description`
- `date`
- `auteur`
- `createdAt`

Usage :

- alimente la page publique des annonces ;
- alimente la gestion admin des annonces.

### `Organisation`

- `id`
- `nom`
- `description`
- `responsable`
- `activites`

Usage :

- page publique "Organisations" ;
- CRUD admin des groupes/mouvements.

### `Chorale`

- `id`
- `nom`
- `responsable`
- `horaireRepetition`
- `chants` (`String[]`)

Usage :

- page publique des chorales ;
- gestion admin des chorales ;
- particularite : les chants sont stockes comme tableau de chaines en base et saisis cote admin via un textarea "une ligne = un chant".

### `Programme`

- `id`
- `jour`
- `heure`
- `activite`
- `lieu`

Usage :

- page publique du programme hebdomadaire ;
- CRUD admin du programme.

## Architecture applicative

### Layout global

Le layout racine :

- charge les polices `Geist` et `Geist_Mono` ;
- applique `Navbar`, `Footer` et `Providers` a toute l'application ;
- active le mode sombre avec `next-themes` ;
- positionne un `main` avec un `padding-top` pour compenser la navbar fixe.

### Theme et styles

- `src/app/globals.css` utilise Tailwind CSS 4 avec la variante `dark`.
- Les couleurs dominantes sont `stone` et `amber`.
- Le design vise une direction visuelle moderne et ecclesiale, avec hero plein ecran, cartes, gros rayons arrondis et effets de survol.

### Couche d'acces aux donnees

`src/lib/prisma.ts` :

- instancie `PrismaClient` avec l'adaptateur `@prisma/adapter-pg` ;
- lit `DATABASE_URL` ;
- reutilise une instance globale en developpement pour eviter les connexions multiples.

Important :

- le `datasource db` du schema Prisma declare seulement `provider = "postgresql"` ;
- la connexion est fournie via l'adaptateur dans le code, pas explicitement dans `schema.prisma`.

## Parcours des pages publiques

### `/`

La page d'accueil est essentiellement marketing / institutionnelle.

Elle contient :

- une hero section avec image de fond distante Unsplash ;
- un apercu "Annonces recentes" base sur des donnees statiques fictives ;
- un bloc "Celebrations & Activites" egalement statique ;
- un appel a l'action vers la page de localisation.

Observation :

- la home n'est pas reliee aux donnees Prisma ; elle montre des exemples statiques, contrairement aux pages detaillees qui consomment les API.

### `/annonces`

Page cliente qui :

- appelle `GET /api/annonces` au chargement ;
- stocke la liste en etat local ;
- permet une recherche simple par titre ;
- affiche chaque annonce sous forme de carte.

Observation :

- les liens pointent vers `/annonces/[id]`, mais aucune route detaillee de ce type n'existe dans le depot.
- consequence : le bouton "Lire la suite" mene vers une page non implemente.

### `/chorales`

Page cliente qui :

- appelle `GET /api/chorales` ;
- affiche le responsable, l'horaire de repetition et la liste des chants ;
- gere proprement le cas "aucun chant".

### `/organisations`

Page cliente qui :

- appelle `GET /api/organisations` ;
- presente chaque groupe avec description, responsable et activites.

### `/programme`

Page cliente qui :

- appelle `GET /api/programme` ;
- repartit l'affichage par jours fixes de la semaine ;
- filtre localement les activites par jour.

Observation :

- les jours sont compares sous forme de chaines francaises exactes (`Lundi`, `Mardi`, etc.) ;
- il n'y a pas de normalisation ni de validation visible cote UI.

### `/localisation`

Page cliente qui :

- charge dynamiquement le composant carte (`ssr: false`) ;
- affiche des informations de contact statiques ;
- integre une carte Leaflet centree sur des coordonnees proches de Yaounde/Nkom Kana.

Observation :

- l'adresse, l'email et les horaires sont codés en dur ;
- la carte utilise les tuiles OpenStreetMap et un marqueur avec icones chargees depuis `unpkg`.

## Espace d'administration

### `/admin/login`

Page de connexion purement front-end.

Comportement reel :

- identifiant attendu : `admin`
- mot de passe attendu : `eglise2026`
- si les valeurs correspondent, redirection vers `/admin`

Important :

- il n'y a aucune authentification serveur ;
- aucun cookie, token, session ou middleware ;
- les identifiants sont codés en dur dans le code client ;
- cette page est une demonstration, pas une securisation effective.

### `/admin`

Dashboard d'administration avec :

- cartes statistiques statiques ;
- activites recentes statiques ;
- lien vers le site public.

Observation :

- les chiffres affiches ne viennent pas de la base de donnees ;
- certaines classes Tailwind sont construites dynamiquement a partir d'une chaine (`shadow-${...}`), ce qui peut ne pas etre detecte par le moteur de classes et donc ne pas produire le style attendu.

### `/admin/annonces`

Fonctionnalites :

- lecture via `GET /api/annonces`
- creation via `POST /api/annonces`
- edition via `PUT /api/annonces`
- suppression via `DELETE /api/annonces?id=...`

Remarque importante :

- le front admin utilise bien `PUT` et `DELETE`, mais la route API `src/app/api/annonces/route.ts` ne definit dans l'etat actuel que `GET` et `POST`.
- resultat probable : les modifications et suppressions d'annonces ne fonctionneront pas.

### `/admin/chorales`

Fonctionnalites :

- lecture, creation, edition, suppression completes ;
- conversion textarea -> tableau `chants`.

Etat :

- coherent avec l'API ;
- CRUD globalement complet.

### `/admin/organisations`

Fonctionnalites :

- CRUD complet en modal ;
- consommation des endpoints REST correspondants.

### `/admin/programme`

Fonctionnalites :

- CRUD complet ;
- affichage groupe par jour ;
- formulaire avec `select` des jours et `input type="time"`.

## Routes API

Toutes les routes API sont dans `src/app/api/*/route.ts`.

### `/api/annonces`

Implemente :

- `GET`
- `POST`

Absents :

- `PUT`
- `DELETE`

Impact :

- le back-office annonces ne peut pas etre completement operationnel.

### `/api/chorales`

Implemente :

- `GET`
- `POST`
- `PUT`
- `DELETE`

Particularites :

- gestion d'erreurs plus explicite que sur d'autres routes ;
- log console sur erreur de lecture.

### `/api/organisations`

Implemente :

- `GET`
- `POST`
- `PUT`
- `DELETE`

### `/api/programme`

Implemente :

- `GET`
- `POST`
- `PUT`
- `DELETE`

## Composants reutilisables

### `Navbar`

- navigation principale publique ;
- gestion responsive ;
- toggle theme clair/sombre ;
- bouton langue present mais purement visuel.

Observation :

- le bouton de langue n'active aucune internationalisation.

### `Footer`

- branding, contact, reseaux sociaux ;
- contenu entierement statique.

Observation :

- plusieurs valeurs semblent demonstratives ou incoherentes avec le contexte local, par exemple l'email en domaine `.fr` sur un fichier et sans `.fr` sur un autre.

### `Map`

- encapsule `react-leaflet` ;
- centre la carte sur `[3.8667, 11.5167]` ;
- ajoute un `Marker` et un `Popup`.

### `Providers`

- encapsule `ThemeProvider`.

### `AdminSidebar`

- navigation admin responsive ;
- surlignage de la route courante ;
- bouton de deconnexion present mais sans logique associee.

## Flux de donnees

Le flux est simple et direct :

1. Les pages clientes publiques ou admin appellent `fetch('/api/...')`.
2. Les routes API Next.js utilisent `prisma` pour interroger PostgreSQL.
3. Les resultats JSON sont renvoyes au front.
4. Les composants stockent les donnees dans `useState`.
5. Apres creation/modification/suppression, les pages admin relancent un fetch complet.

Caracteristiques de ce flux :

- pas de Server Components data-driven pour ces ecrans metier ;
- pas de cache explicite, pas de React Query, pas de SWR ;
- peu de validation ;
- peu de feedback d'erreur cote utilisateur.

## Qualites du projet

- Structure simple et lisible.
- Separation correcte entre UI publique, UI admin, API et acces Prisma.
- Design deja travaille visuellement.
- Les modeles de donnees collent bien au domaine fonctionnel cible.
- Les CRUD `chorales`, `organisations` et `programme` sont globalement coherents de bout en bout.

## Limites et points d'attention

### 1. Securite quasi inexistante

- Les routes admin ne sont pas protegees.
- Les routes API ne sont pas protegees.
- La page de login est une simulation front-end.
- Des identifiants sont exposes en clair dans le code client.

### 2. Incoherence fonctionnelle sur les annonces

- L'UI admin suppose `PUT` et `DELETE`.
- L'API annonces ne les implemente pas.

### 3. Contenu public partiellement statique

- La page d'accueil n'est pas branchee sur les vraies donnees.
- Le dashboard admin est statique.
- Les infos de localisation/contact sont statiques.

### 4. Routes detaillees manquantes

- Les liens vers `/annonces/[id]` existent dans l'UI.
- La route detaillee n'existe pas dans le projet.

### 5. Validation et robustesse limitees

- usage frequent de `any[]` dans les composants ;
- validation faible des donnees entrantes ;
- erreurs souvent masquees par un simple arret du loader ;
- aucun schema de validation type Zod.

### 6. Documentation absente

- le README ne documente ni l'installation reelle, ni Prisma, ni les variables d'environnement, ni le fonctionnement admin.

## Configuration et execution probables

D'apres `package.json`, le cycle attendu est :

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`

Notes :

- `postinstall` execute `prisma generate` ;
- `build` execute aussi `prisma generate && next build` ;
- le projet depend d'une variable `DATABASE_URL` valide.

## Resume fonctionnel court

Le projet est une base de site paroissial moderne, visuellement avancee, avec un back-office simple pilote par Prisma/PostgreSQL. La partie la plus aboutie est la gestion CRUD de trois entites (`Chorale`, `Organisation`, `Programme`). La partie la plus fragile est la securite globale, suivie de l'incoherence du module `Annonces` et du caractere encore demonstratif de plusieurs ecrans.

## Priorites de travail recommandees

Si le projet doit passer d'une demo a une application exploitable, l'ordre logique serait :

1. proteger l'administration et les routes API ;
2. corriger `PUT`/`DELETE` sur `/api/annonces` ;
3. creer la page detail d'annonce ;
4. brancher la home et le dashboard sur les vraies donnees ;
5. ajouter validation, gestion d'erreurs et typage strict ;
6. remplacer le README generique par une vraie documentation projet.

