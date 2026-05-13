import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import dollar from "@/assets/icons/dollar.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";
import arrowBack from "../assets/icons/arrow-back.png";

import loginGraphic from "@/assets/images/Books-BG.png";
import emptyState from "@/assets/images/empty-state.png";
import mozarellaSticks from "@/assets/images/mozarella-sticks.png";
import logo from "@/assets/images/Novella-Logo-No-BG.png";

export const categories = [
  {
    id: 1,
    title: "Classic Novels",
    color: "#7A5C8A",
    books: [
      require("@/assets/images/book-covers/crime-and-punishment-cover.jpg"),
      require("@/assets/images/book-covers/1984-cover.jpg"),
      require("@/assets/images/book-covers/the-count-of-monte-cristo-cover.jpg"),
    ],
  },
  {
    id: 2,
    title: "Fantasy",
    color: "#4A6FA5",
    books: [
      require("@/assets/images/book-covers/the-name-of-the-wind-cover.jpg"),
      require("@/assets/images/book-covers/the-hobbit-cover.jpg"),
      require("@/assets/images/book-covers/mistborn-cover.jpg"),
    ],
  },
  {
    id: 3,
    title: "Psychology",
    color: "#3D8C7A",
    books: [
      require("@/assets/images/book-covers/thinking-fast-and-slow-cover.jpg"),
      require("@/assets/images/book-covers/the-power-of-habit-cover.jpg"),
      require("@/assets/images/book-covers/man-search-for-meaning-cover.jpg"),
    ],
  },
  {
    id: 4,
    title: "History",
    color: "#9B6F3A",
    books: [
      require("@/assets/images/book-covers/sapiens-cover.jpg"),
      require("@/assets/images/book-covers/the-silk-roads-cover.jpg"),
      require("@/assets/images/book-covers/guns-germs-and-steel-cover.jpg"),
    ],
  },
  {
    id: 5,
    title: "Self-Help",
    color: "#C45E3E",
    books: [
      require("@/assets/images/book-covers/the-subtle-art-of-not-giving-a-fuck-cover.jpg"),
      require("@/assets/images/book-covers/deep-work-cover.jpg"),
      require("@/assets/images/book-covers/atomic-habits-cover.jpg"),
    ],
  },
  {
    id: 6,
    title: "Science Fiction",
    color: "#3A5F7A",
    books: [
      require("@/assets/images/book-covers/foundation-cover.jpg"),
      require("@/assets/images/book-covers/ender-game-cover.jpg"),
      require("@/assets/images/book-covers/dune-cover.jpg"),
    ],
  },
  {
    id: 7,
    title: "Mystery & Thriller",
    color: "#3C3C62",
    books: [
      require("@/assets/images/book-covers/gone-girl-cover.jpg"),
      require("@/assets/images/book-covers/the-girl-with-the-dragon-tattoo-cover.jpg"),
      require("@/assets/images/book-covers/the-da-vinci-code-cover.jpg"),
    ],
  },
  {
    id: 8,
    title: "Romance",
    color: "#A84F6B",
    books: [
      require("@/assets/images/book-covers/me-before-you-cover.jpg"),
      require("@/assets/images/book-covers/the-notebook-cover.jpg"),
      require("@/assets/images/book-covers/pride-and-prejudice-cover.jpg"),
    ],
  },
  {
    id: 9,
    title: "Children & YA",
    color: "#4E8C60",
    books: [
      require("@/assets/images/book-covers/percy-jackson-cover.jpg"),
      require("@/assets/images/book-covers/the-hunger-games-cover.jpg"),
      require("@/assets/images/book-covers/harry-potter-cover.jpg"),
    ],
  },
  {
    id: 10,
    title: "Web & Light Novels",
    color: "#5568A0",
    books: [
      require("@/assets/images/book-covers/lord-of-the-mysteries-cover.jpg"),
      require("@/assets/images/book-covers/mother-of-learning-cover.jpg"),
      require("@/assets/images/book-covers/shadow-slave-cover.jpg"),
    ],
  },
];

export const images = {
  emptyState,
  loginGraphic,
  logo,
  mozarellaSticks,
  arrowBack,
  arrowDown,
  arrowRight,
  bag,
  check,
  clock,
  dollar,
  envelope,
  home,
  location,
  logout,
  minus,
  pencil,
  person,
  phone,
  plus,
  search,
  star,
  trash,
  user,
};

export const NEW_ARRIVALS = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "$12.99",
    color: "#9580ff",
    cover: require("@/assets/images/book-covers/the-midnight-library-cover.jpg"),
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: "$14.99",
    color: "#6ca8f5",
    cover: require("@/assets/images/book-covers/atomic-habits-cover.jpg"),
  },
  {
    id: 3,
    title: "Name of the Wind",
    author: "Patrick Rothfuss",
    price: "$11.99",
    color: "#f59b8a",
    cover: require("@/assets/images/book-covers/the-name-of-the-wind-cover.jpg"),
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: "$13.99",
    color: "#62c8b0",
    cover: require("@/assets/images/book-covers/dune-cover.jpg"),
  },
];
