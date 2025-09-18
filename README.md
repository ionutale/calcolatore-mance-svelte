# Calcolatore Mance Staff

[![Deploy to GitHub Pages](https://github.com/ionutale/calcolatore-mance-svelte/actions/workflows/deploy.yml/badge.svg)](https://github.com/ionutale/calcolatore-mance-svelte/actions/workflows/deploy.yml)

Un'applicazione web semplice e intuitiva per dividere le mance in modo equo tra i membri dello staff di ristoranti, bar e locali. Costruita con SvelteKit e Tailwind CSS.

## 🌟 Caratteristiche

- **Calcolo automatico**: Divisione equa delle mance basata sui punti assegnati a ciascun membro dello staff
- **Interfaccia intuitiva**: Design moderno e responsive con supporto per dispositivi mobili
- **Tema scuro/chiaro**: Adattabile alle preferenze dell'utente
- **Persistenza dati**: Salvataggio automatico dei dati nel browser locale
- **Ordinamento flessibile**: Possibilità di ordinare lo staff per nome o punti
- **Validazione input**: Controlli per garantire dati corretti
- **Notifiche**: Messaggi di feedback per l'utente

## 🚀 Demo

👉 **[Prova l'app live](https://ionutale.github.io/calcolatore-mance-svelte/)**

## 📱 Come funziona

1. **Inserisci il totale delle mance** da dividere
2. **Aggiungi i membri dello staff** con nome e punti (da 1 a 10)
3. **Visualizza le quote calcolate** automaticamente per ciascun membro
4. **Ordina e gestisci** la lista come preferisci

### Sistema di punteggio

- I punti rappresentano il contributo di ciascun membro (es. ore lavorate, responsabilità, performance)
- La divisione avviene in base alla proporzione: `quota = (punti_membro / punti_totali) × totale_mance`

## 🛠️ Tecnologie utilizzate

- **Framework**: [SvelteKit](https://svelte.dev/docs/kit) - Framework moderno per applicazioni web
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- **Tipografia**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Deployment**: GitHub Pages con GitHub Actions
- **Build tool**: Vite

## 🏗️ Sviluppo locale

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm o pnpm

### Installazione

1. Clona il repository:
```bash
git clone https://github.com/ionutale/calcolatore-mance-svelte.git
cd calcolatore-mance-svelte
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

4. Apri [http://localhost:5173](http://localhost:5173) nel browser

### Comandi disponibili

```bash
# Sviluppo
npm run dev          # Avvia server di sviluppo
npm run build        # Build per produzione
npm run preview      # Preview build locale

# Qualità codice
npm run check        # TypeScript e Svelte check
npm run lint         # Linting
npm run format       # Formattazione codice

# Test
npm run test         # E2E tests con Playwright
```

## 🚀 Deployment

L'app viene automaticamente deployata su GitHub Pages tramite GitHub Actions:

1. **Push su main**: Il workflow si attiva automaticamente
2. **Build**: Installa dipendenze e build dell'app
3. **Deploy**: Carica i file statici su GitHub Pages

### Risoluzione problemi (404 su GitHub Pages)

Se aprendo la demo vedi una pagina 404:

- Verifica in GitHub: `Settings` → `Pages` → `Build and deployment` che la `Source` sia impostata su `GitHub Actions`.
- Controlla lo stato dei workflow: `Actions` → workflow "Deploy to GitHub Pages" deve essere `success`.
- Attendi 1-2 minuti dopo il primo deploy: l'abilitazione di Pages non è istantanea.
- Forza il refresh senza cache: macOS `Cmd+Shift+R`.

Note tecniche: il progetto usa `@sveltejs/adapter-static` con `paths.relative = true` e un file `.nojekyll` durante il deploy per servire correttamente la cartella `_app/` sotto il percorso `/calcolatore-mance-svelte/`.

### Configurazione manuale

Per deployare manualmente:

```bash
npm run build
```

I file buildati saranno nella cartella `build/` e possono essere serviti da qualsiasi server statico.

## 📁 Struttura progetto

```
src/
├── app.html              # Template HTML principale
├── app.d.ts              # TypeScript declarations
├── lib/
│   └── TipCalculator.svelte  # Componente principale
└── routes/
    ├── +page.server.js   # Configurazione prerender
    ├── +page.svelte      # Pagina principale
    └── +layout.svelte    # Layout dell'app
```

## 🎨 Personalizzazione

### Tema

L'app supporta temi chiaro e scuro che vengono salvati automaticamente nelle preferenze del browser.

### Stili

Gli stili sono gestiti con Tailwind CSS. Le classi sono configurate per:
- Responsive design (mobile-first)
- Dark mode support
- Transizioni fluide
- Accessibilità

## 🤝 Contributi

Contributi sono benvenuti! Per contribuire:

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-feature`)
3. Commit delle modifiche (`git commit -m 'Aggiungi nuova feature'`)
4. Push del branch (`git push origin feature/nuova-feature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 📞 Contatti

Per domande o suggerimenti:
- Apri una [issue](https://github.com/ionutale/calcolatore-mance-svelte/issues) su GitHub
- Contribuisci con una pull request

---

**Sviluppato con ❤️ per la comunità dei ristoratori italiani**
