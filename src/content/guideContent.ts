export type ArtworkId =
  | 'safe-entry'
  | 'history'
  | 'future-you'
  | 'impactbench'
  | 'grace-quek'
  | 'altar'
  | 'traces'
  | 'asia-maxxing'
  | 'hexagram'
  | 'xo'

export type ArtworkContent = {
  id: ArtworkId
  title: string
  artist: string
  sequence: '01' | '02' | '03' | '04' | '05'
  total: '02' | '03' | '05'
  sectionLabel: 'YOU AND THE NET' | 'TOGETHER IN THE NET' | 'HERE IN THE NET'
  palette: 'coral' | 'magenta' | 'violet' | 'blue' | 'rose' | 'cobalt' | 'moss' | 'signal-red' | 'jade' | 'ochre'
  pullQuote: string
  titleAlign?: 'left' | 'center' | 'right'
  titleSize?: string
  heroLabel?: string
  image?: {
    src: string
    alt: string
    note?: string
    position?: string
    aspect?: string
  }
  description: string[]
  whyNow: string[]
  reflection: string[]
}

export type SectionIntroContent = {
  number: string
  title: string
  lead?: string
  paragraphs: string[]
}

export const sectionOneIntro: SectionIntroContent = {
  number: 'SECTION 1',
  title: 'YOU AND\nTHE NET',
  paragraphs: [
    'Technology reaches us at an intimate scale: in the voice that answers, the score that judges, the portrait that predicts and the feed that learns what keeps us looking.',
    'The works in this section examine what happens when systems speak as us, measure us and rehearse who we might become.',
    'What do they reflect back—and which futures do they begin to prescribe? Where can they support agency, connection and care, and where do they create dependency?',
    'The question is not only what these technologies can do. It is what repeated use does to us.',
  ],
}

export const sectionTwoIntro: SectionIntroContent = {
  number: 'SECTION 2',
  title: 'TOGETHER IN\nTHE NET',
  paragraphs: [
    'No relationship with technology remains personal for long. A private choice becomes a data point; a post becomes an archive; a voice can become part of a shared memory.',
    'Across a living altar, an emotional map and the Commons, this section asks you not only to look, but to add, listen, disagree and leave something behind.',
    'A crowd becomes a community through participation, difference, care and the difficult work of staying in relation.',
    'What do we preserve? What do platforms flatten? What can many different lives build together?',
  ],
}

export const sectionThreeIntro: SectionIntroContent = {
  number: 'SECTION 3',
  title: 'HERE IN\nTHE NET',
  lead: 'Every story about technology begins somewhere: in a language, a belief, a history, an infrastructure and a relationship to power.',
  paragraphs: [
    'Here, code meets divination. AI rehearses Asian identities. Speculative archives refuse familiar divisions between nature and technology, body and data, past and future.',
    'These works show technology being absorbed, translated and reinvented across Southeast Asia. They ask what becomes possible when the future is imagined from here, rather than imported from elsewhere.',
  ],
}

