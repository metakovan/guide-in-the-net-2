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
    'Technology reaches us intimately: in the voice that answers, the score that judges, the portrait that predicts and the feed that learns what keeps us looking.',
    'These works examine what happens when systems speak as us, measure us and rehearse who we might become. What do they reflect back—and which futures do they begin to prescribe?',
    'The question is not only what these technologies can do. It is what repeated use does to us.',
  ],
}

export const sectionTwoIntro: SectionIntroContent = {
  number: 'SECTION 2',
  title: 'TOGETHER IN\nTHE NET',
  paragraphs: [
    'Technology rarely remains personal for long. A private choice becomes a data point; a post becomes an archive; a voice enters shared memory.',
    'Across a living altar, an emotional map and the Commons, this section asks you to listen, contribute, disagree and leave something behind. Community is not automatic agreement. It is the ongoing work of participation, difference, care and exchange.',
    'What do we preserve? What do platforms flatten? What can many different lives build together?',
  ],
}

export const sectionThreeIntro: SectionIntroContent = {
  number: 'SECTION 3',
  title: 'HERE IN\nTHE NET',
  lead: 'Every story about technology begins somewhere: in a language, belief, history, infrastructure and relationship to power.',
  paragraphs: [
    'Here, code meets divination; AI rehearses Asian identities; speculative archives refuse familiar divisions between nature and technology, body and data, past and future.',
    'These works ask what becomes possible when technology is absorbed, translated and reinvented from Southeast Asia rather than imported from elsewhere.',
  ],
}

