# Additional practice exercises

The bank now includes 50 original practice scenarios alongside the 33 original questions, for 83 in total.
The new exercises use the topics in the course's `01Ann_Financial Accounting.pdf`
(eAnnexure 2, sections A2.1–A2.5) and extend them with numerical applications.
They are practice material, not past exam questions or a prediction of the exam.

| New questions | Area | Added |
| --- | --- | ---: |
| 34–41 | Principles | 8 |
| 42–55 | Balance Sheet | 14 |
| 56–65 | Income Statement | 10 |
| 66–77 | Cash Flow | 12 |
| 78–83 | Notes & Reporting | 6 |

Questions use simplified, explicit assumptions where needed: no VAT, unchanged volumes,
fully tax-deductible charges, specified cash-flow classifications or clearly defined profit
subtotals. Every choice has an explanation, and numerical recaps show the workings.
The scenarios and amounts are original; the source documents were used to check principles.

## Rule checks

- [IAS 2 — Inventories](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/): inventory cost, FIFO/weighted average and net realisable value.
- [IAS 16 — Property, Plant and Equipment](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/): depreciable amounts and allocation over useful life.
- [IAS 19 — Employee Benefits](https://www.ifrs.org/issued-standards/list-of-standards/ias-19-employee-benefits/): employee service and unpaid benefits.
- [IAS 36 — Impairment of Assets](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/): recoverable amount and impairment.
- [IAS 37 — Provisions, Contingent Liabilities and Contingent Assets](https://www.ifrs.org/issued-standards/list-of-standards/ias-37-provisions-contingent-liabilities-and-contingent-assets/): recognition and estimation of provisions.
- [IFRS 15 — Revenue from Contracts with Customers](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/): performance and customer advances.
- [IAS 7 — Statement of Cash Flows](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/): operating/investing/financing classification, cash equivalents and noncash transactions.
- [IAS 7, paragraphs 9 and 28](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2021/issued/part-a/ias-7-statement-of-cash-flows.pdf?bypass=on): transfers within cash and cash equivalents and the separate exchange-rate reconciliation effect.

The original course wording is retained in the original 33 questions. The previously
identified issues are documented in [CONTENT_REVIEW.md](CONTENT_REVIEW.md); the new
exercises use explicit fact patterns and do not repeat the obsolete classifications or
the claim that administrative expenses are always recognised when paid.

## Checks

`node --test tests/*.test.js` validates the question structure, uniqueness, coverage,
and independently recomputes numerical answer keys for the new multi-step scenarios.
Content review also checks that each question has one defensible correct choice and
that the explanations agree with the alternatives. Automated checks do not replace
comparison with the course's own teaching and assessment expectations.
