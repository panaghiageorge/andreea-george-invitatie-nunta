# 🎨 Invitația de Nuntă - Ghid de Personalizare

## Urmeaza acesti pasi pentru a personaliza invitația:

### 1. **Povestea Voastră (Love Story)**
Actualizeaza `src/content.ts` - `loveStory`:

```typescript
loveStory: {
    title: "Povestea noastră",
    events: [
        {
            year: 2020,
            title: "Întâlnire",
            description: "Ne-am întâlnit la..." // ACTUALIZEAZA CU POVESTA VOASTRA
        },
        {
            year: 2022,
            title: "Aventuri",
            description: "Am petrecut momente frumoase..."
        },
        {
            year: 2024,
            title: "Propunere",
            description: "Momentul magic când George a cerut..."
        }
    ]
}
```

### 2. **Galerie Foto**
Inlocuieste link-urile din `gallery`:

```typescript
gallery: [
    {
        id: 1,
        src: "INLOCUIESTE_CU_LINK_FOTO_TA",  // ← ADAUGA FOTO
        alt: "Andreea & George",
        category: "couple"
    },
    // ... mai multe poze
]
```

**Unde gasesti poze:**
- Google Photos (https://photos.google.com)
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Poze personale (upload pe Imgur sau similar)

### 3. **Regalo/Registry**
Deja este pregatit cu 3 optiuni default. Poti personaliza textele:

```typescript
registry: {
    title: "Regalo",
    description: "Personalizeaza aceasta descriere...",
    options: [
        {
            title: "Cadou în bani",
            description: "Personalizeaza descrierea..."
        },
        // ... alte optiuni
    ]
}
```

---

## 📝 Modificari Importante Facute:

✅ **Gallery** - Galerie foto cu lightbox modal
✅ **Love Story** - Timeline cu povestea voastra
✅ **Interactive Map** - Harta cu locatiile (Leaflet.js)
✅ **Registry** - Sectiune cu optiuni de regalo
✅ **Navbar** - Linksuri actualizate la noile sectiuni
✅ **Animatii** - Framer Motion pe toate componentele

---

## 🚀 Cum sa deploiezi:

```bash
# 1. Actualizeaza content.ts cu datele tale
# 2. Ruleaza build
npm run build

# 3. Comit si push
git add .
git commit -m "Adauga galerie, povestea, si regalo"
git push origin dev

# Site-ul se va redeployar automat!
```

---

## 💡 Sfaturi Extra:

1. **Pentru Poze** - Foloseste poze de calitate inalta (min. 800x600)
2. **Pentru Povestea** - Scrie momente marcante din relatia voastra
3. **Pentru Regalo** - Poti adauga link Wishlist daca e cazul
4. **Testare** - Dupa deploy, verifica pe mobil (responsive!)

---

Daca ai orice intrebari, contacteaza echipa de dezvoltare! 💒✨
