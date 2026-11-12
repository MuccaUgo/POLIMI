export const VERSION = 'grooming-pilot-1';
const o = (value, label, description) => ({ value, label, description });
const money = [o('under10','Meno di 10 €'),o('10-19','10–19 €'),o('20-34','20–34 €'),o('35-49','35–49 €'),o('50-74','50–74 €'),o('75plus','75 € o più'),o('unknown','Non ricordo')];
const channels = [o('drugstore','Negozio di igiene e cura della persona','Per esempio, una catena specializzata'),o('supermarket','Supermercato o ipermercato'),o('electronics','Negozio di elettronica'),o('online','Online'),o('barber','Barbiere o parrucchiere'),o('other','Altro'),o('unknown','Non ricordo')];
const personal = a => ['personal','both'].includes(a.route);
const gift = a => ['gift','both'].includes(a.route);
const purchased = a => personal(a) && a.p_last && !['never','unknown'].includes(a.p_last);
export const questions = [
  { id:'age', section:'Per iniziare', title:'Qual è la tua fascia d’età?', type:'single', options:[o('18-24','18–24 anni'),o('25-29','25–29 anni'),o('30-34','30–34 anni'),o('35-44','35–44 anni'),o('45plus','45 anni o più'),o('undisclosed','Preferisco non rispondere')] },
  { id:'route', section:'Per iniziare', title:'Quale situazione ti descrive?', hint:'Scegli il percorso che fa per te. Per i regali considera gli ultimi 12 mesi.', type:'single', options:[o('personal','Ho barba o baffi, anche corti','Rispondo sulle mie abitudini personali'),o('gift','Ho fatto un regalo per la barba','Ho acquistato prodotti o dispositivi per qualcun altro'),o('both','Entrambe le situazioni','Ho barba o baffi e ho anche fatto un regalo'),o('neither','Nessuna delle due','Non ho barba o baffi e non ho fatto questi regali')] },
  { id:'p_wash', section:'Le tue abitudini', title:'Che cosa usi abitualmente per lavare barba o baffi?', hint:'Puoi scegliere più risposte.', type:'multi', when:personal, options:[o('water','Solo acqua'),o('face','Detergente per il viso'),o('body','Sapone o bagnoschiuma'),o('shampoo','Shampoo per capelli'),o('beard','Detergente specifico per la barba'),o('other','Altro'),o('nothing','Non li lavo separatamente')], exclusive:['nothing'] },
  { id:'p_tools', section:'Le tue abitudini', title:'Che cosa usi per regolare o rifinire barba e baffi?', hint:'Puoi scegliere più risposte.', type:'multi', when:personal, options:[o('trimmer','Regolabarba'),o('manual','Rasoio manuale'),o('electric','Rasoio elettrico'),o('scissors','Forbici'),o('barber','Mi affido al barbiere'),o('other','Altro'),o('nothing','Non li regolo o rifinisco')], exclusive:['nothing'] },
  { id:'p_need', section:'Le tue abitudini', title:'Che cosa vorresti migliorare per prima?', hint:'Pensa alla tua esperienza attuale con barba o baffi.', type:'single', when:personal, options:[o('precision','Forma, lunghezza o precisione dei contorni'),o('clean','Pulizia o profumo'),o('soft','Morbidezza dei peli'),o('comfort','Comfort della pelle sotto la barba'),o('easy','Tempo o semplicità della routine'),o('nothing','Sono soddisfatto così'),o('other','Altro')] },
  { id:'p_barrier', section:'Le tue abitudini', title:'Qual è il motivo principale per cui non usi abitualmente un detergente specifico per la barba?', type:'single', when:a=>personal(a) && Array.isArray(a.p_wash) && !a.p_wash.includes('beard'), options:[o('neverthought','Non ci ho mai pensato'),o('benefit','Non mi è chiaro il beneficio'),o('enough','Mi basta quello che uso già'),o('price','Il prezzo'),o('routine','Non voglio aggiungere un prodotto alla routine'),o('experience','L’ho provato e non mi sono trovato bene'),o('other','Altro')] },
  { id:'p_last', section:'Il tuo ultimo acquisto', title:'Qual è l’ultimo acquisto che hai fatto per la tua barba?', hint:'Considera soltanto gli acquisti fatti da te negli ultimi 12 mesi.', type:'single', when:personal, options:[o('device','Un rasoio o regolabarba'),o('care','Un prodotto specifico per la cura della barba'),o('generic','Un prodotto generico che uso anche per la barba'),o('set','Un set con più prodotti o dispositivi'),o('other','Altro'),o('never','Non ho fatto acquisti in questo periodo'),o('unknown','Non ricordo')] },
  { id:'p_spend', section:'Il tuo ultimo acquisto', title:'Quanto hai speso per quell’acquisto?', hint:'Indica il totale approssimativo pagato.', type:'single', when:purchased, options:money },
  { id:'p_channel', section:'Il tuo ultimo acquisto', title:'Dove hai fatto quell’acquisto?', type:'single', when:purchased, options:channels },
  { id:'g_age', section:'Il tuo ultimo regalo', title:'Quanti anni ha la persona a cui hai fatto l’ultimo regalo per la barba?', hint:'Da qui in poi pensa sempre allo stesso regalo, acquistato negli ultimi 12 mesi.', type:'single', when:gift, options:[o('under18','Meno di 18 anni'),o('18-24','18–24 anni'),o('25-34','25–34 anni'),o('35-44','35–44 anni'),o('45-54','45–54 anni'),o('55plus','55 anni o più'),o('unknown','Non so')] },
  { id:'g_type', section:'Il tuo ultimo regalo', title:'Che cosa hai regalato?', type:'single', when:gift, options:[o('device','Un rasoio o regolabarba'),o('care','Uno o più prodotti per la cura della barba'),o('set','Un set con dispositivo e prodotti per la cura'),o('other','Altro'),o('unknown','Non ricordo')] },
  { id:'g_spend', section:'Il tuo ultimo regalo', title:'Quanto hai speso per quel regalo?', hint:'Indica il totale approssimativo pagato.', type:'single', when:gift, options:money },
  { id:'g_channel', section:'Il tuo ultimo regalo', title:'Dove hai acquistato quel regalo?', type:'single', when:gift, options:channels },
  { id:'g_reason', section:'Il tuo ultimo regalo', title:'Che cosa ha pesato di più nella scelta?', hint:'Scegli il motivo principale.', type:'single', when:gift, options:[o('request','Una richiesta del destinatario'),o('need','Un bisogno o un’abitudine che conoscevo'),o('price','Il prezzo o una promozione'),o('reviews','Recensioni o consigli ricevuti'),o('presentation','La presentazione del regalo'),o('familiar','La familiarità con il prodotto'),o('other','Altro')] },
  { id:'g_use', section:'Dopo il regalo', title:'Sai se la persona ha continuato a usare il regalo?', type:'single', when:gift, options:[o('regular','Sì, lo usa abitualmente'),o('sometimes','Sì, ma solo ogni tanto'),o('stopped','Lo ha provato e poi ha smesso'),o('unused','Non lo ha usato'),o('recent','È troppo recente per saperlo'),o('unknown','Non lo so')] },
  { id:'brands', section:'Un’ultima cosa', title:'Quali marchi di rasoi o regolabarba ti vengono in mente?', hint:'Scrivi quelli che ricordi spontaneamente, oppure salta la domanda.', type:'text', optional:true, maxLength:400, when:a=>['personal','gift','both'].includes(a.route) }
];
export function activeQuestions(answers) { return questions.filter(q=>!q.when || q.when(answers)); }
export function isValid(q, value) {
  if(q.optional && (value===undefined || value==='')) return true;
  if(q.type==='text') return typeof value==='string' && value.length<=q.maxLength;
  if(q.type==='single') return q.options.some(x=>x.value===value);
  if(!Array.isArray(value) || !value.length || new Set(value).size!==value.length) return false;
  if(value.some(v=>!q.options.some(x=>x.value===v))) return false;
  return !value.some(v=>(q.exclusive||[]).includes(v)) || value.length===1;
}
export function pruneAnswers(answers) {
  const clean={};
  for(const q of questions) if((!q.when || q.when(clean)) && Object.hasOwn(answers,q.id) && isValid(q,answers[q.id])) clean[q.id]=answers[q.id];
  return clean;
}
export function toggleChoice(q, current, value) {
  const selected=Array.isArray(current)?current:[];
  if(selected.includes(value)) return selected.filter(v=>v!==value);
  if((q.exclusive||[]).includes(value)) return [value];
  return [...selected.filter(v=>!(q.exclusive||[]).includes(v)),value];
}
export function answerLabel(q,value) {
  if(q.type==='text') return value || 'Domanda saltata';
  return (Array.isArray(value)?value:[value]).map(v=>q.options.find(x=>x.value===v)?.label||'').filter(Boolean).join('; ');
}
export function makeRecord(answers,source='non_indicata') {
  const clean=pruneAnswers(answers);
  return {version:VERSION,mode:'pilot_local_only',created_at:new Date().toISOString(),source:['colleghi','universita','altro'].includes(source)?source:'non_indicata',answers:clean};
}
export function toCSV(record) {
  const cell=x=>'"'+String(x??'').replaceAll('"','""')+'"';
  const rows=[['versione','modalita','data_esportazione','provenienza',...questions.map(q=>q.id)], [record.version,record.mode,record.created_at,record.source,...questions.map(q=>Object.hasOwn(record.answers,q.id)?answerLabel(q,record.answers[q.id]):'')]];
  // Prefix formula-like free text so spreadsheet software treats it as literal text.
  return '\ufeff'+rows.map(row=>row.map(x=>cell(/^[\s]*[=+@-]/.test(String(x))?'\''+x:x)).join(',')).join('\r\n');
}
