# Questionario barba e regali — progetto Politecnico di Milano

Questionario realizzato da due studenti per un progetto didattico del corso Strategy & Marketing
2026–27 del Politecnico di Milano. Percorsi: uso personale, acquisto di regali negli ultimi
12 mesi, entrambi o nessuno. Una sola domanda aperta facoltativa sui marchi.

## Struttura

- `index.html`: pagina autonoma generata, apribile anche come file locale per provarla.
- `index.template.html`, `styles.css`, `app.js`: interfaccia e navigazione.
- `survey.mjs`: domande, condizioni, validazione ed esportazione della propria risposta.
- `submission.mjs`: invio al servizio di raccolta con timeout e verifica della ricevuta.
- `build.mjs`: incorpora le risorse nella pagina autonoma.
- `survey.test.mjs`, `submission.test.mjs`: controlli della logica e dell'invio.

La compilazione non richiede un account e non chiede nome, email o datore di lavoro.
Il testo introduttivo spiega il progetto, la partecipazione volontaria e l'analisi aggregata.
La bozza rimane nel browser; solo la conferma finale la invia ai ricercatori.
Le risposte vengono conservate nel database del servizio di raccolta, non nel repository.

## Ricerca e prove

- Link normale: compilazione per la ricerca. L'apertura e la pausa sono gestite dall'area ricercatori.
- `?prova=1`: invia dati di prova, sempre separati dalle risposte effettive.
- `?source=colleghi`, `?source=universita`, `?source=altro`: provenienza del campione senza
  un'altra domanda. Si può combinare con `prova=1` usando `&`.
- L'area risultati è su `https://questionario-barba-raccolta.muccaugo.chatgpt.site/risultati`.
  Consente accesso con codice per consultazione e download, oppure accesso ChatGPT del
  ricercatore proprietario per gestire la raccolta. Tutti i permessi sono verificati sul server.

Il servizio parte con raccolta effettiva in pausa per consentire la revisione delle domande;
il ricercatore può aprirla dal pannello. I test funzionano anche durante la pausa.
Se la connessione si interrompe, l'interfaccia conserva la bozza e permette di riprovare.
I tentativi con lo stesso identificativo e contenuto non generano righe duplicate.
La conferma viene mostrata soltanto dopo una ricevuta valida del server.
Cancellare la copia locale non cancella una risposta già ricevuta dai ricercatori.

Da un file locale si possono provare le domande, ma per inviare bisogna aprire il link HTTPS.
Il sito spiega questo passaggio; non usa le risposte locali come prova di invio.

## Modifiche e controlli

```sh
node questionario-barba/build.mjs
node --test questionario-barba/survey.test.mjs questionario-barba/submission.test.mjs
```

Dopo modifiche alle domande, sincronizzare `survey.mjs` nel servizio di raccolta e aggiornare
la versione se cambia la struttura, prima di ripubblicare entrambi. Le vecchie risposte
mantengono la versione con cui sono state inviate. Non committare mai esportazioni o segreti.

Le risposte sui comportamenti sono esplorative; il reclutamento tramite chat non rende
il campione rappresentativo. Prima di avviare la raccolta, verificare domande e durata con
3–5 persone usando il link di prova.
