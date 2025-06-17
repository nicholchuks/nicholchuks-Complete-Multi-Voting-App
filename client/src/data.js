import Thumbnail1 from "./assets/flag1.jpg";
// import Thumbnail2 from "./assets/flag2.jpg";
import Thumbnail2 from "./assets/flag2.jpg";
// import Thumbnail3 from "./assets/flag3.png";
import Thumbnail3 from "./assets/flag3.png";
import Candidate1 from "./assets/candidate1.jpg";
import Candidate2 from "./assets/candidate2.jpg";
import Candidate3 from "./assets/candidate3.jpg";
import Candidate4 from "./assets/candidate4.jpg";
import Candidate5 from "./assets/candidate5.jpg";
import Candidate6 from "./assets/candidate6.jpg";
import Candidate7 from "./assets/candidate7.jpg";

export const elections = [
  {
    id: "el",
    title: "Harvard Presidential Elections 2025",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos molestiae aliquid, suscipit sint aliquam fugiat facere ut aut voluptatibus unde placeat architecto atque dolores nulla doloremque expedita eligendi necessitatibus? Ratione.",
    thumbnail: Thumbnail1,
    candidates: ["c1", "c2", "c3", "c4"],
    voters: [],
  },

  {
    id: "e2",
    title: "Legon SRC Presidential Elections 2024",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos molestiae aliquid, suscipit sint aliquam fugiat facere ut aut voluptatibus unde placeat architecto atque dolores nulla doloremque expedita eligendi necessitatibus? Ratione.",
    thumbnail: Thumbnail2,
    candidates: ["c5", "c6", "c7"],
    voters: [],
  },

  {
    id: "e3",
    title: "Stanford Presidential Elections 2025",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos molestiae aliquid, suscipit sint aliquam fugiat facere ut aut voluptatibus unde placeat architecto atque dolores nulla doloremque expedita eligendi necessitatibus? Ratione.",
    thumbnail: Thumbnail3,
    candidates: [],
    voters: [],
  },
];

export const candidates = [
  {
    id: "c1",
    fullName: "Enoch Ganyo",
    image: Candidate1,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 23,
    election: "el",
  },

  {
    id: "c2",
    fullName: "John Asiana",
    image: Candidate2,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 18,
    election: "el",
  },

  {
    id: "c3",
    fullName: "Dora Stephenso",
    image: Candidate3,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 3,
    election: "e2",
  },

  {
    id: "c4",
    fullName: "Enoch Ganyo",
    image: Candidate4,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 5,
    election: "e2",
  },

  {
    id: "c5",
    fullName: "Enoch Ganyo",
    image: Candidate5,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 238,
    election: "e2",
  },

  {
    id: "c6",
    fullName: "Enoch Ganyo",
    image: Candidate6,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 42,
    election: "e2",
  },

  {
    id: "c7",
    fullName: "Enoch Ganyo",
    image: Candidate7,
    motto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, earum.",
    voteCount: 190,
    election: "e2",
  },
];

export const voters = [
  {
    id: "v1",
    fullName: "Ernest Achiever",
    email: "achiver@gmail.com",
    password: "achiever123",
    isAdmin: true,
    votedElections: ["e2"],
  },

  {
    id: "v2",
    fullName: "Dories Lartey",
    email: "doris@gmail.com",
    password: "doris123",
    isAdmin: false,
    votedElections: ["e1", "e2"],
  },

  {
    id: "v3",
    fullName: "Daniel Vinyo",
    email: "daniel@gmail.com",
    password: "daniel123",
    isAdmin: false,
    votedElections: ["e1", "e2"],
  },

  {
    id: "v4",
    fullName: "Diana Ayi",
    email: "diana@gmail.com",
    password: "diana123",
    isAdmin: true,
    votedElections: [],
  },
];