export const sectionOneArtworks: Record<Extract<ArtworkId, 'safe-entry' | 'history' | 'future-you' | 'impactbench' | 'grace-quek'>, ArtworkContent> = {
  'safe-entry': {
    id: 'safe-entry',
    title: 'SAFE ENTRY V.2.5\n(2020)',
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
      alt: 'A visitor standing before Heman Chong’s painted Safe Entry V.2.5 QR code installation',
      position: 'center 47%',
      aspect: '3 / 2',
    },
    description: [
      'Chong’s painting is of a QR code. It references Singapore’s national SafeEntry check-in system, introduced during the COVID-19 pandemic to record visits to public venues. The work leads to an hour-long video from Chong’s Ambient Walking series, documenting a walk through Changi Airport Terminal 2 and uploaded to YouTube on April 30, 2020, the day before the terminal closed for renovation.',
      'Opening Islands in the Net, Chong’s painting is a historical marker pointing to a specific moment of accelerated data collection and worldwide digitalisation. Existing simultaneously between YouTube and the physical gallery as both a virtual and physical object, the work gives aesthetic form to one of the exhibition’s central propositions: that contemporary reality is produced through cybernetic networks that collapse the distinction between the virtual and the physical.',
    ],
    whyNow: [
      'SafeEntry belongs to the recent history of the pandemic, but its underlying logic remains. Apps, digital wallets, facial recognition and seamless check-ins increasingly organise access to public life. The work asks how quickly exceptional technologies become ordinary infrastructure—and how habits of scanning, registering and surrendering data reshape our relationship with public space.',
    ],
    reflection: [
      'Which technologies introduced as temporary or exceptional have become permanent?',
      'When convenience depends on exchanging data, how freely are you choosing?',
    ],
  },
  history: {
    id: 'history',
    title: 'A HISTORY OF\nINTELLIGENCE IN\n((SOUTH)(EAST)) ASIA\n(2025)',
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
      'Ho’s visual graphic mobilises information as art. Situated at the start of Islands in the Net, it maps the entanglements of intelligence, computation and geopolitics across the region from the 1940s to 2025.',
      'Rather than treating artificial intelligence as a technological rupture, Ho’s work locates contemporary machine intelligence within longer histories of empire, logistics, development and regional power. It reveals the inherited systems and associated spectres of empire, ideology and geopolitics through which intelligence has been organised, measured and operationalised across Southeast Asia.',
    ],
    whyNow: [
      'Conversations about AI often begin with the newest model. This work begins elsewhere: with history. What we now call “intelligence” rests on decades of political decisions, infrastructure, research, labour and unequal relations of power. Its future cannot be understood without asking whose past made it possible—and whose histories remain missing.',
    ],
    reflection: [
      'What disappears when AI is told mainly as a Silicon Valley story?',
      'Whose work or history would you add to this map?',
    ],
  },
  'future-you': {
    id: 'future-you',
    title: 'FUTURE YOU\n(2024–NOW)',
    artist: 'BY MIT MEDIA LAB',
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
      'Future You is an AI digital-twin platform that invites people into conversations with possible versions of their future selves. From information provided by the user, the system generates “future self memories”: backstories that the model references when speaking to the user.',
      'The project grew out of Prof. Pat Pataranutaporn’s doctoral research on Cyborg Psychology, which explores how AI systems shape human cognition, behaviour and psychology, and aspires to find ways to encourage human flourishing.',
      'While Future You can be historicised within a lineage of research into future selves dating to the 1960s, it is also a cultural project that speaks to our contemporary moment. It offers a way to navigate the post-contemporary time complex, enabling us to speak to alternative future selves as a way of addressing the present.',
    ],
    whyNow: [
      'AI is moving beyond answering questions. It is increasingly positioned as a coach, confidant and guide. At a moment shaped by self-optimisation and algorithmic prediction, Future You asks whether a simulated self might help us think more patiently about our future—or begin to influence the choices through which that future is made.',
    ],
    reflection: [
      'Which parts of your imagined future came from your hopes, and which came from the system?',
      'Did the encounter expand your sense of possibility—or narrow it?',
    ],
  },
  impactbench: {
    id: 'impactbench',
    title: 'OPEN BENCHMARK OF AI\nIMPACT ON HUMANS\n(IMPACTBENCH) × CEREALLMS\n(2025–NOW)',
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
      alt: 'A collection of fictional CereaLLMs cereal boxes carrying AI Nutrition Labels',
      position: 'center',
      aspect: '16 / 9',
    },
    description: [
      'ImpactBench evaluates leading AI systems through an AI Nutrition Label that makes visible their potential impacts on people and society, including accuracy, safety, fairness, learning, wellbeing, agency and social relationships. Rather than measuring only technical capability, it helps the public understand how AI systems may influence human behaviour and cognition.',
      'Presented alongside the online research project are speculative cereal boxes that imagine these AI Nutrition Labels. Developed by Ryan Ho in partnership with Pat Pataranutaporn, Rachel Poonsiriwong and Chayapatr (Pub) Archiwaranguprok, these objects—affectionately nicknamed CereaLLMs—make physical the findings of the research, pointing to how AI is a human utility and to the urgency of consensus and literacy around AI.',
    ],
    whyNow: [
      'As AI becomes companion, teacher and adviser, accuracy is no longer an adequate measure of quality. A system can be factually correct while making someone less confident, more dependent or more isolated. ImpactBench proposes that intelligence should also be judged by the human relationship it creates—and by whose wellbeing it protects.',
    ],
    reflection: [
      'What should an AI be evaluated on beyond whether it is correct?',
      'Would you choose a less capable system if it better protected your autonomy?',
    ],
  },
  'grace-quek': {
    id: 'grace-quek',
    title: 'ART IN THE AGE OF\nHUMAN CLONING\n(2026)',
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
      'Art in the Age of Human Cloning is a performance developed in collaboration with DeepSeek and performed at Padimai Art & Tech Studio on 10 July 2026.',
      'Revisiting a performance first staged through the persona of Dr Eng Olsen, the work speculates clones of modern artists as content producers and virtual entities, opening questions around authorship, reproduction and authenticity.',
      'In collaborating with DeepSeek, Quek adopted several rules: the performance, visuals and soundtrack were produced through prompting; defaults were accepted whenever possible; and DeepSeek’s recommendations for other models were followed. Her prompts were produced by DeepSeek, and its preset style was retained to preserve the integrity of the AI’s voice.',
      'The artwork comprises both the performance and its online documentation, staged here through promotional standees and a QR code leading to the video and Quek’s prompt history.',
    ],
    whyNow: [
      'AI is described as a collaborator, yet it is built through the replication and recombination of human work. Quek asks whether authorship survives when style, memory and identity can be simulated—and who controls a copy once it begins to act for itself. Authenticity may increasingly depend on credit, consent and the right to refuse.',
    ],
    reflection: [
      'When does a copy become a new work—or a new person?',
      'When an artist works with AI, who receives the credit, responsibility and blame?',
    ],
  },
}

