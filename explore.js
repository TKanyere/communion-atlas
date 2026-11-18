const topics = {
  trinity:'Trinity and the Creed', christology:'Christology', icons:'Icons and worship',
  authority:'Papal authority', governance:'Church governance', sacraments:'Sacraments and salvation',
  prayer:'Prayer and deification', reunion:'Communion and reconciliation', reformation:'Reformation and revival'
};
const topicEvents = {
  trinity:['nicaea','constantinople-i','constantinople-ii','photios-council','great-schism','florence'],
  christology:['ephesus','chalcedon','constantinople-ii','constantinople-iii','dialogue'],
  icons:['nicaea-ii','quinisext','old-believers'],
  authority:['photios-council','great-schism','crusade','florence','constantinople-1484','anglican','vatican'],
  governance:['constantinople-i','chalcedon','quinisext','constantinople-1593','old-believers','constantinople-1872','sofia-1998','constantinople-2005','ukraine','ohrid','crete-2016'],
  sacraments:['constantinople-1484','anabaptist','trent','brest','baptist','constantinople-1638','iasi-1642','jerusalem-1672','constantinople-1691','luther'],
  prayer:['palamas-1341','palamas-1347','palamas-1351','palamas-1368','methodist','pentecostal'],
  reunion:['photios-council','florence','brest','censures','dialogue','sofia-1998','rocor','havana','ohrid','vatican','crete-2016'],
  reformation:['luther','anabaptist','anglican','reformed','trent','baptist','constantinople-1638','iasi-1642','jerusalem-1672','constantinople-1691','methodist','pentecostal']
};
const traditionEvents = {
  orthodox:['great-schism','crusade','florence','brest','old-believers','censures','dialogue','rocor','havana','ukraine','ohrid'],
  east:['ephesus'], oriental:['chalcedon','dialogue'], old:['old-believers'],
  roman:['great-schism','crusade','florence','luther','anabaptist','anglican','reformed','trent','brest','vatican','censures','havana'],
  lutheran:['luther'], anabaptist:['anabaptist'], reformed:['reformed'],
  anglican:['anglican','baptist','methodist'], baptist:['baptist'], methodist:['methodist','pentecostal'],pentecostal:['pentecostal']
};
const profiles = {
  orthodox:{origin:'The apostolic and conciliar Church',belief:'The Orthodox Church confesses the faith of the seven ecumenical councils and lives through the sacraments, apostolic succession and the communion of its local churches.',relationship:'This atlas follows the Orthodox understanding of continuity with the early Church. Its line extends back through the common first-millennium history.',refs:['councils','creteEncyclical']},
  east:{origin:'The Christian communities of the Persian Empire',belief:'An East Syriac Christian tradition with its own ancient episcopal and liturgical heritage. Its separate development preceded and continued after its rejection of Ephesus.',relationship:'Outside communion with Eastern Orthodoxy. The 431 marker identifies a turning point in a longer history.',refs:['history','councils']},
  oriental:{origin:'The churches that rejected Chalcedon',belief:'Coptic, Syriac, Armenian and related traditions confess the full divinity and humanity of the one incarnate Word and receive the first three ecumenical councils.',relationship:'Outside full communion with Eastern Orthodoxy. Modern dialogue has expressed shared Christological affirmations.',refs:['dialogue']},
  old:{origin:'Opposition to Russian ritual reforms in the seventeenth century',belief:'Old Believers preserve inherited Russian liturgical forms. They include priestly and priestless communities with different ecclesiastical structures.',relationship:'The separations arose within Russian Orthodoxy. The communities have varied relationships with the Russian Orthodox Church.',refs:['raskol']},
  roman:{origin:'The ancient Church of Rome and the Latin West',belief:'Roman Catholicism receives papal primacy and later Catholic dogmatic definitions, alongside its sacramental and episcopal life.',relationship:'The Orthodox Church rejects Rome’s claims to universal jurisdiction and its use of the Filioque. Full communion remains unrestored.',refs:['eastwest','declaration']},
  lutheran:{origin:'The German Reformation associated with Martin Luther',belief:'Lutheran churches emphasise justification by grace through faith and the authority of Scripture. Baptism and the Eucharist retain a central place.',relationship:'A Western Reformation family outside Orthodox communion. The 1517 marker opens its history in this atlas.',refs:['luther']},
  anabaptist:{origin:'The Radical Reformation of the sixteenth century',belief:'Believers’ baptism and voluntary discipleship distinguish Anabaptist communities. Mennonite traditions often emphasise peace and the separation of church and state.',relationship:'Outside Orthodox communion. The dotted connection represents roots in several reform movements.',refs:['menno']},
  reformed:{origin:'The Swiss Reformations and their international reception',belief:'Reformed and Presbyterian churches emphasise the sovereignty of God and the authority of Scripture. Presbyterian traditions organise governance through assemblies of elders.',relationship:'Outside Orthodox communion. Orthodox councils of the seventeenth century responded to Calvinist positions on grace, the Church and the sacraments.',refs:['reformed','swiss']},
  anglican:{origin:'The English Reformation and its later global expansion',belief:'Anglican churches combine an episcopal structure, common prayer and Reformation influences. Their doctrinal and liturgical practices span a broad range.',relationship:'Outside Orthodox communion. It is a major setting for the later emergence of English Separatist and Methodist movements.',refs:['anglican']},
  baptist:{origin:'English Separatist congregations in the seventeenth century',belief:'Baptist churches practise believers’ baptism and stress local congregational life, religious liberty and personal faith. Their theological traditions vary.',relationship:'Outside Orthodox communion. The English Separatist context is represented by an indirect link from the Anglican setting.',refs:['baptist']},
  methodist:{origin:'The eighteenth-century Wesleyan revival',belief:'Methodism emphasises conversion, growth in holiness and disciplined Christian life. It arose within Anglicanism and developed separate church organisations.',relationship:'Outside Orthodox communion. Wesleyan and Holiness movements later helped form the setting for Pentecostalism.',refs:['methodist']},
  pentecostal:{origin:'Multiple revival movements around the beginning of the twentieth century',belief:'Pentecostal traditions emphasise the work and gifts of the Holy Spirit, often including tongues, healing and experiential worship. Their organisations and teachings vary.',relationship:'Outside Orthodox communion. The open, dotted origin reflects several revival roots, with Azusa Street a major catalyst.',refs:['pentecostal']}
};
const glossary = {
  Theotokos:['God-bearer. The title identifies Mary’s Son as the eternal Word who became human. It safeguards the identity of Christ.','councils'],
  homoousios:['Of one essence. At Nicaea the term affirms that the Son shares the Father’s divine being.','councils'],
  Filioque:['Latin for “and the Son”. Its addition to the Creed’s statement about the Spirit’s procession is rejected by Eastern Orthodoxy.','eastwest'],
  nature:['What something is. In the councils on Christ, divinity and humanity are his two natures.','councils'],
  person:['The “who” of existence, also called hypostasis. Christ is the one divine person of the Son, fully divine and fully human.','councils'],
  will:['A natural capacity to desire and act. The Sixth Council confesses both a divine and a human will in Christ.','councils'],
  'uncreated energies':['God’s real, uncreated presence and action through which creatures participate in divine life. God’s essence remains beyond creaturely participation.','creteEncyclical'],
  deification:['Participation by grace in God’s life, also called theosis. The Creator and the creature remain distinct.','creteEncyclical'],
  Monothelitism:['The teaching that Christ has one will. The Sixth Ecumenical Council condemned it while confessing two natural wills in the one Christ.','councils'],
  autocephaly:['Self-government of a local Orthodox church under its own primate. It concerns church order and recognition within the wider communion.','creteEncyclical'],
  'ethno-phyletism':['The subordination of church unity to ethnic identity, especially competing ethnic jurisdictions in the same place. Condemned by the council of 1872.','bulgaria'],
  chrismation:['Anointing with holy chrism in the sacramental life of the Church. Some Orthodox rites of receiving converts include chrismation.','reception1484']
};
const councilPeople = {
  nicaea:[['Arius','Alexandrian priest whose teaching was condemned'],['Alexander of Alexandria','Bishop who opposed Arius'],['Constantine','Emperor who convened the council'],['St Athanasius','Attended as a deacon and later became a leading defender of Nicaea']],
  'constantinople-i':[['Theodosius I','Emperor who convened the council'],['St Meletius of Antioch','Its first president'],['St Gregory the Theologian','Briefly presided before resigning'],['Nectarius','Became Archbishop of Constantinople during the council']],
  ephesus:[['St Cyril of Alexandria','Led the assembly that deposed Nestorius'],['Nestorius','Archbishop of Constantinople whose teaching was judged'],['John of Antioch','Led a rival assembly and later reconciled with Cyril']],
  chalcedon:[['Marcian and St Pulcheria','Imperial patrons of the council'],['Pope St Leo I','His Tome was received by the bishops'],['St Flavian','Deposed in 449 and vindicated at Chalcedon'],['Dioscorus of Alexandria','Deposed by the council']],
  'constantinople-ii':[['Justinian I','Emperor promoting condemnation of the Three Chapters'],['Pope Vigilius','Initially opposed the council’s handling, later accepted the condemnation'],['St Eutychius','Patriarch of Constantinople and council president']],
  'constantinople-iii':[['Constantine IV','Emperor who convened the council'],['St Maximus the Confessor','Earlier defender of Christ’s two wills'],['Pope St Martin I','Earlier opponent of Monothelitism'],['Pope Honorius I','An earlier pope condemned by the council']],
  'nicaea-ii':[['St Irene','Empress who supported the council'],['St Tarasius','Patriarch who helped convene it'],['St John of Damascus','Earlier theological defender of holy icons']],
  'old-believers':[['Patriarch Nikon','Introduced the ritual reforms, then was deposed by the council'],['Archpriest Avvakum','A leading opponent of the reforms']],
  quinisext:[['Justinian II','Emperor who convened the council']],
  'photios-council':[['St Photios','Patriarch whose standing was recognised'],['Pope John VIII','Sent representatives to the council']],
  'palamas-1341':[['St Gregory Palamas','Defended hesychast prayer'],['Barlaam of Calabria','Opponent whose charges were rejected']],
  'palamas-1347':[['St Gregory Palamas','Restored after imprisonment'],['John XIV Kalekas','Patriarch deposed by the synod']],
  'palamas-1351':[['St Gregory Palamas','Defender of the essence–energies distinction'],['Nikephoros Gregoras','Opponent of Palamite theology']],
  'palamas-1368':[['St Philotheos Kokkinos','Patriarch who presided'],['Prochoros Kydones','Opponent whose teaching was condemned']],
  florence:[['St Mark of Ephesus','Withheld his signature from the union'],['Pope Eugene IV','Presided over the Western council'],['John VIII Palaiologos','Emperor seeking union and Western assistance']],
  'constantinople-1484':[['Symeon I','Patriarch of Constantinople during the synod']],
  trent:[['Paul III','Pope who first convened the council'],['Julius III and Pius IV','Popes during its later sessions']],
  'constantinople-1593':[['Jeremias II','Patriarch involved in recognising Moscow'],['Job','First Patriarch of Moscow']],
  'constantinople-1638':[['Cyril Lucaris','Patriarch associated with the disputed confession']],
  'iasi-1642':[['Peter Mogila','Metropolitan associated with the confession'],['Meletios Syrigos','Theologian involved in its revision']],
  'jerusalem-1672':[['Dositheus of Jerusalem','Patriarch who convened the synod']],
  'constantinople-1691':[['John Karyophylles','Scholar whose Eucharistic teaching was challenged']],
  'constantinople-1872':[['Anthimos VI','Patriarch of Constantinople'],['Antim I','Bulgarian Exarch']],
  vatican:[['John XXIII','Pope who convened the council'],['Paul VI','Pope who continued and closed it']],
  'sofia-1998':[['Patriarch Maxim','Bulgarian patriarch recognised by the council']],
  'constantinople-2005':[['Irenaios','Patriarch of Jerusalem whose recognition was withdrawn']],
  'crete-2016':[['Ecumenical Patriarch Bartholomew','Presided at the council']]
};
// Attendance and reception describe different aspects of a council's standing.
const councilReception = {
  nicaea:['Bishops from across the empire, predominantly Eastern, with Roman representatives.','Received as the First Ecumenical Council by Eastern Orthodoxy. Also received by Roman Catholic and Oriental Orthodox churches.','Arian and related parties resisted its confession, and the controversy continued after 325.'],
  'constantinople-i':['Predominantly Eastern bishops, without a Roman delegation.','Received as the Second Ecumenical Council by Eastern Orthodoxy. Its wider recognition developed through later reception.','Its canonical treatment of Constantinople’s rank was contested in the West.'],
  ephesus:['Eastern bishops and Roman legates. The Antiochene party initially met separately.','Received as the Third Ecumenical Council by Eastern Orthodoxy, Roman Catholicism and Oriental Orthodoxy.','The Church of the East did not receive it as ecumenical. Cyril and John of Antioch reconciled in 433.'],
  chalcedon:['A large assembly, overwhelmingly Eastern, with papal legates.','Received as the Fourth Ecumenical Council by Eastern Orthodoxy and Roman Catholicism.','The Oriental Orthodox churches rejected its definition or reception. Opposition developed into lasting separate hierarchies.'],
  'constantinople-ii':['Mainly Eastern bishops. Pope Vigilius was in the city but did not attend.','Received as the Fifth Ecumenical Council in Eastern Orthodoxy. Vigilius later accepted its condemnation.','Resistance to the Three Chapters condemnation continued in parts of the Latin West.'],
  'constantinople-iii':['Imperial and episcopal representatives, including papal legates.','Received as the Sixth Ecumenical Council by Eastern Orthodoxy and Roman Catholicism.','It condemned Monothelitism, including several former patriarchs and Pope Honorius.'],
  'nicaea-ii':['Mainly Eastern bishops, papal legates and representatives connected with the Eastern patriarchates.','Received as the Seventh Ecumenical Council by Eastern Orthodoxy and Roman Catholicism.','Byzantine iconoclasm resumed in 815. The restoration of icons in 843 secured its Byzantine reception.'],
  'old-believers':['The Great Moscow Council of 1666–1667 included Russian bishops and Eastern patriarchs.','The council upheld the revised rites while deposing Nikon.','Old Believer communities rejected the reforms and developed separate hierarchies or priestless traditions.'],
  quinisext:['An Eastern assembly under Justinian II.','Orthodoxy receives its canons in association with the Fifth and Sixth Councils.','Rome’s reception of particular canons differed.'],
  'photios-council':['An Eastern assembly with papal legates.','Cited in the Crete encyclical as a council of wider authority. Some Orthodox writers call it the Eighth Ecumenical Council.','Its relation to the council of 869–870 and later Roman reception has been contested.'],
  'palamas-1341':['Byzantine bishops and theological disputants.','Received in Orthodoxy as a foundational judgment defending hesychasm.','Further controversy led to the synods of 1347 and 1351.'],
  'palamas-1347':['A Byzantine synod amid civil war and patriarchal conflict.','An important stage in the reception of Palamas’s teaching.','A related synod, usually discussed with the wider Palamite council series.'],
  'palamas-1351':['A Byzantine episcopal assembly addressing the hesychast controversy.','Its doctrinal judgments became normative in Eastern Orthodox theology.','Some Orthodox authors use the title Ninth Ecumenical Council for the Palamite series.'],
  'palamas-1368':['A Constantinopolitan synod under Philotheos Kokkinos.','Its recognition of Palamas as a saint entered Orthodox liturgical life.','The Crete encyclical includes it among the later councils of wider authority.'],
  florence:['Papal and Latin delegates with an Eastern delegation.','Recognised as ecumenical by Rome. The union failed to gain lasting reception in the Orthodox East.','St Mark of Ephesus refused to sign. The 1484 synod repudiated the union.'],
  'constantinople-1484':['Eastern patriarchal representation.','A major Orthodox repudiation of Florence and a prescription for receiving Latin converts.','Later Orthodox practices for receiving converts have varied.'],
  trent:['A Roman Catholic assembly held in several sessions.','An ecumenical council in Roman Catholic reckoning.','Outside the Orthodox ecumenical council sequence. Its decisions shaped Catholic responses to Protestantism.'],
  'constantinople-1593':['Eastern patriarchs and their representatives.','Confirmed Moscow’s patriarchal status and place in the order of patriarchates.','Its subject was the recognition and order of a local church.'],
  'constantinople-1638':['A Constantinopolitan synod responding to the Lucaris controversy.','Cited in the Crete encyclical among later councils opposing Protestant doctrines.','Lucaris’s relationship to the confession and judgments on him require distinction from the condemned teachings.'],
  'iasi-1642':['Representatives from the Greek and Slavic Orthodox worlds at Iași.','The revised confession later received patriarchal approval.','The approved text reflects revision of the initial confession.'],
  'jerusalem-1672':['Bishops gathered under Dositheus of Jerusalem.','Its confession became a widely influential Orthodox statement against Calvinist positions.','Its seventeenth-century terminology belongs to the particular controversies it addressed.'],
  'constantinople-1691':['A local Constantinopolitan synod.','Cited by the Crete encyclical for its wider doctrinal importance.','Local participation and wider reception are distinct measures of its standing.'],
  'constantinople-1872':['An assembly centred on Constantinople with other Eastern patriarchal participation.','The condemnation of ethno-phyletism remains influential in Orthodox ecclesiology.','Its declaration against the Bulgarian Exarchate accompanied a rupture healed in 1945.'],
  vatican:['Roman Catholic bishops from around the world, with invited non-Catholic observers.','An ecumenical council in Roman Catholic reckoning.','Orthodox participation as observers did not constitute Orthodox reception of its decrees.'],
  'sofia-1998':['Hierarchs from several Orthodox churches.','Recognised Patriarch Maxim and sought reconciliation of the rival Bulgarian hierarchy.','The meeting addressed a local church crisis through inter-Orthodox action.'],
  'constantinople-2005':['Representatives of Orthodox churches convened in Constantinople.','Withdrew recognition of Irenaios during the Jerusalem patriarchal crisis.','Its purpose concerned church governance.'],
  'crete-2016':['Ten autocephalous churches. Antioch, Russia, Bulgaria and Georgia were absent.','The participating churches adopted six documents and an encyclical.','Its pan-Orthodox standing and reception remain contested across the churches.']
};
const relatedSequences = [
  ['nicaea','constantinople-i','photios-council','great-schism'],
  ['ephesus','chalcedon','constantinople-ii','constantinople-iii','dialogue'],
  ['nicaea-ii','quinisext','old-believers'],
  ['palamas-1341','palamas-1347','palamas-1351','palamas-1368'],
  ['great-schism','crusade','florence','constantinople-1484','brest','censures','havana'],
  ['luther','reformed','trent','constantinople-1638','iasi-1642','jerusalem-1672','constantinople-1691'],
  ['anglican','baptist','methodist','pentecostal'],
  ['constantinople-1593','constantinople-1872','sofia-1998','constantinople-2005','rocor','crete-2016','ukraine','ohrid']
];
for (const event of atlasTimeline) {
  event.year = Number(event.date.match(/\d{3,4}/)[0]);
  const years = [...event.date.matchAll(/\d{3,4}/g)].map(match=>Number(match[0]));
  event.endYear = years.at(-1);
  event.topics = Object.keys(topics).filter(topic=>topicEvents[topic].includes(event.id));
  event.traditions = Object.keys(profiles).filter(key=>traditionEvents[key]?.includes(event.id));
  if (event.type.includes('e') || event.type.includes('p') || event.id==='quinisext' || event.id==='palamas-1347') event.traditions.push('orthodox');
  if (event.type.includes('e')) event.traditions.push('roman');
  if (['nicaea','constantinople-i','ephesus'].includes(event.id)) event.traditions.push('oriental');
  if (['nicaea','constantinople-i'].includes(event.id)) event.traditions.push('east');
  event.traditions = [...new Set(event.traditions)];
  event.people = councilPeople[event.id] ?? [];
  event.reception = councilReception[event.id];
  event.related = [...new Set(relatedSequences.filter(sequence=>sequence.includes(event.id)).flat())].filter(id=>id!==event.id);
}
// The chapter paths in the original export omitted the century suffix.
for (const [key,source] of Object.entries(sources)) {
  if (key.startsWith('council-')) source[1] = source[1].replace(/\/(fourth|fifth|sixth|seventh)\//,'/$1-century/');
}
