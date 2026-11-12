# Questionario barba e regali — bozza 01

Prima versione esplorativa per il project work Strategy & Marketing 2026–27.
Pagina indipendente dal resto del portale POLIMI, senza dipendenze, loghi commerciali,
domande su testimonial o riferimenti a marchi nelle domande chiuse.

## Stato della raccolta

**È un prototipo per provare contenuti e navigazione. Non è ancora una raccolta centralizzata.**
Non esistono endpoint di invio, database, tracking analitico o risultati pubblici.
Le risposte vengono conservate esclusivamente nel `localStorage` del browser e possono
essere cancellate dalla pagina. La pagina dichiara chiaramente questo comportamento
all'inizio, nel piè di pagina, nel riepilogo e dopo il completamento.

Il partecipante può scaricare CSV o JSON delle proprie risposte, senza invio automatico.
I file esportati non vanno committati nel repository pubblico. Prima di distribuire il
questionario per la raccolta effettiva occorre collegare un archivio con invio autenticato
o protetto, accesso ai risultati riservato ai ricercatori e informativa coerente.
Le normali richieste della pagina sono gestite dall'hosting GitHub Pages; il sito non
promette anonimato assoluto rispetto ai log dell'hosting.

## Percorsi

- Partecipazione volontaria riservata a maggiorenni; fascia d'età e selezione del percorso.
- **Uso personale:** lavaggio, strumenti, bisogno prioritario, eventuale barriera al
  detergente specifico, ultimo acquisto e, se pertinente, spesa e canale.
- **Regalo negli ultimi 12 mesi:** età del destinatario, tipologia, spesa, canale,
  criterio principale e conoscenza dell'utilizzo successivo. Percorso aperto a tutti i generi.
- **Entrambi:** combina i due percorsi senza ripetere le informazioni comuni.
- **Nessuno:** messaggio di chiusura senza altre domande.
- Una sola domanda aperta e facoltativa finale sui marchi di rasoi/regolabarba.

Non vengono chiesti nomi, email, datore di lavoro, reddito o contatti. La scelta di un
nuovo percorso rimuove le risposte che non sono più pertinenti; selezioni come
"non uso nulla" sono esclusive. I testi liberi sono renderizzati come testo, mai come HTML.

## Provenienza facoltativa del campione

Per distinguere gruppi di reclutamento senza aggiungere una domanda, il link può avere
`?source=colleghi`, `?source=universita` oppure `?source=altro`. Il valore viene incluso
soltanto nell'esportazione locale e non viene trasmesso. Non inserire nomi o identificativi
personali nel link. La selezione del campione rimane di convenienza, non rappresentativa.

## Esecuzione e controlli

La pagina `index.html` contiene stile e script incorporati e funziona anche se aperta
direttamente come file locale, oltre che tramite GitHub Pages. I sorgenti separati
rimangono modificabili; dopo una modifica rigenerare la pagina:

```sh
node questionario-barba/build.mjs
```

Per servirla dalla radice del repository:

```sh
python3 -m http.server 8000
```

Aprire la sottocartella `questionario-barba/` tramite HTTP oppure il file `index.html`.

```sh
node --test questionario-barba/survey.test.mjs
node --check questionario-barba/app.js
```

File: `index.html` (pagina autonoma generata), `index.template.html`, `build.mjs`,
`styles.css`, `survey.mjs` (domande e logica pura), `app.js` (interfaccia e salvataggio
locale), `icon.svg`, `survey.test.mjs`.

## Verifica del contenuto prima della ricerca

Fare una prova con 3–5 persone, misurare il tempo e raccogliere dubbi sulla formulazione.
La durata indicativa di 3–5 minuti va verificata, soprattutto per il percorso combinato.
Le risposte sulle abitudini aiutano la diagnosi della categoria, ma non costituiscono
una validazione di uno specifico marchio, bundle o prezzo futuro.