export const sectionOneArtworks: Record<Extract<ArtworkId, 'safe-entry' | 'history' | 'future-you' | 'impactbench' | 'grace-quek'>, ArtworkContent> = {
  'safe-entry': {
    id: 'safe-entry',
    title: 'SAFE ENTRY\n(VERSION 2.0–2.7)',
    artist: 'BY HEMAN CHONG',
    sequence: '01',
    total: '05',
    sectionLabel: 'YOU AND THE NET',
    palette: 'coral',
    pullQuote: 'The painting becomes image, gateway and historical document.',
    titleAlign: 'left',
    titleSize: '31px',
    image: {
      src: '/guide/assets/works/safe-entry.jpg',
      alt: 'A visitor standing before Heman Chong’s painted SafeEntry QR code installation',
      position: 'center 47%',
      aspect: '3 / 2',
    },
    description: [
      'Heman Chong’s painting resembles one of the SafeEntry QR codes that became part of everyday life in Singapore during the COVID-19 pandemic. These codes functioned as invisible checkpoints: visitors scanned them to register their presence before entering shops, workplaces and public spaces.',
      'Chong’s painted code does not lead to the national contact-tracing system. Instead, it opens Ambient Walking: Changi Airport Terminal 2: an hour-long video documenting the artist’s walk through the terminal during Singapore’s Circuit Breaker. Filmed while international travel had almost stopped, the video records an airport designed for movement at a moment of profound stillness.',
      'By painstakingly translating a machine-readable code into paint, Chong brings a digital interface back into the realm of the handmade and bodily. The painting becomes image, gateway and historical document.',
    ],
    whyNow: [
      'Although SafeEntry belongs to the recent history of the pandemic, its underlying logic has not disappeared. Access to public life is increasingly mediated through machine-readable identities, permissions and systems of verification that operate largely beyond view.',
      'As more of everyday life is organised through apps, digital wallets, facial recognition and seamless check-ins, this work asks how quickly exceptional technologies become ordinary infrastructure — and how habits of scanning, registering and surrendering data reshape our relationship to public space.',
    ],
    reflection: [
      'What do you now scan, share or verify without giving it much thought?',
      'When convenience depends on exchanging data, how freely are we choosing?',
      'Which technologies introduced as temporary or exceptional have become permanent?',
    ],
  },
  history: {
    id: 'history',
    title: 'A HISTORY OF\nINTELLIGENCE IN\n((SOUTH)(EAST)) ASIA',
    artist: 'BY HO RUI AN',
    sequence: '02',
    total: '05',
    sectionLabel: 'YOU AND THE NET',
    palette: 'magenta',
    pullQuote: 'The future of AI cannot be understood without asking whose past made it possible.',
    titleAlign: 'right',
    titleSize: '29px',
    image: {
      src: '/guide/assets/works/history-of-intelligence.jpg',
      alt: 'Ho Rui An’s wall-sized diagram A History of Intelligence in ((South)(East)) Asia',
      position: 'center 42%',
      aspect: '1.58 / 1',
    },
    description: [
      'Ho Rui An’s wall-sized diagram traces a history of computation and artificial intelligence in Southeast Asia from the 1940s to the present. Part timeline, part map and part counter-archive, the work connects technologies to the institutions, political ambitions and historical conditions through which they entered the region.',
      'The work challenges the familiar story that digital technology travelled outward from a handful of laboratories and companies in the United States. Instead, it asks us to understand intelligence through the particular histories of Asia: histories shaped by colonialism, war, development, state-building, labour and global flows of capital and expertise.',
      'Even the doubled brackets in the title resist a simple geographical boundary. Where does “East Asia” end and “Southeast Asia” begin, and who has the power to draw that line?',
    ],
    whyNow: [
      'Conversations about AI often begin with the newest model release. This work begins elsewhere: with history.',
      'What we now call “intelligence” rests on decades of political decisions, infrastructure, research, labour and unequal relations of power. The future of AI cannot be understood without asking whose past made it possible, whose interests shaped it, and whose histories are still missing from the story.',
    ],
    reflection: [
      'What disappears when AI is told mainly as a Silicon Valley story?',
      'Whose work appears in the history of intelligence — and who remains invisible?',
      'What histories, people or systems would you add to this map?',
    ],
  },
  'future-you': {
    id: 'future-you',
    title: 'FUTURE YOU',
    artist: 'BY MIT MEDIA LAB\nFT. RACHEL POONSIRIWONG',
    sequence: '03',
    total: '05',
    sectionLabel: 'YOU AND THE NET',
    palette: 'violet',
    pullQuote: 'A machine-generated possibility can begin to influence the choices through which that future is made.',
    titleAlign: 'right',
    titleSize: '38px',
    image: {
      src: '/guide/assets/works/future-you.jpg',
      alt: 'A diagram showing a younger person in conversation with an AI-generated older future self',
      position: 'center',
      aspect: '1.45 / 1',
    },
    description: [
      'Future You invites you to speak with an AI-generated version of yourself at around 60 years old.',
      'The experience begins by asking about your present life, personal qualities, hopes and future goals. From this information, the system creates an age-progressed portrait and a speculative biography — or “synthetic memory” — connecting who you are now with someone you might plausibly become. You can then ask this future self questions, seek advice or reflect on the paths that might lead from the present to that imagined life.',
      'The project draws upon psychological research into “future self-continuity”: the sense that the person we may become is connected to the person we are today. Previous research links a stronger connection to one’s future self with long-term behaviours such as saving, academic planning and greater wellbeing. Future You investigates whether generative AI can make that distant self feel more vivid, relatable and emotionally present.',
      'Follow-on research is now exploring whether simulated future selves can support reflection around career paths and significant life decisions.',
    ],
    whyNow: [
      'AI is moving beyond answering questions. It is increasingly being positioned as a coach, confidant and guide: something that can help us plan careers, manage emotions or rehearse difficult conversations.',
      'At a moment shaped by self-optimisation, manifestation culture and algorithmic prediction, the work asks whether AI might help us think more generously and patiently about our future lives. It also asks what happens when a machine-generated possibility begins to influence the choices through which that future is actually made.',
    ],
    reflection: [
      'Did your future self’s advice feel credible?',
      'Which parts of this imagined future came from your own hopes, and which were introduced by the system?',
      'Did your future self expand your sense of possibility?',
    ],
  },
  impactbench: {
    id: 'impactbench',
    title: 'IMPACTBENCH ×\nCEREALLM',
    artist: 'BY MIT MEDIA LAB × RYAN HO',
    sequence: '04',
    total: '05',
    sectionLabel: 'YOU AND THE NET',
    palette: 'blue',
    pullQuote: 'What does an AI system do to the person using it?',
    titleAlign: 'left',
    titleSize: '33px',
    image: {
      src: '/guide/assets/works/impactbench-cereallm.jpg',
      alt: 'A collection of fictional CereaLLM cereal boxes carrying AI nutrition labels',
      position: 'center',
      aspect: '16 / 9',
    },
    description: [
      'Most AI benchmarks ask how successfully a model can reason, calculate, retrieve information or complete a task. ImpactBench begins with a different question: What does an AI system do to the person using it?',
      'The project evaluates AI across physical, psychological and societal dimensions of human wellbeing. It examines realistic, extended human–AI interactions in which effects such as dependency, diminished autonomy, manipulation or emotional harm may emerge gradually.',
      'For this exhibition, these findings are presented as a shelf of fictional breakfast cereals. Familiar LLMs are reimagined as competing consumer brands, complete with slogans, activities and “nutrition labels” describing their possible effects on users.',
      'Like products on a supermarket shelf, these labelled boxes ask visitors to look beyond branding and performance claims. An AI system may appear capable, convenient or appealing while still carrying less visible costs.',
      'ImpactBench asks us to consider what we are consuming, what it is feeding us, and how it may shape us over time.',
    ],
    whyNow: [
      'As AI becomes a companion, teacher, adviser and mediator of everyday decisions, accuracy is no longer an adequate measure of quality. A system can provide a factually correct response while making someone less confident, more dependent or more isolated.',
      'ImpactBench proposes that intelligence should be judged partly by the kind of human relationship it creates. Deciding what counts as wellbeing — and whose wellbeing matters — is an increasingly urgent question.',
    ],
    reflection: [
      'What should an AI be evaluated on beyond whether its answer is correct?',
      'Would you choose a less “capable” system if it better protected your autonomy and wellbeing?',
    ],
  },
  'grace-quek': {
    id: 'grace-quek',
    title: 'ART IN THE AGE OF\nHUMAN CLONING & AI',
    artist: 'BY GRACE QUEK',
    sequence: '05',
    total: '05',
    sectionLabel: 'YOU AND THE NET',
    palette: 'rose',
    pullQuote: 'At what point does a copy become a new work — or a new person?',
    titleAlign: 'left',
    titleSize: '30px',
    image: {
      src: '/guide/assets/works/grace-quek-cloning-ai.jpg',
      alt: 'Promotional artwork for Grace Quek’s Art in the Age of Human Cloning performance lecture',
      position: 'center',
      aspect: '16 / 9',
    },
    description: [
      'In 1997, Grace Quek presented a performance lecture through the persona of Dr Eng Olsen, using human cloning to examine reproduction, appropriation and authenticity in art. Almost three decades later, Quek returns to the work in collaboration with DeepSeek, reworking its questions for an age of generative AI.',
      'Delivered with the authority of an academic lecture, the performance begins with recognisable art-historical debates: Renaissance workshops, disputed attribution, photographic repetition, museum reproductions and Andy Warhol’s use of existing images.',
      'Gradually, fact gives way to speculative fiction. Museums secretly clone historical artists. Artificial memories are implanted into resurrected sculptors. A teenage clone of He Xiangning refuses to reproduce her paintings and becomes a drum-and-bass musician. A virtual Andy Warhol completes works that the historical artist never made. The boundary between research, performance and fabrication becomes deliberately unstable.',
    ],
    whyNow: [
      'AI is often described as a new kind of collaborator — but it is trained on the replication and recombination of existing human work. This lecture asks whether authorship can survive when style, memory and identity can all be simulated.',
      'The work also asks who controls a copy once it begins to act for itself. A clone may inherit an artist’s name, data or appearance without inheriting their desires. In an era of deepfakes and synthetic personalities, authenticity may no longer mean being original. It may depend on who is speaking, who gets credit, and who has the right to refuse.',
    ],
    reflection: [
      'At what point does a copy become a new work — or a new person?',
      'When an artist works with AI, who should receive the credit, responsibility and blame?',
    ],
  },
}