export const sectionTwoArtworks: Record<Extract<ArtworkId, 'altar' | 'traces'>, ArtworkContent> = {
  altar: {
    id: 'altar',
    title: 'F4NT4SY_H4RD_\nDR1VE://ALTAR\n(2026)',
    artist: 'BY BUSSY TEMPLE\n(JO HO, ZENON, NYDIA, BRUCE AND MINSOO)',
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
      'Established in 2022, Bussy Temple is a Singapore-based queer rave collective that came together in response to a lack of spaces centred on trans, non-binary and femme people within Singapore’s nightlife. Through their practice, they expand our definition of the rave from “nightlife entertainment” into a social, political and aesthetic practice of imagining different ways of living together.',
      'Their gatherings bring together performance art, community organising and speculative world-building. Manifesting in Islands in the Net as a communal altar to their web archive, the installation invites visitors to explore videos, photographs and community contributions collected over the years.',
      'Imagined as a growing network rather than an accumulation of historical records, visitors are invited to contribute to this living archive in the lead-up to Bussy Temple’s takeover of the exhibition on 12 September.',
    ],
    whyNow: [
      'Online platforms promise to preserve everything, yet community histories remain fragile. Posts disappear, accounts are removed and lived experience is flattened into content. This altar treats parties, friendships, costumes and fleeting encounters as forms of cultural knowledge. Memory remains alive because people can touch it, contest it and add to it.',
    ],
    reflection: [
      'What objects, images or rituals hold your community together?',
      'What deserves to be remembered that conventional archives might miss?',
    ],
  },
  traces: {
    id: 'traces',
    title: 'TRACES\n(2026)',
    artist: 'BY RYAN HO,\nEMOTIONAL TECHNOLOGIES LAB,\nVIGNESH SUNDARESAN (METAKOVAN)',
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
    title: 'ASIA MAXXING\n(2026)',
    artist: 'BY WEIWEI HSU',
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
      'Coined by evolutionary biologist Richard Dawkins in 1976, the meme describes a unit of cultural transmission: an idea, image, behaviour or fashion that is imitated and transformed as it circulates. Internet memes are its contemporary manifestation, spreading rapidly through digital platforms. Their cultural power lies in their ability to make ideas visible, repeatable and difficult to ignore.',
      '*ASIA MAXXING* references Chinamaxxing, a viral trend that emerged in 2025 in which non-Chinese people adopted aspects of everyday Chinese life as lifestyle upgrades, wellness practices or critiques of Western society. Presented as a photobooth, the web application imagines a future regional bureaucracy through which users can generate speculative accounts of lives they might have lived in India, Indonesia, China or the Philippines.',
      'Its narratives rely on the generic language of large language models and on a framework developed by Sprout, Hsu’s start-up, using questions inspired by online personality tests. By exposing these mechanisms, the work invokes the Forer effect: the tendency to perceive vague, general descriptions as uniquely accurate.',
    ],
    whyNow: [
      'AI can produce convincing identities from data that carries assumptions about race, gender, class and nationality. Yet “Asia” is not a single, stable identity, but a contested idea shaped from within the region, its diasporas and elsewhere. The work makes those constructions visible: its real subject is the system imagining you.',
    ],
    reflection: [
      'What assumptions did the experience make about Asia—and about you?',
      'Who gets to decide what an “Asian future” looks like?',
    ],
  },
  hexagram: {
    id: 'hexagram',
    title: 'ICHING\nHEXAGRAM\n(2026)',
    artist: 'BY WEIWEI HSU',
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
      'After three years of study with an *I Ching* master, Hsu developed *ICHING HEXAGRAM*, a divination app that brings machine learning into conversation with ancient Chinese wisdom. Imagined as an alternative to popular astrology apps such as Co–Star, it seeks to make Eastern philosophies accessible to a wider audience.',
      'The *I Ching* is an ancient Chinese divination text that has influenced mathematics, cybernetics, information theory and digital computation. It also informed Carl Jung’s concept of synchronicity: events that are meaningfully, rather than causally, connected. *ICHING HEXAGRAM* proposes fate as an interface for managing complexity, situating AI within a longer global history of rule-based knowledge production and meaning-making.',
    ],
    whyNow: [
      'Algorithms already tell us what to watch, where to go and what may happen next, often presenting prediction as objective because it is data-driven. The I Ching offers another relationship to the future: poetic, ambiguous and dependent on interpretation. It asks whether uncertainty is something technology should eliminate—or something we can learn to inhabit.',
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
      'The exhibition culminates in Fyerool Darma’s XO, an extension of his ongoing work kædæluwær§æk§§æk (A Xenographer’s Index), first presented at the Malay Heritage Centre, Singapore.',
      'Imagining an expedition into n**antara, a parallel world of the Nusantara, the installation unfolds as a cinematic and virtual double of Padimai’s physical exhibition space. Here, a worker responds to an AI job listing for a “Memory Diver” and enters a process of extraction. Narrated by a butterfly that remains in a room that no longer exists, the work asks what survives a system built to turn everything it encounters into data.',
      'XO includes a film, artefacts, a historical archive and library that trace the emergence of Southeast Asian Futurism from the 1970s through the work of Sutan Takdir Alisjahbana to contemporary theory by Singapore futurists such as Lee Chor Pharn.',
      'Invoking older forms of archipelagic connectivity alongside emergent networks of technological and informational interdependence, XO expands the historical idioms of Southeast Asian Futurism to include a critical appraisal of data, heritage and ontology.',
    ],
    whyNow: [
      'Most technological futures inherit familiar oppositions: nature or machine, body or data, tradition or progress. XO reorganises these categories through different intellectual and cultural histories. It also reminds us that a database, museum or archive does not merely store reality. Through its classifications, it helps produce it.',
    ],
    reflection: [
      'Which boundary feels too rigid: human and machine, real and virtual, nature and technology, or past and future?',
      'What might become possible if it loosened?',
    ],
  },
}

