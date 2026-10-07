// Quiz questions database
const quizData = {
  "General Knowledge": [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correct: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2
    },
    {
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "India"],
      correct: 2
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
      correct: 2
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2
    },
    {
      question: "How many sides does a hexagon have?",
      options: ["5", "6", "7", "8"],
      correct: 1
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      correct: 2
    },
    {
      question: "Who discovered penicillin?",
      options: ["Marie Curie", "Alexander Fleming", "Isaac Newton", "Albert Einstein"],
      correct: 1
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1
    }
  ],
  "Science": [
    {
      question: "What is the chemical formula for water?",
      options: ["CO2", "H2O", "O2", "NaCl"],
      correct: 1
    },
    {
      question: "What force keeps planets in orbit around the Sun?",
      options: ["Magnetism", "Gravity", "Friction", "Centrifugal force"],
      correct: 1
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
      correct: 2
    },
    {
      question: "What is the speed of light approximately?",
      options: ["300,000 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"],
      correct: 0
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
      correct: 2
    },
    {
      question: "What type of animal is a frog?",
      options: ["Mammal", "Reptile", "Amphibian", "Fish"],
      correct: 2
    },
    {
      question: "What is the process by which plants make food?",
      options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
      correct: 1
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correct: 2
    },
    {
      question: "How many bones are in the adult human body?",
      options: ["186", "206", "226", "256"],
      correct: 1
    },
    {
      question: "What is the main gas in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correct: 2
    },
    {
      question: "What does DNA stand for?",
      options: ["Deoxyribonucleic Acid", "Dinucleic Acid", "Deoxyribose Acid", "Dual Nucleic Acid"],
      correct: 0
    },
    {
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correct: 1
    },
    {
      question: "What is the boiling point of water at sea level?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      correct: 1
    },
    {
      question: "What particle has a negative charge?",
      options: ["Proton", "Neutron", "Electron", "Photon"],
      correct: 2
    },
    {
      question: "What is the study of living organisms called?",
      options: ["Physics", "Chemistry", "Biology", "Geology"],
      correct: 2
    }
  ],
  "Technology": [
    {
      question: "Who is known as the father of the computer?",
      options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
      correct: 1
    },
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
      correct: 0
    },
    {
      question: "Which company developed the Android operating system?",
      options: ["Apple", "Microsoft", "Google", "Samsung"],
      correct: 2
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      correct: 0
    },
    {
      question: "In what year was the first iPhone released?",
      options: ["2005", "2006", "2007", "2008"],
      correct: 2
    },
    {
      question: "What is the name of the first electronic general-purpose computer?",
      options: ["ENIAC", "UNIVAC", "EDVAC", "Colossus"],
      correct: 0
    },
    {
      question: "What does URL stand for?",
      options: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Resource Link", "Universal Reference Link"],
      correct: 1
    },
    {
      question: "Which programming language is primarily used for web styling?",
      options: ["JavaScript", "Python", "CSS", "Java"],
      correct: 2
    },
    {
      question: "What is the full form of AI?",
      options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Interface", "Algorithmic Integration"],
      correct: 1
    },
    {
      question: "Which company owns GitHub?",
      options: ["Google", "Microsoft", "Amazon", "Meta"],
      correct: 1
    },
    {
      question: "What does HTTP stand for?",
      options: ["Hyper Text Transfer Protocol", "High Transfer Text Protocol", "Hyperlink Transfer Protocol", "Home Text Transfer Protocol"],
      correct: 0
    },
    {
      question: "What is the most popular version control system?",
      options: ["SVN", "Mercurial", "Git", "CVS"],
      correct: 2
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "Flask", "React", "Laravel"],
      correct: 2
    },
    {
      question: "What does SSD stand for in computing?",
      options: ["Solid State Drive", "System Storage Device", "Super Speed Disk", "Secure Storage Drive"],
      correct: 0
    },
    {
      question: "Who co-founded Apple with Steve Jobs?",
      options: ["Bill Gates", "Steve Wozniak", "Larry Page", "Mark Zuckerberg"],
      correct: 1
    }
  ],
  "History": [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
      correct: 2
    },
    {
      question: "Which ancient civilization built the pyramids of Giza?",
      options: ["Romans", "Greeks", "Egyptians", "Mayans"],
      correct: 2
    },
    {
      question: "In which year did the Titanic sink?",
      options: ["1910", "1912", "1914", "1916"],
      correct: 1
    },
    {
      question: "Who was known as the 'Maid of Orléans'?",
      options: ["Marie Antoinette", "Joan of Arc", "Catherine the Great", "Queen Victoria"],
      correct: 1
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
      correct: 1
    },
    {
      question: "When did the Berlin Wall fall?",
      options: ["1987", "1989", "1991", "1993"],
      correct: 1
    },
    {
      question: "Who invented the telephone?",
      options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
      correct: 1
    },
    {
      question: "Which war was fought between the North and South in the United States?",
      options: ["Revolutionary War", "War of 1812", "Civil War", "Spanish-American War"],
      correct: 2
    },
    {
      question: "Who was the first man to walk on the Moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
      correct: 1
    },
    {
      question: "In which year did India gain independence?",
      options: ["1945", "1947", "1950", "1952"],
      correct: 1
    },
    {
      question: "Who wrote the Declaration of Independence?",
      options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Hancock"],
      correct: 2
    },
    {
      question: "Which ancient wonder was located in Alexandria?",
      options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Statue of Zeus"],
      correct: 1
    },
    {
      question: "Who was the British Prime Minister during most of World War II?",
      options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],
      correct: 1
    },
    {
      question: "When did the French Revolution begin?",
      options: ["1776", "1789", "1799", "1815"],
      correct: 1
    }
  ],
  "Sports": [
    {
      question: "How many players are on a soccer team on the field?",
      options: ["9", "10", "11", "12"],
      correct: 2
    },
    {
      question: "In which sport is the term 'home run' used?",
      options: ["Basketball", "Baseball", "Cricket", "Tennis"],
      correct: 1
    },
    {
      question: "How many points is a touchdown worth in American football?",
      options: ["3", "6", "7", "8"],
      correct: 1
    },
    {
      question: "Which country has won the most FIFA World Cups?",
      options: ["Germany", "Argentina", "Brazil", "Italy"],
      correct: 2
    },
    {
      question: "What is the maximum score in a single frame of bowling?",
      options: ["10", "20", "30", "300"],
      correct: 2
    },
    {
      question: "In tennis, what is a score of zero called?",
      options: ["Nil", "Love", "Zero", "Blank"],
      correct: 1
    },
    {
      question: "How many rings are on the Olympic flag?",
      options: ["4", "5", "6", "7"],
      correct: 1
    },
    {
      question: "Which sport uses a shuttlecock?",
      options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
      correct: 1
    },
    {
      question: "Who is considered the greatest basketball player of all time by many?",
      options: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Magic Johnson"],
      correct: 2
    },
    {
      question: "In cricket, how many runs is a 'six' worth?",
      options: ["4", "5", "6", "8"],
      correct: 2
    },
    {
      question: "Which country invented the sport of cricket?",
      options: ["Australia", "India", "England", "South Africa"],
      correct: 2
    },
    {
      question: "How long is a marathon race approximately?",
      options: ["26.2 miles", "21.1 miles", "13.1 miles", "30 miles"],
      correct: 0
    },
    {
      question: "In which sport would you perform a slam dunk?",
      options: ["Volleyball", "Basketball", "Tennis", "Handball"],
      correct: 1
    },
    {
      question: "What is the national sport of Japan?",
      options: ["Karate", "Judo", "Sumo Wrestling", "Baseball"],
      correct: 2
    },
    {
      question: "How many Grand Slam tournaments are there in tennis?",
      options: ["3", "4", "5", "6"],
      correct: 1
    }
  ],
  "Movies & TV": [
    {
      question: "Who directed the movie 'Inception'?",
      options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"],
      correct: 1
    },
    {
      question: "Which movie features the character Jack Dawson?",
      options: ["The Notebook", "Titanic", "Avatar", "Forrest Gump"],
      correct: 1
    },
    {
      question: "What is the name of the fictional African country in Black Panther?",
      options: ["Zamunda", "Wakanda", "Genovia", "Sokovia"],
      correct: 1
    },
    {
      question: "Who played Iron Man in the Marvel Cinematic Universe?",
      options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
      correct: 2
    },
    {
      question: "Which TV series is set in the fictional town of Hawkins?",
      options: ["The Walking Dead", "Stranger Things", "Dark", "Twin Peaks"],
      correct: 1
    },
    {
      question: "What is the highest-grossing film of all time (as of 2024)?",
      options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
      correct: 1
    },
    {
      question: "Who created the TV show 'Friends'?",
      options: ["David Crane and Marta Kauffman", "Chuck Lorre", "Shonda Rhimes", "Ryan Murphy"],
      correct: 0
    },
    {
      question: "In The Matrix, what color pill does Neo take?",
      options: ["Blue", "Red", "Green", "Yellow"],
      correct: 1
    },
    {
      question: "Which actor played the Joker in The Dark Knight?",
      options: ["Jared Leto", "Joaquin Phoenix", "Heath Ledger", "Jack Nicholson"],
      correct: 2
    },
    {
      question: "What year was the first Star Wars movie released?",
      options: ["1975", "1977", "1979", "1980"],
      correct: 1
    },
    {
      question: "Which animated movie features a clownfish named Nemo?",
      options: ["Shark Tale", "Finding Nemo", "The Little Mermaid", "Moana"],
      correct: 1
    },
    {
      question: "Who directed 'Pulp Fiction'?",
      options: ["Martin Scorsese", "Quentin Tarantino", "Francis Ford Coppola", "David Fincher"],
      correct: 1
    },
    {
      question: "What is the name of the coffee shop in Friends?",
      options: ["Central Perk", "Monk's Cafe", "Luke's Diner", "MacLaren's"],
      correct: 0
    },
    {
      question: "Which movie won Best Picture at the 2020 Oscars?",
      options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
      correct: 2
    },
    {
      question: "Who voices Woody in Toy Story?",
      options: ["Tim Allen", "Tom Hanks", "John Goodman", "Billy Crystal"],
      correct: 1
    }
  ]
};
