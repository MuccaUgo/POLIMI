# Verifica dei contenuti didattici

Revisione del 15 settembre 2026, chiusa il 16 settembre 2026.

**Decisione: le risposte restano quelle dell'annexure del corso.** È quello che l'esame chiede, quindi
domande, risposte corrette e spiegazioni non sono state modificate. Dove il materiale segue uno standard
superato, le schede e le domande interessate portano una nota **Today** che dice cosa prevede l'IFRS
attuale, separata dal contenuto da studiare.

La nota è il campo facoltativo `today` in `data.js`: compare in fondo alla scheda concetto, sotto il recap
nel feedback del quiz e nel riepilogo finale. `tests/data.test.js` verifica che le note siano presenti e
che le risposte corrette siano rimaste quelle dell'annexure.

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

## Limite della verifica

Questa è una verifica mirata su tre punti, non una validazione completa delle 44 schede e delle 83
domande.
