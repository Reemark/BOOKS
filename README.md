# Application de Gestion de Livres

**Important :** L'API pour les livres doit être lancée sur `http://localhost:3000`.

Ceci est une application de gestion de livres construite avec React et TypeScript.

## Fonctionnalités

L'application offre les fonctionnalités suivantes :

*   **Ajouter et Modifier des Livres :** Vous pouvez ajouter de nouveaux livres avec des détails tels que le nom, l'auteur, le thème et une image de couverture. Vous pouvez également modifier les informations des livres existants.
*   **Liste de Livres :** Affichez une liste de tous vos livres. Chaque livre peut être marqué comme "lu" ou "non lu" et comme "favori".
*   **Détails du Livre :** Cliquez sur un livre pour voir ses détails, y compris sa note.
*   **Recherche et Filtres :** Recherchez des livres par titre ou par auteur. Filtrez votre collection par statut de lecture (tous, lus, non lus) et par statut de favori (tous, favoris, non favoris).
*   **Tri :** Triez vos livres par ID, titre, auteur, thème ou note.
*   **Tableau de Bord des Statistiques :** Visualisez des statistiques sur votre collection de livres.
*   **Thèmes :** Changez l'apparence de l'application en basculant entre les thèmes clair et sombre.
*   **Mode Hors Ligne :** L'application utilise le stockage local de votre navigateur pour sauvegarder vos données, vous permettant de l'utiliser même sans connexion Internet.

## Pour commencer

Pour lancer le serveur, utilisez la commande suivante :

```bash
npm start
```

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

Consultez la section sur le [déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

**Attention : cette opération est irréversible. Une fois que vous avez `eject`, vous ne pouvez plus revenir en arrière !**

Si vous n'êtes pas satisfait des outils de construction et des choix de configuration, vous pouvez `eject` à tout moment. Cette commande supprimera la dépendance de construction unique de votre projet.

Au lieu de cela, elle copiera tous les fichiers de configuration et les dépendances transitives (webpack, Babel, ESLint, etc.) directement dans votre projet afin que vous ayez un contrôle total sur eux. Toutes les commandes, à l'exception de `eject`, fonctionneront toujours, mais elles pointeront vers les scripts copiés afin que vous puissiez les modifier. À ce stade, vous êtes autonome.

Vous n'êtes pas obligé d'utiliser `eject`. L'ensemble des fonctionnalités sélectionnées convient aux déploiements de petite et moyenne taille, et vous ne devriez pas vous sentir obligé d'utiliser cette fonctionnalité. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous êtes prêt.

## En savoir plus

Vous pouvez en apprendre davantage dans la [documentation de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation de React](https://reactjs.org/).