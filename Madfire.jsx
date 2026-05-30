import { useState, useRef, useEffect } from "react";

// ── MASSIVE Q&A KNOWLEDGE BASE ────────────────────────────────────────────────
const QA = [
  // MATH
  { q: ["what is 2+2","2 plus 2","2+2"], a: "2 + 2 = 4 🔥" },
  { q: ["what is 2+3","2 plus 3"], a: "2 + 3 = 5" },
  { q: ["what is 10+10","10 plus 10"], a: "10 + 10 = 20" },
  { q: ["what is 100+100"], a: "100 + 100 = 200" },
  { q: ["what is 5*5","5 times 5","5x5"], a: "5 × 5 = 25" },
  { q: ["what is 10*10","10 times 10"], a: "10 × 10 = 100" },
  { q: ["what is 12*12"], a: "12 × 12 = 144" },
  { q: ["what is 7*8","7 times 8"], a: "7 × 8 = 56" },
  { q: ["what is 9*9"], a: "9 × 9 = 81" },
  { q: ["what is 100-50"], a: "100 - 50 = 50" },
  { q: ["what is 1000-1","1000 minus 1"], a: "1000 - 1 = 999" },
  { q: ["what is 50/2","50 divided by 2"], a: "50 ÷ 2 = 25" },
  { q: ["what is pi","what is π"], a: "π (pi) ≈ 3.14159265358979... It's the ratio of a circle's circumference to its diameter, and it goes on forever without repeating." },
  { q: ["what is the square root of 144","sqrt 144"], a: "√144 = 12" },
  { q: ["what is the square root of 64","sqrt 64"], a: "√64 = 8" },
  { q: ["what is the square root of 25","sqrt 25"], a: "√25 = 5" },
  { q: ["what is infinity"], a: "Infinity (∞) is not a number — it's a concept representing something without any bound or limit. It's larger than any real number you can name." },
  { q: ["what is a prime number"], a: "A prime number is a number greater than 1 that has no divisors other than 1 and itself. Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23..." },
  { q: ["what is algebra"], a: "Algebra is a branch of math that uses symbols (usually letters like x, y) to represent numbers and express relationships. It's about finding unknown values using equations." },
  { q: ["what is calculus"], a: "Calculus is the math of change and motion. It has two main parts: differentiation (finding rates of change) and integration (finding areas under curves)." },
  { q: ["what is 2 to the power of 10","2^10"], a: "2¹⁰ = 1,024" },
  { q: ["what is 2 to the power of 32","2^32"], a: "2³² = 4,294,967,296" },
  { q: ["what is a billion"], a: "1 billion = 1,000,000,000 (one thousand million)." },
  { q: ["what is a trillion"], a: "1 trillion = 1,000,000,000,000 (one million million)." },

  // SCIENCE
  { q: ["what is gravity"], a: "Gravity is the force that attracts objects with mass toward each other. On Earth, it pulls everything toward the center at 9.8 m/s². It keeps planets orbiting the sun and the moon orbiting Earth." },
  { q: ["what is the speed of light"], a: "The speed of light in a vacuum is exactly 299,792,458 meters per second — roughly 300,000 km/s or 186,000 miles per second. Nothing with mass can reach it." },
  { q: ["what is dna","what is dna?"], a: "DNA (Deoxyribonucleic Acid) is the molecule that carries the genetic instructions for life. It's shaped like a double helix and contains the code for building every protein in your body." },
  { q: ["what is an atom"], a: "An atom is the smallest unit of an element that retains the chemical properties of that element. It consists of a nucleus (protons + neutrons) surrounded by electrons." },
  { q: ["what is a black hole"], a: "A black hole is a region in space where gravity is so strong that nothing — not even light — can escape it. They form when massive stars collapse at the end of their lives." },
  { q: ["what is evolution"], a: "Evolution is the process by which species change over generations through natural selection, mutation, and genetic drift. It's the explanation for the diversity of all life on Earth." },
  { q: ["what is photosynthesis"], a: "Photosynthesis is the process plants use to convert sunlight, water, and CO₂ into glucose (energy) and oxygen. It's basically how plants eat — and how we get the oxygen we breathe." },
  { q: ["what is the big bang"], a: "The Big Bang is the leading scientific theory for the origin of the universe. About 13.8 billion years ago, all matter and energy exploded from an incredibly hot, dense singularity and has been expanding ever since." },
  { q: ["what is a gene"], a: "A gene is a segment of DNA that contains the instructions for making a specific protein. Genes determine traits like eye color, height, and much more." },
  { q: ["what is climate change"], a: "Climate change refers to long-term shifts in global temperatures and weather patterns. While some is natural, since the 1800s human activities — especially burning fossil fuels — have been the main driver." },
  { q: ["what is the periodic table"], a: "The periodic table is a chart organizing all known chemical elements by atomic number, electron configuration, and chemical properties. It has 118 confirmed elements." },
  { q: ["what is a neutron star"], a: "A neutron star is the collapsed core of a massive star. They're incredibly dense — a teaspoon of neutron star material would weigh about a billion tons." },
  { q: ["what is electricity"], a: "Electricity is the flow of electric charge, usually electrons, through a conductor. It powers almost everything in modern life from lights to computers." },
  { q: ["what is quantum mechanics"], a: "Quantum mechanics is the branch of physics describing how matter and energy behave at the smallest scales (atoms and subatomic particles). It's weird — particles can be in multiple states at once until observed." },
  { q: ["what is the theory of relativity"], a: "Einstein's theory of relativity has two parts: Special Relativity (space and time are relative, E=mc²) and General Relativity (gravity is the curvature of spacetime caused by mass)." },
  { q: ["how many planets are in the solar system"], a: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006." },
  { q: ["what is the sun made of"], a: "The sun is made of about 73% hydrogen and 25% helium, with small amounts of oxygen, carbon, iron, and other elements. Nuclear fusion in its core converts hydrogen into helium, releasing enormous energy." },
  { q: ["how old is the earth"], a: "Earth is approximately 4.54 billion years old, based on radiometric dating of rocks and meteorites." },
  { q: ["what is the milky way"], a: "The Milky Way is our home galaxy — a barred spiral galaxy containing an estimated 100–400 billion stars. Our solar system sits about 26,000 light-years from the galactic center." },

  // GEOGRAPHY
  { q: ["what is the capital of france","capital of france"], a: "The capital of France is Paris 🗼" },
  { q: ["what is the capital of usa","capital of usa","capital of america"], a: "The capital of the USA is Washington, D.C." },
  { q: ["what is the capital of japan","capital of japan"], a: "The capital of Japan is Tokyo 🗾" },
  { q: ["what is the capital of china","capital of china"], a: "The capital of China is Beijing." },
  { q: ["what is the capital of uk","capital of england","capital of britain"], a: "The capital of the United Kingdom is London 🇬🇧" },
  { q: ["what is the capital of germany"], a: "The capital of Germany is Berlin." },
  { q: ["what is the capital of italy"], a: "The capital of Italy is Rome." },
  { q: ["what is the capital of spain"], a: "The capital of Spain is Madrid." },
  { q: ["what is the capital of brazil"], a: "The capital of Brazil is Brasília." },
  { q: ["what is the capital of australia"], a: "The capital of Australia is Canberra (not Sydney or Melbourne, which is a common misconception!)." },
  { q: ["what is the capital of canada"], a: "The capital of Canada is Ottawa." },
  { q: ["what is the capital of russia"], a: "The capital of Russia is Moscow." },
  { q: ["what is the capital of india"], a: "The capital of India is New Delhi." },
  { q: ["what is the largest country in the world"], a: "Russia is the largest country in the world by land area, covering about 17.1 million km² — that's roughly 11% of Earth's total land surface." },
  { q: ["what is the smallest country in the world"], a: "Vatican City is the smallest country in the world, covering just 0.44 km² inside Rome, Italy." },
  { q: ["what is the longest river in the world"], a: "The Nile River in Africa is traditionally considered the longest river at about 6,650 km, though some measurements put the Amazon River slightly ahead." },
  { q: ["what is the tallest mountain in the world"], a: "Mount Everest in the Himalayas is the tallest mountain above sea level at 8,849 meters (29,032 feet)." },
  { q: ["what is the deepest ocean"], a: "The Pacific Ocean is the deepest, containing the Mariana Trench — the deepest point on Earth at about 11,034 meters (36,201 feet) deep." },
  { q: ["what is the amazon rainforest"], a: "The Amazon Rainforest is the world's largest tropical rainforest, covering about 5.5 million km² across South America. It produces 20% of the world's oxygen and hosts 10% of all species on Earth." },
  { q: ["how many countries in the world"], a: "There are 195 countries in the world — 193 UN member states plus Vatican City and Palestine as observer states." },
  { q: ["what is the largest ocean"], a: "The Pacific Ocean is the largest ocean, covering about 165 million km² — larger than all of Earth's landmasses combined." },
  { q: ["what continent is egypt in"], a: "Egypt is in Africa (though the Sinai Peninsula is geographically in Asia)." },

  // HISTORY
  { q: ["when did world war 2 end","when did ww2 end"], a: "World War 2 ended in 1945 — in Europe on May 8 (V-E Day) and in the Pacific on September 2 (V-J Day) after Japan's formal surrender." },
  { q: ["when did world war 1 end","when did ww1 end"], a: "World War 1 ended on November 11, 1918, with the signing of the Armistice." },
  { q: ["who was the first president of the usa"], a: "George Washington was the first President of the United States, serving from 1789 to 1797." },
  { q: ["when did the titanic sink"], a: "The Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic Ocean. Over 1,500 people died." },
  { q: ["who invented the telephone"], a: "Alexander Graham Bell is credited with inventing the telephone and received the first patent for it in 1876." },
  { q: ["who invented the light bulb"], a: "Thomas Edison is most commonly credited with inventing a practical incandescent light bulb in 1879, though others like Humphry Davy and Joseph Swan also contributed to its development." },
  { q: ["when did man first land on the moon"], a: "Neil Armstrong and Buzz Aldrin first landed on the Moon on July 20, 1969, during NASA's Apollo 11 mission." },
  { q: ["who was napoleon"], a: "Napoleon Bonaparte (1769–1821) was a French military genius and emperor who conquered much of Europe. He was eventually defeated and exiled, dying on the island of Saint Helena." },
  { q: ["what was the roman empire"], a: "The Roman Empire was one of the most powerful civilizations in history, controlling most of Europe, North Africa, and parts of the Middle East. At its height it spanned 5 million km² and lasted from 27 BC to 476 AD." },
  { q: ["who was cleopatra"], a: "Cleopatra VII (69–30 BC) was the last active ruler of the Ptolemaic Kingdom of Egypt. She was known for her intelligence, political skill, and relationships with Julius Caesar and Mark Antony." },
  { q: ["what caused world war 1"], a: "WWI was caused by a mix of factors: the assassination of Archduke Franz Ferdinand, a web of alliances, nationalism, imperial rivalries, and a massive military buildup across Europe." },
  { q: ["what was the cold war"], a: "The Cold War (1947–1991) was a period of geopolitical tension between the USA and USSR — a battle of capitalism vs. communism fought through proxy wars, espionage, and an arms race, but never direct military conflict." },
  { q: ["when did the berlin wall fall"], a: "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War and leading to German reunification in 1990." },
  { q: ["who was albert einstein"], a: "Albert Einstein (1879–1955) was a German-born physicist who developed the theory of relativity (E=mc²), revolutionizing physics. He won the Nobel Prize in Physics in 1921." },

  // TECHNOLOGY
  { q: ["what is artificial intelligence","what is ai"], a: "Artificial Intelligence (AI) is the simulation of human intelligence by machines. It includes machine learning, natural language processing, computer vision, and more. AI systems learn from data to make decisions." },
  { q: ["what is machine learning"], a: "Machine learning is a subset of AI where systems learn from data to improve their performance without being explicitly programmed. Instead of fixed rules, they find patterns themselves." },
  { q: ["what is the internet"], a: "The internet is a global network of billions of connected computers and devices. It uses standardized protocols (TCP/IP) to allow data to flow between devices anywhere in the world." },
  { q: ["what is blockchain"], a: "Blockchain is a distributed ledger technology where data is stored in linked 'blocks' across many computers. It's transparent, tamper-resistant, and is the foundation of cryptocurrencies like Bitcoin." },
  { q: ["what is bitcoin"], a: "Bitcoin is the first and most well-known cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It's a decentralized digital currency that uses blockchain technology." },
  { q: ["what is python"], a: "Python is a high-level, general-purpose programming language known for its clean, readable syntax. It's widely used in AI/ML, web development, data science, automation, and more." },
  { q: ["what is javascript"], a: "JavaScript is the programming language of the web. It runs in browsers to make websites interactive, and also on servers via Node.js. It's one of the most widely used languages in the world." },
  { q: ["what is a computer"], a: "A computer is an electronic device that processes data according to instructions (programs). It takes input, processes it using a CPU and memory, and produces output. Modern computers can perform billions of operations per second." },
  { q: ["what is the cloud","what is cloud computing"], a: "Cloud computing means storing and accessing data and programs over the internet instead of on your local hard drive. Services like Google Drive, AWS, and iCloud are examples." },
  { q: ["what is cybersecurity"], a: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. It involves preventing unauthorized access, data breaches, and damage to digital infrastructure." },
  { q: ["what is a cpu"], a: "A CPU (Central Processing Unit) is the primary component of a computer that executes instructions. It's often called the 'brain' of the computer." },
  { q: ["what is ram"], a: "RAM (Random Access Memory) is your computer's short-term memory. It temporarily stores data that the CPU is actively using, allowing for fast access. More RAM = smoother multitasking." },
  { q: ["what is vr","what is virtual reality"], a: "Virtual Reality (VR) is a simulated 3D environment that users can interact with using headsets and controllers, feeling immersed in a digital world." },
  { q: ["what is 5g"], a: "5G is the fifth generation of mobile network technology. It offers significantly faster speeds, lower latency, and higher capacity than 4G — enabling things like autonomous vehicles and real-time AR." },

  // HEALTH
  { q: ["how many bones in the human body"], a: "An adult human body has 206 bones. Babies are born with around 270–300 bones, but many fuse together as they grow." },
  { q: ["how many muscles in the human body"], a: "The human body has over 600 muscles, though the exact number varies by how you count them. They make up about 40% of your body weight." },
  { q: ["what is the human heart"], a: "The heart is a muscular organ about the size of a fist that pumps blood through your body. It beats about 100,000 times a day, pumping around 5 liters of blood per minute." },
  { q: ["how much water should i drink"], a: "A common recommendation is 8 glasses (about 2 liters) of water per day, but needs vary by body weight, activity level, and climate. A good rule: drink when you're thirsty, and keep urine light yellow." },
  { q: ["what is the immune system"], a: "The immune system is your body's defense network against pathogens like viruses, bacteria, and parasites. It includes white blood cells, antibodies, and organs like the lymph nodes and spleen." },
  { q: ["what is a calorie"], a: "A calorie is a unit of energy. In nutrition, it refers to the amount of energy food provides. Your body needs calories to function — the average adult needs about 2,000–2,500 calories per day." },
  { q: ["why do we sleep"], a: "Sleep is essential for brain function, memory consolidation, hormone regulation, immune health, and physical repair. Adults need 7–9 hours per night. Chronic sleep deprivation is seriously harmful." },
  { q: ["what is blood pressure"], a: "Blood pressure is the force of blood pushing against artery walls. It's measured in two numbers: systolic (heart beating) over diastolic (heart resting). Normal is around 120/80 mmHg." },
  { q: ["what is diabetes"], a: "Diabetes is a condition where the body doesn't properly regulate blood sugar (glucose). Type 1 is autoimmune; Type 2 is often lifestyle-related. Both require careful management of diet, medication, and blood sugar monitoring." },
  { q: ["what vitamins do i need"], a: "Key vitamins include: A (vision, immune), B complex (energy, brain), C (immune, skin), D (bones, immune), E (antioxidant), K (blood clotting). Most are obtained through a balanced diet." },

  // CODING / PROGRAMMING
  { q: ["how do i print hello world in python"], a: 'In Python:\n\nprint("Hello, World!")\n\nThat\'s it — just one line! 🔥' },
  { q: ["how do i make a for loop in python"], a: 'Python for loop:\n\nfor i in range(10):\n    print(i)\n\nThis prints 0 through 9.' },
  { q: ["what is a variable"], a: "A variable is a named container that stores a value in programming. Example in Python:\n\nname = \"Madfire\"\nage = 100\n\nYou can change the value anytime." },
  { q: ["what is an api"], a: "An API (Application Programming Interface) is a set of rules that lets different software applications communicate with each other. When you use a weather app, it's calling a weather API to get data." },
  { q: ["what is html"], a: "HTML (HyperText Markup Language) is the standard language for creating web pages. It uses tags like <h1>, <p>, <img> to define the structure and content of a page." },
  { q: ["what is css"], a: "CSS (Cascading Style Sheets) controls the visual appearance of HTML elements — colors, fonts, layout, spacing, animations. HTML is the skeleton; CSS is the skin and style." },
  { q: ["what is a function"], a: "A function is a reusable block of code that performs a specific task. You define it once and can call it many times.\n\nPython example:\n\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Madfire'))" },
  { q: ["what is object oriented programming","what is oop"], a: "OOP is a programming paradigm based on 'objects' — bundles of data (attributes) and behavior (methods). Key concepts: Classes, Objects, Inheritance, Encapsulation, Polymorphism." },
  { q: ["what is git"], a: "Git is a distributed version control system that tracks changes in code. It lets multiple developers work on the same project, create branches, and merge code without losing history." },
  { q: ["what is sql"], a: "SQL (Structured Query Language) is the standard language for managing relational databases. You use it to create, read, update, and delete data.\n\nExample:\nSELECT * FROM users WHERE age > 18;" },

  // CULTURE / ENTERTAINMENT
  { q: ["who is shakespeare"], a: "William Shakespeare (1564–1616) was an English playwright and poet, widely regarded as the greatest writer in the English language. He wrote 37 plays including Hamlet, Macbeth, Romeo and Juliet, and Othello." },
  { q: ["what is the most popular sport in the world"], a: "Football (soccer) is the most popular sport in the world, with an estimated 4 billion fans globally. The FIFA World Cup is the most-watched sporting event on Earth." },
  { q: ["who invented chess"], a: "Chess originated in India around the 6th century AD (called Chaturanga), spread to Persia, then to the Arab world, and eventually Europe, where the modern rules were standardized." },
  { q: ["what is the most sold book in history"], a: "The Bible is the most distributed book in history with billions of copies. After that, Don Quixote by Cervantes and A Tale of Two Cities by Dickens are among the most sold fictional books." },
  { q: ["who painted the mona lisa"], a: "The Mona Lisa was painted by Leonardo da Vinci, most likely between 1503 and 1519. It hangs in the Louvre Museum in Paris and is considered the most famous painting in the world." },
  { q: ["what is the olympics"], a: "The Olympics is an international sports competition held every 4 years (Summer) and 2 years offset (Winter). It originated in ancient Greece around 776 BC and was revived in 1896 in Athens." },
  { q: ["what is hip hop"], a: "Hip hop is a cultural movement and music genre that emerged in the Bronx, New York City in the early 1970s. It encompasses rapping, DJing, breakdancing, and graffiti art." },
  { q: ["who is michael jordan"], a: "Michael Jordan is widely considered the greatest basketball player of all time. He won 6 NBA championships with the Chicago Bulls, 6 Finals MVPs, and 5 regular season MVPs." },
  { q: ["what is netflix"], a: "Netflix is a streaming service with over 260 million subscribers worldwide. It offers movies, TV shows, documentaries, and original content. Founded in 1997, it originally mailed DVDs before going digital." },

  // PHILOSOPHY / RANDOM
  { q: ["what is the meaning of life"], a: "The question philosophers have wrestled with forever! Common answers: 42 (Douglas Adams), living virtuously (Aristotle), creating meaning yourself (Existentialism), or simply experiencing joy and reducing suffering. What's YOUR answer?" },
  { q: ["what is consciousness"], a: "Consciousness is your subjective experience of being aware — the 'what it's like' to be you. It's one of the deepest unsolved problems in science and philosophy. No one fully knows how the brain produces it." },
  { q: ["do aliens exist"], a: "No confirmed evidence of extraterrestrial life exists yet. However, given there are an estimated 2 trillion galaxies each with billions of stars, many scientists think it's statistically likely life exists somewhere out there." },
  { q: ["what is time"], a: "Time is the progression of events from the past through the present to the future. Einstein showed it's relative — it passes slower near strong gravity or at high speeds. At a fundamental level, time is still deeply mysterious." },
  { q: ["what is love"], a: "Love is a complex mix of emotions, behaviors, and beliefs associated with affection and care. Biologically it involves dopamine, oxytocin, and serotonin. Philosophically, it's been debated for millennia — attachment, selflessness, passion, and connection." },
  { q: ["what is success"], a: "Success means different things to different people. It can be achieving goals, financial freedom, happiness, meaningful relationships, or making an impact. Define it for yourself — don't let others define it for you. 🔥" },
  { q: ["how do i be happy"], a: "Research points to: strong relationships, a sense of purpose, regular exercise, gratitude practice, enough sleep, and doing things you find meaningful. Happiness is less about circumstances and more about habits and mindset." },
  { q: ["what is meditation"], a: "Meditation is a practice of focused attention and mental stillness. Regular meditation reduces stress, improves focus, lowers anxiety, and has measurable effects on brain structure. Even 10 minutes a day helps." },
  { q: ["what is stoicism"], a: "Stoicism is an ancient Greek philosophy teaching that we should focus only on what we control (our thoughts and actions) and accept what we can't control. Key figures: Marcus Aurelius, Epictetus, Seneca." },

  // LANGUAGE
  { q: ["how many languages are in the world"], a: "There are approximately 7,000 languages spoken in the world today, though about 40% are endangered. The most spoken languages by number of speakers are Mandarin Chinese, Spanish, English, Hindi, and Arabic." },
  { q: ["what is the most spoken language"], a: "Mandarin Chinese has the most native speakers (~920 million). English has the most total speakers when including second-language speakers (~1.5 billion)." },
  { q: ["what does hello mean in spanish"], a: "Hello in Spanish is 'Hola' (pronounced OH-lah) 🇪🇸" },
  { q: ["what does hello mean in french"], a: "Hello in French is 'Bonjour' (bon-ZHOOR) 🇫🇷" },
  { q: ["what does hello mean in japanese"], a: "Hello in Japanese is 'Konnichiwa' (こんにちは) 🇯🇵" },
  { q: ["what does hello mean in arabic"], a: "Hello in Arabic is 'Marhaba' (مرحبا) or 'As-salamu alaykum' (السلام عليكم) 🌙" },
  { q: ["what does hello mean in german"], a: "Hello in German is 'Hallo' or formally 'Guten Tag' 🇩🇪" },

  // FOOD
  { q: ["what is the most popular food in the world"], a: "Rice is arguably the most consumed food in the world — it's a staple for over half the global population, especially in Asia. Pizza and bread also compete for most beloved worldwide." },
  { q: ["what is sushi"], a: "Sushi is a Japanese dish featuring vinegared rice combined with various ingredients like raw fish, seafood, vegetables, or egg. It comes in many forms: nigiri, maki rolls, temaki (hand rolls), and more." },
  { q: ["what is the healthiest food"], a: "No single 'healthiest' food, but top contenders include: leafy greens (spinach, kale), berries, nuts, salmon, legumes, olive oil, and eggs. A diverse, plant-rich diet is the most consistently healthy pattern." },
  { q: ["what is caffeine"], a: "Caffeine is a natural stimulant found in coffee, tea, and cocoa. It works by blocking adenosine receptors in the brain, reducing fatigue and increasing alertness. It's the world's most consumed psychoactive substance." },

  // ANIMALS
  { q: ["what is the fastest animal"], a: "The cheetah is the fastest land animal, reaching speeds of up to 112 km/h (70 mph). In the air, the peregrine falcon can dive at over 320 km/h (200 mph), making it the fastest animal overall." },
  { q: ["what is the largest animal"], a: "The blue whale is the largest animal ever known to have existed, reaching up to 30 meters (100 feet) long and weighing up to 200 tons." },
  { q: ["how long do dogs live"], a: "Most dogs live 10–13 years, though this varies greatly by breed. Smaller breeds tend to live longer (up to 15–20 years), while large breeds like Great Danes may only live 7–10 years." },
  { q: ["do fish sleep"], a: "Fish do sleep, but not like humans. They enter periods of reduced activity and lowered alertness. Many hover in place, slow their breathing, and become less responsive. They just don't have eyelids to close!" },
  { q: ["how many species of animals are there"], a: "Scientists have identified about 8.7 million species on Earth, of which about 1.2 million have been formally described. Most undiscovered species are insects, marine life, and microorganisms." },

  // EVERYDAY QUESTIONS
  { q: ["what time is it"], a: "I don't have access to real-time data, so I can't tell you the exact time — but your device clock is right there! ⏰" },
  { q: ["what is today's date","what day is it"], a: "I don't have real-time access to today's date, but your phone or computer shows it! 📅" },
  { q: ["what is the weather","what is the weather today"], a: "I can't access real-time weather data, but you can check weather.com, Google, or your phone's weather app for current conditions! ☀️" },
  { q: ["how do i lose weight"], a: "Weight loss fundamentally comes down to a calorie deficit — burning more than you consume. Practical tips: eat whole foods, reduce processed sugar, increase protein, do regular exercise (mix cardio + strength), sleep well, and stay consistent. There's no magic shortcut." },
  { q: ["how do i make money"], a: "Key ways to make money: develop valuable skills (coding, design, writing, sales), start a business or freelance, invest in assets (stocks, real estate), create digital products, or climb the career ladder. Long term: focus on creating value for others." },
  { q: ["how do i learn faster"], a: "Evidence-backed learning tips: spaced repetition (review material at increasing intervals), active recall (test yourself, don't just reread), teach what you learn, eliminate distractions, sleep well (memory consolidates during sleep), and stay curious." },
  { q: ["what should i eat for breakfast"], a: "Great breakfast options: eggs (protein-packed), oatmeal (fiber + slow energy), Greek yogurt with berries, whole grain toast with avocado, or a smoothie with protein, fruit, and greens. Aim for protein + complex carbs to stay full." },
  { q: ["how do i start coding"], a: "Start with Python — it's beginner-friendly and extremely versatile. Free resources: freeCodeCamp, CS50 on edX, Python.org tutorials, Codecademy. Build small projects from day one. Consistency beats intensity — 30 min/day beats 5hr once a week." },
  { q: ["what is the best programming language"], a: "Depends on your goal:\n• Web front-end → JavaScript\n• AI/Data Science → Python\n• Mobile → Swift (iOS) or Kotlin (Android)\n• Systems/Performance → Rust or C++\n• Enterprise → Java\n\nPython is the best first language for most beginners." },
  { q: ["how do i improve my english"], a: "Improve English by: consuming English content daily (movies, podcasts, books), speaking with native speakers or apps like Tandem, writing daily in English, using Anki for vocabulary, and not being afraid to make mistakes — that's how you grow." },
  { q: ["what is a good salary"], a: "A 'good' salary is relative to your location, lifestyle, and goals. In the USA, the median household income is ~$75k. What matters more: does it cover your needs, allow some savings, and provide security? Aim to always grow your earning potential." },
  { q: ["how do i be more productive"], a: "Proven productivity methods: time blocking (schedule focused work sessions), Pomodoro technique (25 min work / 5 min break), eliminate distractions (phone away, website blockers), do your hardest task first, and review your day each evening." },

  // MADFIRE SELF
  { q: ["who are you","what are you","who is madfire","what is madfire"], a: "I'm Madfire 🔥 — a blazing-fast AI built to answer your questions, write anything, explain everything, and help you with whatever you need. I work with text only — no images, no videos. Ask me anything!" },
  { q: ["what can you do","what can madfire do"], a: "I can:\n🔥 Answer any question\n📝 Write essays, stories, poems\n💻 Help with coding\n🧮 Explain math and science\n🌍 Geography, history, culture\n💡 Give advice and ideas\n📖 Summarize or explain concepts\n\nThe only things I can't do: generate images or videos." },
  { q: ["can you make an image","can you generate an image","create an image","make a photo"], a: "I can't generate images — I'm a text-only AI. But I can describe anything in vivid detail, help you write image prompts for tools like Midjourney or DALL-E, or explain visual concepts in words. 🔥" },
  { q: ["can you make a video","create a video","generate a video"], a: "Video generation isn't in my arsenal — I'm pure text. But I can write scripts, storyboards, shot lists, or help you plan any video project!" },
  { q: ["hello","hi","hey","what's up","whats up","sup"], a: "Hey! 🔥 Madfire here — ready to burn through any question you've got. What do you want to know?" },
  { q: ["thank you","thanks","thx","ty"], a: "You're welcome! 🔥 Anything else you want to know?" },
  { q: ["goodbye","bye","see you","cya"], a: "Later! 🔥 Come back whenever you've got questions — Madfire never goes cold." },
];

// ── Smart answer engine ────────────────────────────────────────────────────────
function getAnswer(userInput) {
  const raw = userInput.toLowerCase().trim().replace(/[?!.,]/g, "");

  // Direct match
  for (const entry of QA) {
    for (const q of entry.q) {
      if (raw === q || raw.includes(q) || q.includes(raw)) {
        return entry.a;
      }
    }
  }

  // Keyword scoring
  const words = raw.split(/\s+/);
  let bestScore = 0, bestAnswer = null;
  for (const entry of QA) {
    for (const q of entry.q) {
      const qWords = q.split(/\s+/);
      let score = 0;
      for (const w of words) {
        if (w.length > 2 && qWords.includes(w)) score++;
      }
      if (score > bestScore) { bestScore = score; bestAnswer = entry.a; }
    }
  }
  if (bestScore >= 2) return bestAnswer;

  // Math fallback
  const mathMatch = raw.match(/^[\d\s\+\-\*\/\^\(\)\.]+$/);
  if (mathMatch) {
    try {
      const expr = raw.replace(/x/g, "*").replace(/\^/g, "**");
      const result = Function('"use strict"; return (' + expr + ')')();
      return `${raw} = ${result} 🔥`;
    } catch {}
  }

  // Topic hints
  if (raw.includes("capital of")) return `I know many capitals! Try asking like: "What is the capital of France?" 🌍`;
  if (raw.includes("how to") || raw.includes("how do i")) return `Great how-to question! Could you be more specific? I might know exactly what you need. 🔥`;
  if (raw.includes("what is") || raw.includes("what are")) return `Interesting question! Try rephrasing — I have a huge knowledge base covering science, math, history, tech, health, and more.`;
  if (raw.includes("who is") || raw.includes("who was")) return `I know many historical and famous figures. Be more specific and I'll fire back an answer! 🔥`;
  if (raw.includes("why")) return `Great 'why' question! I might know it — try giving me a bit more context.`;
  if (raw.includes("when")) return `For dates and timelines, try: "When did WW2 end?" or "When was [event]?" I have a lot of history!`;
  if (raw.includes("where")) return `Geography question? Try: "What is the capital of [country]?" or "Where is [place]?" 🌍`;
  if (raw.includes("code") || raw.includes("program") || raw.includes("python") || raw.includes("javascript")) return `Coding question! Try asking like: "How do I print hello world in Python?" or "What is a for loop?" 💻`;

  return `🔥 Madfire doesn't have that specific answer yet — but try rephrasing! I know science, math, history, geography, coding, health, philosophy, food, animals, and much more. Ask away!`;
}

// ── Suggested questions for lobby ─────────────────────────────────────────────
const SUGGESTIONS = [
  "What is gravity?", "How do I start coding?", "What is AI?",
  "What is the capital of Japan?", "How many planets in the solar system?",
  "What is the speed of light?", "Who was Einstein?", "What is DNA?",
  "How do I lose weight?", "What is the meaning of life?",
  "What is the largest animal?", "How do I be more productive?",
  "What is Bitcoin?", "What is the Big Bang?", "Who painted the Mona Lisa?"
];

// ── Real animated fire canvas background ──────────────────────────────────────
function FireBg() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const COUNT = 220;
    const mkP = (born) => ({
      x: Math.random() * canvas.width,
      y: born ? canvas.height + 20 : canvas.height - Math.random() * canvas.height * 0.85,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -(Math.random() * 4 + 2),
      life: Math.random() * 0.65 + 0.35,
      ml: 1,
      sz: Math.random() * 24 + 7,
    });
    const ps = Array.from({ length: COUNT }, () => mkP(false));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#020002");
      bg.addColorStop(0.65, "#090001");
      bg.addColorStop(1, "#1c0400");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const eg = ctx.createRadialGradient(canvas.width/2, canvas.height, 0, canvas.width/2, canvas.height, canvas.width * 0.65);
      eg.addColorStop(0, "rgba(255,65,0,0.25)");
      eg.addColorStop(0.45, "rgba(200,20,0,0.1)");
      eg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = eg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";
      const now = Date.now() * 0.001;
      ps.forEach(p => {
        p.x += p.vx + Math.sin(now + p.y * 0.009) * 0.6;
        p.y += p.vy;
        p.vy -= 0.038;
        p.life -= 0.011;
        p.sz *= 0.9935;
        if (p.life <= 0 || p.y < -80) Object.assign(p, mkP(true));
        const a = Math.max(0, p.life / p.ml);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.sz);
        g.addColorStop(0,   `rgba(255,${Math.floor(a * 200 + 30)},15,1)`);
        g.addColorStop(0.4, `rgba(255,${Math.floor(a * 90)},0,0.7)`);
        g.addColorStop(1,   "rgba(60,0,0,0)");
        ctx.globalAlpha = a * 0.88;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, width:"100vw", height:"100vh", zIndex:0, pointerEvents:"none" }} />;
}

