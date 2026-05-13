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
  coverImage: string;
  publishedDate: string; // ISO 8601
  language: string;
  pageCount: number;
  isWebNovel: boolean;
  // references by name — resolved to IDs during seeding
  categoryNames: string[];
  authorNames: string[];
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: DummyCategory[] = [
  {
    name: "Fiction",
    description:
      "Imaginative narratives and invented stories across all styles and settings.",
  },
  {
    name: "Non-Fiction",
    description: "Factual works covering real events, people, and ideas.",
  },
  {
    name: "Science Fiction",
    description:
      "Speculative stories rooted in science, technology, and the future.",
  },
  {
    name: "Fantasy",
    description:
      "Epic tales of magic, mythical creatures, and alternate worlds.",
  },
  {
    name: "Mystery & Thriller",
    description:
      "Suspenseful plots driven by crime, secrets, and high-stakes tension.",
  },
  {
    name: "Romance",
    description:
      "Stories centred on love, relationships, and emotional connection.",
  },
  {
    name: "Self-Help",
    description:
      "Practical guides for personal growth, habits, and well-being.",
  },
  {
    name: "Biography & Memoir",
    description: "Real-life stories of remarkable people told in depth.",
  },
  {
    name: "Children & Young Adult",
    description: "Books crafted for younger readers and teens.",
  },
  {
    name: "Web Novel",
    description: "Serialised online fiction published chapter-by-chapter.",
  },
  {
    name: "Light Novel",
    description:
      "Japanese-style illustrated prose novels, often adapted into anime.",
  },
  {
    name: "Horror",
    description:
      "Dark and frightening fiction designed to unsettle and terrify.",
  },
];

// ─── Authors ──────────────────────────────────────────────────────────────────

export const authors: DummyAuthor[] = [
  {
    name: "Matt Haig",
    bio: "British author known for his novels on mental health, magic, and mortality. His book 'Reasons to Stay Alive' became a global phenomenon.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Matt_Haig_2019.jpg/440px-Matt_Haig_2019.jpg",
  },
  {
    name: "James Clear",
    bio: "Author and speaker focused on habits, decision-making, and continuous improvement. Creator of the 'Atomic Habits' framework.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/James_Clear%2C_author_of_Atomic_Habits.jpg/440px-James_Clear%2C_author_of_Atomic_Habits.jpg",
  },
  {
    name: "Patrick Rothfuss",
    bio: "American fantasy author best known for 'The Kingkiller Chronicle' series, praised for its rich world-building and lyrical prose.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Patrick_Rothfuss_-_Lucca_Comics_%26_Games_2018.jpg/440px-Patrick_Rothfuss_-_Lucca_Comics_%26_Games_2018.jpg",
  },
  {
    name: "Frank Herbert",
    bio: "Legendary science fiction author whose 'Dune' series is considered one of the greatest works of speculative fiction ever written.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/FrankHerbert.jpg/440px-FrankHerbert.jpg",
  },
  {
    name: "Agatha Christie",
    bio: "The Queen of Crime, author of 66 detective novels. Creator of iconic sleuths Hercule Poirot and Miss Marple.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Agatha_Christie.png/440px-Agatha_Christie.png",
  },
  {
    name: "Brandon Sanderson",
    bio: "Prolific epic fantasy author known for the 'Cosmere' universe, including 'The Stormlight Archive' and 'Mistborn' series.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BrandonSanderson_2016.jpg/440px-BrandonSanderson_2016.jpg",
  },
  {
    name: "Colleen Hoover",
    bio: "New York Times bestselling author of contemporary romance and new adult fiction, known for emotionally gripping storylines.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Colleen_Hoover_by_Gage_Skidmore.jpg/440px-Colleen_Hoover_by_Gage_Skidmore.jpg",
  },
  {
    name: "Walter Isaacson",
    bio: "Acclaimed biographer and journalist, known for definitive biographies of Steve Jobs, Albert Einstein, and Leonardo da Vinci.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Walter_Isaacson_-_2012.jpg/440px-Walter_Isaacson_2012.jpg",
  },
  {
    name: "Stephen King",
    bio: "The undisputed King of Horror, with over 60 novels published. His work spans horror, supernatural fiction, suspense, and fantasy.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Cheltenham_Festival%2C_2012.jpg/440px-Stephen_King%2C_Cheltenham_Festival%2C_2012.jpg",
  },
  {
    name: "Sun Quan (Wang Yu)",
    bio: "Popular Chinese web novel author known for the cultivation and fantasy web serial 'Reverend Insanity', a genre-defining online work.",
    profileImage: "https://picsum.photos/seed/sunquan/200/200",
  },
  {
    name: "Kugane Maruyama",
    bio: "Japanese light novel author best known for 'Overlord', a dark fantasy isekai series with a massive global readership.",
    profileImage: "https://picsum.photos/seed/maruyama/200/200",
  },
  {
    name: "Tara Westover",
    bio: "American author of the memoir 'Educated', recounting her journey from a survivalist family in rural Idaho to Cambridge University.",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Tara_Westover_%2847559418061%29_%28cropped%29.jpg/440px-Tara_Westover_%2847559418061%29_%28cropped%29.jpg",
  },
];

