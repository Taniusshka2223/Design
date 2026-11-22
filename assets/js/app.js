/*
  LAIFEN · ДИЗАЙН — интерактивный сайт по Figma-макету.
  Без фреймворков и сборки: все экраны, маршруты, данные и анимации работают локально.
*/
const ICONS = {
  layers:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  trophy:'<path d="M8 21h8m-4-4v4M7 3h10v7a5 5 0 0 1-10 0V3Z"/><path d="M7 5H4v3a4 4 0 0 0 4 4m9-7h3v3a4 4 0 0 1-4 4"/>',
  warning:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 4h.01"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sparkle:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17Z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  megaphone:'<path d="m3 11 15-6v14L3 13v-2Z"/><path d="M7 15v4a2 2 0 0 0 4 0v-2"/>',
  store:'<path d="m3 10 2-6h14l2 6v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0v-2Z"/><path d="M5 15v6h14v-6"/><path d="M9 21v-5h6v5"/>',
  book:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 17h12M8 3v14"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  box:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/>',
  square:'<rect x="4" y="4" width="16" height="16" rx="2"/>',
  lightning:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trend:'<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  mobile:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  card:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-13 6h3"/>',
  activity:'<path d="M2 12h4l3-8 5 16 4-8h4"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  share:'<path d="M12 16V3m-4 4 4-4 4 4"/><path d="M4 13v7h16v-7"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5"/><path d="M4 18v3h16v-3"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>',
  external:'<path d="M13 5h6v6m-9 3 9-9"/><path d="M19 13v6H5V5h6"/>',
  circlecheck:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
};
const icon=(name,size=22)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.sparkle}</svg>`;
const escapeText=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const workTabs=[['all','Весь период'],['start','Июль – август'],['september','Сентябрь'],['october','Октябрь'],['ads','Реклама']];
const winTabs=[['overview','Итоги'],['library','Библиотека: до и после'],['visits','Посещения'],['impressions','Показы']];
const NAV=[{group:'work',name:'1. Что сделала',icon:'layers',route:'work/all'}, {group:'achievements',name:'2. Достижения',icon:'trophy',route:'achievements/overview'},{group:'problems',name:'3. Проблемы',icon:'warning',route:'problems'},{group:'plans',name:'4. Планы',icon:'target',route:'plans'}];
const detailTabs=[['overview','Обзор'],['cards','Карточки'],['ads','Баннеры'],['traffic','Показы и посещения']];
const VALID=new Set([...workTabs.map(([id])=>'work/'+id),...winTabs.map(([id])=>'achievements/'+id),...detailTabs.map(([id])=>'details/'+id),'problems','plans']);
const app=document.querySelector('#app');let currentRoute='',toastTimer,scrollObserver,countsObserver;
let currentLang=location.hash.startsWith('#/en/')?'en':'ru';
const detailState={month:'all',format:'all',campaign:'all',trafficPeriod:'oct',trafficMetric:'search'};
const tr=s=>window.SITE_I18N?.t(String(s),'en')||s;
const urlFor=(route,lang=currentLang)=>'#/'+(lang==='en'?'en/':'')+route;
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function languageSwitch(compact=false){
 const activeRu=currentLang==='ru', activeEn=!activeRu;
 return `<div class="lang-control ${compact?'lang-compact':''}" role="group" aria-label="${currentLang==='ru'?'Выбор языка':'Choose language'}"><button class="lang-option ${activeRu?'active':''}" type="button" data-lang="ru" aria-pressed="${activeRu}">RU</button><button class="lang-option ${activeEn?'active':''}" type="button" data-lang="en" aria-pressed="${activeEn}">EN</button></div>`;
}
function shell(){
 app.innerHTML=`<div class="mobile-topbar"><button class="mobile-menu-btn" id="menu-button" type="button" aria-label="Открыть меню" aria-expanded="false">${icon('menu',21)}</button><strong>ДИЗАЙН</strong><span class="mobile-page" id="mobile-page">Дашборд</span>${languageSwitch(true)}</div><div class="app-shell"><div class="menu-overlay" id="menu-overlay"></div><aside class="side-panel" id="sidebar" aria-label="Основное меню"><div class="brand">ДИЗАЙН</div><nav class="nav-menu">${NAV.map(item=>`<a class="nav-item" href="${urlFor(item.route)}" data-nav="${item.group}"><span class="nav-icon">${icon(item.icon,19)}</span><span class="nav-label">${item.name}</span></a>`).join('')}</nav><div class="sidebar-spacer"></div><a class="help-card" href="${urlFor('work/all')}" aria-label="Начало аттестации дизайнера"><span class="help-icon">${icon('sparkle',19)}</span><strong>Аттестация<br/>дизайнера</strong><small>e-commerce Laifen</small></a><a class="details-link" data-nav="details" href="${urlFor('details/overview')}">${icon('activity',19)}<span>Подробная аналитика</span>${icon('chevron',15)}</a><div class="language-box"><div class="language-label">ЯЗЫК <span class="language-globe">${icon('external',12)}</span></div>${languageSwitch()}</div><p class="sidebar-hint">ALT + ← / → <span>·</span> ${currentLang==='ru'?'вкладки':'tabs'}</p></aside><main class="main" id="main" tabindex="-1" aria-live="polite"></main></div><div id="toast-container" aria-live="polite"></div><div class="scroll-track" aria-hidden="true"><span id="scroll-progress"></span></div>`;
 document.querySelector('#menu-button').addEventListener('click',()=>toggleMenu());
 document.querySelector('#menu-overlay').addEventListener('click',()=>toggleMenu(false));
 app.addEventListener('click',handleClick);
 app.addEventListener('change',handleFilterChange);
 app.addEventListener('pointermove',handlePointerMove,{passive:true});
 app.addEventListener('pointerover',handleBarHover);
 app.addEventListener('pointerout',handleBarLeave);
 app.addEventListener('focusin',handleBarHover);
 window.addEventListener('hashchange',handleHashChange);
 window.addEventListener('keydown',e=>{
   if(e.key==='Escape'){toggleMenu(false);if(document.fullscreenElement)document.exitFullscreen?.()}
   if(e.key==='ArrowRight'&&e.altKey){e.preventDefault();changeTab(1)}
   if(e.key==='ArrowLeft'&&e.altKey){e.preventDefault();changeTab(-1)}
   if(!e.altKey&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName||'')){
      if(['1','2','3','4'].includes(e.key))location.hash=urlFor(NAV[Number(e.key)-1].route);
   }
 });
 if(!prefersReduced&&window.matchMedia('(pointer:fine)').matches){window.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',((e.clientX/window.innerWidth)-.5).toFixed(2));document.documentElement.style.setProperty('--my',((e.clientY/window.innerHeight)-.5).toFixed(2))},{passive:true});}
 window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('#scroll-progress')?.style.setProperty('--p',`${h>0?window.scrollY/h*100:0}%`)},{passive:true});
 initCustomCursor();
 renderRoute();
}
function getRoute(){const r=decodeURIComponent(location.hash.replace(/^#\/?/,'')).replace(/^(?:en|ru)\//,'');return VALID.has(r)?r:'work/all'}
function getLanguage(){return /^#\/en\//.test(location.hash)?'en':'ru'}
// Keep mobile menu and dashboard in sync: render immediately, without waiting for hashchange.
let skipLanguageHash='';
function handleHashChange(){
 if(skipLanguageHash===location.hash){skipLanguageHash='';return;}
 skipLanguageHash='';renderRoute();
}
function switchLanguage(lang){
 if(lang!=='ru'&&lang!=='en')return;
 const wasOpen=!!document.querySelector('#sidebar')?.classList.contains('menu-open');
 if(lang!==currentLang){
  const next=urlFor(getRoute(),lang);
  skipLanguageHash=next;
  location.hash=next;
  renderRoute();
  if(wasOpen){toggleMenu(false);document.querySelector('#main')?.focus({preventScroll:true});}
 }else{
  if(wasOpen)toggleMenu(false);
  const main=document.querySelector('#main');
  main?.classList.add('language-pulse');
  setTimeout(()=>main?.classList.remove('language-pulse'),380);
 }
}
function toggleMenu(force){const side=document.querySelector('#sidebar');const overlay=document.querySelector('#menu-overlay');const button=document.querySelector('#menu-button');if(!side||!overlay||!button)return;const open=typeof force==='boolean'?force:!side.classList.contains('menu-open');side.classList.toggle('menu-open',open);overlay.classList.toggle('show',open);button.setAttribute('aria-expanded',String(open));button.innerHTML=icon(open?'close':'menu',21);document.body.style.overflow=open?'hidden':'';}
function changeTab(step){const [group,id]=currentRoute.split('/');const set=group==='work'?workTabs:group==='achievements'?winTabs:group==='details'?detailTabs:null;if(!set)return;let idx=set.findIndex(row=>row[0]===id);idx=(idx+step+set.length)%set.length;location.hash=urlFor(group+'/'+set[idx][0]);}
function handleClick(e){
 const lang=e.target.closest('[data-lang]');if(lang){switchLanguage(lang.dataset.lang);return;}
 const link=e.target.closest('a[href^="#/"]');if(link){toggleMenu(false);return;}
 const bar=e.target.closest('.chart-bar');if(bar){const chart=bar.closest('.chart-panel');chart.querySelectorAll('.chart-bar.is-selected').forEach(n=>n.classList.remove('is-selected'));bar.classList.add('is-selected');const feedback=chart.querySelector('.chart-feedback');if(feedback)feedback.textContent=bar.dataset.tip||'';return;}
 const exp=e.target.closest('[data-export]');if(exp){downloadCSV();return;}
 const share=e.target.closest('[data-share]');if(share){copyLink();return;}
 const reset=e.target.closest('[data-reset]');if(reset){detailState.month='all';detailState.format='all';detailState.campaign='all';detailState.trafficMetric='search';detailState.trafficPeriod='oct';renderRoute();}
}
function handleFilterChange(e){const el=e.target.closest('[data-detail-filter]');if(!el)return;const key=el.dataset.detailFilter;if(Object.prototype.hasOwnProperty.call(detailState,key)){detailState[key]=el.value;renderRoute();}}
function handleBarHover(e){const bar=e.target.closest?.('.chart-bar');if(!bar)return;const feedback=bar.closest('.chart-panel')?.querySelector('.chart-feedback');if(feedback)feedback.textContent=bar.dataset.tip||'';}
function handleBarLeave(e){const bar=e.target.closest?.('.chart-bar');if(!bar||bar.contains(e.relatedTarget))return;const chart=bar.closest('.chart-panel');const feedback=chart?.querySelector('.chart-feedback');if(feedback)feedback.textContent=chart.querySelector('.chart-bar.is-selected')?.dataset.tip||'';}
function handlePointerMove(e){if(!window.matchMedia('(pointer:fine)').matches)return;const card=e.target.closest('.panel');if(!card)return;const r=card.getBoundingClientRect();card.style.setProperty('--px',`${((e.clientX-r.left)/r.width)*100}%`);card.style.setProperty('--py',`${((e.clientY-r.top)/r.height)*100}%`)}
function toast(message){const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.innerHTML=`${icon('circlecheck',19)}<span>${escapeText(message)}</span>`;const box=document.querySelector('#toast-container');box.innerHTML='';box.append(el);clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),3400)}
async function copyLink(){try{await navigator.clipboard.writeText(location.href);toast(currentLang==='ru'?'Ссылка на раздел скопирована':'Link copied')}catch(_){toast('Ссылка: '+location.href)}}
function downloadCSV(){
 const page=PAGE_INFO[currentRoute]||{};const isEN=currentLang==='en';
 const main=document.querySelector('#main');
 const loc=(str)=>isEN?window.SITE_I18N.translateText(String(str??'')):String(str??'');
 const title=main?.querySelector('.page-title')?.textContent||loc(page.title);
 const desc=main?.querySelector('.content-desc')?.textContent||loc(page.desc);
 const rows=[[isEN?'Section':'Раздел',title],[isEN?'Description':'Описание',desc],[],
   [isEN?'Metric':'Показатель',isEN?'Value':'Значение',isEN?'Notes':'Примечание']];
 const cards=[...(main?.querySelectorAll('.metric-card')||[])];
 if(cards.length){for(const el of cards)rows.push([el.querySelector('.metric-label')?.textContent||'',el.querySelector('.metric-value')?.textContent||'',el.querySelector('.metric-sub')?.textContent||'']);}
 else for(const m of page.metrics||[])rows.push([loc(m.label),loc(m.value),loc(m.sub||'')]);
 for(const el of main?.querySelectorAll('.feature')||[])rows.push([el.querySelector('.feature-kicker')?.textContent||'',el.querySelector('.feature-number')?.textContent||'',el.querySelector('.feature-caption')?.textContent||'']);
 if(page.csv?.length){rows.push([], [isEN?'Source detail':'Детализация']);for(const r of page.csv)rows.push(r.map(loc));}
 const csv='\ufeff'+rows.map(row=>row.map(cell=>`"${String(cell??'').replaceAll('"','""')}"`).join(';')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download=`design-${currentLang}-${currentRoute.replace('/','-')}.csv`;
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 toast(isEN?'CSV report downloaded':'CSV-отчёт сохранён');
}
function tabs(group,active){const arr=group==='work'?workTabs:group==='achievements'?winTabs:group==='details'?detailTabs:null;if(!arr)return'';return`<nav class="tabs" aria-label="Вкладки раздела">${arr.map(([id,label])=>`<a href="${urlFor(group+'/'+id)}" class="tab ${active===id?'active':''}" ${active===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`}
function header(info,route){const [group,sub]=route.split('/');const eyebrow=group==='details'?'Подробная аналитика / данные Ozon и Figma':`Аттестация / Блок ${group==='work'?1:group==='achievements'?2:group==='problems'?3:4} из 4`;return`<header class="main-header"><div class="header-row"><div><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${info.title}</h1></div><div class="header-actions"><button type="button" class="tiny-action" data-share title="Скопировать ссылку на раздел">${icon('share',15)}<span>Поделиться</span></button><button type="button" class="tiny-action" data-export title="Скачать данные раздела в CSV">${icon('download',15)}<span>CSV</span></button></div></div>${tabs(group,sub)}</header>`}
const info=(label,body,ico='check')=>`<li class="info-item"><span class="info-icon">${icon(ico,16)}</span><span>${body??label}</span></li>`;
const infoList=(items)=>`<ul class="info-list">${items.map(row=>Array.isArray(row)?info('',row[0],row[1]):info('',row)).join('')}</ul>`;
function metricCard(data,index){const val=String(data.value);const canCount=/^[+×~−\-]?[\d\s]+(?:[,.]\d+)?%?$/.test(val)&&!val.includes('→');const count=canCount?' data-animate-number="1"':'';return`<article class="panel metric-card hover-lift reveal" style="--reveal-delay:${index*55}ms"><div class="metric-text"><div class="metric-label">${data.label}</div><div class="metric-value ${val.length>10?'smaller':''}"${count}>${val}</div><div class="metric-sub ${data.tone||''}">${data.sub||'&nbsp;'}</div></div><div class="metric-icon">${icon(data.icon||'sparkle',25)}</div></article>`}
const metricGrid=(rows)=>`<div class="metrics-grid">${rows.map(metricCard).join('')}</div>`;
function panel(title,sub,inner,classes=''){return`<section class="panel panel-pad hover-lift reveal ${classes}"><h2 class="panel-title">${title}</h2>${sub?`<p class="panel-sub">${sub}</p>`:''}${inner}</section>`}
function renderLegend(items){return`<div class="chart-legend">${items.map(item=>`<span class="legend-item"><i class="legend-dot ${item.color||''}"></i>${item.label}</span>`).join('')}</div>`}
const fmt=(n)=>Number(n).toLocaleString(currentLang==='en'?'en-US':'ru-RU',{maximumFractionDigits:1});
/** Accessible data-driven bar chart; each bar is a real button and can be selected. */
function barChart({groups,legend=[],grouped=false,boundary=false,compact=false,max,height='tall',note=''}){
 const peak=max||Math.max(...groups.flatMap(g=>[g.values.reduce((acc,v)=>acc+v.value,0),...g.values.map(v=>v.value)]))*1.13;
 const area=groups.map((g,i)=>{const total=g.values.reduce((s,v)=>s+v.value,0);const pct=Math.max(2,(total/peak)*100);let bars;if(grouped){bars=g.values.map((v,j)=>`<button class="chart-bar grouped ${v.color||'primary'}" style="--height:${Math.max(v.value/peak*100,2)}%;--delay:${i*110+j*90+150}ms" data-tip="${escapeText(`${g.label} · ${v.name||''}: ${fmt(v.value)}${v.unit||''}`)}" aria-label="${escapeText(`${g.label}, ${v.name||''}, ${fmt(v.value)}${v.unit||''}`)}"><span class="bar-top-value">${v.display||fmt(v.value)}</span></button>`).join('')}
 else{bars=`<button class="chart-bar stacked" style="--height:${pct}%;--delay:${i*130+200}ms" data-tip="${escapeText(`${g.label} · всего ${fmt(total)} ${g.unit||'карточек'}`)}" aria-label="${escapeText(`${g.label}, всего ${fmt(total)} ${g.unit||'карточек'}`)}"><span class="bar-stack">${g.values.map(v=>`<span class="segment ${v.color||'primary'}" style="--flex:${v.value}"></span>`).join('')}</span></button><span class="chart-total" style="--height:${pct}%;--delay:${i*130+200}ms">${g.display||fmt(total)}</span>`}
 return`<div class="chart-group"><div class="chart-slot">${bars}</div><div class="chart-group-label">${g.label}</div></div>`}).join('');
 return`<div class="chart-block"><div class="chart-visual ${compact?'compact':''} ${height==='taller'?'taller':''}"><div class="chart-lines"></div><div class="chart-bars">${area}</div>${boundary?'<div class="chart-boundary"><span>22.09 · библиотека компонентов</span></div>':''}</div>${renderLegend(legend)}${note?`<p class="highlight-note">${note}</p>`:''}<div class="chart-feedback" aria-live="polite"></div></div>`;
}
function chartPanel(title,sub,options,{classes='tall'}={}){return`<section class="panel chart-panel hover-lift reveal ${classes}"><div class="chart-head"><h2 class="panel-title">${title}</h2><p class="panel-sub">${sub}</p></div>${barChart(options)}</section>`}
function growthRows(rows){return`<div class="growth-list">${rows.map((r,i)=>`<div class="growth-item"><div class="growth-item-head"><span>${r.name}</span><span class="growth-stat">${r.value} <span class="growth-badge ${r.tone||''}">${r.badge||''}</span></span></div><div class="progress-track"><div class="progress-fill ${r.color||''}" style="--pct:${r.pct}%;--delay:${200+i*120}ms"></div></div></div>`).join('')}</div>`}
function horizontalBars(rows,colour='cyan'){const max=Math.max(...rows.map(r=>r.value));return`<div class="horizontal-list">${rows.map((r,i)=>`<div class="horizontal-row"><div class="name">${r.name}${r.sub?`<small>${r.sub}</small>`:''}</div><div class="progress-track"><div class="progress-fill ${r.color||colour}" style="--pct:${(r.value/max*100).toFixed(1)}%;--delay:${i*90+200}ms"></div></div><span class="measure">${r.show||fmt(r.value)}</span></div>`).join('')}</div>`}
function miniBox(title,value,foot='',color=''){return`<div class="mini-box"><div class="mini-label">${title}</div><div class="mini-value ${color}">${value}</div>${foot?`<div class="mini-foot">${foot}</div>`:''}</div>`}
function bottomCard(title,parts){return`<article class="panel bottom-card hover-lift reveal"><h2 class="panel-title">${title}</h2><div class="mini-grid">${parts.map(p=>miniBox(...p)).join('')}</div></article>`}
function campaignCard(name,description,ico){return`<article class="panel campaign-card hover-lift reveal"><span class="campaign-icon">${icon(ico,19)}</span><h3>${name}</h3><p>${description}</p></article>`}
function noteBanner(content,bright=false,ico='sparkle'){return`<div class="info-banner ${bright?'strong':''} reveal">${!bright?`<span class="info-icon">${icon(ico,19)}</span>`:''}<span>${content}</span></div>`}
const PAGE_INFO={
 'work/all':{
  title:'Что я сделала',desc:'Веду визуал бренда Laifen на маркетплейсах: карточки товара, рекламные кампании, брендзоны на Ozon и Яндекс Маркете, брендбук Orium. Период: 20 июля — 19 ноября.',
  metrics:[{label:'Карточек товара',value:'2 059',sub:'июль — октябрь',icon:'image'},{label:'Рекламных макетов',value:'885',sub:'4 кампании',icon:'megaphone'},{label:'Брендзоны на маркетплейсах',value:'35',sub:'Ozon 18 · Яндекс Маркет 17 макетов',icon:'store',tone:'cyan'},{label:'Брендбук Orium',value:'46',sub:'страниц · фирменный стиль с нуля',icon:'book',tone:'cyan'}],
  csv:[['Июль','92'],['Август','121'],['Сентябрь','965'],['Октябрь','881'],['SKU Ozon: июль','29'],['SKU Ozon: октябрь','53']]},
 'work/start':{
  title:'Июль – август: старт',desc:'20.07 – 20.09 · первые два месяца. Вхожу в работу, карточки собираю вручную — библиотеки компонентов ещё нет.',
  metrics:[{label:'Карточек за 2 месяца',value:'213',sub:'июль + август',icon:'image'},{label:'В среднем',value:'~107',sub:'карточек в месяц',icon:'calendar'},{label:'Вертикальные / квадратные',value:'211 / 2',sub:'3:4 / 1:1',icon:'layers'},{label:'SKU на Ozon',value:'29',sub:'с моими карточками в июле',icon:'box'}],csv:[['Июль','92'],['Август','121']]},
 'work/september':{
  title:'Сентябрь: рывок',desc:'21.09 – 19.10 · работаю на библиотеке компонентов. Выпуск вырос почти в 8 раз к августу, для моделей появились квадратные версии.',
  metrics:[{label:'Карточек за месяц',value:'965',sub:'+697,5% к августу',tone:'green',icon:'image'},{label:'Вертикальные 3:4',value:'528',sub:'основная воронка',icon:'mobile'},{label:'Квадратные 1:1',value:'437',sub:'из тех же компонентов',icon:'square',tone:'cyan'},{label:'Библиотека компонентов',value:'22.09',sub:'запуск системы',icon:'lightning'}],
  csv:[['Air, часы','7'],['Neo, часы','10'],['Neo Special, часы','11.5'],['Swift 4, часы','20.5'],['Swift Premium, часы','21.5'],['Swift Special, часы','8']]},
 'work/october':{
  title:'Октябрь: темп удержан',desc:'20.10 – 19.11 · объём остался на уровне сентября — библиотека работает не разово, а как система.',
  metrics:[{label:'Карточек за месяц',value:'881',sub:'−8,7% к сентябрю — уровень сохранён',icon:'image'},{label:'Вертикальные 3:4',value:'451',sub:'основная воронка',icon:'mobile'},{label:'Квадратные 1:1',value:'430',sub:'из тех же компонентов',tone:'cyan',icon:'square'},{label:'SKU на Ozon',value:'53',sub:'с моими карточками',tone:'green',icon:'box'}],
  csv:[['Сентябрь: вертикальные','528'],['Октябрь: вертикальные','451'],['Сентябрь: квадратные','437'],['Октябрь: квадратные','430'],['Сентябрь: всего','965'],['Октябрь: всего','881']]},
 'work/ads':{
  title:'Рекламные кампании',desc:'885 макетов для четырёх кампаний. Каждый размер и креативный вариант — отдельный макет.',
  metrics:[{label:'Макетов всего',value:'885',sub:'4 кампании',icon:'megaphone'},{label:'Black Friday',value:'445',sub:'50,3% всех макетов',tone:'cyan',icon:'lightning'},{label:'Хэллоуин',value:'180',sub:'20 серий × 9 размеров',icon:'calendar'},{label:'New Year',value:'153',sub:'вкл. 22 промообложки 3:4',icon:'sparkle'}],
  csv:[['Хэллоуин','180'],['11.11','107'],['Black Friday','445'],['New Year','153'],['2832×600','29'],['686×290','25'],['1080×450','20'],['1392×400','17'],['336×336','16']]},
 'achievements/overview':{
  title:'Мои достижения',desc:'Два главных результата: библиотека компонентов ускорила выпуск карточек, а обновлённый контент привёл больше посетителей.',
  metrics:[{label:'Рост выпуска с библиотекой',value:'×8,7',sub:'213 → 1 846 карточек за 2 месяца',icon:'lightning'},{label:'Рост посещений обновлённых карточек',value:'+47%',sub:'неделя сентября → неделя ноября',icon:'eye'}],
  csv:[['До библиотеки','213'],['После библиотеки','1846'],['Рост выпуска','8.7×'],['Рост посещений обновлённых','47.2%'],['Рост показов в поиске','1.97×'],['SKU на Ozon','29 → 53']]},
 'achievements/library':{
  title:'Библиотека компонентов: до и после',desc:'Запустила 22 сентября. Сравниваю два месяца до (20.07 – 20.09) и два месяца после (21.09 – 19.11) по месячным блокам в Figma.',
  metrics:[{label:'До библиотеки',value:'213',sub:'карточек за 2 месяца',icon:'clock'},{label:'После библиотеки',value:'1 846',sub:'карточек за 2 месяца',icon:'image',tone:'green'},{label:'Рост выпуска',value:'×8,7',sub:'за тот же срок',icon:'lightning',tone:'cyan'},{label:'В месяц',value:'107 → 923',sub:'карточек в среднем',icon:'calendar',tone:'green'}],
  csv:[['До: июль','92'],['До: август','121'],['После: сентябрь','965'],['После: октябрь','881'],['До всего','213'],['После всего','1846']]},
 'achievements/visits':{
  title:'Обновлённый контент → посещения',desc:'Неделя 14–20 сентября → неделя 9–15 ноября. Сравниваю модели, которые обновила, с моделями без обновления.',
  metrics:[{label:'Обновлённые модели',value:'+47,2%',sub:'посещения: 5 749 → 8 462',icon:'trend',tone:'green'},{label:'Без обновления',value:'−35,1%',sub:'посещения: 1 974 → 1 282',icon:'warning',tone:'red'},{label:'Показы обновлённых',value:'×1,77',sub:'почти как у остальных',icon:'search'},{label:'Показы без обновления',value:'×1,55',sub:'рост тоже есть',icon:'search'}],
  csv:[['Обновлённые сентябрь','5749'],['Обновлённые ноябрь','8462'],['Без обновления сентябрь','1974'],['Без обновления ноябрь','1282']]},
 'achievements/impressions':{
  title:'Показы и посещения магазина',desc:'Отчёт Ozon «По товарам»: неделя сентября и неделя октября — периоды с сопоставимой рекламой (ДРР 18% и 21%).',
  metrics:[{label:'Показы в поиске',value:'×1,97',sub:'112 647 → 222 131',icon:'search',tone:'cyan'},{label:'Показы всего',value:'+16,2%',sub:'378 317 → 439 637',icon:'eye',tone:'green'},{label:'Посещения карточек',value:'+28,4%',sub:'16 260 → 20 871',icon:'trend',tone:'green'},{label:'ДРР',value:'18% → 21%',sub:'реклама сопоставима',icon:'megaphone'}],
  csv:[['Фены сентябрь','50300'],['Фены октябрь','99900'],['Бритвы и шейверы сентябрь','22300'],['Бритвы и шейверы октябрь','63500'],['Зубные щётки сентябрь','40100'],['Зубные щётки октябрь','58700']]},
};

// Updated from the latest approved Figma copy. Future tests are proposals, not completed actions.
Object.assign(PAGE_INFO,{
  problems:{title:'Проблемы и как я их решаю',desc:'Два рабочих вопроса: какое фото эффективнее и какие карточки обновлять в первую очередь.',metrics:[
    {label:'Эффективность главного фото',value:'?',sub:'Предлагаю тесты по согласованной методике',icon:'image'},
    {label:'Приоритет обновления карточек',value:'2 059',sub:'карточек за отчётный период',icon:'target'}
  ],csv:[['Проблема','Эффективность главного фото'],['Предлагаю','Пилотные тесты в I квартале 2027'],['Проблема','Приоритет обновления карточек'],['Предлагаю','Критерии отбора по показам и посещениям']]},
  plans:{title:'Планы на 2027 год',desc:'Цель — проверить, какие обложки работают лучше, и выбирать приоритетные карточки по данным Ozon.',metrics:[],csv:[['I квартал','Подготовка и пилот фото'],['II квартал','Запуск тестирования по согласованной методике'],['III квартал','Применение результатов проверок'],['IV квартал','Оценка результатов и предложения по СОП']]},
  'details/overview':{title:'Контент Laifen: объём и результат',desc:'Объём контента в Figma и трафик карточек на Ozon с 20 июля.',metrics:[
    {label:'Карточек в Figma',value:'2 059',sub:'июль — октябрь',icon:'image'},
    {label:'Рекламных макетов',value:'885',sub:'4 кампании',icon:'megaphone'},
    {label:'Показы в поиске',value:'×1,97',sub:'октябрь к сентябрю',icon:'search',tone:'cyan'},
    {label:'Посещения, обновлённый контент',value:'+47,2%',sub:'без обновления: −35,1%',icon:'trend',tone:'green'}],csv:[['Июль','92'],['Август','121'],['Сентябрь','965'],['Октябрь','881']]},
  'details/cards':{title:'Карточки товара в Figma',desc:'Страница «Согласованные»: видимые карточки в четырёх месячных блоках, без баннеров, скрытых макетов и секции «Мусор».',metrics:[],csv:[['Июль','92'],['Август','121'],['Сентябрь','965'],['Октябрь','881']]},
  'details/ads':{title:'Рекламные кампании в Figma',desc:'Готовые рекламные макеты на четырёх страницах файла «Реклама». Каждый размер и креативный вариант — отдельный макет.',metrics:[],csv:[['Хэллоуин','180'],['11.11','107'],['Black Friday','445'],['New Year','153']]},
  'details/traffic':{title:'Трафик карточек на Ozon',desc:'Отчёт Ozon «По товарам», по одной полной неделе в сентябре и октябре — периоды с сопоставимой рекламой (ДРР 18% и 21%).',metrics:[],csv:[['Показы в поиске, сентябрь','112647'],['Показы в поиске, октябрь','222131'],['Посещения, сентябрь','16260'],['Посещения, октябрь','20871']]},
});
const PERIODS=[{label:'Июль',values:[{value:92,color:'primary',name:'3:4'}]},{label:'Август',values:[{value:119,color:'primary',name:'3:4'},{value:2,color:'cyan',name:'1:1'}]},{label:'Сентябрь',values:[{value:528,color:'primary',name:'3:4'},{value:437,color:'cyan',name:'1:1'}]},{label:'Октябрь',values:[{value:451,color:'primary',name:'3:4'},{value:430,color:'cyan',name:'1:1'}]}];
const PERIOD_LEGEND=[{label:'3:4 вертикальные',color:''},{label:'1:1 квадратные',color:'cyan'}];

function renderWorkAll(){return`${metricGrid(PAGE_INFO['work/all'].metrics)}<div class="split-main block-gap">${chartPanel('Карточки по месяцам','Страница «Согласованные» в Figma, месячные блоки',{groups:PERIODS,legend:PERIOD_LEGEND,boundary:true,max:1080,height:'taller'})}<section class="panel growth-panel hover-lift reveal"><h2 class="panel-title">Как рос объём</h2><p class="panel-sub">Карточек в каждом блоке и изменение к прошлому</p>${growthRows([{name:'Июль',value:'92',badge:'старт',color:'muted',pct:10},{name:'Август',value:'121',badge:'+31,5%',tone:'positive',color:'muted',pct:13},{name:'Сентябрь',value:'965',badge:'+697,5%',tone:'positive',pct:100},{name:'Октябрь',value:'881',badge:'−8,7%',tone:'neutral',pct:91}])}<p class="growth-note">89,6% всех карточек — в сентябре и октябре, после запуска библиотеки.</p></section></div><div class="three-grid block-gap">${bottomCard('SKU с моими карточками на Ozon',[['Июль','29'],['Октябрь','53','почти ×2','green']])}${bottomCard('Форматы карточек',[['3:4 вертикальные','57,8%','1 190 карточек'],['1:1 квадратные','42,2%','869 карточек','cyan']])}${bottomCard('Рекламные кампании',[['Макетов','885','4 кампании'],['Black Friday','50,3%','445 макетов','cyan']])}</div>`}
function renderWorkStart(){return`${metricGrid(PAGE_INFO['work/start'].metrics)}<div class="equal-split block-gap">${chartPanel('Июль и август','Карточки по месяцам',{groups:PERIODS.slice(0,2),legend:[{label:'3:4',color:''},{label:'1:1',color:'cyan'}],max:142,compact:true,note:'Август к июлю: +31,5%'},{classes:'short'})}${panel('Как я работала','Что было до системы',infoList([['Каждая карточка — с нуля, без общих компонентов и шаблонов.','clock'],['Почти только вертикальные 3:4: квадратных версий 1:1 — всего 2.','mobile'],['Отсюда вывод: нужна система. 22 сентября собрала библиотеку компонентов в Figma.','lightning']]),'')}</div>`}
function renderWorkSep(){const rows=[{name:'Air',sub:'воронка + квадратные',value:7,show:'~7 ч'},{name:'Neo',sub:'воронка + общие карточки',value:10,show:'~10 ч'},{name:'Neo Special',sub:'воронка + правки',value:11.5,show:'~11,5 ч'},{name:'Swift 4',sub:'нейрофотосессия · 2 цвета',value:20.5,show:'~20,5 ч',color:'primary'},{name:'Swift Premium',sub:'нейрофото · все цвета',value:21.5,show:'~21,5 ч',color:'primary'},{name:'Swift Special',sub:'в работе с 02.10',value:8,show:'8+ ч',color:'muted'}];return`${metricGrid(PAGE_INFO['work/september'].metrics)}<div class="split-main block-gap" style="grid-template-columns:minmax(0,1.95fr) minmax(315px,1fr)">${panel('Модели в работе','Часы на воронку модели по моему журналу, 22.09 – 07.10',`${horizontalBars(rows)}<p class="fine-note">Воронки стали сложнее: версии под каждый цвет и нейрофотосессии вместо съёмки.</p>`)}${panel('Что нового в работе','',infoList([['Библиотека компонентов и шаблоны в Figma','layers'],['Нейрофотосессии для обложек — без отдельной съёмки','sparkle'],['Версии карточек под каждый цвет модели','image'],['Шаблон ТЗ — задачи проще согласовывать','check'],['Параллельно: материалы Roborock для сайта и гайдлайны','book']]))}</div>`}
function renderWorkOctober(){return`${metricGrid(PAGE_INFO['work/october'].metrics)}<div class="equal-split block-gap">${chartPanel('Сентябрь и октябрь по форматам','Карточек в месячном блоке',{groups:[{label:'3:4',values:[{value:528,name:'Сентябрь',color:'cyan'},{value:451,name:'Октябрь',color:'primary'}]},{label:'1:1',values:[{value:437,name:'Сентябрь',color:'cyan'},{value:430,name:'Октябрь',color:'primary'}]},{label:'Всего',values:[{value:965,name:'Сентябрь',color:'cyan'},{value:881,name:'Октябрь',color:'primary'}]}],grouped:true,legend:[{label:'Сентябрь',color:'cyan'},{label:'Октябрь',color:''}],max:1070,compact:true},{classes:'short'})}${panel('Итог двух месяцев на библиотеке','21.09 – 19.11',`<div class="mini-grid" style="margin-top:20px">${miniBox('Карточек','1 846','~923 в месяц','green')}${miniBox('Квадратных 1:1','867','было 2','cyan')}</div>${infoList([['Темп не просел после первого месяца — значит, ускорение даёт система, а не рывок.','trend'],['Параллельно шёл сезон акций: Хэллоуин, 11.11, Black Friday — см. вкладку «Реклама».','megaphone']])}`)}</div>`}
function renderWorkAds(){const sizes=[{name:'2832 × 600',value:29},{name:'686 × 290',value:25},{name:'1080 × 450',value:20},{name:'1392 × 400',value:17},{name:'336 × 336',value:16}];return`${metricGrid(PAGE_INFO['work/ads'].metrics)}<div class="equal-split block-gap">${chartPanel('Макеты по кампаниям','Баннеры и промообложки',{groups:[{label:'Хэллоуин',values:[{value:180,color:'primary'}]},{label:'11.11',values:[{value:107,color:'primary'}]},{label:'Black Friday',values:[{value:445,color:'primary'}]},{label:'New Year',values:[{value:131,color:'primary'},{value:22,color:'green'}]}],legend:[{label:'Баннеры',color:''},{label:'Промообложки 3:4',color:'green'}],max:520,compact:true},{classes:'short'})}${panel('11.11 — баннеры по размерам','Пять форматов, px · 107 баннеров',horizontalBars(sizes,'primary'))}</div><div class="four-grid block-gap">${campaignCard('Хэллоуин','20 серий по 9 размеров — один комплект форматов для разных товаров и сюжетов.','calendar')}${campaignCard('11.11','Десктоп и мобильная версия бренд-зоны, категорийные форматы.','store')}${campaignCard('Black Friday','Яндекс Директ, светлые и тёмные стили, бренд-зоны, включая рабочие варианты.','lightning')}${campaignCard('New Year','Баннеры и промообложки 900×1200, концепции Vintage Style и New Year Poster.','sparkle')}</div>`}
function featureCard({theme,ico,kicker,number,caption,parts}){return`<article class="feature ${theme} hover-lift reveal"><span class="feature-icon">${icon(ico,23)}</span><div class="feature-kicker">${kicker}</div><div class="feature-number" data-animate-number="1">${number}</div><div class="feature-caption">${caption}</div><div class="mini-grid">${parts.map(p=>miniBox(...p)).join('')}</div></article>`}
function renderWinsOverview(){return`<div class="feature-grid">${featureCard({theme:'blue',ico:'lightning',kicker:'Библиотека компонентов в Figma · с 22.09',number:'×8,7',caption:'во столько раз больше карточек за тот же срок',parts:[['До · 2 месяца','213','~107 в месяц'],['После · 2 месяца','1 846','~923 в месяц']]})}${featureCard({theme:'teal',ico:'eye',kicker:'Посещения карточек · сентябрь → ноябрь',number:'+47%',caption:'у моделей с обновлённым контентом',parts:[['Обновлённые','+47,2%','5 749 → 8 462'],['Без обновления','−35,1%','1 974 → 1 282']]})}</div><div class="four-grid block-gap">${PAGE_INFO['achievements/overview'].metrics.length? [
 {label:'Показы в поиске',value:'×1,97',sub:'октябрь к сентябрю',icon:'search',tone:'cyan'},
 {label:'SKU на Ozon',value:'29 → 53',sub:'июль → октябрь',icon:'box'},
 {label:'Квадратные версии 1:1',value:'2 → 867',sub:'до и после библиотеки',icon:'square',tone:'cyan'},
 {label:'Брендзоны и брендбук',value:'35 + 46',sub:'макетов брендзон · страниц Orium',icon:'sparkle'}
 ].map(metricCard).join(''):''}</div>`}
function renderWinsLibrary(){return`${metricGrid(PAGE_INFO['achievements/library'].metrics)}<div class="split-main block-gap">${chartPanel('Карточки по месяцам','Граница — запуск библиотеки 22.09',{groups:[{...PERIODS[0],values:[{value:92,color:'muted'}]},{...PERIODS[1],values:[{value:121,color:'muted'}]},PERIODS[2],PERIODS[3]],legend:[{label:'До библиотеки',color:'muted'},{label:'После · 3:4',color:''},{label:'После · 1:1',color:'cyan'}],boundary:true,max:1100,compact:true},{classes:'short'})}${panel('Что даёт библиотека','',infoList([['Квадратные 1:1 собираются из тех же компонентов, что и 3:4: было 2 — стало 867.','square'],['Единые сетки, отступы и плашки для всех линеек — бренд выглядит одинаково.','layers'],['Версии под новые цвета модели собираются на тех же макетах.','image'],['Шаблон ТЗ — меньше вопросов на старте задачи.','check']]))}</div><div class="block-gap">${noteBanner('Рост — в том числе за счёт входа в работу в июле–августе и нейрофотосессий вместо съёмки. Но такой объём без системы компонентов был бы невозможен.')}</div>`}
function renderWinsVisits(){return`${metricGrid(PAGE_INFO['achievements/visits'].metrics)}<div class="equal-split block-gap">${chartPanel('Посещения за неделю','Сентябрь → ноябрь',{groups:[{label:'Обновлённый контент',values:[{value:5749,color:'muted',name:'14–20 сентября',display:'5 749'},{value:8462,color:'primary',name:'9–15 ноября',display:'8 462'}]},{label:'Без обновления',values:[{value:1974,color:'muted',name:'14–20 сентября',display:'1 974'},{value:1282,color:'primary',name:'9–15 ноября',display:'1 282'}]}],legend:[{label:'14–20 сентября',color:'muted'},{label:'9–15 ноября',color:''}],grouped:true,max:9650,compact:true},{classes:'short'})}${panel('Какие модели в группах','',`<p class="highlight-note">Обновлённый контент · 7 моделей</p><div class="tag-list">${['Air','Neo Special','Wave Pro','Wave Pro ABS','Swift 4','Swift Premium','Swift Special'].map(t=>`<span class="tag">${t}</span>`).join('')}</div><p class="highlight-note" style="color:#ff606e;margin-top:19px">Без обновления · 3 модели</p><div class="tag-list">${['P3 Pro Giftbox','Wave','T1 Pro Giftbox'].map(t=>`<span class="tag red">${t}</span>`).join('')}</div>`)}</div><div class="block-gap">${noteBanner('Показы выросли у обеих групп почти одинаково, а посещения — только у обновлённых моделей. Разница — в контенте.',true)}</div>`}
function renderWinsImpressions(){return`${metricGrid(PAGE_INFO['achievements/impressions'].metrics)}<div class="split-main block-gap">${chartPanel('Показы в поиске по категориям','Неделя сентября и неделя октября',{groups:[{label:'Фены',values:[{value:50.3,color:'cyan',name:'Сентябрь',display:'50,3k',unit:' тыс.'},{value:99.9,color:'primary',name:'Октябрь',display:'99,9k',unit:' тыс.'}]},{label:'Бритвы и шейверы',values:[{value:22.3,color:'cyan',name:'Сентябрь',display:'22,3k',unit:' тыс.'},{value:63.5,color:'primary',name:'Октябрь',display:'63,5k',unit:' тыс.'}]},{label:'Зубные щётки',values:[{value:40.1,color:'cyan',name:'Сентябрь',display:'40,1k',unit:' тыс.'},{value:58.7,color:'primary',name:'Октябрь',display:'58,7k',unit:' тыс.'}]}],grouped:true,legend:[{label:'Сентябрь',color:'cyan'},{label:'Октябрь',color:''}],max:116,compact:true},{classes:'short'})}${panel('Почему сентябрь и октябрь','',infoList([['В августе ДРР был 44% — реклама искажает сравнение, поэтому его не беру.','warning'],['В сентябре и октябре реклама сопоставима: ДРР 18% и 21%.','check'],['Показы зависят от алгоритма Ozon, цен и акций — поэтому главная цифра для меня: посещения.','eye']]))}</div>`}
function problemCard({iconName,title,problem,done,request}){return`<article class="panel problem-card hover-lift reveal"><div class="problem-title"><span class="problem-icon">${icon(iconName,22)}</span><h2>${title}</h2></div><div class="problem-detail"><span class="status-tag">Столкнулась</span><p>${problem}</p></div><div class="problem-detail"><span class="status-tag green">Что уже сделала</span><p>${done}</p></div><div class="problem-detail"><span class="status-tag blue">Предлагаю</span><p>${request}</p></div></article>`}
function renderProblems(){return`<div class="problem-grid">${problemCard({iconName:'image',title:'Эффективность главного фото',problem:'Визуально сильная обложка не всегда показывает лучший результат.',done:'Создавала и обновляла визуальный контент карточек товаров для Ozon.',request:'Предлагаю начать с пилотных тестов в I квартале, затем регулярно сравнивать обложки.'})}${problemCard({iconName:'target',title:'Приоритет обновления карточек',problem:'При большом каталоге важно понимать, какие карточки обновлять первыми.',done:'За отчётный период подготовила 2 059 карточек для разных моделей и форматов.',request:'Утвердить критерии отбора: показы, посещения и потенциал улучшения.'})}</div><div class="solution-row">${[
 {title:'Аналитика Ozon',subtitle:'источник данных по показам и посещениям',ico:'trend',tag:'✓ уже есть'},
 {title:'Измеримый результат',subtitle:'+47,2% посещений у обновлённых моделей',ico:'check',tag:'✓ подтверждено'},
 {title:'Следующий шаг',subtitle:'Предложить тесты фото и критерии отбора карточек.',ico:'target',tag:'→ в планах'}
 ].map(x=>`<article class="panel solution-card hover-lift reveal"><div class="line"><span class="solution-icon">${icon(x.ico,19)}</span><span class="status-tag green">${x.tag}</span></div><h3>${x.title}</h3><p>${x.subtitle}</p></article>`).join('')}</div>`}
function renderPlans(){const steps=[
  ['I КВАРТАЛ','Подготовка','Метрики, критерии отбора, пилот фото'],
  ['II КВАРТАЛ','Запуск','Тестировать обложки по согласованной методике'],
  ['III КВАРТАЛ','Применение','Обновлять карточки по результатам проверок'],
  ['IV КВАРТАЛ','Оценка','Подвести итоги и предложить улучшения СОП']
];return`<section class="plan-hero-row"><article class="plan-hero reveal hover-lift"><div class="plan-eyebrow">НАПРАВЛЕНИЕ РАЗВИТИЯ · 2027</div><div class="plan-hero-middle"><span class="plan-year">2027</span><span class="plan-hero-caption"><strong>ВИЗУАЛ</strong><span>по данным Ozon</span></span><span class="plan-target-icon">${icon('target',29)}</span></div><p>Методика → пилот → регулярная оценка</p></article><article class="panel plan-summary reveal hover-lift"><div class="plan-summary-number cyan">ТЕСТЫ</div><h2>Главные фото</h2><p>Частоту определить после пилота</p></article><article class="panel plan-summary reveal hover-lift"><div class="plan-summary-number green">ОТБОР</div><h2>Приоритеты карточек</h2><p>По аналитике и задачам</p></article></section><section class="panel roadmap reveal hover-lift"><div class="roadmap-head"><h2>ПОКВАРТАЛЬНЫЙ ПЛАН</h2><span>2027 · I — IV КВАРТАЛ</span></div><div class="roadmap-line"></div><div class="roadmap-grid">${steps.map((p,i)=>`<div class="roadmap-step"><span class="quarter"><i></i>${p[0]}</span><h3>${p[1]}</h3><p>${p[2]}</p></div>`).join('')}</div></section><section class="panel plan-process reveal"><div><small>УЛУЧШЕНИЕ СОП</small><strong>Данные Ozon → приоритет → проверка → вывод</strong></div><div><small>РАЗВИВАЮ</small><span>Аналитику и тестирование визуала</span></div></section>`}
const RENDERERS={
 'work/all':renderWorkAll,'work/start':renderWorkStart,'work/september':renderWorkSep,
 'work/october':renderWorkOctober,'work/ads':renderWorkAds,
 'achievements/overview':renderWinsOverview,'achievements/library':renderWinsLibrary,
 'achievements/visits':renderWinsVisits,'achievements/impressions':renderWinsImpressions,
 'problems':renderProblems,'plans':renderPlans,...(window.DETAIL_RENDERERS||{}),
};
function syncChrome(route){
 document.documentElement.lang=currentLang==='en'?'en':'ru';
 const group=route.split('/')[0];const main=document.querySelector('#main');
 document.querySelector('.brand').textContent=currentLang==='ru'?'ДИЗАЙН':'DESIGN';
 document.querySelector('.mobile-topbar strong').textContent=currentLang==='ru'?'ДИЗАЙН':'DESIGN';
 document.querySelector('.help-card strong').innerHTML=currentLang==='ru'?'Аттестация<br>дизайнера':'Designer<br>performance review';
 document.querySelector('.help-card').setAttribute('href',urlFor('work/all'));
 const details=document.querySelector('.details-link');details.setAttribute('href',urlFor('details/overview'));
 details.querySelector('span').textContent=currentLang==='ru'?'Подробная аналитика':'Detailed analytics';
 details.classList.toggle('active',group==='details');
 document.querySelectorAll('.language-label').forEach(el=>el.innerHTML=(currentLang==='ru'?'ЯЗЫК':'LANGUAGE')+' <span class="language-globe">'+icon('external',12)+'</span>');
 document.querySelector('.sidebar-hint').innerHTML='ALT + ← / → <span>·</span> '+(currentLang==='ru'?'вкладки':'tabs');
 for(const nav of document.querySelectorAll('.nav-item')){
  const data=NAV.find(n=>n.group===nav.dataset.nav);nav.querySelector('.nav-label').textContent=currentLang==='ru'?data.name:window.SITE_I18N.t(data.name,'en');nav.href=urlFor(data.route);
  nav.classList.toggle('active',nav.dataset.nav===group);
  if(nav.dataset.nav===group)nav.setAttribute('aria-current','page');else nav.removeAttribute('aria-current');
 }
 document.querySelectorAll('.lang-option').forEach(el=>{const active=el.dataset.lang===currentLang;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
 for(const el of document.querySelectorAll('.lang-control'))el.setAttribute('aria-label',currentLang==='ru'?'Выбор языка':'Choose language');
 const mobile=document.querySelector('#mobile-page');mobile.textContent=group==='details'?(currentLang==='ru'?'Аналитика':'Analytics'):(currentLang==='ru'?NAV.find(x=>x.group===group)?.name.slice(3):window.SITE_I18N.t(NAV.find(x=>x.group===group)?.name,'en').slice(3))||'Dashboard';
}
function renderRoute(){
 const route=getRoute();currentLang=getLanguage();const info=PAGE_INFO[route];if(!info)return;
 const main=document.querySelector('#main'),group=route.split('/')[0];
 document.title=(currentLang==='ru'?info.title:window.SITE_I18N.translateText(info.title))+' — '+(currentLang==='ru'?'ДИЗАЙН':'DESIGN');
 syncChrome(route);
 const update=()=>{
  main.innerHTML=`${header(info,route)}<div class="page-content page-enter" data-route="${route}"><p class="content-desc">${info.desc}</p>${RENDERERS[route]()}</div>`;
  main.dataset.current=route;
  if(currentLang==='en')window.SITE_I18N.localizeDOM(main,'en');
  for(const link of main.querySelectorAll('a[href^="#/"]')){
   const path=link.getAttribute('href').replace(/^#\/(?:en\/)?/,'');link.setAttribute('href',urlFor(path));
  }
  initializeMotion(main);
 };
 // The CSS entry/reveal sequence replaces View Transitions, which can stall full-page captures.
 update();
 main.dataset.lang=currentLang;currentRoute=route;
 if(window.scrollY>65)window.scrollTo({top:0,behavior:prefersReduced?'instant':'smooth'});
}
function initializeMotion(root){
 if(scrollObserver)scrollObserver.disconnect();if(countsObserver)countsObserver.disconnect();
 const items=[...root.querySelectorAll('.reveal')];
 if(prefersReduced||!('IntersectionObserver' in window)){items.forEach(el=>el.classList.add('is-visible'));root.querySelectorAll('[data-animate-number]').forEach(el=>el.dataset.done='1');return;}
 scrollObserver=new IntersectionObserver((entries,obs)=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}}},{threshold:.065,rootMargin:'0px 0px -15px 0px'});
 items.forEach((el,i)=>{if(!el.style.getPropertyValue('--reveal-delay'))el.style.setProperty('--reveal-delay',`${Math.min(i*42,360)}ms`);scrollObserver.observe(el)});
 countsObserver=new IntersectionObserver((entries,obs)=>{for(const entry of entries){if(entry.isIntersecting){animateNumber(entry.target);obs.unobserve(entry.target)}}},{threshold:.3});
 root.querySelectorAll('[data-animate-number]').forEach(el=>countsObserver.observe(el));
}
function animateNumber(el){if(el.dataset.done)return;el.dataset.done='1';const value=el.textContent.trim();const m=value.match(/^([+×~−-]?)([\d\s]+(?:[,.]\d+)?)(.*)$/);if(!m)return;
 const prefix=m[1],raw=m[2],suffix=m[3];const target=Number(raw.replace(/\s/g,'').replace(',','.'));if(!Number.isFinite(target)||target<=0||target>100000)return;
 const decimals=(raw.includes(',')?raw.split(',')[1].length:raw.includes('.')?raw.split('.')[1].length:0);
 const duration=1100;const started=performance.now();
 const draw=(now)=>{if(!el.isConnected)return;const t=Math.min(1,(now-started)/duration);const ease=1-Math.pow(1-t,4);const n=target*ease;let result=n.toLocaleString(currentLang==='en'?'en-US':'ru-RU',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});if(decimals===0)result=Math.floor(n).toLocaleString(currentLang==='en'?'en-US':'ru-RU');el.textContent=prefix+result+suffix;if(t<1)requestAnimationFrame(draw);else el.textContent=value};requestAnimationFrame(draw);
}
// Cursor: glowing center dot, delayed orbit and magnetic hover state. Native pointer on touch/reduced-motion.
function initCustomCursor(){
 const canUse=window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!prefersReduced;
 if(!canUse)return;
 const outer=document.createElement('div');outer.className='custom-cursor';outer.setAttribute('aria-hidden','true');
 outer.innerHTML='<div class="cursor-aura"></div><div class="cursor-orbit"><i class="cursor-label">VIEW</i></div><div class="cursor-core"></div>';
 document.body.append(outer);document.body.classList.add('has-custom-cursor');
 let x=-80,y=-80,cx=-80,cy=-80,visible=false;
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;x=e.clientX;y=e.clientY;if(!visible){cx=x;cy=y;visible=true;outer.classList.add('cursor-show')};const target=e.target.closest('button,a,select,.hover-lift,[role="button"]');outer.classList.toggle('cursor-hover',!!target);outer.querySelector('.cursor-label').textContent=target?.dataset?.cursorText||((target?.matches('a,button,select'))?'OPEN':'VIEW');},{passive:true});
 window.addEventListener('pointerdown',()=>outer.classList.add('cursor-pressed'),{passive:true});
 window.addEventListener('pointerup',()=>{outer.classList.remove('cursor-pressed');outer.classList.add('cursor-flash');setTimeout(()=>outer.classList.remove('cursor-flash'),260)},{passive:true});
 document.addEventListener('mouseleave',()=>outer.classList.remove('cursor-show'));
 document.addEventListener('mouseenter',()=>{if(visible)outer.classList.add('cursor-show')});
 const paint=()=>{cx+=(x-cx)*.18;cy+=(y-cy)*.18;outer.style.setProperty('--x',x+'px');outer.style.setProperty('--y',y+'px');outer.style.setProperty('--cx',cx+'px');outer.style.setProperty('--cy',cy+'px');requestAnimationFrame(paint)};requestAnimationFrame(paint);
}
if(!location.hash){try{history.replaceState(null,'',location.pathname+location.search+'#/work/all')}catch(_){/* file:// also works without a hash */}}
shell();