export const sectionTwoArtworks: Record<Extract<ArtworkId, 'altar' | 'traces'>, ArtworkContent> = {
  altar: {
    id: 'altar',
    title: 'F4NT4SY_H4RD_\nDR1VE://ALTAR\n(2026)',
    artist: 'BY BUSSYTEMPLE',
    sequence: '01',
    total: '02',
    sectionLabel: 'TOGETHER IN THE NET',
    palette: 'cobalt',
    pullQuote: 'The altar is both record and gathering place: a structure through which the community continues to make itself.',
    titleAlign: 'left',
    titleSize: '30px',
    image: {
      src: '/guide/assets/works/bussytemple-altar.jpg',
      alt: 'A dark BussyTemple gathering with amber beams of light cutting through a crowded dance floor',
      position: 'center 35%',
      aspect: '3 / 2',
    },
    description: [
      'BussyTemple is a Southeast Asian rave collective working across electronic music, performance, visual culture and practices of care. Their gatherings treat queer nightlife as worldbuilding: a space in which bodies, identities and relationships can temporarily be reorganised.',
      'At the centre of F4NT4SY_H4RD_DR1VE://ALTAR is an open scaffolding structure that functions simultaneously as archive, network and communal altar. Screens hold videos, photographs and contributions gathered across BussyTemple’s history, while physical objects and traces are attached to the structure itself.',
      'Unlike a conventional archive, the altar is deliberately unfinished. Visitors and community members can continue adding to it, allowing its form and meaning to change over the exhibition. During BussyTemple’s September gathering, the bare structure will be further transformed through materials, messages, images and performance.',
      'The altar is both record and gathering place: a structure through which the community continues to make itself.',
    ],
    whyNow: [
      'Online platforms promise to preserve everything, yet community histories can remain fragile. Posts disappear, accounts are removed and experiences are flattened into content.',
      'This altar asks what it means to archive a culture that is embodied, collective and continually changing. It treats parties, friendships, costumes, messages and fleeting encounters as forms of cultural knowledge worth holding onto.',
      'The installation also resists the idea that an archive must be fixed, orderly or complete. Here, memory remains alive because people can still touch it, contest it and add to it.',
    ],
    reflection: [
      'What objects, images or rituals hold your community together?',
      'What deserves to be remembered that conventional archives might overlook?',
    ],
  },
  traces: {
    id: 'traces',
    title: 'TRACES\nIN THE NET',
    artist: 'BY RYAN HO,\nEMOTIONAL TECHNOLOGIES LAB\nAND VIGNESH SUNDARESAN',
    sequence: '02',
    total: '02',
    sectionLabel: 'TOGETHER IN THE NET',
    palette: 'moss',
    pullQuote: 'A private thought becomes part of a shared environment, available to someone you may never meet.',
    titleAlign: 'right',
    titleSize: '41px',
    image: {
      src: '/guide/assets/works/traces-in-the-net.jpg',
      alt: 'The Traces interface showing floating coloured trace orbs and controls for exploring and listening',
      position: 'center 24%',
      aspect: '4 / 3',
    },
    description: [
      'Traces in the Net offers another way of encountering the city: through the thoughts, stories, feelings and sounds left behind by the people within it.',
      'Visitors can move through a map or an immersive digital space, listening to fragments of emotions, confessions and soundscapes. Each trace is small and partial. Together, they form a changing portrait of the city, layering interior lives over its infrastructure and geography.',
      'After listening, you are invited to leave a trace of your own. A private thought becomes part of a shared environment, available to someone you may never meet.',
      'Its record is deliberately partial: a constellation of intimate, uneven voices that continues to expand. Some may remain; others may eventually disappear.',
      'The blockchain stores no voice—only a timestamp proving that the contribution once existed. Two memories remain: the erasable intimacy of the voice and the durable abstraction of its timestamp.',
    ],
    whyNow: [
      'Cities are increasingly made legible through movement, property and consumption data. Traces maps what those systems miss: feeling, confession, atmosphere and interior life.',
    ],
    reflection: [
      'What would your city reveal if it were mapped by feeling instead of value?',
    ],
  },
}


