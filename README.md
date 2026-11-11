# carte-viste-web-nfc

Carte de visite numérique responsive de Gabriel Endam’Engone.
Interface React construite avec Vite, avec Motion pour les micro-interactions.

## Démarrer en local

```sh
npm install
npm run dev
```

## Construire pour la mise en ligne

```sh
npm run build
npm run preview
```

Le site statique prêt à publier est généré dans `dist/`.

## Personnaliser la carte

- `src/App.jsx` contient l’objet `PROFILE` pour le nom, le téléphone, l’e-mail, WhatsApp, les réseaux, le portfolio et la photo.
- `src/styles.css` contient les thèmes Élan, la mise en page responsive et les états interactifs.
- `public/img/gabriel-polo-nuit.webp` est le portrait optimisé affiché dans la carte.
- `public/img/gabriel-polo-nuit.png` sert aux aperçus Open Graph et Twitter.
- `public/img/favicon.svg` reprend le symbole Élan.
- Les métadonnées SEO statiques se trouvent dans `index.html`. Adapter l’URL canonique et les URL de partage si la carte est publiée à une autre adresse.
