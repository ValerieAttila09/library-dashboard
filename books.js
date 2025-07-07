const books = {
  book: [
    {
      id: "14853348",
      title: "React.js Advanced",
      email: "ggwp123@gmail.com",
      author: "Valerie",
      city: "medan",
      status: true,
      borrower: [],
    },
    {
      id: "24839299",
      title: "Node.js for Beginners",
      email: "johndoe@gmail.com",
      author: "John Doe",
      city: "london",
      status: true,
      borrower: [],
    },
    {
      id: "34353423",
      title: "Express Basics",
      email: "jnsmith54@gmail.com",
      author: "Jane Smith",
      city: "minnesota",
      status: true,
      borrower: [],
    },
    {
      id: "34992492",
      title: "HTML Dasar",
      email: "dnsIP5678@gmail.com",
      author: "Doni Soemarto",
      city: "palembang",
      status: false,
      borrower: [],
    },
    {
      id: "41283550",
      title: "Fundamental Pemrograman by Dijie",
      email: "just_dijie322@gmail.com",
      author: "Muhammad Dijie Siregar",
      city: "surabaya",
      status: true,
      borrower: [],
    },
    {
      id: "64990431",
      title: "Integrasi Algoritma di Coding",
      email: "silvia0909@gmail.com",
      author: "Silvia Cantika",
      city: "Jakarta",
      status: true,
      borrower: [],
    },
    {
      id: "12849322",
      title: "RESTful API & AJAX by Christoper Garrison",
      email: "mark71chris@gmail.com",
      author: "Christoper Garrison",
      city: "boston",
      status: false,
      borrower: [],
    },
    {
      id: "73927465",
      title: "MySQL & PostgreeSQL Database",
      email: "mark_level999@gmail.com",
      author: "Mark Henderson",
      city: "dublin",
      status: true,
      borrower: [],
    },
    {
      id: "33942876",
      title: "Flutter Advanced part 2",
      email: "franz_de_kaizer121212@gmail.com",
      author: "Franz Michter",
      city: "frankfurt",
      status: true,
      borrower: [],
    },
    {
      id: "22235443",
      title: "Binary System",
      email: "vivian_stinka@gmail.com",
      author: "Vivian Stinka",
      city: "kiev",
      status: false,
      borrower: [],
    }
  ],
  bookStats: {
    income: {
      total: 297,
      weekly: [
        { day: "Mon", value: 41 },
        { day: "Tue", value: 28 },
        { day: "Wed", value: 40 },
        { day: "Thu", value: 37 },
        { day: "Fri", value: 50 },
        { day: "Sat", value: 46 },
        { day: "Sun", value: 55 }
      ]
    },
    loan: {
      total: 257,
      weekly: [
        { day: "Mon", value: 34 },
        { day: "Tue", value: 27 },
        { day: "Wed", value: 40 },
        { day: "Thu", value: 31 },
        { day: "Fri", value: 48 },
        { day: "Sat", value: 34 },
        { day: "Sun", value: 43 }
      ]
    },
    members: {
      total: 18,
      weekly: [
        { day: "Mon", value: 6 },
        { day: "Tue", value: 6 },
        { day: "Wed", value: 6 },
        { day: "Thu", value: 8 },
        { day: "Fri", value: 10 },
        { day: "Sat", value: 11 },
        { day: "Sun", value: 13 }
      ]
    }
  },
  weeklyLoan: [
    {
      id: "11595175",
      books: "Flutter Advanced part 1",
      author: "Franz Michter",
      borrower: "Marry Jane",
      loanDate: "2025-07-04",
      deadline: "2025-8-04",
      status: true
    }, {
      id: "52782654",
      books: "Through the Woods",
      author: "Emily Carroll",
      borrower: "Hayden Bentley",
      loanDate: "2025-07-10",
      deadline: "2025-8-10",
      status: true
    }, {
      id: "16326190",
      books: "Dead Until Dark",
      author: "Charlaine Harris",
      borrower: "Kendrick Batson",
      loanDate: "2025-07-05",
      deadline: "2025-8-05",
      status: true
    }, {
      id: "11304920",
      books: "Atificial Condition",
      author: "Martha Wells",
      borrower: "Finley Bauer",
      loanDate: "2025-07-11",
      deadline: "2025-8-11",
      status: true
    }, {
      id: "00484356",
      books: "Stir-Frying to the Sky's Edge",
      author: "Grace Young",
      borrower: "Julius Eden",
      loanDate: "2025-06-25",
      deadline: "2025-7-25",
      status: true
    }, {
      id: "78750762",
      books: "New Moody Atlas of Bible",
      author: "Barry J. Beitzel",
      borrower: "Blaine Atticus",
      loanDate: "2025-07-01",
      deadline: "2025-8-01",
      status: true
    }, {
      id: "75959651",
      books: "Harvest of Gold",
      author: "Tessa Afshar",
      borrower: "Alana Lawton",
      loanDate: "2025-07-11",
      deadline: "2025-8-11",
      status: true
    }, {
      id: "82297658",
      books: "Crispin: The Cross of Lead",
      author: "Suzanne Collins",
      borrower: "Ryann Courtney",
      loanDate: "2025-06-24",
      deadline: "2025-7-24",
      status: true
    }, {
      id: "23578311",
      books: "Hunger Games",
      author: "Suzanne Collins",
      borrower: "Orson Harper",
      loanDate: "2025-06-24",
      deadline: "2025-7-24",
      status: true
    }, {
      id: "67905222",
      books: "Cuba",
      author: "Ada Ferrer",
      borrower: "Layton Lucas",
      loanDate: "2025-06-25",
      deadline: "2025-7-25",
      status: true
    }, {
      id: "77091152",
      books: "57 Bus",
      author: "Dashka Slater",
      borrower: "Layla Minor",
      loanDate: "2025-07-02",
      deadline: "2025-8-02",
      status: true
    }, {
      id: "16168713",
      books: "Path to Power",
      author: "Robert A Caro",
      borrower: "Armstrong Chester",
      loanDate: "2025-07-07",
      deadline: "2025-8-07",
      status: true
    }, {
      id: "97143487",
      books: "Best Yes",
      author: "Lysa Terkeurst",
      borrower: "Averly Joy",
      loanDate: "2025-06-23",
      deadline: "2025-6-23",
      status: true
    }, {
      id: "94488126",
      books: "Beautiful Oops!",
      author: "Barney Saltzberg",
      borrower: "Evelyn Watson",
      loanDate: "2025-07-04",
      deadline: "2025-8-04",
      status: true
    }
  ]
}