export const sectionThreeArtworks: Record<Extract<ArtworkId, 'asia-maxxing' | 'hexagram' | 'xo'>, ArtworkContent> = {
  'asia-maxxing': {
    id: 'asia-maxxing',
    title: 'ASIAMAXXING',
    artist: 'BY WEIWEI XU',
    sequence: '01',
    total: '03',
    sectionLabel: 'HERE IN THE NET',
    palette: 'signal-red',
    pullQuote: 'Its real subject is the system imagining you: the data, stereotypes and desires used to construct an “Asian life”.',
    titleAlign: 'left',
    titleSize: '44px',
    heroLabel: 'ALTERNATE-LIFE PHOTOBOOTH',
    image: {
      src: '/guide/assets/works/asia-maxxing.jpg',
      alt: 'A diagram of an imagined Asia Maxxing life across home, café, commute, work and leisure platforms',
      position: 'center',
      aspect: '16 / 9',
    },
    description: [
      'What might your life have looked like if it had unfolded somewhere else in Asia?',
      'Developed from Weiwei Xu’s earlier project Chinamaxxing, this participatory photobooth generates an alternative version of your “Asian life.” Your image becomes the starting point for a speculative biography shaped through computational storytelling, popular imagery and assumptions about identity, place and possibility.',
      'The title borrows the internet suffix “-maxxing” — used online to describe the deliberate optimisation or performance of an identity. It also refers to recent social-media fascination with imagined Asian lifestyles, aesthetics and social values.',
      'The resulting life is a constructed fiction, assembled from algorithmic patterns, cultural stereotypes and the participant’s own projections.',
    ],
    whyNow: [
      'AI can create convincing stories and identities. Yet these narratives are assembled from patterns in existing data that carry assumptions about race, gender, class, nationality and what an “Asian life” is supposed to look like.',
      'At the same time, “Asia” itself is far from a single, stable identity. It is a vast and contested idea, shaped differently by people living within the region, its diasporas and those viewing it from elsewhere. This work makes this construction visible. Its alternate life may feel exciting, recognisable or absurd.',
      'Its real subject is the system imagining you: the data, stereotypes and desires used to construct an “Asian life”.',
    ],
    reflection: [
      'What assumptions did the experience make about Asia, and about you?',
      'Which parts felt culturally specific, and which felt like stereotype?',
      'Who gets to decide what an “Asian future” looks like?',
    ],
  },
  hexagram: {
    id: 'hexagram',
    title: 'HEXAGRAM\nTODAY',
    artist: 'BY WEIWEI XU',
    sequence: '02',
    total: '03',
    sectionLabel: 'HERE IN THE NET',
    palette: 'jade',
    pullQuote: 'The work places an old predictive technology inside a new one.',
    titleAlign: 'right',
    titleSize: '46px',
    heroLabel: 'DIGITAL DIVINATION INTERFACE',
    image: {
      src: '/guide/assets/works/hexagram-today.png',
      alt: 'A field of I Ching hexagrams with several symbols glowing in electric blue',
      position: 'center',
      aspect: '1 / 1',
    },
    description: [
      'Hexagram Today translates the ancient Chinese divination system of the I Ching, or Book of Changes, into a contemporary digital interface.',
      'The I Ching is organised around 64 hexagrams: figures composed of broken and unbroken lines whose changing arrangements are interpreted in relation to a question or situation. Its texts offer no fixed forecast. They invite reflection on change, uncertainty, timing and the relationships between different forces.',
      'Weiwei Xu brings this cosmological system into conversation with the computational systems through which people now seek guidance. In place of tossed coins, yarrow stalks or a human interpreter, visitors encounter divination through a screen.',
      'The work places an old predictive technology inside a new one — inviting us to consider what has changed, and what has not, in our desire to make uncertainty legible.',
    ],
    whyNow: [
      'Algorithms already tell us what to watch, where to go, who to meet and what may happen next. These predictions are often presented as objective and based on “data”.',
      'The I Ching offers a different relationship to prediction. Its answers are poetic, ambiguous and dependent upon interpretation. It does not simply claim to calculate the future; it asks the reader to examine their own position within a changing situation.',
      'This work asks whether uncertainty and alternative forms of cultural wisdom are something technology should eliminate, or something we can build on.',
    ],
    reflection: [
      'Why might advice feel more trustworthy when it appears on a screen?',
      'What is the difference between divination, prediction and recommendation?',
    ],
  },
  xo: {
    id: 'xo',
    title: 'XO\n(2026)',
    artist: 'BY FYEROOL DARMA',
    sequence: '03',
    total: '03',
    sectionLabel: 'HERE IN THE NET',
    palette: 'ochre',
    pullQuote: 'Every archive preserves a world—and decides which other worlds remain legible.',
    titleAlign: 'left',
    titleSize: '38px',
    heroLabel: 'SPECULATIVE ARCHIVE',
    image: {
      src: '/guide/assets/works/xo.jpeg',
      alt: 'Fyerool Darma’s XO installation: a monumental illuminated terrain model surrounded by industrial structures',
      position: 'center',
      aspect: '16 / 9',
    },
    description: [
      'XO is an archive from a Southeast Asia that does not exist—but might.',
      'The work follows a group of “xenographers” from Nusanatra returning from Nooantara, a parallel world where mind and body, land and water, and physical and virtual life are not treated as opposites. Objects, moving images and a monumental mask appear as fragments from this world, catalogued for a collective history.',
      'Its mythology folds together the noosphere—a realm of shared thought—with Sutan Takdir Alisjahbana’s Bumantara, an idea of Southeast Asia as interconnected “lands between.”',
      'Even the central mask refuses a stable identity. It is called the Flaming Knotted Heart, the Apparatus and the Ongoing Processing Intake System. Each name changes what the object can be—and what kind of world the archive allows us to see.',
    ],
    whyNow: [
      'Most technological futures inherit the same oppositions: nature or machine, body or data, real or virtual, tradition or progress. XO reorganises these familiar categories through different intellectual and cultural histories. Its future begins from a different set of assumptions.',
      'A database, museum or archive does not only store reality. Through its labels, it helps produce it.',
    ],
    reflection: [
      'Which boundary in your own life feels too rigid: human and machine, real and virtual, nature and technology, or past and future?',
      'What might become possible if that boundary loosened?',
    ],
  },
}

