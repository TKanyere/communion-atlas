Object.assign(sources, {
  creteEncyclical: ["Holy and Great Council · Encyclical, §3","https://imconstantias.org.cy/encyclical-of-the-holy-and-great-council-of-the-orthodox-church-crete-2016/"],
  creteMessage: ["Holy and Great Council · Official message","https://holycouncil.org/message"],
  conciliarity: ["St Andrews Encyclopaedia of Theology · Conciliarity","https://www.saet.ac.uk/Christianity/ConciliarityoftheChurch"],
  greatCouncils: ["Mary Jaharis Center · Critical edition of the Great Councils","https://archives.maryjahariscenter.org/blog/great-councils-of-the-orthodox-churches-constantinople-861"],
  reception1484: ["George Dragas · The reception of Roman Catholics in 1484","https://www.myriobiblos.gr/texts/english/Dragas_RomanCatholic_2.html"],
  trullo: ["Orthodox Church in America · The Quinisext Council","https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/seventh-century/the-council-of-trullo-or-the-quinisext-council"],
  iconoclasm: ["Orthodox Church in America · Iconoclasm","https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/eighth-century/iconoclasm"],
  moscow1593: ["McGuckin · The Patriarchal Orthodox Church of Russia","https://azbyka.ru/otechnik/world/the-encyclopedia-of-eastern-orthodox-christianity/277"],
  sofia1998: ["Moscow Patriarchate archive · Sofia council","https://old.mospat.ru/archive/en/1998/10/ne021081/"],
  jerusalem2005: ["Moscow Patriarchate archive · Pan-Orthodox Council","https://old.mospat.ru/archive/en/2005/05/9354/"],
  irenaios: ["Kathimerini · Irenaios’s ouster confirmed","https://www.ekathimerini.com/news/31847/irenaios-s-ouster-confirmed/"],
  dositheus: ["Prokurat, Golitzin and Peterson · Dositheus","https://azbyka.org/otechnik/world/the-a-to-z-of-the-orthodox-church/176"]
});

const councilChapters = {
  nicaea:["fourth","the-first-ecumenical-council"],
  "constantinople-i":["fourth","the-second-ecumenical-council"],
  ephesus:["fifth","third-ecumenical-council"],
  chalcedon:["fifth","the-fourth-ecumenical-council"],
  "constantinople-ii":["sixth","the-fifth-ecumenical-council"],
  "constantinople-iii":["seventh","the-sixth-ecumenical-council"]
};