const borrowers = [
  [books.book[0], "Daniel Morgan", "morganDevOps311@gmail.com", "dublin", 4],
  [books.book[4], "Marry Jane", "marryJaneXP@gmail.com", "amsterdam", 4],
  [books.book[3], "Michael Sunthar", "bigboomArmy78@gmail.com", "paris", 4],
  [books.book[3], "Jack Collins", "fatman1945@gmail.com", "lyon", 4],
  [books.book[6], "Daryl Martinius", "dear_god_help_me@gmail.com", "nurnberg", 4],
  [books.book[3], "Jeffry McKlinton", "only_jeffMaster@gmail.com", "praha", 4],
  [books.book[2], "Nikita Viskya", "CATcanMakeMeHappy@gmail.com", "riga", 4],
  [books.book[2], "Lana Butcher", "lookingforaJOB@gmail.com", "berlin", 4],
  [books.book[6], "Nathan Danson", "nathan999999@gmail.com", "hamburg", 4],
  [books.book[0], "Ashton Nakamura", "happinessCrisist@gmail.com", "leeds", 4],
  [books.book[4], "Abdullah Samanhuddin", "gambleIsHaram@gmail.com", "istanbul", 4],
  [books.book[7], "Dan Layton", "capt_noobMaster@gmail.com", "columbus", 4],
];

borrowers.forEach(data => {
  const [book, name, email, city, amount] = data;
  book.borrower.push({ name, email, city, amount });
});

books.book.forEach(borrowerUser => {
  const data = [];
  if (borrowerUser.borrower != 0) {
    borrowerUser.borrower.forEach(i => {
      data.push(i)
    });
    console.log(`
      Book : ${borrowerUser.title}
      Borrower : ${data.map(i => {
        return ` ${i.name}`
      })}
      Email : ${data.map(i => {
        return `\n\t${i.name} : ${i.email}`
      })}
      City : ${data.map(i => {
        return ` ${i.city}`
      })}
      Amount : ${data.map(i => {
        return `\n\t${i.name} : ${i.amount}`
      })}
    `)
  }
})