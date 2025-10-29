# Pour lancer le serveur, utilisez `npm start`.

# Démarrage avec Create React App

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

## Aperçu du Projet

Ceci est une application de gestion de livres construite avec React et TypeScript. Elle permet aux utilisateurs de :
*   Ajouter de nouveaux livres avec des détails tels que le nom, l'auteur, le thème et l'image de couverture.
*   Afficher une liste de tous les livres.
*   Modifier les détails des livres existants.
*   Supprimer des livres.
*   Marquer les livres comme lus ou non lus.
*   Marquer les livres comme favoris.
*   Rechercher des livres par titre ou par auteur.
*   Filtrer les livres par statut de lecture (tous, lus, non lus) et par statut de favori (tous, favoris, non favoris).
*   Trier les livres par ID, titre, auteur, thème ou note.
*   Afficher des informations détaillées pour chaque livre, y compris les notes.

## Technologies Utilisées

*   **Frontend:** React, TypeScript
*   **Outil de construction:** Craco (Create React App Configuration Override)
*   **Style:** CSS
*   **Interaction API:** Axios (ou similaire, basé sur `src/api.ts`)

## Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l'application en mode développement.
Ouvrez [http://localhost:8082](http://localhost:8082) pour la visualiser dans votre navigateur.

La page se rechargera lorsque vous apporterez des modifications.
Vous pouvez également voir les erreurs de lint dans la console.

### `npm test`

Lance l'exécuteur de tests en mode interactif.
Consultez la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

### `npm run build`

Construit l'application pour la production dans le dossier `build`.
Elle regroupe correctement React en mode production et optimise la construction pour les meilleures performances.

La construction est minifiée et les noms de fichiers incluent les hachages.
Votre application est prête à être déployée !

Consultez la section sur le [déploiement](https://facebook.com/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

**Attention : cette opération est irréversible. Une fois que vous avez `eject`, vous ne pouvez plus revenir en arrière !**

Si vous n'êtes pas satisfait des outils de construction et des choix de configuration, vous pouvez `eject` à tout moment. Cette commande supprimera la dépendance de construction unique de votre projet.

Au lieu de cela, elle copiera tous les fichiers de configuration et les dépendances transitives (webpack, Babel, ESLint, etc.) directement dans votre projet afin que vous ayez un contrôle total sur eux. Toutes les commandes, à l'exception de `eject`, fonctionneront toujours, mais elles pointeront vers les scripts copiés afin que vous puissiez les modifier. À ce stade, vous êtes autonome.

Vous n'êtes pas obligé d'utiliser `eject`. L'ensemble des fonctionnalités sélectionnées convient aux déploiements de petite et moyenne taille, et vous ne devriez pas vous sentir obligé d'utiliser cette fonctionnalité. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous êtes prêt.

## En savoir plus

Vous pouvez en apprendre davantage dans la [documentation de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation de React](https://reactjs.org/).

### Division du code

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyse de la taille du bundle

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Création d'une application web progressive

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuration avancée

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Déploiement

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` échoue à minifier

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)