const councilNotes = {
  nicaea: [
    ["Why the bishops met","Arius, a priest of Alexandria, taught that the Son had a beginning. His bishop Alexander opposed him, and the dispute spread across churches in the eastern Roman Empire. Emperor Constantine summoned bishops to Nicaea after becoming sole emperor. Most came from the East, and Rome sent representatives."],
    ["What the council decided","The Creed called the Son begotten from the Father and used the Greek word homoousios, meaning of one essence with the Father. For the bishops, this excluded the claim that the Word belongs to the created order. The council also addressed the common celebration of Pascha and issued canons on episcopal appointments, discipline and reconciliation."],
    ["How it was received","Imperial support shifted repeatedly after 325, and bishops disputed how the council’s language should be understood. St Athanasius of Alexandria defended Nicaea through successive exiles. The Creed heard in the Orthodox Divine Liturgy is the fuller Nicene–Constantinopolitan form."]
  ],
  "constantinople-i": [
    ["Why the bishops met","The decades after Nicaea saw rival accounts of the Son’s relation to the Father and challenges to the full divinity of the Holy Spirit. Emperor Theodosius I convened a predominantly Eastern council. St Gregory the Theologian briefly presided after the death of St Meletius of Antioch."],
    ["What the council decided","The council reaffirmed Nicaea and rejected teachings that denied the Spirit’s full divinity. In the Creed associated with this council and received in Orthodox worship, the Spirit is worshipped and glorified with the Father and the Son. Canon 3 accorded Constantinople precedence of honour after Rome because it was New Rome."],
    ["How it was received","Chalcedon publicly received the Creed as the faith of the fathers of Constantinople alongside that of Nicaea. The council’s standing as ecumenical grew through reception by the wider Church. Its place in Orthodox worship is especially visible whenever the faithful confess the Creed at the Divine Liturgy."]
  ],
  ephesus: [
    ["Why the bishops met","Nestorius, Archbishop of Constantinople, objected to how Theotokos was being used. St Cyril of Alexandria argued that the title protects the unity of Christ. The eternal Word himself was born in the flesh from Mary, and the title identifies who her Son is."],
    ["What happened at Ephesus","Cyril’s assembly opened before John of Antioch and his delegation arrived. It judged Cyril’s teaching consistent with Nicaea and deposed Nestorius. John’s party held a rival session. The resulting dispute shows how contested the council’s proceedings were even among bishops who would later reconcile."],
    ["How it was received","Cyril and John reached agreement in 433 through the Formula of Reunion, which affirmed Christ’s full divinity and humanity and accepted Theotokos. Ephesus became a touchstone for Chalcedon. The Church of the East developed separately in the Persian Empire, and its history extends beyond Nestorius and this council."]
  ],
  chalcedon: [
    ["Why the bishops met","After Ephesus, bishops continued to dispute how to speak about Christ’s divine and human natures. In 449 a council at Ephesus rehabilitated Eutyches and deposed Flavian of Constantinople. Emperor Marcian convened a new council in 451 to reconsider the dispute."],
    ["What the council decided","The bishops received key letters of St Cyril and Pope Leo’s Tome. They confessed the same Son as fully divine and fully human, with the properties of each nature preserved in their union in one person. The definition rules out confusion or change of the natures as well as division or separation of Christ. Canon 28 also addressed Constantinople’s privileges, which Leo contested."],
    ["How it was received","The council’s reception was uneven across the empire. In Egypt and Syria in particular, resistance eventually produced parallel hierarchies. From the Eastern Orthodox perspective, Chalcedon safeguards St Cyril’s confession of the one incarnate Word. Modern Orthodox–Oriental Orthodox dialogue has articulated shared affirmations about Christ even though full communion has yet to be restored."]
  ],
  "constantinople-ii": [
    ["Why the bishops met","Emperor Justinian sought to answer critics who suspected that Chalcedon had left room for Nestorian teaching. The dispute focused on the Three Chapters: Theodore of Mopsuestia and his writings, certain writings of Theodoret of Cyrrhus against Cyril, and the letter attributed to Ibas of Edessa addressed to Maris."],
    ["What the council decided","The bishops condemned the Three Chapters while reaffirming Chalcedon. Their doctrinal judgments stressed that the one person of the Word is the subject of both divine and human acts. The one who suffered in the flesh is the same divine Son confessed as one of the Trinity."],
    ["How it was received","Pope Vigilius, who was in Constantinople, declined to attend and initially opposed the council’s handling of the controversy. He later accepted its condemnation. Opposition lingered in parts of the Latin West, including northern Italy. The condemnation failed to reunite the divided Eastern churches."]
  ],
  "constantinople-iii": [
    ["Why the bishops met","Imperial efforts to reconcile Christians divided by Chalcedon promoted formulas of one operation or one will in Christ. St Maximus the Confessor and Pope St Martin I resisted these formulas and suffered for their opposition. Emperor Constantine IV later summoned the council."],
    ["What the council decided","The bishops confessed two natural wills and two natural operations in the one incarnate Christ. His human will follows his divine will freely and without opposition. They condemned leading proponents of Monothelitism, including the earlier Pope Honorius I."],
    ["Why it matters for Orthodoxy","The capacity to will and act belongs to the full humanity Christ assumed and heals. The council addressed doctrine. The later Quinisext Council supplied disciplinary canons associated in Orthodoxy with the Fifth and Sixth Councils."]
  ],
  "nicaea-ii": [
    ["Why the bishops met","Byzantine iconoclasm divided the Church over the legitimacy of sacred images. The iconoclast council at Hieria in 754 condemned their veneration. Empress Irene and Patriarch Tarasius helped convene a new council at Nicaea after an earlier attempt to meet in Constantinople was disrupted."],
    ["What the council decided","The bishops authorised images of Christ, the Theotokos, angels and saints in churches and other settings. They distinguished the honour shown to an icon from the worship offered to God. The honour passes to the person depicted. Christ can be depicted because the Word truly assumed visible human flesh."],
    ["How it was received","Imperial iconoclasm resumed in 815. The restoration of icons under Empress Theodora in 843 brought that phase to an end. The Orthodox Church marks the restoration annually on the first Sunday of Great Lent, the Sunday of Orthodoxy."]
  ]
};