export const commonsContent = {
  title: 'THE\nCOMMONS',
  deck: 'The Commons centres the encounters between people: conversations, disagreements, pauses and contributions.',
  paragraphs: [
    'The low seats, cushions, tables, questions and voting wall arrange the room for conversation, disagreement, reconsideration and unstructured time.',
    'In a conventional exhibition, visitors are expected to move from one artwork to the next. Here, stopping is also participation. Your attention, conversations and contributions become part of the changing life of the room.',
    'The public poll offers a visible snapshot, not a final answer. Each cluster of stickers records both a collective position and the limits of the question: who participated, who hesitated and what nuance disappeared between the available choices?',
    'A commons does not require consensus. It is something people continually negotiate through difference, responsibility, generosity and care.',
  ],
  tryThis: [
    'Stay past your first impulse to move on.',
    'Vote, then return to your answer later.',
    'Speak with someone who chose differently.',
    'Leave a thought for the next person.',
  ],
}

export const readingRoomContent = {
  title: 'READING ROOM &\nRESEARCH ARCHIVE\nOF SOUTHEAST ASIAN\nFUTURES',
  deck: 'The archive is unfinished. So is the future.',
  paragraphs: [
    'Most visions of the future arrive already branded. They are produced by technology companies, circulated globally and presented as though everyone is travelling to the same destination.',
    'The room gathers a counter-archive of Southeast Asian experiments in modernity, ecology, networks and collective life—evidence that the region has long imagined technological change on its own terms.',
    'These histories show that networks existed before the internet, and that questions now associated with AI—about knowledge, power, ecological crisis and collective life—have much deeper roots.',
    'Recovering these histories widens the material from which the future can be made.',
  ],
  browsingCues: [
    'Pick up something outside your usual field.',
    'Follow one reference into another.',
    'Notice who and what is absent.',
  ],
  reflectionQuestions: [
    'Whose future is missing from this archive?',
    'Which idea here deserves to be put back into circulation?',
    'What history, person or publication would you add?',
  ],
}

export const closingContent = {
  title: 'CONTINUE?',
  paragraphs: [
    'You began with the self: how technology speaks back to us, measures us and rehearses who we might become. The view then widened to communities and shared memory, before turning to the histories and beliefs from which Southeast Asian futures are made.',
    'These scales are inseparable. Personal choices become collective patterns. Communities inherit histories. Every imagined future elevates some values, voices and ways of living over others.',
    'The future is not waiting somewhere else. It is being produced now—by the systems we use, the stories we repeat and the relationships we choose to sustain.',
  ],
  questions: [
    'What do you want technology to help us become?',
    'What should it never be allowed to decide for us?',
    'What will you contribute to the net—and what will you refuse to give it?',
  ],
  ending: ['The exhibition ends here.', 'The questions leave with you.'],
}
