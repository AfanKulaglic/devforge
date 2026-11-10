const { chromium } = require('playwright');
(async () => {
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1300,height:1200}});
  const errs=[], reqs=[];
  p.on('pageerror',e=>errs.push('PAGEERROR: '+e));
  p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text())});
  p.on('response',r=>{ if(r.url().includes('/api/')) reqs.push(r.status()+' '+r.url()); });
  await p.goto('https://devlab.cc.cd/mail',{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);

  // popuni formu
  await p.fill('input[type="email"]', 'afankul42@gmail.com');
  await p.waitForTimeout(200);
  const btnInfo = await p.evaluate(()=>{
    const bs=[...document.querySelectorAll('button')];
    const send=bs.find(b=>b.textContent.includes('Pošalji'));
    return send ? {text:send.textContent.trim(), disabled:send.disabled} : null;
  });
  console.log('dugme:', JSON.stringify(btnInfo));

  await p.click('button:has-text("Pošalji")');
  await p.waitForTimeout(4000);
  const after = await p.evaluate(()=>{
    const t=document.body.innerText;
    const m=t.match(/(Mail je poslan|Slanje nije|Nema veze|Previše|greška|Greška)[^\n]*/i);
    return m?m[0]:'(nema poruke)';
  });
  console.log('poruka:', after);
  console.log('api pozivi:', reqs.join(' | ') || '(nijedan)');
  console.log('greske:', errs.slice(0,3).join(' | ') || '(nema)');
  await b.close();
})();