export const commonsContent = {
  title: 'THE\nCOMMONS',
  deck: 'The Commons is the shared centre of the exhibition. The space itself is complete, but what it holds will continue to change as people pass through it.',
  paragraphs: [
    'Its low seats, cushions, tables and public questions create room for something less predictable than another artwork encounter: sitting, reading, writing, drawing, talking, listening, disagreeing, reconsidering—or simply spending time together.',
    'In most exhibitions, visitors are expected to move from one work to the next. Here, stopping is also a form of participation. Notes, drawings and reflections accumulate over time. You may encounter something left by a stranger, add a response of your own, or leave behind a question for whoever arrives next.',
    'The Commons holds questions rather than final answers. What should technology help us know? What should remain private, uncertain or human? What do our data traces reveal—and what can they never capture? What kinds of technological futures should we protect, refuse or imagine differently?',
    'A commons is not made by everyone reaching agreement. It is continually shaped through difference, curiosity, responsibility and care. In this sense, the room is never quite complete without the people who inhabit it—and is remade by each person who enters.',
  ],
  reflectionLead: 'A community is more than a group of people sharing the same space. It begins with what they are willing to question, hold and imagine together.',
  tryThis: [
    'Stay for longer than feels necessary.',
    'Read something left by a stranger.',
    'Follow a thought that unsettles you.',
    'Add a response, drawing or question of your own.',
    'Leave something for whoever arrives next.',
  ],
}

export const readingRoomContent = {
  title: 'READING ROOM &\nRESEARCH ARCHIVE\nOF SOUTHEAST ASIAN\nFUTURES',
  deck: 'The archive is unfinished. So is the future.',
  paragraphs: [
    'Most visions of the future arrive already branded: produced by technology companies, circulated globally and presented as though everyone is travelling towards the same destination.',
    'This room gathers a counter-archive of Southeast Asian experiments in modernity, ecology, networks and collective life. It shows that the region has long imagined technological change on its own terms—and that today’s questions about AI, knowledge, power and ecological crisis have deeper histories.',
    'Recovering those histories widens the material from which futures can be made.',
  ],
  browsingCues: [
    'Pick up something outside your usual field.',
    'Follow one reference into another.',
    'Notice who and what is absent.',
  ],
  reflectionQuestions: [
    'Whose future is missing from this archive?',
    'What idea, history or publication should be put back into circulation?',
  ],
}

export const closingContent = {
  title: 'CONTINUE?',
  paragraphs: [
    'You began with the self: how technology speaks back, measures us and rehearses who we might become. The view widened to shared memory, then to the histories and beliefs from which Southeast Asian futures are made.',
    'These scales are inseparable. Personal choices become collective patterns; communities inherit histories; every imagined future elevates some values and ways of living over others.',
    'The future is being produced now—through the systems we use, the stories we repeat and the relationships we sustain.',
  ],
  questions: [
    'What do you want technology to help us become?',
    'What should it never be allowed to decide for us?',
    'What will you contribute to the net—and what will you refuse to give it?',
  ],
  ending: ['The exhibition ends here.', 'The questions leave with you.'],
}
