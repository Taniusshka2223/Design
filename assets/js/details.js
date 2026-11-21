/* Four additional analytical screens from the Figma file. Filters change actual values. */
(() => {
  const months=[
    {id:'jul',label:'Июль',portrait:92,square:0,total:92},
    {id:'aug',label:'Август',portrait:119,square:2,total:121},
    {id:'sep',label:'Сентябрь',portrait:528,square:437,total:965},
    {id:'oct',label:'Октябрь',portrait:451,square:430,total:881},
  ];
  const campaigns=[
    {id:'halloween',label:'Хэллоуин',banners:180,covers:0,total:180,description:'20 серий по 9 размеров — один комплект форматов для разных товаров и сюжетов.'},
    {id:'sale1111',label:'11.11',banners:107,covers:0,total:107,description:'Десктоп и мобильная версия бренд-зоны, категорийные форматы.'},
    {id:'blackfriday',label:'Black Friday',banners:445,covers:0,total:445,description:'Яндекс Директ, светлые и тёмные стили, бренд-зоны, включая рабочие варианты.'},
    {id:'newyear',label:'New Year',banners:131,covers:22,total:153,description:'Баннеры и промообложки 900×1200, концепции Vintage Style и New Year Post.'},
  ];
  const trend={
    search:{label:'Показы в поиске',sep:112647,oct:222131},
    total:{label:'Показы всего',sep:378317,oct:439637},
    visits:{label:'Посещения карточек',sep:16260,oct:20871}
  };
  const opt=(id,label,current)=>`<option value="${id}" ${id===current?'selected':''}>${label}</option>`;
  const filter=(label,key,options,current)=>`<label class="filter"><span>${label}</span><select data-detail-filter="${key}" aria-label="${label}">${options.map(x=>opt(...x,current)).join('')}</select></label>`;
  const filters=(items)=>`<div class="filter-row reveal">${items.join('')}<button class="filter-reset" type="button" data-reset>Сбросить фильтры</button></div>`;
  const detailsOverview=()=>`${metricGrid(PAGE_INFO['details/overview'].metrics)}<div class="equal-split block-gap">${chartPanel('Карточки по месяцам','Макеты в месячных блоках страницы «Согласованные»',{groups:months.map(m=>({label:m.label,values:[{value:m.portrait,color:'primary',name:'3:4'},{value:m.square,color:'cyan',name:'1:1'}]})),legend:[{label:'3:4',color:''},{label:'1:1',color:'cyan'}],max:1100,compact:true},{classes:'short'})}${chartPanel('Рекламные макеты по кампаниям','Каждый размер и креативный вариант — отдельный макет',{groups:campaigns.map(c=>({label:c.label,values:[{value:c.banners,color:'primary',name:'Баннеры'},{value:c.covers,color:'green',name:'Промообложки 3:4'}]})),legend:[{label:'Баннеры',color:''},{label:'Промообложки 3:4',color:'green'}],max:530,compact:true},{classes:'short'})}</div>${noteBanner('За четыре месяца — 2 059 карточек, 89,6% из них сделаны в сентябре и октябре. Рекламных макетов — 885, на Black Friday пришлось 50,3%.',false,'info')}`;
  const detailsCards=()=>{
    const state=detailState;
    const filtered=months.filter(m=>state.month==='all'||m.id===state.month);
    const count=m=>state.format==='portrait'?m.portrait:state.format==='square'?m.square:m.total;
    const total=filtered.reduce((s,m)=>s+count(m),0);
    const portrait=filtered.reduce((s,m)=>s+m.portrait,0),square=filtered.reduce((s,m)=>s+m.square,0);
    const series=filtered.map(m=>({label:m.label,values:state.format==='portrait'?[{value:m.portrait,color:'primary',name:'3:4'}]:state.format==='square'?[{value:m.square,color:'cyan',name:'1:1'}]:[{value:m.portrait,color:'primary',name:'3:4'},{value:m.square,color:'cyan',name:'1:1'}]}));
    return`${filters([
      filter('Месяц','month',[['all','Все месяцы'],...months.map(m=>[m.id,m.label])],state.month),
      filter('Формат','format',[['all','Все'],['portrait','3:4 вертикальные'],['square','1:1 квадратные']],state.format)
    ])}<div class="metrics-grid block-gap">${[
      {label:'Все карточки, июль — октябрь',value:total.toLocaleString('ru-RU'),sub:state.month==='all'?'июль — октябрь':filtered.map(m=>m.label).join(', '),icon:'image'},
      {label:'3:4 вертикальные',value:portrait.toLocaleString('ru-RU'),sub:'57,8% за весь период',icon:'mobile'},
      {label:'1:1 квадратные',value:square.toLocaleString('ru-RU'),sub:'42,2% за весь период',icon:'square'},
      {label:'Форматы карточек',value:state.format==='all'?'3:4 / 1:1':state.format==='portrait'?'3:4':'1:1',sub:'Выберите месяц, чтобы увидеть изменение',icon:'layers'}
    ].map(metricCard).join('')}</div><div class="split-main block-gap">${chartPanel('Динамика объёма контента','Количество карточек в каждом месячном блоке',{groups:series,legend:[{label:'3:4',color:''},{label:'1:1',color:'cyan'}],max:1100,compact:true},{classes:'short'})}${panel('Основные выводы','',infoList([
      ['Июль–август: небольшой объём — 213 карточек за два этапа.','activity'],
      ['Сентябрь: резкий рост до 965 карточек (+697,5%), появляется большой массив квадратных форматов 1:1.','trend'],
      ['Октябрь: 881 карточка (−8,7%) — чуть меньше, но близко к сентябрю.','check'],
      ['Накопленный объём по этапам: 92 → 213 → 1 178 → 2 059.','layers'],
    ]))}</div>`;
  };
  const detailsAds=()=>{
    const list=campaigns.filter(c=>detailState.campaign==='all'||detailState.campaign===c.id);
    const bannerCount=list.reduce((s,c)=>s+c.banners,0), coverCount=list.reduce((s,c)=>s+c.covers,0),total=bannerCount+coverCount;
    return`${filters([filter('Кампания','campaign',[['all','Все кампании'],...campaigns.map(c=>[c.id,c.label])],detailState.campaign)])}<div class="metrics-grid block-gap">${[
      {label:'Все кампании, макетов всего',value:total.toLocaleString('ru-RU'),sub:list.length+' кампании',icon:'megaphone'},
      {label:'Баннеры',value:bannerCount.toLocaleString('ru-RU'),sub:'адаптации под размеры',icon:'layers'},
      {label:'Промообложки 3:4',value:coverCount.toLocaleString('ru-RU'),sub:'промоформат',icon:'image'},
      {label:'Кампания',value:detailState.campaign==='all'?'4':list[0].label,sub:'выбранный набор',icon:'calendar'},
    ].map(metricCard).join('')}</div><div class="equal-split block-gap">${chartPanel('Сравнение объёма контента','Макеты по кампаниям',{groups:list.map(c=>({label:c.label,values:[{value:c.banners,color:'primary',name:'Баннеры'},{value:c.covers,color:'green',name:'Промообложки 3:4'}]})),legend:[{label:'Баннеры',color:''},{label:'Промообложки 3:4',color:'green'}],max:510,compact:true},{classes:'short'})}${panel('11.11 — баннеры по размерам','Пять форматов, px · всего 107',horizontalBars([{name:'2832 × 600',value:29},{name:'686 × 290',value:25},{name:'1080 × 450',value:20},{name:'1392 × 400',value:17},{name:'336 × 336',value:16}],'primary'))}</div><div class="four-grid block-gap">${list.map(c=>campaignCard(c.label,c.description,'megaphone')).join('')}</div>${noteBanner('Число макетов не равно числу уникальных дизайнов: одна концепция адаптируется под несколько размеров.',false,'info')}`;
  };
  const detailsTraffic=()=>{
    const d=detailState;const cur=trend[d.trafficMetric],period=d.trafficPeriod;
    const value=cur[period],other=cur[period==='oct'?'sep':'oct'];
    const diff=100*(value-other)/other;
    const category=[
      {label:'Фены',sep:50.3,oct:99.9},
      {label:'Бритвы и шейверы',sep:22.3,oct:63.5},
      {label:'Зубные щётки',sep:40.1,oct:58.7},
    ];
    return`${filters([
      filter('Месяцы','trafficPeriod',[['sep','Сентябрь'],['oct','Октябрь']],period),
      filter('Показатель','trafficMetric',[['search','Показы в поиске'],['total','Показы всего'],['visits','Посещения']],d.trafficMetric)
    ])}<div class="metrics-grid block-gap">${[
      {label:cur.label,value:value.toLocaleString('ru-RU'),sub:period==='oct'?'Октябрь':'Сентябрь',icon:'search',tone:'cyan'},
      {label:'Сентябрь',value:cur.sep.toLocaleString('ru-RU'),sub:'неделя сентября',icon:'calendar'},
      {label:'Октябрь',value:cur.oct.toLocaleString('ru-RU'),sub:'неделя октября',icon:'calendar'},
      {label:'ДРР',value:'18% → 21%',sub:'реклама сопоставима',icon:'megaphone'},
    ].map(metricCard).join('')}</div><div class="equal-split block-gap">${chartPanel('Показы в поиске по категориям','Неделя сентября и неделя октября',{groups:category.map(c=>({label:c.label,values:[{value:c.sep,color:'cyan',name:'Сентябрь',display:String(c.sep).replace('.',',')+'k'},{value:c.oct,color:'primary',name:'Октябрь',display:String(c.oct).replace('.',',')+'k'}]})),legend:[{label:'Сентябрь',color:'cyan'},{label:'Октябрь',color:''}],grouped:true,max:115,compact:true},{classes:'short'})}${panel('Всего по магазину','Неделя каждого месяца',infoList([
      ['Сентябрь · 14.09–20.09: 112 647 показов в поиске, ДРР 18%.','calendar'],
      ['Октябрь · 26.10–01.11: 222 131 показ в поиске, ДРР 21%.','trend'],
      ['Показы в поиске, октябрь к сентябрю: ×1,97. Показы зависят от алгоритма Ozon, цен, акций и рекламы.','info'],
    ]))}</div><div class="block-gap">${chartPanel('Посещения карточек: обновлённый контент и без обновления','Неделя 14–20 сентября → неделя 9–15 ноября',{groups:[{label:'Обновлённый контент',values:[{value:5749,color:'cyan',name:'14–20 сентября',display:'5 749'},{value:8462,color:'primary',name:'9–15 ноября',display:'8 462'}]},{label:'Без обновления',values:[{value:1974,color:'cyan',name:'14–20 сентября',display:'1 974'},{value:1282,color:'primary',name:'9–15 ноября',display:'1 282'}]}],grouped:true,legend:[{label:'14–20 сентября',color:'cyan'},{label:'9–15 ноября',color:''}],max:9800,compact:true},{classes:'short'})}</div>${noteBanner('Показы выросли у обеих групп почти одинаково, а посещения — только у моделей с обновлённым контентом. Без обновления: P3 Pro Giftbox, Wave, T1 Pro Giftbox.',false,'info')}`;
  };
  window.DETAIL_RENDERERS={
    'details/overview':detailsOverview,
    'details/cards':detailsCards,
    'details/ads':detailsAds,
    'details/traffic':detailsTraffic,
  };
})();