for (const event of events) {
  const notes = councilNotes[event.id];
  if (!notes) continue;
  event.type = event.type.replace("c","e");
  event.notes = notes;
  const chapter = councilChapters[event.id];
  const key = "council-" + event.id;
  if (chapter) {
    sources[key] = ["Orthodox Church in America · Council history",
      "https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/" + chapter.join("/")];
    event.refs.push(key);
  } else {
    event.refs.push("iconoclasm");
  }
}

const orthodoxCouncils = [
  ["quinisext","691–692",1,"c","Quinisext Council · Trullo","Constantinople","The bishops met to supply disciplinary canons for the Fifth and Sixth Ecumenical Councils. The 102 canons cover liturgy, fasting, clerical life and church order.","Eastern Orthodoxy receives the canons as part of its ecumenical canonical tradition. Their reception in Rome differed. The council is commonly called the Quinisext because of its connection to the fifth and sixth councils.","trullo"],
  ["photios-council","879–880",1,"p","Great Council of St Photios","Constantinople","The council, attended by papal legates, recognised St Photios as patriarch and restored communion after the earlier conflict over his position. It reaffirmed the Creed and opposed changes to its text.","Some Orthodox writers call it the Eighth Ecumenical Council. The Crete encyclical cites it as a later council of universal authority. The two descriptions reflect differing ways of numbering and classifying the councils.","creteEncyclical|greatCouncils|photian"],
  ["palamas-1341","1341",2,"p","Hesychast Council of 1341","Constantinople","The controversy between Barlaam of Calabria and St Gregory Palamas centred on the prayer of the hesychasts and the character of the light of the Transfiguration. The synod rejected Barlaam’s charges.","The controversy continued after Barlaam left. The 1341 judgment began a series of councils that defended real participation in God’s uncreated grace.","creteEncyclical|greatCouncils"],
  ["palamas-1347","1347",2,"c","Hesychast Council of 1347","Constantinople","Amid the Byzantine civil war and disputes over hesychasm, the synod deposed Patriarch John XIV Kalekas. Gregory Palamas, previously imprisoned, was restored and soon became Archbishop of Thessalonica.","This synod was an intermediate stage in the reception of Palamas’s teaching. The council of 1351 addressed its doctrinal content more fully.","greatCouncils"],
  ["palamas-1351","1351",2,"p","Hesychast Council of 1351","Constantinople","The council upheld the distinction between God’s essence and his uncreated energies. God’s essence remains inaccessible, while God truly communicates himself in his energies. The council rejected the claim that the grace and light experienced by the saints are created.","In Orthodox theology this distinction explains how deification is genuine participation in divine life while the distinction between Creator and creation endures. Some Orthodox writers group the Palamite councils under the title Ninth Ecumenical Council.","creteEncyclical|greatCouncils"],
  ["palamas-1368","1368",2,"p","Synod of 1368 · St Gregory Palamas","Constantinople","Under Patriarch Philotheos Kokkinos, the synod formally recognised Gregory Palamas as a saint and condemned Prochoros Kydones, an opponent of Palamite teaching.","The decision reinforced the reception of Palamas in Orthodox doctrine and worship. The Orthodox Church commemorates him on the second Sunday of Great Lent.","creteEncyclical|conciliarity"],
  ["constantinople-1484","1484",2,"p","Great Synod of Constantinople","Constantinople","The synod repudiated the union agreed at Ferrara–Florence. With the Eastern patriarchates represented, it also prescribed a rite of reception for converts from the Latin Church involving a profession of faith and chrismation.","The decision formalised Orthodox rejection of the Florentine union. Later Orthodox jurisdictions have applied different practices in receiving converts.","creteEncyclical|reception1484"],
  ["constantinople-1638","1638",3,"p","Constantinople · The Lucaris controversy","Constantinople","The synod condemned Calvinist teachings associated with a confession published under the name of Patriarch Cyril Lucaris. Its disputed authorship and the handling of Lucaris himself are distinct from the council’s rejection of those teachings.","The controversy prompted further Orthodox councils to state their teaching on grace, the sacraments and the life of the Church in response to Reformation debates.","creteEncyclical|greatCouncils"],
  ["iasi-1642","1642",3,"p","Synod of Iași · Orthodox Confession","Iași, Moldavia","Representatives met at Iași to examine the confession associated with Metropolitan Peter Mogila of Kyiv. The text was revised, including on the Eucharist and the question of purgatory.","The revised Orthodox Confession subsequently received patriarchal approval and became an influential catechetical statement. The synod belongs to the wider Orthodox response to the controversies surrounding Lucaris.","creteEncyclical|greatCouncils"],
  ["jerusalem-1672","1672",3,"p","Synod of Jerusalem · Confession of Dositheus","Jerusalem / Bethlehem","Patriarch Dositheus convened the synod, which repudiated Calvinist doctrines attributed to Lucaris. Its confession addressed Scripture and the Church, human freedom, the sacraments and the Eucharist.","The confession became an important Orthodox witness in exchanges with Protestant churches. Its language reflects the specific questions Orthodox bishops were answering in the seventeenth century.","creteEncyclical|greatCouncils|dositheus"],
  ["constantinople-1691","1691",3,"p","Constantinople · The Eucharist","Constantinople","The synod addressed renewed controversy over the Eucharist associated with John Karyophylles and upheld the reality of the change of the gifts.","The Crete encyclical cites it among councils responding to Protestant teaching. The critical edition classifies it as a local synod, illustrating the difference between attendance or jurisdiction and wider doctrinal reception.","creteEncyclical|greatCouncils"],
  ["constantinople-1872","1872",4,"p","Great Synod · Ethno-phyletism","Constantinople","In the dispute over the Bulgarian Exarchate, the synod condemned ethno-phyletism, the organisation of competing church jurisdictions in the same place on ethnic grounds.","The council declared the Bulgarian Exarchate in schism. Communion with the Bulgarian Church was restored in 1945. Its condemnation continues to be cited in Orthodox discussions of ethnicity, nationalism and church unity.","creteEncyclical|bulgaria|greatCouncils"],
  ["constantinople-1593","1593",3,"p","Constantinople · Moscow’s patriarchate","Constantinople","The Eastern patriarchs confirmed the patriarchal status of Moscow, following the installation of Job as patriarch in 1589.","Moscow took fifth place in the order of the patriarchates, after Constantinople, Alexandria, Antioch and Jerusalem. This council addressed church order and recognition.","moscow1593"],
  ["sofia-1998","1998",4,"p","Pan-Orthodox Council of Sofia","Sofia","Orthodox hierarchs met to address the rival Bulgarian hierarchy that had challenged Patriarch Maxim. The council recognised Maxim and received several members of the rival hierarchy back into communion.","The council sought to resolve a twentieth-century Bulgarian schism. This was a separate dispute from that of the Bulgarian Exarchate in 1872.","sofia1998"],
  ["constantinople-2005","2005",4,"p","Pan-Orthodox Council on Jerusalem","Constantinople","Orthodox representatives met during a crisis in the Patriarchate of Jerusalem. They withdrew recognition of Patriarch Irenaios after Jerusalem’s synod had moved against him.","The meeting addressed a crisis of church governance in Jerusalem. It illustrates how Orthodox churches sometimes act together in disputes affecting one patriarchate.","jerusalem2005|irenaios"],
  ["crete-2016","2016",4,"p","Holy and Great Council of Crete","Kolymvari, Crete","Ten autocephalous Orthodox churches took part. Antioch, Russia, Bulgaria and Georgia were absent. The council adopted six documents on mission, diaspora, autonomy, marriage, fasting and relations with the rest of the Christian world.","Its encyclical situates the council in the Orthodox conciliar tradition. Participation and reception remain contested. The council was convened as a pan-Orthodox gathering, and its authority is understood differently across the Orthodox churches.","creteEncyclical|creteMessage|conciliarity"]
].map(([id,date,era,type,title,place,account,outcome,refs])=>({
  id,date,era,type,title,place,account,outcome,refs:refs.split("|"),groups:[]
}));

const councilInsertions = {
  "nicaea-ii":["quinisext"],
  "great-schism":["photios-council"],
  florence:["palamas-1341","palamas-1347","palamas-1351","palamas-1368"],
  luther:["constantinople-1484"],
  brest:["constantinople-1593"],
  "old-believers":["constantinople-1638","iasi-1642"],
  methodist:["jerusalem-1672","constantinople-1691"],
  pentecostal:["constantinople-1872"],
  rocor:["sofia-1998","constantinople-2005"],
  ukraine:["crete-2016"]
};
const councilsById = new Map(orthodoxCouncils.map(council => [council.id,council]));
const atlasTimeline = timelineEvents.flatMap(event => [
  ...(councilInsertions[event.id] ?? []).map(id => councilsById.get(id)), event
]);
