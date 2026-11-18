Object.assign(sources, {
  eusebiusCanon:['Eusebius · Church History, III.25','https://www.newadvent.org/fathers/250103.htm'],
  athanasiusCanon:['St Athanasius · Festal Letter 39, §§4–7','https://www.newadvent.org/fathers/2806039.htm'],
  carthageCanon:['African Code · Canon 24, with historical notes','https://en.wikisource.org/wiki/Nicene_and_Post-Nicene_Fathers%3A_Series_II/Volume_XIV/Additional_Canons_3/The_Canons_of_Carthage/Canons/Canon_XXIV'],
  trulloCanon:['Council in Trullo · Canon 2','https://www.newadvent.org/fathers/3814.htm'],
  canonStudy:['Ekaterini Tsalampouni · The New Testament Canon from the Orthodox Perspective','https://nz-theology.ucu.edu.ua/wp-content/uploads/2018/01/tsalampouni-the-new-testament-canon-from-the-orthodox-perspective.pdf'],
  lutherBible:['Lutheran School of Theology at Chicago · The 1534 Bible','https://gruber.lstc.edu/luthers_bible/1534.php'],
  trentCanon:['Council of Trent · Session IV, 8 April 1546','https://history.hanover.edu/texts/trent/trentall.html'],
  westminsterCanon:['Orthodox Presbyterian Church · Westminster Confession, I.2–3','https://opc.org/WCF-WIP.html'],
  dositheusCanon:['Confession of Dositheus · Question III','https://www.bibliatheo.com/texts/the-confession-of-dositheus-patriarch-of-jerusalem/the-confession-of-dositheus-patriarch-of-jerusalem/22']
});
const canonMilestones = [
  {
    id:'eusebius-canon', date:'c. 325', era:0, type:'b',
    title:'Eusebius · Accepted and disputed books', place:'Caesarea, Palestine',
    account:'In Church History, III.25, Eusebius distinguished widely accepted Christian writings from disputed and rejected works. James, Jude, 2 Peter and 2–3 John appear among writings whose reception he describes as disputed.',
    outcome:'His account preserves evidence of how churches received different books. The later convergence on the 27-book New Testament can be followed through subsequent lists and decisions.',
    notes:[['Type of witness','A historian’s report of reception across churches. Eusebius was describing the evidence available to him.'],['A revealing example','His treatment of Revelation reflects uncertainty about its reception. Reading his categories alongside Athanasius’s later list makes the process of recognition visible.']],
    groups:['Early Christian churches'], refs:['eusebiusCanon','canonStudy']
  },
  {
    id:'athanasius-367', date:'367', era:0, type:'b',
    title:'St Athanasius · The 27 New Testament books', place:'Alexandria',
    account:'St Athanasius’s Thirty-ninth Festal Letter enumerates precisely the 27 books of the New Testament received today. He sent the letter as a bishop instructing his churches about Scripture and other religious writings.',
    outcome:'The letter is an early, particularly clear witness to the complete New Testament list. Its Old Testament classification also shows why the history of the two Testaments needs separate attention.',
    notes:[['Type of witness','An episcopal letter with a list of scriptural books, later received among the canonical writings of the Fathers.'],['His Old Testament distinctions','Athanasius distinguishes his canon from books appointed for instruction, including Wisdom, Sirach, Esther, Judith and Tobit. His categories should be read in their fourth-century setting. Later Orthodox reception of these books is also addressed at Jerusalem in 1672.']],
    groups:['Church of Alexandria'], refs:['athanasiusCanon','canonStudy']
  },
  {
    id:'carthage-canon', date:'397–419', era:0, type:'cb',
    title:'Carthage · The African scriptural list', place:'Carthage, North Africa',
    account:'African councils recorded the books to be read in church as divine Scripture. The tradition associated with Hippo in 393 and Carthage in 397 is transmitted in the African canonical collection associated with 419.',
    outcome:'The list includes the 27 New Testament books and a broad Old Testament collection, naming Tobit, Judith and two books of Maccabees, as well as five books of Solomon. Its canons later formed part of the authorities received at Trullo.',
    notes:[['Type of witness','Regional conciliar legislation on the public reading of Scripture. The surviving collection brings together decisions from more than one meeting.'],['Reading the source','The Scripture list is often numbered Canon 24 in the African Code. Numbering differs across editions and collections. Its regional origin and later influence are distinct parts of its history.']],
    groups:['North African churches'], refs:['carthageCanon','trulloCanon']
  },
  {
    id:'luther-bible-1534', date:'1534', era:3, type:'b',
    title:'Luther’s Bible · The Apocrypha section', place:'Wittenberg',
    account:'Luther’s complete German Bible included an Apocrypha section. Its heading placed those books below the status of Holy Scripture while commending them for reading.',
    outcome:'The arrangement gave visible form to a distinction that became influential in Protestant Bible publishing. The 1534 edition retained these books in print.',
    notes:[['Type of witness','A translation and publishing milestone. The arrangement of the printed Bible communicated a judgment about the status of its books.'],['Why compare it with later entries','Trent’s 1546 decree and the Westminster Confession of 1646 make their positions on the disputed Old Testament books explicit. Jerusalem’s 1672 confession supplies an Orthodox response.']],
    groups:['Lutheran Reformation'], refs:['lutherBible']
  },
  {
    id:'westminster-1646', date:'1646', era:3, type:'b',
    title:'Westminster · The Reformed scriptural canon', place:'Westminster, London',
    account:'The Westminster Confession’s first chapter enumerates the Old and New Testament books and excludes the books called Apocrypha from the inspired scriptural canon.',
    outcome:'The confession became an influential standard in Reformed and Presbyterian churches. Its explicit exclusion makes the difference from the positions at Trent and Jerusalem easy to compare.',
    notes:[['Type of witness','A Reformed confessional definition, completed by the Westminster Assembly in 1646.'],['Text and reception','Chapter I.2 lists the scriptural books, and I.3 addresses the Apocrypha. The linked text is the later American form adopted by the Orthodox Presbyterian Church. That church belongs to the Reformed tradition, and its name uses “Orthodox” in that context.']],
    groups:['Reformed and Presbyterian churches'], refs:['westminsterCanon']
  }
];
const canonEventIds = ['eusebius-canon','athanasius-367','carthage-canon','quinisext','luther-bible-1534','trent','westminster-1646','jerusalem-1672'];
const canonAdditions = {
  quinisext:{refs:['trulloCanon','canonStudy'],notes:[
    ['Scripture and biblical canon · 692','Canon 2 receives earlier conciliar and patristic authorities, including the African canons and Athanasius. Those collections preserve differing scriptural lists. The council’s act of reception therefore needs to be read alongside those sources.'],
    ['Type of witness','Reception of earlier canonical collections. This illustrates the Orthodox recognition of Scripture within the Church’s continuing conciliar and liturgical life.']
  ]},
  trent:{refs:['trentCanon'],notes:[
    ['Scripture and biblical canon · 1546','On 8 April 1546, the fourth session enumerated the books received by the Roman Catholic Church and affirmed the entire books with their parts. Its Old Testament list includes Tobit, Judith, Wisdom, Sirach and 1–2 Maccabees.'],
    ['Type of witness','A Roman Catholic conciliar definition in the setting of the Reformation. The decree also treats apostolic traditions, and an accompanying decree addresses the use of the Latin Vulgate.']
  ]},
  'jerusalem-1672':{refs:['dositheusCanon'],notes:[
    ['Scripture and biblical canon · 1672','Question III of the Confession of Dositheus affirms Wisdom, Judith, Tobit, Sirach, the Maccabees and the Greek additions to Daniel as Scripture. It appeals to the Church’s received use of these books while answering Protestant objections.'],
    ['Type of witness','An Orthodox synodal confession concerning disputed Old Testament books. It supplies a major point of comparison with Luther’s arrangement and the Westminster Confession.']
  ]}
};
for (const event of atlasTimeline) {
  const addition = canonAdditions[event.id];
  if (!addition) continue;
  event.type += 'b';
  event.notes = [...(event.notes ?? []),...addition.notes];
  event.refs.push(...addition.refs);
}
atlasTimeline.push(...canonMilestones);
atlasTimeline.sort((left,right)=>Number(left.date.match(/\d{3,4}/)[0])-Number(right.date.match(/\d{3,4}/)[0]));
