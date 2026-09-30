# Verifica dei contenuti didattici

Annexure 2 (Financial Accounting): revisione del 15 settembre 2026, chiusa il 16 settembre 2026.
Annexure 3 (Cost Accounting): revisione del 16 settembre 2026.
Slide del corso (Lect 02–06, cartella Drive AFC): revisione del 30 settembre 2026.

**Decisione: le risposte restano quelle dell'annexure del corso.** È quello che l'esame chiede, quindi
domande, risposte corrette e spiegazioni non sono state modificate. Dove il materiale segue uno standard
superato, le schede e le domande interessate portano una nota **Today** che dice cosa prevede l'IFRS
attuale, separata dal contenuto da studiare.

La nota è il campo facoltativo `today` in `data.js`: compare in fondo alla scheda concetto, sotto il recap
nel feedback del quiz e nel riepilogo finale. `tests/data.test.js` verifica che le note siano presenti e
che le risposte corrette siano rimaste quelle dell'annexure.

# Annexure 2 — Financial Accounting

## 1. Costi amministrativi e competenza

La scheda **Accrual Principle** e la domanda *Costs That Cannot Be Matched to Revenues* indicano come
criterio l'anno del pagamento. Il principio di competenza si applica anche a questi costi: il pagamento
non determina automaticamente l'esercizio di rilevazione. Per la maggior parte dei costi amministrativi i
due momenti coincidono, ed è per questo che la scorciatoia del corso funziona.

Fonte: [IAS 1, paragrafi 27–28, IFRS Foundation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf).

Note aggiunte a: scheda *Accrual Principle*, domanda *Costs That Cannot Be Matched to Revenues*.

## 2. Classificazione degli strumenti finanziari

Il sito presenta **available-for-sale**, **held-to-maturity** e **loans and receivables** come categorie
attuali. Sono classificazioni del precedente IAS 39. IFRS 9, applicabile dal 2018, utilizza costo
ammortizzato, fair value con variazioni nelle altre componenti di conto economico complessivo (FVOCI) e
fair value con variazioni nell'utile o perdita d'esercizio (FVTPL). Le note rendono esplicito che il corso
studia IAS 39 e indicano la corrispondenza con IFRS 9.

Fonte: [IFRS 9 — Financial Instruments, IFRS Foundation](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/).

Note aggiunte a: schede *Financial Assets: the Four Categories*, *FVTPL*, *Available-for-Sale Financial
Assets*, *Held-to-Maturity Investments*, *Loans and Receivables*; domande *Where Fair Value Variations
Land*, *Held-to-Maturity Measurement*, *Valuing Trade Receivables*; riquadro "High-frequency traps".

## 3. Impairment e goodwill

Le espressioni **durable, unrecoverable loss** e **loss credited in the income statement** possono portare
fuori strada. Il criterio è il valore contabile superiore al valore recuperabile, cioè il maggiore fra fair
value al netto dei costi di vendita e valore d'uso. Una perdita di valore del goodwill riduce l'utile e non
è mai ripristinabile; per le altre attività il ripristino è ammesso, quindi l'irreversibilità non è un
requisito generale dell'impairment.

Fonte: [IAS 36 — Impairment of Assets, IFRS Foundation](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/).

Note aggiunte a: schede *Impairment Test* e *Goodwill*; domande *Purpose of the Impairment Test* e
*Goodwill and the Annual Impairment Test*; riquadro "High-frequency traps".

# Annexure 3 — Cost Accounting

Due errori di stampa nell'annexure, entrambi nella sezione sul process costing. Non sono questioni di
standard superati: sono incongruenze interne del testo, quindi qui non c'è una "risposta dell'annexure" da
tenere. Nessuna domanda del sito poggia su questi due punti.

## 4. Costo unitario dell'esempio di process costing

L'esempio calcola 600 unità completate più 400 in corso al 50%, quindi Neq = 800 unità equivalenti, con
costi di periodo per 16.000 €. Il testo stampa:

> Unit cost = 16.000 / 800 = 200 €/equivalent unit

ma 16.000 / 800 = **20**. Di conseguenza anche il WIP al 50% vale 10 €/u, non 100 €/u. Le due cifre stampate
sono coerenti fra loro (100 = 200 × 0,5), quindi l'errore sta nella divisione: o il costo totale doveva
essere 160.000 €, o i risultati sono 20 e 10.

Il sito insegna il metodo con numeri propri e corretti (800 completate, 400 al 50%, 25.000 € → 1.000 unità
equivalenti a 25 €/u, WIP a 12,50 €/u), verificati dai test.

