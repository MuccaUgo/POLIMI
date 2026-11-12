import {VERSION,questions,activeQuestions,isValid,pruneAnswers,toggleChoice,answerLabel,makeRecord,toCSV} from './survey.mjs';
import {API_BASE,PUBLIC_URL,sendAnswers,getCollectionStatus} from './submission.mjs';
const app=document.querySelector('#app');
const params=new URLSearchParams(location.search);
const mode=params.get('prova')==='1'?'test':'live';
const KEY='questionario-barba-v1-'+mode;
const source=['colleghi','universita','altro'].includes(params.get('source'))?params.get('source'):'non_indicata';
let answers={},started=false,index=0,view='welcome',storageWorks=true,beganAt=0,submissionId='',receipt=null,submitting=false,submitError='';
let serviceStatus=location.protocol==='file:'?'local':'checking',collectionOpen=false;
let draft;
try { draft=JSON.parse(localStorage.getItem(KEY)||'null'); if(draft?.version===VERSION) { answers=pruneAnswers(draft.answers||{}); started=Boolean(draft.started); beganAt=Number(draft.beganAt)||0; submissionId=typeof draft.submissionId==='string'?draft.submissionId:''; receipt=draft.receipt?.receipt===submissionId?draft.receipt:null; if(receipt)view='done'; } } catch { storageWorks=false; }
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const button=(text,fn,cls='button primary')=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
function save() { try{localStorage.setItem(KEY,JSON.stringify({version:VERSION,started,answers,beganAt,submissionId,receipt}));}catch{storageWorks=false;} }
function notify(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('visible');clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove('visible'),3500);}
function focusTitle(){const h=app.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo({top:0,behavior:'instant'});}
function reset(){answers={};started=false;index=0;view='welcome';beganAt=0;submissionId='';receipt=null;submitError='';save();render();focusTitle();}
function begin(resume=false){if(!beganAt)beganAt=Date.now();if(!submissionId)submissionId=crypto.randomUUID();started=true;view='question';const qs=activeQuestions(answers);index=resume?Math.max(0,qs.findIndex(q=>!isValid(q,answers[q.id]))):0;if(resume&&qs.every(q=>isValid(q,answers[q.id])))view=answers.route==='neither'?'ineligible':'review';save();render();focusTitle();}
function eyebrow(text){return el('p','eyebrow',text);}
function welcome(){
  const wrap=el('section','welcome');
  const intro=el('div','intro');intro.append(eyebrow('BARBA, ROUTINE & REGALI'),el('h1','hero-title','Le piccole scelte\ndi ogni giorno.'),el('p','lead','Come ti prendi cura della barba? E come scegli un regalo per chi la porta? Ci aiuti a capirlo.'));
  const tags=el('div','tags');['3–5 minuti','Dai 18 anni','Nessun nome o email'].forEach(t=>tags.append(el('span','tag',t)));intro.append(tags);
  const art=el('div','habit-art');art.setAttribute('aria-hidden','true');art.innerHTML='<div class="art-circle circle-one"></div><div class="art-circle circle-two"></div><div class="art-line"></div><span class="art-word">ogni stile,<br>un’abitudine.</span><span class="art-number">01 / ricerca</span>';intro.append(art);
  const card=el('div','start-card');card.append(eyebrow('UN PROGETTO DEL POLITECNICO'),el('h2','','La tua esperienza conta.'),el('p','','Questo questionario è realizzato da due studenti per un progetto didattico del corso Strategy & Marketing del Politecnico di Milano. Vogliamo capire le abitudini di cura della barba e come vengono scelti i regali per chi la porta.'));
  const note=el('div','pilot-note');note.append(el('strong','',mode==='test'?'Modalità prova: invii separati dalla ricerca.':'Come usiamo le risposte'),el('p','','Le risposte saranno accessibili soltanto ai ricercatori e analizzate in forma aggregata per il progetto. Non chiediamo nome o email. La bozza resta nel browser fino all’invio; puoi rivederla prima di confermare.'));card.append(note);
  if(serviceStatus==='unavailable')card.append(el('p','pilot-note','Il servizio di raccolta non è ancora disponibile. Puoi esplorare le domande; le risposte rimarranno sul dispositivo fino all’attivazione dell’invio.'));
  if(serviceStatus==='ready'&&!collectionOpen&&mode==='live'){card.append(el('p','pilot-note','La raccolta è in pausa mentre rivediamo le domande. Puoi esplorare il questionario; l’invio effettivo sarà disponibile quando verrà aperta.'));const a=el('a','text-button','Apri in modalità prova');a.href=PUBLIC_URL+'?prova=1';card.append(a);}
  const consent=el('label','consent');const input=el('input');input.type='checkbox';input.id='adult';consent.append(input,el('span','','Ho almeno 18 anni e partecipo volontariamente, avendo letto lo scopo e l’uso delle risposte.'));card.append(consent);
  const start=button(started?'Riprendi il questionario':'Inizia il questionario',()=>begin(started));start.disabled=true;input.addEventListener('change',()=>start.disabled=!input.checked);card.append(start);
  if(started)card.append(button('Cancella la bozza e ricomincia',reset,'text-button'));
  card.append(el('p','fine-print','Puoi interrompere quando vuoi. Non inserire nomi, contatti o altre informazioni personali nelle risposte aperte.'));
  wrap.append(intro,card);app.append(wrap);
}
function question(){
  const qs=activeQuestions(answers);index=Math.min(index,qs.length-1);const q=qs[index];
  const shell=el('section','survey-shell');
  const topline=el('div','progress-label');topline.append(el('span','',q.section),el('span','',`${index+1} / ${qs.length}`));
  const progress=el('progress','progress');progress.max=qs.length;progress.value=index;progress.setAttribute('aria-label','Avanzamento del questionario');shell.append(topline,progress);
  const card=el('div','question-card');card.append(eyebrow(q.optional?'FACOLTATIVA':q.type==='multi'?'PIÙ RISPOSTE POSSIBILI':'UNA RISPOSTA'));
  const heading=el('h1','question-title',q.title);heading.id='question-title';card.append(heading);
  if(q.hint)card.append(el('p','question-hint',q.hint));
  const error=el('p','error');error.id='answer-error';error.setAttribute('role','alert');
  if(q.type==='text'){
    const label=el('label','sr-only','Marchi che ricordi');label.htmlFor='brand-answer';
    const input=el('textarea','text-input');input.id='brand-answer';input.rows=4;input.maxLength=q.maxLength;input.value=answers[q.id]||'';input.placeholder='Scrivi qui, se vuoi…';input.setAttribute('aria-describedby','answer-error');
    const count=el('p','counter',`${input.value.length} / ${q.maxLength}`);
    input.addEventListener('input',()=>{answers[q.id]=input.value;count.textContent=`${input.value.length} / ${q.maxLength}`;save();});card.append(label,input,count);
  }else{
    const field=el('fieldset','options');field.setAttribute('aria-labelledby','question-title');field.setAttribute('aria-describedby','answer-error');
    for(const option of q.options){
      const label=el('label','option');const input=el('input');input.type=q.type==='multi'?'checkbox':'radio';input.name=q.id;input.value=option.value;input.checked=q.type==='multi'?(answers[q.id]||[]).includes(option.value):answers[q.id]===option.value;
      const copy=el('span','option-copy');copy.append(el('span','option-name',option.label));if(option.description)copy.append(el('span','option-description',option.description));
      label.append(input,copy);input.addEventListener('change',()=>{
        answers[q.id]=q.type==='multi'?toggleChoice(q,answers[q.id],option.value):option.value;
        answers=pruneAnswers(answers);save();error.textContent='';
        for(const item of field.querySelectorAll('input'))item.checked=q.type==='multi'?(answers[q.id]||[]).includes(item.value):answers[q.id]===item.value;
      });field.append(label);
    }card.append(field);
  }
  card.append(error);
  const nav=el('div','question-nav');nav.append(button('← Indietro',()=>{if(index>0)index--;else view='welcome';render();focusTitle();},'button secondary'));
  const next=button(q.optional && !answers[q.id]?'Salta e rivedi':'Continua →',()=>{
    if(!isValid(q,answers[q.id])){error.textContent=q.type==='multi'?'Scegli almeno una risposta per continuare.':'Scegli una risposta per continuare.';return;}
    if(q.optional && !answers[q.id])answers[q.id]='';
    save();const current=activeQuestions(answers);if(index===current.length-1)view=answers.route==='neither'?'ineligible':'review';else index++;render();focusTitle();
  });nav.append(next);card.append(nav);shell.append(card,el('p','save-note',storageWorks?'La bozza resta in questo browser fino alla conferma dell’invio.':'Il browser non consente il salvataggio: mantieni aperta questa pagina.'));app.append(shell);
}
function review(){
  const shell=el('section','review-shell');shell.append(eyebrow('PRIMA DI CONCLUDERE'),el('h1','question-title','Ti ritrovi in queste risposte?'),el('p','lead small','Puoi correggerle prima di confermare l’invio.'));
  for(const section of [...new Set(activeQuestions(answers).map(q=>q.section))]){
    const group=el('section','review-group');group.append(el('h2','',section));
    for(const q of activeQuestions(answers).filter(q=>q.section===section)){
      const row=el('div','review-row');const copy=el('div');copy.append(el('p','review-question',q.title),el('p','review-answer',answerLabel(q,answers[q.id])));
      const edit=button('Modifica',()=>{index=activeQuestions(answers).findIndex(x=>x.id===q.id);view='question';render();focusTitle();},'text-button');edit.setAttribute('aria-label',`Modifica: ${q.title}`);row.append(copy,edit);group.append(row);
    }shell.append(group);
  }
  const note=el('p','pilot-note',mode==='test'?'Questo invio sarà registrato come prova e tenuto separato dalla ricerca.':'Confermando, invii le risposte ai ricercatori per il progetto didattico del Politecnico di Milano.');shell.append(note);if(submitError){const error=el('p','error',submitError);error.setAttribute('role','alert');shell.append(error);}if(serviceStatus==='checking')shell.append(el('p','pilot-note','Verifica del servizio di raccolta…'));if(serviceStatus==='unavailable')shell.append(el('p','pilot-note','Il servizio di raccolta non è disponibile. Le risposte restano su questo dispositivo: verifica di nuovo tra poco.'));if(serviceStatus==='ready'&&!collectionOpen&&mode==='live')shell.append(el('p','pilot-note','La raccolta è in pausa. Le tue risposte restano salvate qui.'));const submit=button(submitting?'Invio in corso…':submitError?'Riprova l’invio':mode==='test'?'Invia risposta di prova':'Invia le risposte',submitAnswers);submit.disabled=submitting||serviceStatus==='checking'||serviceStatus==='unavailable'||(serviceStatus==='ready'&&!collectionOpen&&mode==='live');shell.append(submit);if(serviceStatus!=='local')shell.append(button('Verifica disponibilità',checkService,'text-button'));app.append(shell);
}
function download(content,type,ext){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=el('a');a.href=url;a.download=`questionario-barba-${new Date().toISOString().slice(0,10)}.${ext}`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function submitAnswers(){
  if(submitting||receipt)return;
  if(location.protocol==='file:'){submitError='Per inviare le risposte apri la versione online del questionario.';render();const a=el('a','button primary','Apri il questionario online');a.href=PUBLIC_URL+(mode==='test'?'?prova=1':'');app.append(a);return;}
  submitting=true;submitError='';render();
  const record={id:submissionId,version:VERSION,mode,source,elapsed_ms:Math.min(604800000,Math.max(0,Date.now()-beganAt)),answers:pruneAnswers(answers)};
  try{receipt=await sendAnswers(record);view='done';save();}catch(e){submitError=e.message||'Invio non riuscito. Riprova.';save();}finally{submitting=false;render();focusTitle();}
}
function done(ineligible=false){
  const shell=el('section','done-shell');shell.append(el('div','done-mark',ineligible?'↗':'✓'),eyebrow(ineligible?'GRAZIE DEL TUO TEMPO':mode==='test'?'PROVA REGISTRATA':'RISPOSTE REGISTRATE'),el('h1','question-title',ineligible?'Per ora ci fermiamo qui.':'Grazie, ci hai dato\nun punto di vista.'),el('p','lead small',ineligible?'Questa prima versione approfondisce l’esperienza di chi ha barba o baffi e di chi ha fatto regali per la barba negli ultimi 12 mesi.':mode==='test'?'L’invio di prova è stato ricevuto e resterà separato dai dati della ricerca.':'Le tue risposte sono state ricevute dai ricercatori. Grazie per il contributo al progetto del Politecnico di Milano.'));
  if(!ineligible&&receipt){shell.append(el('p','receipt','Ricevuta: '+receipt.receipt));const actions=el('div','export-actions');actions.append(button('Scarica le risposte · CSV',()=>download(toCSV({...makeRecord(answers,source,mode),receipt:receipt?.receipt}),'text/csv;charset=utf-8','csv')),button('Scarica JSON',()=>download(JSON.stringify({...makeRecord(answers,source,mode),receipt:receipt?.receipt},null,2),'application/json','json'),'button secondary'));shell.append(actions);}
  shell.append(button('Cancella la copia su questo dispositivo',reset,'text-button danger'));if(receipt)shell.append(el('p','fine-print','Cancellare questa copia non elimina la risposta già inviata ai ricercatori.'));app.append(shell);
}
function render(){app.replaceChildren();if(view==='welcome')welcome();else if(view==='question')question();else if(view==='review')review();else done(view==='ineligible');}
render();

const footer=document.querySelector('.site-footer span:last-child');if(footer)footer.textContent=mode==='test'?'Modalità prova · invii separati':'Risposte riservate ai ricercatori';
const versionBadge=document.querySelector('.version');if(versionBadge)versionBadge.textContent=mode==='test'?'PROVA':'QUESTIONARIO';

const homeLink=document.querySelector('.wordmark');if(homeLink)homeLink.href='./index.html'+location.search;

async function checkService(){try{const status=await getCollectionStatus();serviceStatus='ready';collectionOpen=status.is_open;}catch{serviceStatus='unavailable';}if(view==='welcome'||view==='review')render();}
if(serviceStatus!=='local')void checkService();
