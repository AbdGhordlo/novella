// ─── Types ────────────────────────────────────────────────────────────────────

export interface DummyCategory {
  name: string;
  description: string;
}

export interface DummyAuthor {
  name: string;
  bio: string;
  profileImage: string;
}

export interface DummyBook {
  title: string;
  description: string;
  /** Local asset path — resolved to an absolute path by seed.ts */
  coverImage: string;
  publishedDate: string; // ISO 8601
  language: string;
  pageCount: number;
  isWebNovel: boolean;
  price: number; // USD
  categoryNames: string[]; // must match a name in the categories array
  authorNames: string[]; // must match a name in the authors array
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: DummyCategory[] = [
  {
    name: "Classic Novels",
    description:
      "Enduring literary masterpieces that have shaped culture and storytelling across generations.",
  },
  {
    name: "Fantasy",
    description:
      "Epic tales of magic, mythical creatures, and worlds beyond imagination.",
  },
  {
    name: "Psychology",
    description:
      "Explorations of the human mind — how we think, feel, decide, and find meaning.",
  },
  {
    name: "History",
    description:
      "Sweeping accounts of civilisations, events, and the forces that shaped the modern world.",
  },
  {
    name: "Self-Help",
    description:
      "Practical frameworks and hard-won wisdom for building better habits, focus, and lives.",
  },
  {
    name: "Science Fiction",
    description:
      "Speculative visions of the future — technology, space, and what it means to be human.",
  },
  {
    name: "Mystery & Thriller",
    description:
      "Gripping plots built on crime, deception, and relentless tension.",
  },
  {
    name: "Romance",
    description:
      "Stories centred on love, longing, and the full spectrum of human connection.",
  },
  {
    name: "Children & YA",
    description:
      "Adventures and coming-of-age stories crafted for younger readers and teens.",
  },
  {
    name: "Web & Light Novels",
    description:
      "Serialised online fiction and Japanese-style illustrated prose, loved worldwide.",
  },
];

// ─── Authors ──────────────────────────────────────────────────────────────────

export const authors: DummyAuthor[] = [
  // ── Classic Novels ──────────────────────────────────────────────────────
  {
    name: "Fyodor Dostoevsky",
    bio: "Russian novelist and philosopher widely regarded as one of the greatest writers of all time. His works explore the depths of the human psyche, morality, and suffering.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg/440px-Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg",
  },
  {
    name: "George Orwell",
    bio: "English novelist, essayist, and critic whose work is marked by lucid prose, social criticism, and opposition to totalitarianism. Author of two of the most influential novels of the 20th century.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/440px-George_Orwell_press_photo.jpg",
  },
  {
    name: "Alexandre Dumas",
    bio: "French author celebrated for his historical adventure novels. His swashbuckling stories, full of romance and intrigue, have been adapted into countless films and plays.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Alexandre_Dumas_p%C3%A8re_by_Nadar_-2.jpg/440px-Alexandre_Dumas_p%C3%A8re_by_Nadar_-2.jpg",
  },

  // ── Fantasy ─────────────────────────────────────────────────────────────
  {
    name: "Patrick Rothfuss",
    bio: "American fantasy author best known for The Kingkiller Chronicle, a series praised for its literary prose, intricate world-building, and deeply human protagonist.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Patrick_Rothfuss_-_Lucca_Comics_%26_Games_2018.jpg/440px-Patrick_Rothfuss_-_Lucca_Comics_%26_Games_2018.jpg",
  },
  {
    name: "J.R.R. Tolkien",
    bio: "English writer, poet, and academic. The creator of Middle-earth, whose works The Hobbit and The Lord of the Rings fundamentally shaped the modern fantasy genre.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg/440px-J._R._R._Tolkien%2C_ca._1925.jpg",
  },
  {
    name: "Brandon Sanderson",
    bio: "American author of epic fantasy and science fiction. Known for his meticulously designed magic systems and the vast, interconnected Cosmere universe.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/n/nd/BrandonSanderson2022.jpg/440px-BrandonSanderson2022.jpg",
  },

  // ── Psychology ──────────────────────────────────────────────────────────
  {
    name: "Daniel Kahneman",
    bio: "Nobel Prize-winning psychologist and economist. His research on cognitive biases and decision-making under uncertainty changed how we understand the human mind.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Daniel_Kahneman_Nobel_Prize_%28cropped%29.jpg/440px-Daniel_Kahneman_Nobel_Prize_%28cropped%29.jpg",
  },
  {
    name: "Charles Duhigg",
    bio: "Pulitzer Prize-winning reporter and author who writes about the science of habits, productivity, and decision-making.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charles_Duhigg.jpg/440px-Charles_Duhigg.jpg",
  },
  {
    name: "Viktor Frankl",
    bio: "Austrian psychiatrist, Holocaust survivor, and founder of logotherapy. His memoir became one of the most influential books in the psychology of meaning and resilience.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Viktor_Frankl2.jpg/440px-Viktor_Frankl2.jpg",
  },

  // ── History ─────────────────────────────────────────────────────────────
  {
    name: "Yuval Noah Harari",
    bio: "Israeli historian and author whose books examine humanity's past, present, and future at an epic scale. His work has sold tens of millions of copies worldwide.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Yuval_Noah_Harari_2.jpg/440px-Yuval_Noah_Harari_2.jpg",
  },
  {
    name: "Peter Frankopan",
    bio: "British historian and professor at Oxford University. His work centres on the medieval and early modern history of the Middle East and Central Asia.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Peter_Frankopan_%2830702601937%29.jpg/440px-Peter_Frankopan_%2830702601937%29.jpg",
  },
  {
    name: "Jared Diamond",
    bio: "American scientist, author, and professor at UCLA. His interdisciplinary work spans evolutionary biology, anthropology, and ecology.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Jared_Diamond.jpg/440px-Jared_Diamond.jpg",
  },

  // ── Self-Help ────────────────────────────────────────────────────────────
  {
    name: "Mark Manson",
    bio: "American blogger and author known for his no-nonsense approach to self-help. His writing blends philosophy, psychology, and sharp, irreverent humour.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mark_Manson_2019.jpg/440px-Mark_Manson_2019.jpg",
  },
  {
    name: "Cal Newport",
    bio: "Computer science professor at Georgetown and author focused on the intersection of technology and productivity. An advocate for focused, meaningful work.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cal_Newport_2017.jpg/440px-Cal_Newport_2017.jpg",
  },
  {
    name: "James Clear",
    bio: "Author and speaker focused on habits, decision-making, and continuous improvement. His Atomic Habits framework has influenced millions of readers worldwide.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/James_Clear%2C_author_of_Atomic_Habits.jpg/440px-James_Clear%2C_author_of_Atomic_Habits.jpg",
  },

  // ── Science Fiction ──────────────────────────────────────────────────────
  {
    name: "Isaac Asimov",
    bio: "American author and professor of biochemistry, one of the most prolific science fiction writers in history. Best known for the Foundation series and the Three Laws of Robotics.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Isaac.Asimov01.jpg/440px-Isaac.Asimov01.jpg",
  },
  {
    name: "Orson Scott Card",
    bio: "American novelist and critic best known for Ender's Game, which won both the Hugo and Nebula Awards. He explores themes of empathy, ethics, and leadership.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Orson_Scott_Card_at_BYU_Symposium_20080satelite.jpg/440px-Orson_Scott_Card_at_BYU_Symposium_20080satelite.jpg",
  },
  {
    name: "Frank Herbert",
    bio: "American science fiction author best known for the Dune series — one of the best-selling and most critically acclaimed science fiction works ever written.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FrankHerbert_1969.jpg/440px-FrankHerbert_1969.jpg",
  },

  // ── Mystery & Thriller ───────────────────────────────────────────────────
  {
    name: "Gillian Flynn",
    bio: "American novelist and screenwriter. Her psychological thrillers are celebrated for their dark, complex female characters and shocking narrative twists.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gillian_Flynn_%28cropped%29.jpg/440px-Gillian_Flynn_%28cropped%29.jpg",
  },
  {
    name: "Stieg Larsson",
    bio: "Swedish journalist and author who posthumously became one of the world's best-selling crime writers. The Millennium series sold over 100 million copies globally.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Stieg_Larsson.jpg/440px-Stieg_Larsson.jpg",
  },
  {
    name: "Dan Brown",
    bio: "American author known for his fast-paced thriller novels featuring symbologist Robert Langdon. The Da Vinci Code is one of the best-selling books of all time.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Dan_Brown_bookcover.jpg/440px-Dan_Brown_bookcover.jpg",
  },

  // ── Romance ─────────────────────────────────────────────────────────────
  {
    name: "Jojo Moyes",
    bio: "British novelist and journalist. Her emotionally resonant love stories have been adapted into major films and translated into over 40 languages.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Jojo_Moyes_at_the_2018_Edinburgh_International_Book_Festival_%2801%29.jpg/440px-Jojo_Moyes_at_the_2018_Edinburgh_International_Book_Festival_%2801%29.jpg",
  },
  {
    name: "Nicholas Sparks",
    bio: "American romance novelist and screenwriter. His sentimental novels often set in North Carolina have sold over 105 million copies worldwide.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nicholas_Sparks.jpg/440px-Nicholas_Sparks.jpg",
  },
  {
    name: "Jane Austen",
    bio: "English novelist known for her wit, social commentary, and vivid portrayals of 18th-century English society. Her works remain among the most widely read in English literature.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg/440px-CassandraAusten-JaneAusten%28c.1810%29_hires.jpg",
  },

  // ── Children & YA ────────────────────────────────────────────────────────
  {
    name: "Rick Riordan",
    bio: "American author best known for the Percy Jackson series. A former middle school teacher, he draws on classical mythology to create adventurous stories for young readers.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rick_Riordan_2012_Shankbone.JPG/440px-Rick_Riordan_2012_Shankbone.JPG",
  },
  {
    name: "Suzanne Collins",
    bio: "American television writer and author. The Hunger Games trilogy established her as a leading voice in dystopian YA fiction and sparked worldwide conversation about media and power.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Suzanne_Collins_David_Shankbone_2010.jpg/440px-Suzanne_Collins_David_Shankbone_2010.jpg",
  },
  {
    name: "J.K. Rowling",
    bio: "British author best known for the Harry Potter series, which has sold over 500 million copies and become the best-selling book series in history.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/J._K._Rowling_2010.jpg/440px-J._K._Rowling_2010.jpg",
  },

  // ── Web & Light Novels ───────────────────────────────────────────────────
  {
    name: "Cuttlefish That Loves Diving",
    bio: "Chinese web novel author known for the acclaimed Lord of the Mysteries series, celebrated for its intricate Cthulhu-inspired lore and masterful plotting.",
    profileImage: "",
  },
  {
    name: "Domagoj Kurmaic",
    bio: "Croatian author writing under the pen name Chrysalis on Royal Road. Mother of Learning is widely considered one of the finest web serials in the English language.",
    profileImage: "",
  },
  {
    name: "Guiltythree",
    bio: "Web serial author on Royal Road. Shadow Slave is a dark fantasy progression story praised for its atmosphere, world-building, and relentless pacing.",
    profileImage: "",
  },
];

// ─── Books ────────────────────────────────────────────────────────────────────

export const books: DummyBook[] = [
  // ── Classic Novels ────────────────────────────────────────────────────────
  {
    title: "Crime and Punishment",
    description:
      "A young, impoverished student in St. Petersburg murders a pawnbroker to test his theory that extraordinary people are above conventional morality — then spends the novel unravelling under the weight of his guilt.",
    coverImage: "@/assets/images/book-covers/crime-and-punishment-cover.jpg",
    publishedDate: "1866-01-01T00:00:00.000Z",
    language: "English",
    pageCount: 551,
    isWebNovel: false,
    price: 9.99,
    categoryNames: ["Classic Novels"],
    authorNames: ["Fyodor Dostoevsky"],
  },
  {
    title: "1984",
    description:
      "In a totalitarian superstate where the Party controls all thought and history, Winston Smith begins a doomed rebellion through love and the desperate act of keeping a diary.",
    coverImage: "@/assets/images/book-covers/1984-cover.jpg",
    publishedDate: "1949-06-08T00:00:00.000Z",
    language: "English",
    pageCount: 328,
    isWebNovel: false,
    price: 9.99,
    categoryNames: ["Classic Novels"],
    authorNames: ["George Orwell"],
  },
  {
    title: "The Count of Monte Cristo",
    description:
      "Falsely imprisoned for thirteen years, Edmond Dantès escapes, discovers a vast hidden treasure, and reinvents himself as the mysterious Count of Monte Cristo to exact careful, elaborate revenge on those who betrayed him.",
    coverImage:
      "@/assets/images/book-covers/the-count-of-monte-cristo-cover.jpg",
    publishedDate: "1844-08-28T00:00:00.000Z",
    language: "English",
    pageCount: 1276,
    isWebNovel: false,
    price: 11.99,
    categoryNames: ["Classic Novels"],
    authorNames: ["Alexandre Dumas"],
  },

  // ── Fantasy ───────────────────────────────────────────────────────────────
  {
    title: "The Name of the Wind",
    description:
      "The legend of Kvothe — musician, arcanist, and warrior — told in his own words: how he was driven from his home, survived the streets, earned admission to a prestigious magic university, and began his search for the mythical Chandrian.",
    coverImage: "@/assets/images/book-covers/the-name-of-the-wind-cover.jpg",
    publishedDate: "2007-03-27T00:00:00.000Z",
    language: "English",
    pageCount: 662,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Fantasy"],
    authorNames: ["Patrick Rothfuss"],
  },
  {
    title: "The Hobbit",
    description:
      "Comfortable homebody Bilbo Baggins is swept into an epic quest by a wizard and thirteen dwarves to reclaim a dragon-guarded mountain treasure. A tale of unexpected courage that laid the foundation for Middle-earth.",
    coverImage: "@/assets/images/book-covers/the-hobbit-cover.jpg",
    publishedDate: "1937-09-21T00:00:00.000Z",
    language: "English",
    pageCount: 310,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Fantasy"],
    authorNames: ["J.R.R. Tolkien"],
  },
  {
    title: "Mistborn: The Final Empire",
    description:
      "For a thousand years the Lord Ruler has reigned over a world of ash and oppression. A street thief with rare magical powers joins a band of rebels in a seemingly impossible heist — to overthrow a god-like emperor.",
    coverImage: "@/assets/images/book-covers/mistborn-cover.jpg",
    publishedDate: "2006-07-17T00:00:00.000Z",
    language: "English",
    pageCount: 541,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Fantasy"],
    authorNames: ["Brandon Sanderson"],
  },

  // ── Psychology ────────────────────────────────────────────────────────────
  {
    title: "Thinking, Fast and Slow",
    description:
      "Nobel laureate Daniel Kahneman illuminates the two systems that drive the way we think — the fast, intuitive System 1 and the slow, deliberate System 2 — and how their interplay shapes every decision we make.",
    coverImage: "@/assets/images/book-covers/thinking-fast-and-slow-cover.jpg",
    publishedDate: "2011-10-25T00:00:00.000Z",
    language: "English",
    pageCount: 499,
    isWebNovel: false,
    price: 14.99,
    categoryNames: ["Psychology"],
    authorNames: ["Daniel Kahneman"],
  },
  {
    title: "The Power of Habit",
    description:
      "Drawing on hundreds of scientific studies, Duhigg reveals why habits exist and how they can be changed — from individual routines to the practices of successful companies and social movements.",
    coverImage: "@/assets/images/book-covers/the-power-of-habit-cover.jpg",
    publishedDate: "2012-02-28T00:00:00.000Z",
    language: "English",
    pageCount: 371,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Psychology"],
    authorNames: ["Charles Duhigg"],
  },
  {
    title: "Man's Search for Meaning",
    description:
      "A Holocaust survivor and psychiatrist describes life inside Nazi concentration camps and presents his theory that our primary drive is not pleasure but the pursuit of meaning — the founding text of logotherapy.",
    coverImage: "@/assets/images/book-covers/man-search-for-meaning-cover.jpg",
    publishedDate: "1946-01-01T00:00:00.000Z",
    language: "English",
    pageCount: 165,
    isWebNovel: false,
    price: 10.99,
    categoryNames: ["Psychology"],
    authorNames: ["Viktor Frankl"],
  },

  // ── History ───────────────────────────────────────────────────────────────
  {
    title: "Sapiens",
    description:
      "A sweeping history of humankind from the Stone Age to the twenty-first century, asking how Homo sapiens came to dominate the Earth and what it has cost us and every other species.",
    coverImage: "@/assets/images/book-covers/sapiens-cover.jpg",
    publishedDate: "2011-01-01T00:00:00.000Z",
    language: "English",
    pageCount: 443,
    isWebNovel: false,
    price: 15.99,
    categoryNames: ["History"],
    authorNames: ["Yuval Noah Harari"],
  },
  {
    title: "The Silk Roads",
    description:
      "A radical retelling of world history placing Asia, the Middle East, and the trade routes that connected them at the very centre of civilisation, challenging the Western-centric story we've been taught.",
    coverImage: "@/assets/images/book-covers/the-silk-roads-cover.jpg",
    publishedDate: "2015-09-10T00:00:00.000Z",
    language: "English",
    pageCount: 636,
    isWebNovel: false,
    price: 16.99,
    categoryNames: ["History"],
    authorNames: ["Peter Frankopan"],
  },
  {
    title: "Guns, Germs, and Steel",
    description:
      "Jared Diamond examines why certain civilisations came to dominate others — not because of racial or intellectual superiority, but due to geography, agriculture, and the accidental advantages of domesticable plants and animals.",
    coverImage: "@/assets/images/book-covers/guns-germs-and-steel-cover.jpg",
    publishedDate: "1997-03-01T00:00:00.000Z",
    language: "English",
    pageCount: 480,
    isWebNovel: false,
    price: 14.99,
    categoryNames: ["History"],
    authorNames: ["Jared Diamond"],
  },

  // ── Self-Help ─────────────────────────────────────────────────────────────
  {
    title: "The Subtle Art of Not Giving a F*ck",
    description:
      "A counterintuitive guide to living a good life by caring less about more things, embracing limitations, and choosing your struggles wisely rather than chasing endless positivity.",
    coverImage:
      "@/assets/images/book-covers/the-subtle-art-of-not-giving-a-fuck-cover.jpg",
    publishedDate: "2016-09-13T00:00:00.000Z",
    language: "English",
    pageCount: 224,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Self-Help"],
    authorNames: ["Mark Manson"],
  },
  {
    title: "Deep Work",
    description:
      "Cal Newport argues that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare and increasingly valuable — and lays out a rigorous training regimen for cultivating it.",
    coverImage: "@/assets/images/book-covers/deep-work-cover.jpg",
    publishedDate: "2016-01-05T00:00:00.000Z",
    language: "English",
    pageCount: 296,
    isWebNovel: false,
    price: 14.99,
    categoryNames: ["Self-Help"],
    authorNames: ["Cal Newport"],
  },
  {
    title: "Atomic Habits",
    description:
      "James Clear presents a proven framework for building good habits and breaking bad ones, rooted in the science of marginal gains: tiny 1% improvements compound into remarkable results over time.",
    coverImage: "@/assets/images/book-covers/atomic-habits-cover.jpg",
    publishedDate: "2018-10-16T00:00:00.000Z",
    language: "English",
    pageCount: 320,
    isWebNovel: false,
    price: 15.99,
    categoryNames: ["Self-Help"],
    authorNames: ["James Clear"],
  },

  // ── Science Fiction ───────────────────────────────────────────────────────
  {
    title: "Foundation",
    description:
      "A mathematician predicts the fall of the Galactic Empire and sets in motion a thousand-year plan to preserve human knowledge and shorten the coming dark age. The first book of Asimov's landmark series.",
    coverImage: "@/assets/images/book-covers/foundation-cover.jpg",
    publishedDate: "1951-08-21T00:00:00.000Z",
    language: "English",
    pageCount: 244,
    isWebNovel: false,
    price: 11.99,
    categoryNames: ["Science Fiction"],
    authorNames: ["Isaac Asimov"],
  },
  {
    title: "Ender's Game",
    description:
      "Gifted child Andrew 'Ender' Wiggin is recruited to an elite battle school in orbit, trained through increasingly brutal war games, unaware that the fate of the entire human race rests on his shoulders.",
    coverImage: "@/assets/images/book-covers/ender-game-cover.jpg",
    publishedDate: "1985-01-15T00:00:00.000Z",
    language: "English",
    pageCount: 352,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Science Fiction"],
    authorNames: ["Orson Scott Card"],
  },
  {
    title: "Dune",
    description:
      "On the desert planet Arrakis — sole source of the most valuable substance in the universe — young Paul Atreides navigates dynastic politics, religious prophecy, and ecological war in a story of power, betrayal, and destiny.",
    coverImage: "@/assets/images/book-covers/dune-cover.jpg",
    publishedDate: "1965-08-01T00:00:00.000Z",
    language: "English",
    pageCount: 412,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Science Fiction"],
    authorNames: ["Frank Herbert"],
  },

  // ── Mystery & Thriller ────────────────────────────────────────────────────
  {
    title: "Gone Girl",
    description:
      "On their fifth wedding anniversary, Nick Dunne's wife Amy disappears. As the media frenzy grows and clues multiply, shocking revelations force both Nick and the reader to question everything they think they know.",
    coverImage: "@/assets/images/book-covers/gone-girl-cover.jpg",
    publishedDate: "2012-06-05T00:00:00.000Z",
    language: "English",
    pageCount: 422,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Mystery & Thriller"],
    authorNames: ["Gillian Flynn"],
  },
  {
    title: "The Girl with the Dragon Tattoo",
    description:
      "Disgraced journalist Mikael Blomkvist and hacker Lisbeth Salander investigate a forty-year-old disappearance within a wealthy Swedish family — uncovering a web of corruption, violence, and dark family secrets.",
    coverImage:
      "@/assets/images/book-covers/the-girl-with-the-dragon-tattoo-cover.jpg",
    publishedDate: "2005-08-01T00:00:00.000Z",
    language: "English",
    pageCount: 672,
    isWebNovel: false,
    price: 13.99,
    categoryNames: ["Mystery & Thriller"],
    authorNames: ["Stieg Larsson"],
  },
  {
    title: "The Da Vinci Code",
    description:
      "Harvard symbologist Robert Langdon is pulled into a deadly race across Europe to uncover a secret that has been protected by a clandestine society for two thousand years — a secret that could shake the foundations of Christianity.",
    coverImage: "@/assets/images/book-covers/the-da-vinci-code-cover.jpg",
    publishedDate: "2003-03-18T00:00:00.000Z",
    language: "English",
    pageCount: 454,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Mystery & Thriller"],
    authorNames: ["Dan Brown"],
  },

  // ── Romance ───────────────────────────────────────────────────────────────
  {
    title: "Me Before You",
    description:
      "Small-town girl Louisa Clark becomes the carer of Will Traynor, a wealthy, newly paralysed man. What starts as an unlikely pairing becomes a story about choice, courage, and the transformative power of love.",
    coverImage: "@/assets/images/book-covers/me-before-you-cover.jpg",
    publishedDate: "2012-01-05T00:00:00.000Z",
    language: "English",
    pageCount: 369,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Romance"],
    authorNames: ["Jojo Moyes"],
  },
  {
    title: "The Notebook",
    description:
      "An older man reads to a woman with Alzheimer's from a notebook containing the story of their own passionate, complicated love affair — a love that has spanned decades and refuses to be forgotten.",
    coverImage: "@/assets/images/book-covers/the-notebook-cover.jpg",
    publishedDate: "1996-10-01T00:00:00.000Z",
    language: "English",
    pageCount: 214,
    isWebNovel: false,
    price: 10.99,
    categoryNames: ["Romance"],
    authorNames: ["Nicholas Sparks"],
  },
  {
    title: "Pride and Prejudice",
    description:
      "The spirited Elizabeth Bennet navigates social expectations, family pressures, and her own prejudices as she falls — reluctantly — for the proud and enigmatic Mr. Darcy.",
    coverImage: "@/assets/images/book-covers/pride-and-prejudice-cover.jpg",
    publishedDate: "1813-01-28T00:00:00.000Z",
    language: "English",
    pageCount: 432,
    isWebNovel: false,
    price: 8.99,
    categoryNames: ["Romance", "Classic Novels"],
    authorNames: ["Jane Austen"],
  },

  // ── Children & YA ─────────────────────────────────────────────────────────
  {
    title: "Percy Jackson and the Lightning Thief",
    description:
      "Twelve-year-old Percy Jackson discovers he is the son of a Greek god, gets framed for stealing Zeus's lightning bolt, and embarks on a cross-country quest to prevent a war among the Olympians.",
    coverImage: "@/assets/images/book-covers/percy-jackson-cover.jpg",
    publishedDate: "2005-06-28T00:00:00.000Z",
    language: "English",
    pageCount: 377,
    isWebNovel: false,
    price: 10.99,
    categoryNames: ["Children & YA"],
    authorNames: ["Rick Riordan"],
  },
  {
    title: "The Hunger Games",
    description:
      "In a dystopian future, sixteen-year-old Katniss Everdeen volunteers to take her sister's place in a televised death match between children. Her survival becomes an act of defiance that ignites a revolution.",
    coverImage: "@/assets/images/book-covers/the-hunger-games-cover.jpg",
    publishedDate: "2008-09-14T00:00:00.000Z",
    language: "English",
    pageCount: 374,
    isWebNovel: false,
    price: 11.99,
    categoryNames: ["Children & YA"],
    authorNames: ["Suzanne Collins"],
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "An orphan boy discovers on his eleventh birthday that he is a wizard and enrolls at Hogwarts School of Witchcraft and Wizardry, where he makes friends, faces danger, and begins to uncover the truth about his parents' fate.",
    coverImage: "@/assets/images/book-covers/harry-potter-cover.jpg",
    publishedDate: "1997-06-26T00:00:00.000Z",
    language: "English",
    pageCount: 309,
    isWebNovel: false,
    price: 12.99,
    categoryNames: ["Children & YA"],
    authorNames: ["J.K. Rowling"],
  },

  // ── Web & Light Novels ────────────────────────────────────────────────────
  {
    title: "Lord of the Mysteries",
    description:
      "Transported to a Victorian-era world saturated with Cthulhu-esque occultism and secret societies, Zhou Mingrui must ascend a divine pathway fraught with madness, conspiracy, and gods both terrifying and pitiable.",
    coverImage: "@/assets/images/book-covers/lord-of-the-mysteries-cover.jpg",
    publishedDate: "2018-03-01T00:00:00.000Z",
    language: "English",
    pageCount: 4500,
    isWebNovel: true,
    price: 4.99,
    categoryNames: ["Web & Light Novels"],
    authorNames: ["Cuttlefish That Loves Diving"],
  },
  {
    title: "Mother of Learning",
    description:
      "Mage-in-training Zorian Kazinski is trapped in a month-long time loop during a catastrophic demonic invasion, forced to relive the same thirty days over and over — growing in power and unravelling a vast conspiracy with each iteration.",
    coverImage: "@/assets/images/book-covers/mother-of-learning-cover.jpg",
    publishedDate: "2011-09-01T00:00:00.000Z",
    language: "English",
    pageCount: 2300,
    isWebNovel: true,
    price: 4.99,
    categoryNames: ["Web & Light Novels"],
    authorNames: ["Domagoj Kurmaic"],
  },
  {
    title: "Shadow Slave",
    description:
      "In a world where humanity survives by entering nightmare Dungeons, a young man with a rare but cursed ability must climb the ranks of power in a brutal world where every mistake is fatal and every truth is darker than the last.",
    coverImage: "@/assets/images/book-covers/shadow-slave-cover.jpg",
    publishedDate: "2021-01-01T00:00:00.000Z",
    language: "English",
    pageCount: 3200,
    isWebNovel: true,
    price: 4.99,
    categoryNames: ["Web & Light Novels"],
    authorNames: ["Guiltythree"],
  },
];