## 5. Formula FIFO del costo unitario

Per le rimanenze iniziali l'annexure distingue costo medio ponderato e FIFO. Le unità equivalenti sono
distinte correttamente:

- medio: Neq = Qc + WIPfinale × dcFinale
- FIFO: Neq = Qc + WIPfinale × dcFinale − WIPiniziale × dcIniziale

Ma il costo unitario è stampato identico nei due casi, (Ct + CWIPiniziale) / Neq. Il testo stesso dice che
con il FIFO «allocation is done only for resources sustained during the period»: coerentemente, il
numeratore FIFO dovrebbe essere il solo Ct. La scheda *Initial Inventories: Average and FIFO* descrive la
distinzione a parole, come fa il testo, senza costruire domande sulla formula stampata.

# Slide del corso — allineamento del 30 settembre 2026

## 6. Fatti del corso corretti

Il deck *Lect 02 — Introduction to the Course* ha corretto diverse cose che erano state dedotte dal solo
calendario:

- **Docente**: Michela Arnaboldi (prima solo «Professor Arnaboldi»).
- **Assistenti**: sono **quattro** — Eleonora Carloni, Laura Porta, Claudia Rizzuti, Romain Lerouge. Laura
  Porta mancava del tutto.
- **Orari e aule**: lunedì 14.30 (BL.27.0.3), mercoledì 8.45 (L.07).
- **Valutazione**: voto finale = (Challenge 1 × 0,2) + (Challenge 2 × 0,2) + (prova scritta × 0,6), poi
  l'orale che vale ±2 punti o la bocciatura. Gli sprint in aula di 4 ore sono il 26 ottobre e il 14 dicembre,
  con **presenza obbligatoria** per chi vuole la valutazione da frequentante.
- **Libro**: Arnaboldi, Azzone, Giorgino (2014), *Performance Measurement and Management for Engineers*.

## 7. La struttura del corso non era quella

I moduli con cui il calendario era stato raggruppato erano una mia ricostruzione. La struttura vera è
**A / F / C**, dichiarata nel deck:

- **Accounting**: financial accounting recovery, financial statement analysis, financial statement consolidation
- **Finance**: cash flow, relative valuation, value proxies
- **Control**: planning and control cycle, budgeting, KPI/corporate costs/TPS/variance analysis, reporting e dashboard

I gruppi del calendario restano, ma ognuno porta ora il blocco A/F/C a cui appartiene, e la struttura
ufficiale è mostrata nella scheda Programme.

## 8. Il calendario e il deck introduttivo non coincidono

Due slot divergono fra `AFC26_Calendar_Arnaboldi` e il deck *Lect 02*:

| Data | File calendario | Deck Lect 02 |
|---|---|---|
| 14-ott | Online (TBC), Professor Arnaboldi | Online (TBD), Assistant Carloni |
| 26-ott | Assistant Lerouge · Assistant Rizzuti | Professor Arnaboldi |

Il sito mostra la versione del file calendario, con un badge **«sources differ»** sulla riga e la versione
alternativa nel tooltip. Il deck stesso avverte che il calendario è «always a work-in-progress».

## 9. Manca il terzo prerequisito

Il corso ne dichiara **tre**, non due:

1. Financial Accounting ✔ nell'hub
2. Cost Accounting ✔ nell'hub
3. **Decision making** ✘ — decisioni di breve periodo (margine di contribuzione, break-even) e di lungo
   periodo (NPV), MOOC settimane 3 e 4

Il terzo non è nell'hub e non c'è un annexure che lo copra. È segnalato nella home e nella scheda Programme
come mancante, invece di essere inventato da conoscenza generale.

## 10. Il video di ripasso conferma le schede esistenti

Il deck *Lect 03 — Financial Statement Review* ripassa il prerequisito di Financial Accounting e coincide con
quanto già presente. Ha aggiunto sei schede su punti che l'annexure non trattava esplicitamente: benchmark
treatment contro allowed treatment, il value in use, l'investment property IAS 40 (dove il fair value è il
*benchmark*, al contrario di IAS 16), l'earnings per share base e diluito, i tre valori di un'azione, e i
costi esclusi dallo stato patrimoniale.

## Limite della verifica

Verifiche mirate, non una validazione completa delle 150 schede e delle 197 domande. Non sono ancora stati
usati: `AFC26_Lect_04` (esercizi su recovery e consolidation), il file esercizi omonimo e
**`AFC26_ExamQuestions.pdf`**, che contiene domande ed esercizi delle prove scritte degli anni precedenti.
