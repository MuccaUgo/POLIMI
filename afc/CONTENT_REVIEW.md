# Verifica dei contenuti didattici

Annexure 2 (Financial Accounting): revisione del 15 settembre 2026, chiusa il 16 settembre 2026.
Annexure 3 (Cost Accounting): revisione del 16 settembre 2026.

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

## Limite della verifica

Verifiche mirate, non una validazione completa delle 83 schede e delle 125 domande.
