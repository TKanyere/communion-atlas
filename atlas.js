const eras = ["Early councils", "Imperial church", "East and West", "Reformation", "Modern era"];
const types = {e:"Ecumenical Council",p:"Great Orthodox Council",c:"Council",s:"Schism or separation",r:"Reconciliation or dialogue",m:"Movement or milestone"};
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
  luther:"lutheran", anabaptist:"anabaptist", anglican:"anglican", reformed:"reformed",
  trent:"roman", baptist:"baptist", methodist:"methodist", pentecostal:"pentecostal",
  vatican:"roman", havana:"roman", "old-believers":"old", ephesus:"east", chalcedon:"oriental"
};
const chronology = atlasTimeline;
const viewport = document.querySelector("#viewport");
const chart = document.querySelector("#chart");
const detail = document.querySelector("#detail");
const scrub = document.querySelector("#scrub");
const jump = document.querySelector("#jump");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const zoom = document.querySelector("#zoom");
const eventIndex = id => chronology.findIndex(event => event.id === id);
let selected = Math.max(0, eventIndex(location.hash.slice(1)));
let spacing = 184;
let pointer;
let dragged = false;

jump.innerHTML = eras.map((era,index) =>
  `<optgroup label="${era}">${chronology.filter(event => event.era === index).map(event =>
    `<option value="${event.id}">${event.date} · ${event.title}</option>`).join("")}</optgroup>`).join("");
scrub.max = chronology.length - 1;

function renderChart() {
  const x = index => spacing * index + spacing / 2;
  const width = chronology.length * spacing;
  const main = tracks.orthodox.lane;
  chart.style.width = width + "px";
  const paths = Object.entries(tracks).filter(([key]) => key !== "orthodox").map(([key, track]) => {
    const start = x(eventIndex(track.start));
    // The Swiss reform movement predates Calvin's Geneva milestone.
    const parentLane = key === "anabaptist" ? tracks.roman.lane : tracks[track.parent]?.lane;
    const connector = parentLane === undefined ?
      `<path class="branch-line dotted" stroke="${track.color}" d="M${start-44} ${track.lane}H${start}"/>` :
      `<path class="branch-line ${track.dotted ? "dotted" : ""}" stroke="${track.color}"
        d="M${start-44} ${parentLane} C${start-12} ${parentLane} ${start-26} ${track.lane} ${start} ${track.lane}"/>`;
    return `${connector}<path class="branch-line" stroke="${track.color}" d="M${start} ${track.lane}H${width}"/>`;
  });
  const branchLabels = Object.values(tracks).flatMap(track => {
    const start = eventIndex(track.start);
    const indices = [];
    for (let index = start; index < chronology.length; index += 4) indices.push(index);
    return indices.map(index => `<button class="branch-label" style="--track-color:${track.color};left:${Math.min(x(index)+13,width-162)}px;top:${track.lane - 11}px" data-index="${start}">${track.label}</button>`);
  });
  chart.innerHTML = `
    <svg viewBox="0 0 ${width} 476" aria-hidden="true"><path class="trunk" d="M0 ${main}H${width}"/>${paths.join("")}</svg>
    ${chronology.map((event,index) => {
      const newEra = index === 0 || chronology[index - 1].era !== event.era;
      const track = tracks[eventTracks[event.id]] ?? tracks.orthodox;
      const kind = event.type.includes("s") ? "s" : event.type[0];
      return `${newEra ? `<div class="era" style="left:${index*spacing}px;width:${chronology.filter(item=>item.era===event.era).length*spacing}px">${eras[event.era]}</div>` : ""}
        <button class="event ${kind}" data-index="${index}" style="left:${x(index)}px;--drop:${track.lane - 34}px">
          <span class="event-date">${event.date}</span><span class="event-title">${event.title}</span>
          <span class="stem"></span><span class="point"></span>
        </button>`;
    }).join("")}
    ${branchLabels.join("")}`;
}

function select(index, scroll = true) {
  if (!chronology[index]) return;
  selected = index;
  const event = chronology[index];
  history.replaceState(null, "", "#" + event.id);
  scrub.value = index;
  scrub.setAttribute("aria-valuetext", event.date + " " + event.title);
  jump.value = event.id;
  prev.disabled = index === 0;
  next.disabled = index === chronology.length - 1;
  document.querySelector("#position").textContent = `${index + 1} / ${chronology.length}`;
  document.querySelector("#announcement").textContent = event.date + " · " + event.title;
  chart.querySelectorAll("[data-index]").forEach(button =>
    button.setAttribute("aria-current", Number(button.dataset.index) === index));
  detail.innerHTML = `
    <div class="detail-heading"><div class="eyebrow">${event.date} · ${[...event.type].map(type => types[type]).join(" · ")}</div>
      <h2>${event.title}</h2><p>${event.place}</p></div>
    <div class="detail-body"><p>${event.account}</p><p><strong>What followed.</strong> ${event.outcome}</p>
      ${event.notes ? `<div class="council-notes">${event.notes.map(([heading,body]) =>
        `<section><h3>${heading}</h3><p>${body}</p></section>`).join("")}</div>` : ""}
      ${event.groups.length ? `<div class="groups" aria-label="Groups involved">${event.groups.map(group => `<span>${group}</span>`).join("")}</div>` : ""}
      <div class="refs" aria-label="Sources">${event.refs.map(ref => {
        const [title,url] = sources[ref];
        return `<a href="${url}" target="_blank" rel="noopener">${title} ↗</a>`;
      }).join("")}</div></div>`;
  if (scroll) viewport.scrollTo({
    left: spacing * (index + .5) - viewport.clientWidth / 2,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
  });
}

chart.addEventListener("click", event => {
  const button = event.target.closest("[data-index]");
  if (button && !dragged) select(Number(button.dataset.index));
});
prev.addEventListener("click", () => select(selected - 1));
next.addEventListener("click", () => select(selected + 1));
jump.addEventListener("change", () => select(eventIndex(jump.value)));
scrub.addEventListener("input", () => select(Number(scrub.value)));
zoom.addEventListener("click", () => {
  const expanded = spacing === 184;
  spacing = expanded ? 242 : 184;
  zoom.setAttribute("aria-pressed", expanded);
  zoom.textContent = expanded ? "Compact spacing" : "Expand spacing";
  renderChart();
  select(selected);
});
viewport.addEventListener("keydown", event => {
  const step = {ArrowLeft:-1, ArrowRight:1}[event.key];
  if (!step) return;
  event.preventDefault();
  select(selected + step);
  if (event.target.closest(".event")) {
    chart.querySelector(`.event[data-index="${selected}"]`).focus({preventScroll:true});
  }
});
viewport.addEventListener("pointerdown", event => {
  dragged = false;
  if (event.pointerType !== "mouse" || event.button !== 0) return;
  pointer = {id:event.pointerId, x:event.clientX, offset:viewport.scrollLeft};
});
viewport.addEventListener("pointermove", event => {
  if (!pointer || event.pointerId !== pointer.id) return;
  const movement = event.clientX - pointer.x;
  if (!dragged && Math.abs(movement) < 7) return;
  dragged = true;
  viewport.setPointerCapture(pointer.id);
  viewport.classList.add("dragging");
  viewport.scrollLeft = pointer.offset - movement;
});
function endDrag() {
  pointer = undefined;
  viewport.classList.remove("dragging");
}
window.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);
viewport.addEventListener("lostpointercapture", endDrag);
renderChart();
select(selected, selected !== 0);
