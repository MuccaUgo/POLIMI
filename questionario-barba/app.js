import {VERSION,questions,activeQuestions,isValid,pruneAnswers,toggleChoice,answerLabel,makeRecord,toCSV} from './survey.mjs';
const app=document.querySelector('#app');
const KEY='questionario-barba-pilot-v1';
const source=new URLSearchParams(location.search).get('source') || 'non_indicata';
let answers={},started=false,index=0,view='welcome',storageWorks=true;
let draft;
try { draft=JSON.parse(localStorage.getItem(KEY)||'null'); if(draft?.version===VERSION) { answers=pruneAnswers(draft.answers||{}); started=Boolean(draft.started); } } catch { storageWorks=false; }
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const button=(text,fn,cls='button primary')=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
function save() { try{localStorage.setItem(KEY,JSON.stringify({version:VERSION,started,answers}));}catch{storageWorks=false;} }
function notify(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('visible');clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove('visible'),3500);}
function focusTitle(){const h=app.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo({top:0,behavior:'instant'});}
function reset(){answers={};started=false;index=0;view='welcome';save();render();focusTitle();}
function begin(resume=false){started=true;view='question';const qs=activeQuestions(answers);index=resume?Math.max(0,qs.findIndex(q=>!isValid(q,answers[q.id]))):0;if(resume&&qs.every(q=>isValid(q,answers[q.id])))view=answers.route==='neither'?'ineligible':'review';save();render();focusTitle();}
function eyebrow(text){return el('p','eyebrow',text);}
function welcome(){
  const wrap=el('section','welcome');
  const intro=el('div','intro');intro.append(eyebrow('BARBA, ROUTINE & REGALI'),el('h1','hero-title','Le piccole scelte\ndi ogni giorno.'),el('p','lead','Come ti prendi cura della barba? E come scegli un regalo per chi la porta? Ci aiuti a capirlo.'));
  const tags=el('div','tags');['3–5 minuti','Dai 18 anni','Nessun nome o email'].forEach(t=>tags.append(el('span','tag',t)));intro.append(tags);
  const art=el('div','habit-art');art.setAttribute('aria-hidden','true');art.innerHTML='<div class="art-circle circle-one"></div><div class="art-circle circle-two"></div><div class="art-line"></div><span class="art-word">ogni stile,<br>un’abitudine.</span><span class="art-number">01 / ricerca</span>';intro.append(art);
  const card=el('div','start-card');card.append(eyebrow('UN PICCOLO CONTRIBUTO'),el('h2','','La tua esperienza conta.'),el('p','','È una ricerca universitaria per un project work di Strategy & Marketing. Le domande si adattano a chi cura la propria barba, a chi acquista regali o a entrambe le situazioni.'));
  const note=el('div','pilot-note');note.append(el('strong','','Questa è una versione di prova.'),el('p','','Le risposte restano in questo browser e non vengono inviate ai ricercatori. Alla fine puoi rivederle ed esportarle. Prima della raccolta effettiva verrà collegato un sistema di invio.'));card.append(note);
  const consent=el('label','consent');const input=el('input');input.type='checkbox';input.id='adult';consent.append(input,el('span','','Ho almeno 18 anni e scelgo di partecipare volontariamente a questa prova.'));card.append(consent);
  const start=button(started?'Riprendi la prova':'Inizia il questionario',()=>begin(started));start.disabled=true;input.addEventListener('change',()=>start.disabled=!input.checked);card.append(start);
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
  });nav.append(next);card.append(nav);shell.append(card,el('p','save-note',storageWorks?'La bozza viene salvata solo in questo browser.':'Il browser non consente il salvataggio: mantieni aperta questa pagina.'));app.append(shell);
}
function review(){
  const shell=el('section','review-shell');shell.append(eyebrow('PRIMA DI CONCLUDERE'),el('h1','question-title','Ti ritrovi in queste risposte?'),el('p','lead small','Puoi correggerle prima di completare la prova.'));
  for(const section of [...new Set(activeQuestions(answers).map(q=>q.section))]){
    const group=el('section','review-group');group.append(el('h2','',section));
    for(const q of activeQuestions(answers).filter(q=>q.section===section)){
      const row=el('div','review-row');const copy=el('div');copy.append(el('p','review-question',q.title),el('p','review-answer',answerLabel(q,answers[q.id])));
      const edit=button('Modifica',()=>{index=activeQuestions(answers).findIndex(x=>x.id===q.id);view='question';render();focusTitle();},'text-button');edit.setAttribute('aria-label',`Modifica: ${q.title}`);row.append(copy,edit);group.append(row);
    }shell.append(group);
  }
  const note=el('p','pilot-note','Completando questa prova non invii le risposte: rimangono sul tuo dispositivo.');shell.append(note,button('Completa la prova',()=>{view='done';save();render();focusTitle();}));app.append(shell);
}
function download(content,type,ext){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=el('a');a.href=url;a.download=`questionario-barba-${new Date().toISOString().slice(0,10)}.${ext}`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function done(ineligible=false){
  const shell=el('section','done-shell');shell.append(el('div','done-mark',ineligible?'↗':'✓'),eyebrow(ineligible?'GRAZIE DEL TUO TEMPO':'PROVA COMPLETATA'),el('h1','question-title',ineligible?'Per ora ci fermiamo qui.':'Grazie, ci hai dato\nun punto di vista.'),el('p','lead small',ineligible?'Questa prima versione approfondisce l’esperienza di chi ha barba o baffi e di chi ha fatto regali per la barba negli ultimi 12 mesi.':'Le risposte sono salvate soltanto in questo browser. Non sono state inviate ai ricercatori.'));
  if(!ineligible){const actions=el('div','export-actions');actions.append(button('Scarica le risposte · CSV',()=>download(toCSV(makeRecord(answers,source)),'text/csv;charset=utf-8','csv')),button('Scarica JSON',()=>download(JSON.stringify(makeRecord(answers,source),null,2),'application/json','json'),'button secondary'),button('Rivedi le risposte',()=>{view='review';render();focusTitle();},'text-button'));shell.append(actions);}
  shell.append(button('Cancella le risposte da questo dispositivo',reset,'text-button danger'));app.append(shell);
}
function render(){app.replaceChildren();if(view==='welcome')welcome();else if(view==='question')question();else if(view==='review')review();else done(view==='ineligible');}
render();
