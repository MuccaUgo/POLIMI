export const API_BASE='https://questionario-barba-raccolta.muccaugo.chatgpt.site';
export const PUBLIC_URL='https://muccaugo.github.io/POLIMI/questionario-barba/';
export async function getCollectionStatus(){
  const response=await fetch(API_BASE+'/api/health',{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw Error('Servizio non disponibile.');
  const body=await response.json();
  if(body.ok!==true||body.version!=='grooming-v1'||typeof body.is_open!=='boolean')throw Error('Configurazione non disponibile.');
  return body;
}
export async function sendAnswers(record,{fetchImpl=fetch,timeoutMs=20000}={}){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
  async function post(path,body){
    let response;
    try{response=await fetchImpl(API_BASE+path,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});}
    catch{throw Error('Invio non confermato. Le risposte restano salvate qui: controlla la connessione e riprova.');}
    let data;try{data=await response.json();}catch{throw Error('Il servizio non ha confermato l’invio. Riprova tra poco.');}
    if(!response.ok)throw Error(data.error||'Invio non riuscito. Riprova tra poco.');
    return data;
  }
  try{
    const session=await post('/api/session',{mode:record.mode,website:''});
    if(typeof session.token!=='string')throw Error('Sessione non disponibile. Riprova tra poco.');
    const result=await post('/api/responses',{...record,website:'',token:session.token});
    if(result.receipt!==record.id||result.mode!==record.mode||typeof result.received_at!=='string')throw Error('Il servizio non ha confermato correttamente l’invio. Riprova.');
    return result;
  }finally{clearTimeout(timer);}
}