// ─── Books ────────────────────────────────────────────────────────────────────

export const books: DummyBook[] = [
  // ── Fiction / Literary ────────────────────────────────────────────────────
  {
    title: "The Midnight Library",
    description:
      "Between life and death there is a library. When Nora Seed finds herself there, she has a chance to undo her regrets and try the lives she never lived.",
    coverImage: "https://covers.openlibrary.org/b/id/10507727-L.jpg",
    publishedDate: "2020-09-29T00:00:00.000Z",
    language: "English",
    pageCount: 304,
    isWebNovel: false,
    categoryNames: ["Fiction"],
    authorNames: ["Matt Haig"],
  },
  {
    title: "It Ends with Us",
    description:
      "A brave and heartbreaking novel about a young woman caught in a difficult relationship, exploring the complexities of love and abuse.",
    coverImage: "https://covers.openlibrary.org/b/id/12803049-L.jpg",
    publishedDate: "2016-08-02T00:00:00.000Z",
    language: "English",
    pageCount: 376,
    isWebNovel: false,
    categoryNames: ["Fiction", "Romance"],
    authorNames: ["Colleen Hoover"],
  },
  {
    title: "Verity",
    description:
      "A struggling writer discovers a manuscript that reveals dark secrets about a bestselling author's family — and must decide whether to expose the truth.",
    coverImage: "https://covers.openlibrary.org/b/id/12887084-L.jpg",
    publishedDate: "2018-12-07T00:00:00.000Z",
    language: "English",
    pageCount: 336,
    isWebNovel: false,
    categoryNames: ["Fiction", "Mystery & Thriller"],
    authorNames: ["Colleen Hoover"],
  },

  // ── Non-Fiction / Self-Help ───────────────────────────────────────────────
  {
    title: "Atomic Habits",
    description:
      "A proven framework for building good habits and breaking bad ones. James Clear reveals how tiny changes can yield remarkable results over time.",
    coverImage: "https://covers.openlibrary.org/b/id/10309668-L.jpg",
    publishedDate: "2018-10-16T00:00:00.000Z",
    language: "English",
    pageCount: 320,
    isWebNovel: false,
    categoryNames: ["Non-Fiction", "Self-Help"],
    authorNames: ["James Clear"],
  },
  {
    title: "Educated",
    description:
      "A memoir about a young woman who grows up in the mountains of Idaho with survivalist parents and goes on to earn a PhD from Cambridge University.",
    coverImage: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    publishedDate: "2018-02-20T00:00:00.000Z",
    language: "English",
    pageCount: 352,
    isWebNovel: false,
    categoryNames: ["Non-Fiction", "Biography & Memoir"],
    authorNames: ["Tara Westover"],
  },
  {
    title: "Elon Musk",
    description:
      "The definitive biography of Elon Musk by acclaimed author Walter Isaacson, based on years of exclusive access and interviews.",
    coverImage: "https://covers.openlibrary.org/b/id/13275690-L.jpg",
    publishedDate: "2023-09-12T00:00:00.000Z",
    language: "English",
    pageCount: 688,
    isWebNovel: false,
    categoryNames: ["Non-Fiction", "Biography & Memoir"],
    authorNames: ["Walter Isaacson"],
  },

  // ── Science Fiction ───────────────────────────────────────────────────────
  {
    title: "Dune",
    description:
      "Set on the desert planet Arrakis, Dune is the story of Paul Atreides as he navigates political intrigue, religious prophecy, and interstellar war.",
    coverImage: "https://covers.openlibrary.org/b/id/12719480-L.jpg",
    publishedDate: "1965-08-01T00:00:00.000Z",
    language: "English",
    pageCount: 688,
    isWebNovel: false,
    categoryNames: ["Science Fiction", "Fiction"],
    authorNames: ["Frank Herbert"],
  },
  {
    title: "Dune Messiah",
    description:
      "The sequel to Dune follows Paul Atreides as Emperor, facing conspiracies that threaten to unravel everything he built on Arrakis.",
    coverImage: "https://covers.openlibrary.org/b/id/12675540-L.jpg",
    publishedDate: "1969-10-15T00:00:00.000Z",
    language: "English",
    pageCount: 352,
    isWebNovel: false,
    categoryNames: ["Science Fiction", "Fiction"],
    authorNames: ["Frank Herbert"],
  },

  // ── Fantasy ───────────────────────────────────────────────────────────────
  {
    title: "The Name of the Wind",
    description:
      "The first day of the tale of Kvothe — a legendary figure whose story of magic, music, and heartbreak unfolds across the world of Temerant.",
    coverImage: "https://covers.openlibrary.org/b/id/8775430-L.jpg",
    publishedDate: "2007-03-27T00:00:00.000Z",
    language: "English",
    pageCount: 662,
    isWebNovel: false,
    categoryNames: ["Fantasy", "Fiction"],
    authorNames: ["Patrick Rothfuss"],
  },
  {
    title: "The Way of Kings",
    description:
      "Book one of The Stormlight Archive. In a world battered by deadly highstorms, three characters are drawn together by fate, war, and ancient magic.",
    coverImage: "https://covers.openlibrary.org/b/id/10590358-L.jpg",
    publishedDate: "2010-08-31T00:00:00.000Z",
    language: "English",
    pageCount: 1007,
    isWebNovel: false,
    categoryNames: ["Fantasy", "Fiction"],
    authorNames: ["Brandon Sanderson"],
  },
  {
    title: "Mistborn: The Final Empire",
    description:
      "In a world of ash and darkness ruled by an immortal lord, a crew of thieves plans the most daring heist in history — to overthrow an empire.",
    coverImage: "https://covers.openlibrary.org/b/id/10001023-L.jpg",
    publishedDate: "2006-07-17T00:00:00.000Z",
    language: "English",
    pageCount: 541,
    isWebNovel: false,
    categoryNames: ["Fantasy", "Fiction"],
    authorNames: ["Brandon Sanderson"],
  },

  // ── Mystery & Thriller ────────────────────────────────────────────────────
  {
    title: "And Then There Were None",
    description:
      "Ten strangers are lured to an isolated island and systematically murdered. Agatha Christie's masterpiece of suspense and deduction.",
    coverImage: "https://covers.openlibrary.org/b/id/12625797-L.jpg",
    publishedDate: "1939-11-06T00:00:00.000Z",
    language: "English",
    pageCount: 264,
    isWebNovel: false,
    categoryNames: ["Mystery & Thriller", "Fiction"],
    authorNames: ["Agatha Christie"],
  },
  {
    title: "Murder on the Orient Express",
    description:
      "Hercule Poirot investigates a murder on a snowbound train. One of the most celebrated detective stories ever written.",
    coverImage: "https://covers.openlibrary.org/b/id/10527667-L.jpg",
    publishedDate: "1934-01-01T00:00:00.000Z",
    language: "English",
    pageCount: 256,
    isWebNovel: false,
    categoryNames: ["Mystery & Thriller", "Fiction"],
    authorNames: ["Agatha Christie"],
  },

  // ── Horror ────────────────────────────────────────────────────────────────
  {
    title: "The Shining",
    description:
      "Jack Torrance takes a job as caretaker of the Overlook Hotel, where supernatural forces awaken his darkest impulses — threatening his family.",
    coverImage: "https://covers.openlibrary.org/b/id/12813636-L.jpg",
    publishedDate: "1977-01-28T00:00:00.000Z",
    language: "English",
    pageCount: 447,
    isWebNovel: false,
    categoryNames: ["Horror", "Fiction"],
    authorNames: ["Stephen King"],
  },
  {
    title: "It",
    description:
      "A shapeshifting evil haunts the town of Derry, Maine, preying on children. A group of outcasts must face their deepest fears to defeat it.",
    coverImage: "https://covers.openlibrary.org/b/id/12803041-L.jpg",
    publishedDate: "1986-09-15T00:00:00.000Z",
    language: "English",
    pageCount: 1138,
    isWebNovel: false,
    categoryNames: ["Horror", "Fiction"],
    authorNames: ["Stephen King"],
  },

  // ── Web Novel ─────────────────────────────────────────────────────────────
  {
    title: "Reverend Insanity",
    description:
      "A ruthless immortal cultivator is reborn and schemes his way back to power in a world of Gu worms and merciless competition. A dark web novel classic.",
    coverImage: "https://picsum.photos/seed/reverend/300/450",
    publishedDate: "2012-03-01T00:00:00.000Z",
    language: "Chinese",
    pageCount: 2334,
    isWebNovel: true,
    categoryNames: ["Web Novel", "Fantasy"],
    authorNames: ["Sun Quan (Wang Yu)"],
  },
  {
    title: "Mother of Learning",
    description:
      "A young mage is trapped in a month-long time loop and must use each iteration to grow stronger and uncover the conspiracy threatening the world.",
    coverImage: "https://picsum.photos/seed/motheroflearning/300/450",
    publishedDate: "2011-10-20T00:00:00.000Z",
    language: "English",
    pageCount: 1200,
    isWebNovel: true,
    categoryNames: ["Web Novel", "Fantasy", "Science Fiction"],
    authorNames: ["Brandon Sanderson"], // placeholder — swap with real author
  },

  // ── Light Novel ───────────────────────────────────────────────────────────
  {
    title: "Overlord, Vol. 1",
    description:
      "A player is trapped inside his favourite MMO as the game shuts down, now reborn as an all-powerful undead overlord in a world that has become reality.",
    coverImage: "https://picsum.photos/seed/overlord1/300/450",
    publishedDate: "2012-07-30T00:00:00.000Z",
    language: "Japanese",
    pageCount: 280,
    isWebNovel: false,
    categoryNames: ["Light Novel", "Fantasy", "Science Fiction"],
    authorNames: ["Kugane Maruyama"],
  },
];