// ── Main app ───────────────────────────────────────────────────────────────────
export default function Madfire() {
  const [msgs, setMsgs] = useState([
    { role:"assistant", content:"I'm Madfire 🔥 — your blazing AI. I can answer almost anything: science, math, history, coding, health, philosophy, and more.\n\nPick a question below or ask your own!", done:true, timer:0 }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setInput("");
    setStarted(true);
    const t0 = Date.now();

    setMsgs(prev => [...prev, { role:"user", content:q }]);

    // Simulate fast thinking (50–200ms)
    const delay = 50 + Math.random() * 150;
    setTimeout(() => {
      const answer = getAnswer(q);
      const elapsed = Date.now() - t0;
      setMsgs(prev => [...prev, { role:"assistant", content:answer, done:true, timer:elapsed }]);
    }, delay);
  };

  const fmtMs = ms => ms < 1000 ? `${ms}ms` : `${(ms/1000).toFixed(2)}s`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow:hidden;}
        @keyframes glow{0%,100%{text-shadow:0 0 18px #ff4500,0 0 40px #ff2000}50%{text-shadow:0 0 30px #ff6a00,0 0 60px #ff3000}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
        .suggestion{background:rgba(255,70,0,0.1);border:1px solid rgba(255,70,0,0.25);border-radius:20px;padding:7px 14px;color:#ffb580;font-size:12px;cursor:pointer;font-family:monospace;transition:all .2s;white-space:nowrap;}
        .suggestion:hover{background:rgba(255,80,0,0.25);border-color:rgba(255,100,0,0.5);color:#ffd0a0;}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(255,80,0,0.3);border-radius:4px}
        textarea::placeholder{color:rgba(255,140,60,0.35);}
      `}</style>

      <FireBg/>

      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100vh"}}>

        {/* Header */}
        <div style={{padding:"13px 22px 9px",borderBottom:"1px solid rgba(255,70,0,0.18)",background:"rgba(4,0,0,0.78)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",gap:11}}>
          <span style={{fontSize:24}}>🔥</span>
          <div>
            <h1 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:"clamp(15px,3vw,24px)",color:"#ff6a00",letterSpacing:4,animation:"glow 2.5s ease-in-out infinite"}}>MADFIRE</h1>
            <p style={{fontFamily:"monospace",fontSize:9,color:"rgba(255,140,60,0.5)",letterSpacing:3,marginTop:1}}>BLAZING AI · 100+ TOPICS · INSTANT ANSWERS</p>
          </div>
          <div style={{marginLeft:"auto",fontFamily:"monospace",fontSize:10,color:"rgba(255,100,30,0.5)",letterSpacing:1}}>
            {QA.length * 3}+ Q&As loaded
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"16px clamp(10px,5vw,80px)"}}>
          {msgs.map((m,i) => (
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:13,animation:"fadeUp .3s ease"}}>
              {m.role==="assistant"&&<div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#ff3c00,#ff9500)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,marginRight:8,flexShrink:0,boxShadow:"0 0 10px rgba(255,90,0,0.45)"}}>🔥</div>}
              <div style={{maxWidth:"78%",display:"flex",flexDirection:"column",gap:4,alignItems:m.role==="user"?"flex-end":"flex-start"}}>
                {m.role==="assistant"&&(
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:9,letterSpacing:3,color:"#ff6a00"}}>MADFIRE</span>
                    {m.timer!==undefined&&m.timer>0&&(
                      <span style={{fontSize:10,fontFamily:"monospace",padding:"1px 8px",borderRadius:20,background:"rgba(255,100,0,0.15)",border:"1px solid #ff6a00",color:"#ff9500"}}>
                        ⚡ {fmtMs(m.timer)}
                      </span>
                    )}
                  </div>
                )}
                <div style={{background:m.role==="user"?"rgba(255,80,0,0.14)":"rgba(10,2,0,0.88)",border:`1px solid ${m.role==="user"?"rgba(255,106,0,0.32)":"rgba(255,70,0,0.15)"}`,borderRadius:m.role==="user"?"16px 16px 3px 16px":"3px 16px 16px 16px",padding:"10px 14px",color:"#f5dfc0",fontSize:14,lineHeight:1.78,fontFamily:"Georgia,serif",backdropFilter:"blur(8px)",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>

        {/* Suggestion chips — show always but especially at start */}
        <div style={{padding:"8px clamp(10px,5vw,80px) 4px",background:"rgba(4,0,0,0.7)"}}>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:6}}>
            {SUGGESTIONS.map((s,i)=>(
              <button key={i} className="suggestion" onClick={()=>send(s)}>{s}</button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{padding:"8px clamp(10px,5vw,80px) 14px",borderTop:"1px solid rgba(255,70,0,0.13)",background:"rgba(4,0,0,0.88)",backdropFilter:"blur(18px)"}}>
          <div style={{display:"flex",gap:8,alignItems:"flex-end",background:"rgba(18,4,0,0.92)",border:"1px solid rgba(255,80,0,0.25)",borderRadius:12,padding:"8px 8px 8px 14px"}}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Ask me anything…"
              rows={1}
              style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#ffe0c0",resize:"none",fontFamily:"monospace",fontSize:14,lineHeight:1.6,minHeight:24,maxHeight:100,overflowY:"auto"}}
            />
            <button
              onClick={()=>send()}
              disabled={!input.trim()}
              style={{width:36,height:36,borderRadius:8,border:"none",cursor:input.trim()?"pointer":"not-allowed",background:input.trim()?"linear-gradient(135deg,#ff4500,#ff8c00)":"rgba(40,10,0,0.4)",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:input.trim()?1:0.3,transition:"all .2s"}}
            >🔥</button>
          </div>
          <p style={{textAlign:"center",marginTop:5,fontFamily:"monospace",fontSize:9,color:"rgba(255,90,30,0.25)",letterSpacing:2}}>ENTER TO SEND · SHIFT+ENTER NEW LINE · NO IMAGES · NO VIDEOS</p>
        </div>
      </div>
    </>
  );
}
