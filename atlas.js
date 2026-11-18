const eras = ["Early councils", "Imperial church", "East and West", "Reformation", "Modern era"];
const types = {b:"Scripture and canon milestone",e:"Ecumenical Council",p:"Great Orthodox Council",c:"Council",s:"Schism or separation",r:"Reconciliation or dialogue",m:"Movement or milestone"};
const tracks = {
  orthodox: {lane:110, label:"Eastern Orthodox", start:"great-schism", color:"#e6bf75"},
  east: {lane:141, label:"Church of the East", start:"ephesus", parent:"orthodox", color:"#ed9c85"},
  oriental: {lane:172, label:"Oriental Orthodox", start:"chalcedon", parent:"orthodox", color:"#dfb9e6"},
  old: {lane:203, label:"Old Believers", start:"old-believers", parent:"orthodox", color:"#edbca0"},
  roman: {lane:234, label:"Roman Catholic", start:"great-schism", parent:"orthodox", color:"#83d9d2"},
  lutheran: {lane:265, label:"Lutheran", start:"luther", parent:"roman", color:"#9ebcf1"},
  anabaptist: {lane:296, label:"Anabaptist", start:"anabaptist", parent:"reformed", dotted:true, color:"#a9d4a0"},
  reformed: {lane:327, label:"Reformed / Presbyterian", start:"reformed", parent:"roman", color:"#eab1ce"},
  anglican: {lane:358, label:"Anglican", start:"anglican", parent:"roman", color:"#adb3ee"},
  baptist: {lane:389, label:"Baptist", start:"baptist", parent:"anglican", dotted:true, color:"#e3bd8c"},
  methodist: {lane:420, label:"Methodist", start:"methodist", parent:"anglican", color:"#b5c99c"},
  pentecostal: {lane:451, label:"Pentecostal", start:"pentecostal", dotted:true, color:"#c6afe8"}
};
const eventTracks = {
  "luther-bible-1534":"lutheran", "westminster-1646":"reformed",
  luther:"lutheran", anabaptist:"anabaptist", anglican:"anglican", reformed:"reformed",
  trent:"roman", baptist:"baptist", methodist:"methodist", pentecostal:"pentecostal",
  vatican:"roman", havana:"roman", "old-believers":"old", ephesus:"east", chalcedon:"oriental"
};
const chronology = atlasTimeline;
const viewport = document.querySelector('#viewport');
const chart = document.querySelector('#chart');
const detail = document.querySelector('#detail');
const scrub = document.querySelector('#scrub');
const jump = document.querySelector('#jump');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const zoom = document.querySelector('#zoom');
const fit = document.querySelector('#fit');
const dialog = document.querySelector('#glossary-dialog');
const filterControls = Object.fromEntries(['tradition','event-type','council-category','topic','from-year','to-year'].map(id=>[id,document.getElementById(id)]));
const eventIndex = id => chronology.findIndex(event=>event.id===id);
let selected = Math.max(0,eventIndex(location.hash.slice(1)));
let spacing = 184;
let wholeHistory = false;
let visibleIndices = [];
let pointer;
let dragged = false;

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
function refs(keys) {
  return keys.map(key=>{const [title,url]=sources[key]; return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(title)} ↗</a>`;}).join('');
}
const termPattern = new RegExp('\\b(' + Object.keys(glossary).sort((a,b)=>b.length-a.length).join('|') + ')\\b','gi');
function explain(text) {
  return escapeHtml(text).replace(termPattern,match=>{
    const term = Object.keys(glossary).find(key=>key.toLowerCase()===match.toLowerCase());
    return `<button class="term" data-term="${term}" aria-label="Explain ${term}">${match}</button>`;
  });
}
function activeTracks() {
  const tradition = filterControls.tradition.value;
  if (tradition==='all') return Object.keys(tracks);
  const ancestry = [tradition];
  let parent = tracks[tradition].parent;
  while (parent) {
    ancestry.push(parent);
    parent = tracks[parent].parent;
  }
  if (tradition==='pentecostal') ancestry.push('methodist','anglican','roman','orthodox');
  return ancestry;
}
function matches(event) {
  const values = Object.fromEntries(Object.entries(filterControls).map(([key,control])=>[key,control.value]));
  const kind = values['event-type'];
  const council = ['e','p','c'].some(type=>event.type.includes(type));
  return (values.tradition==='all' || event.traditions.includes(values.tradition)) &&
    (kind==='all' || (kind==='council' ? council : kind==='m' ? ['luther','anabaptist','anglican','reformed','baptist','methodist','pentecostal'].includes(event.id) : event.type.includes(kind))) &&
    (values['council-category']==='all' || event.type.includes(values['council-category'])) &&
    (values.topic==='all' || event.topics.includes(values.topic)) &&
    event.endYear>=Number(values['from-year'] || 325) && event.year<=Number(values['to-year'] || 2022);
}
function renderProfile() {
  const key = filterControls.tradition.value;
  const panel = document.querySelector('#profile');
  panel.hidden = key==='all';
  document.querySelectorAll('[data-tradition]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.tradition===key));
  if (key==='all') return;
  const profile = profiles[key];
  panel.innerHTML = `<div><div class="eyebrow">TRADITION PROFILE</div><h2>${tracks[key].label}</h2><p>${profile.origin}</p></div><div><p>${profile.belief}</p><p>${profile.relationship}</p><div class="refs">${refs(profile.refs)}</div><button data-go="${tracks[key].start}">Open the origin event →</button></div>`;
}
function renderChart() {
  const labelWidth = viewport.clientWidth<600 ? 124 : 180;
  const plotWidth = wholeHistory ? viewport.clientWidth-labelWidth : chronology.length*spacing;
  const gap = wholeHistory ? plotWidth/chronology.length : spacing;
  const x = index => gap*(index+.5);
  const width = wholeHistory ? viewport.clientWidth : plotWidth;
  const active = activeTracks();
  chart.style.width = width+'px';
  chart.classList.toggle('overview',wholeHistory);
  const paths = Object.entries(tracks).filter(([key])=>key!=='orthodox').map(([key,track])=>{
    const start = x(eventIndex(track.start));
    const parentLane = key==='anabaptist' ? tracks.roman.lane : tracks[track.parent]?.lane;
    const bend = Math.min(44,gap*.7);
    const connector = parentLane===undefined ? `<path class="branch-line dotted" stroke="${track.color}" d="M${start-bend} ${track.lane}H${start}"/>` :
      `<path class="branch-line ${track.dotted?'dotted':''}" stroke="${track.color}" d="M${start-bend} ${parentLane}C${start-bend/4} ${parentLane} ${start-bend/2} ${track.lane} ${start} ${track.lane}"/>`;
    return `<g opacity="${active.includes(key)?1:.14}">${connector}<path class="branch-line" stroke="${track.color}" d="M${start} ${track.lane}H${plotWidth}"/></g>`;
  });
  const labels = wholeHistory ? Object.entries(tracks).map(([key,track])=>`<button class="branch-label overview-label ${active.includes(key)?'':'muted-track'}" style="--track-color:${track.color};left:${plotWidth+7}px;top:${track.lane-11}px;width:${labelWidth-14}px" data-profile="${key}" title="${track.label}">${track.label}</button>`) : Object.entries(tracks).flatMap(([key,track])=>{
    const indices=[];
    for(let index=eventIndex(track.start);index<chronology.length;index+=4) indices.push(index);
    return indices.map(index=>`<button class="branch-label ${active.includes(key)?'':'muted-track'}" style="--track-color:${track.color};left:${Math.min(x(index)+13,width-162)}px;top:${track.lane-11}px" data-profile="${key}" aria-label="About ${track.label}">${track.label}</button>`);
  });
  chart.innerHTML = `<svg viewBox="0 0 ${width} 476" aria-hidden="true"><path class="trunk" d="M0 110H${plotWidth}"/>${paths.join('')}</svg>
    ${chronology.map((event,index)=>{
      const newEra=index===0 || chronology[index-1].era!==event.era;
      const track=tracks[eventTracks[event.id]] ?? tracks.orthodox;
      const kind=event.type.includes('s')?'s':event.type[0];
      const included=visibleIndices.includes(index);
      return `${newEra&&!wholeHistory?`<div class="era" style="left:${index*gap}px;width:${chronology.filter(item=>item.era===event.era).length*gap}px">${eras[event.era]}</div>`:''}
      <button class="event ${kind} ${included?'':'filtered'}" data-index="${index}" title="${escapeHtml(event.date+' · '+event.title)}" aria-label="${escapeHtml(event.date+' · '+event.title)}" ${included?'':'disabled'} aria-current="${selected===index}" style="left:${x(index)}px;--drop:${track.lane-34}px">
      <span class="event-date">${event.date}</span><span class="event-title">${event.title}</span><span class="stem"></span><span class="point"></span></button>`;
    }).join('')}${labels.join('')}`;
}
function renderDetail() {
  if (!visibleIndices.length) {
    detail.innerHTML='<p class="empty">No events match these filters. Adjust the date range or reset the filters.</p>';
    return;
  }
  const event=chronology[selected];
  const reception=event.reception;
  detail.innerHTML=`<div class="detail-heading"><div class="eyebrow">${event.date} · ${[...event.type].map(type=>types[type]).join(' · ')}</div><h2>${event.title}</h2><p>${event.place}</p><div class="topic-tags">${event.topics.map(topic=>`<button data-topic="${topic}">${topics[topic]}</button>`).join('')}</div></div>
  <div class="detail-body"><p>${explain(event.account)}</p><p><strong>What followed.</strong> ${explain(event.outcome)}</p>
  ${event.notes?`<div class="council-notes">${event.notes.map(([heading,body])=>`<section><h3>${heading}</h3><p>${explain(body)}</p></section>`).join('')}</div>`:''}
  ${event.people.length?`<section class="additional"><h3>Key figures</h3><dl class="people">${event.people.map(([name,role])=>`<div><dt>${name}</dt><dd>${role}</dd></div>`).join('')}</dl></section>`:''}
  ${reception?`<section class="additional"><h3>Participation and reception</h3><dl class="reception">${['Who took part','How it was received','Standing and disputes'].map((heading,index)=>`<div><dt>${heading}</dt><dd>${explain(reception[index])}</dd></div>`).join('')}</dl></section>`:''}
  ${event.groups.length?`<div class="groups" aria-label="Groups involved">${event.groups.map(group=>`<span>${group}</span>`).join('')}</div>`:''}
  <div class="refs" aria-label="Sources">${refs(event.refs)}</div>
  ${event.related.length?`<section class="additional"><h3>Connected events</h3><div class="related">${event.related.map(id=>{const related=chronology[eventIndex(id)];return `<button data-go="${id}"><span>${related.date}</span>${related.title} →</button>`;}).join('')}</div></section>`:''}</div>`;
}
function select(index,scroll=true) {
  if (!chronology[index] || !visibleIndices.includes(index)) return;
  selected=index;
  const event=chronology[index];
  history.replaceState(null,'','#'+event.id);
  scrub.value=visibleIndices.indexOf(index);
  scrub.setAttribute('aria-valuetext',event.date+' '+event.title);
  jump.value=event.id;
  prev.disabled=visibleIndices.indexOf(index)===0;
  next.disabled=visibleIndices.indexOf(index)===visibleIndices.length-1;
  document.querySelector('#position').textContent=`${visibleIndices.indexOf(index)+1} / ${visibleIndices.length}`;
  document.querySelector('#announcement').textContent=event.date+' · '+event.title;
  chart.querySelectorAll('[data-index]').forEach(button=>button.setAttribute('aria-current',Number(button.dataset.index)===index));
  renderDetail();
  if(scroll&&!wholeHistory) viewport.scrollTo({left:spacing*(index+.5)-viewport.clientWidth/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function applyFilters(scroll=true) {
  visibleIndices=chronology.map((event,index)=>matches(event)?index:-1).filter(index=>index>=0);
  jump.innerHTML=eras.map((era,index)=>{
    const events=visibleIndices.filter(i=>chronology[i].era===index);
    return events.length?`<optgroup label="${era}">${events.map(i=>`<option value="${chronology[i].id}">${chronology[i].date} · ${chronology[i].title}</option>`).join('')}</optgroup>`:'';
  }).join('');
  const empty=!visibleIndices.length;
  jump.disabled=empty;
  scrub.disabled=empty;
  scrub.max=Math.max(0,visibleIndices.length-1);
  document.querySelector('#filter-status').textContent=`${visibleIndices.length} of ${chronology.length} events match. Earlier branches remain visible for context.${wholeHistory?' Whole-history view. Select a marker to read its details.':''}`;
  renderProfile();
  renderChart();
  if(empty){prev.disabled=true;next.disabled=true;document.querySelector('#position').textContent='0 / 0';renderDetail();}
  else select(visibleIndices.includes(selected)?selected:visibleIndices[0],scroll);
}
function resetFilters() {
  for(const [id,control] of Object.entries(filterControls)) control.value=id==='from-year'?'325':id==='to-year'?'2022':'all';
}
function openEvent(id) {
  const index=eventIndex(id);
  if(index<0)return;
  const resetNeeded=!matches(chronology[index]);
  if(resetNeeded) resetFilters();
  selected=index;
  applyFilters();
  if(resetNeeded)document.querySelector('#filter-status').textContent+=' Filters reset to open the connected event.';
  detail.scrollIntoView({block:'start'});
}
function openGlossary(term) {
  const terms=term?[term]:Object.keys(glossary);
  document.querySelector('#glossary-title').textContent=term||'Theological glossary';
  document.querySelector('#glossary-content').innerHTML=terms.map(key=>`<section><h3>${key}</h3><p>${glossary[key][0]}</p><div class="refs">${refs([glossary[key][1]])}</div></section>`).join('');
  dialog.showModal();
}
for(const [key,track] of Object.entries(tracks)) filterControls.tradition.add(new Option(track.label,key));
for(const [key,label] of Object.entries(topics)) filterControls.topic.add(new Option(label,key));
document.querySelector('#track-picker').innerHTML=Object.entries(tracks).map(([key,track])=>`<button data-tradition="${key}" style="--track-color:${track.color}" aria-pressed="false">${track.label}</button>`).join('');
for(const [id,control] of Object.entries(filterControls)) control.addEventListener(id.endsWith('year')?'input':'change',()=>applyFilters());
document.querySelector('#reset').addEventListener('click',()=>{resetFilters();applyFilters();});
document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button)return;
  const action=button.dataset;
  if(action.go) openEvent(action.go);
  else if(action.term)openGlossary(action.term);
  else if(action.topic){filterControls.topic.value=action.topic;applyFilters();}
  else if(action.profile||action.tradition){
    const key=action.profile||action.tradition;
    filterControls.tradition.value=filterControls.tradition.value===key?'all':key;
    applyFilters(false);
  }else if(action.index!==undefined&&!dragged)select(Number(action.index));
});
prev.addEventListener('click',()=>select(visibleIndices[visibleIndices.indexOf(selected)-1]));
next.addEventListener('click',()=>select(visibleIndices[visibleIndices.indexOf(selected)+1]));
jump.addEventListener('change',()=>select(eventIndex(jump.value)));
scrub.addEventListener('input',()=>select(visibleIndices[Number(scrub.value)]));
fit.addEventListener('click',()=>{
  wholeHistory=!wholeHistory;
  fit.setAttribute('aria-pressed',wholeHistory);
  fit.textContent=wholeHistory?'Return to detailed timeline':'Fit entire history';
  zoom.disabled=wholeHistory;
  applyFilters(!wholeHistory);
  if(wholeHistory)viewport.scrollLeft=0;
});
zoom.addEventListener('click',()=>{
  const expanded=spacing===184;
  spacing=expanded?242:184;
  zoom.setAttribute('aria-pressed',expanded);
  zoom.textContent=expanded?'Compact spacing':'Expand spacing';
  renderChart();select(selected);
});
document.querySelector('#glossary-open').addEventListener('click',()=>openGlossary());
document.querySelector('#glossary-close').addEventListener('click',()=>dialog.close());
viewport.addEventListener('keydown',event=>{
  const step={ArrowLeft:-1,ArrowRight:1}[event.key];
  if(!step)return;
  event.preventDefault();
  select(visibleIndices[visibleIndices.indexOf(selected)+step]);
  if(event.target.closest('.event'))chart.querySelector(`.event[data-index="${selected}"]`)?.focus({preventScroll:true});
});
viewport.addEventListener('pointerdown',event=>{
  dragged=false;
  if(event.pointerType==='mouse'&&event.button===0&&!wholeHistory)pointer={id:event.pointerId,x:event.clientX,offset:viewport.scrollLeft};
});
viewport.addEventListener('pointermove',event=>{
  if(!pointer||event.pointerId!==pointer.id)return;
  const movement=event.clientX-pointer.x;
  if(!dragged&&Math.abs(movement)<7)return;
  dragged=true;viewport.setPointerCapture(pointer.id);viewport.classList.add('dragging');viewport.scrollLeft=pointer.offset-movement;
});
function endDrag(){pointer=undefined;viewport.classList.remove('dragging');}
window.addEventListener('pointerup',endDrag);
viewport.addEventListener('pointercancel',endDrag);
viewport.addEventListener('lostpointercapture',endDrag);
window.addEventListener('resize',()=>{if(wholeHistory)renderChart();});
window.addEventListener('hashchange',()=>openEvent(location.hash.slice(1)));
applyFilters(selected!==0);
