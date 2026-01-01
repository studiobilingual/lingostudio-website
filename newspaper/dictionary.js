/* =============================================
   LingoStudio Newspaper - Dictionary
   =============================================
   
   להוסיף מילה חדשה:
   1. מחפשים את סוף המילון (לפני הסוגר })
   2. מוסיפים מילה חדשה לפי הדוגמה למטה
   
   דוגמה:
   "מִילָה": {
       phonetic: "mi-LA",
       type_he: "שֵׁם עֶצֶם",
       type_en: "Noun",
       meanings: [
           { text: "word", highlight: true }
       ],
       examples: [
           { hebrew: "זֹאת מִילָה חֲדָשָׁה.", english: "This is a new word.", inText: true }
       ]
   },
   
*/

const dictionary = {
    
    // === ברכות ופתיחות ===
    
    "שָׁלוֹם": {
        phonetic: "sha-LOM",
        type_he: "שֵׁם עֶצֶם / בִּרְכָּה",
        type_en: "Noun / Greeting",
        meanings: [
            { text: "hello / goodbye / peace", highlight: true }
        ],
        examples: [
            { hebrew: "שָׁלוֹם! מָה נִשְׁמָע?", english: "Hello! How are you?", inText: true }
        ]
    },
    
    "תּוֹדָה": {
        phonetic: "to-DA",
        type_he: "שֵׁם עֶצֶם",
        type_en: "Noun",
        meanings: [
            { text: "thank you / thanks", highlight: true }
        ],
        examples: [
            { hebrew: "תּוֹדָה רַבָּה!", english: "Thank you very much!", inText: true }
        ]
    },
    
    "בְּבַקָּשָׁה": {
        phonetic: "be-va-ka-SHA",
        type_he: "תֹּאַר הַפֹּעַל",
        type_en: "Adverb",
        meanings: [
            { text: "please / you're welcome", highlight: true }
        ],
        examples: [
            { hebrew: "בְּבַקָּשָׁה, שֵׁב.", english: "Please, sit down.", inText: true }
        ]
    },
    
    // === מילות שאלה ===
    
    "מָה": {
        phonetic: "ma",
        type_he: "מִילַּת שְׁאֵלָה",
        type_en: "Question word",
        meanings: [
            { text: "what", highlight: true }
        ],
        examples: [
            { hebrew: "מָה הַשֵּׁם שֶׁלְּךָ?", english: "What is your name?", inText: true }
        ]
    },
    
    "אֵיפֹה": {
        phonetic: "EY-fo",
        type_he: "מִילַּת שְׁאֵלָה",
        type_en: "Question word",
        meanings: [
            { text: "where", highlight: true }
        ],
        examples: [
            { hebrew: "אֵיפֹה אַתָּה גָּר?", english: "Where do you live?", inText: true }
        ]
    },
    
    "מִי": {
        phonetic: "mi",
        type_he: "מִילַּת שְׁאֵלָה",
        type_en: "Question word",
        meanings: [
            { text: "who", highlight: true }
        ],
        examples: [
            { hebrew: "מִי זֶה?", english: "Who is this?", inText: true }
        ]
    },
    
    "אֵיךְ": {
        phonetic: "ekh",
        type_he: "מִילַּת שְׁאֵלָה",
        type_en: "Question word",
        meanings: [
            { text: "how", highlight: true }
        ],
        examples: [
            { hebrew: "אֵיךְ אַתָּה?", english: "How are you?", inText: true }
        ]
    },
    
    // === כינויי גוף ===
    
    "אֲנִי": {
        phonetic: "a-NI",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "I", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי לוֹמֵד עִבְרִית.", english: "I am learning Hebrew.", inText: true }
        ]
    },
    
    "אַתָּה": {
        phonetic: "a-TA",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "you (masculine singular)", highlight: true }
        ],
        examples: [
            { hebrew: "אַתָּה מְדַבֵּר עִבְרִית?", english: "Do you speak Hebrew?", inText: true }
        ]
    },
    
    "אַתְּ": {
        phonetic: "at",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "you (feminine singular)", highlight: true }
        ],
        examples: [
            { hebrew: "אַתְּ מְדַבֶּרֶת עִבְרִית?", english: "Do you speak Hebrew?", inText: true }
        ]
    },
    
    "הוּא": {
        phonetic: "hu",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "he", highlight: true }
        ],
        examples: [
            { hebrew: "הוּא תַּלְמִיד.", english: "He is a student.", inText: true }
        ]
    },
    
    "הִיא": {
        phonetic: "hi",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "she", highlight: true }
        ],
        examples: [
            { hebrew: "הִיא מוֹרָה.", english: "She is a teacher.", inText: true }
        ]
    },
    
    "אֲנַחְנוּ": {
        phonetic: "a-NAKH-nu",
        type_he: "כִּנּוּי גּוּף",
        type_en: "Pronoun",
        meanings: [
            { text: "we", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנַחְנוּ לוֹמְדִים עִבְרִית.", english: "We are learning Hebrew.", inText: true }
        ]
    },
    
    // === פעלים ===
    
    "גָּר": {
        phonetic: "gar",
        type_he: "פֹּעַל, קַל",
        type_en: "Verb, Pa'al",
        meanings: [
            { text: "live / reside", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי גָּר בְּתֵל אָבִיב.", english: "I live in Tel Aviv.", inText: true }
        ]
    },
    
    "נִשְׁמָע": {
        phonetic: "nish-MA",
        type_he: "פֹּעַל, נִפְעַל",
        type_en: "Verb, Nif'al",
        meanings: [
            { text: "is heard / what's up (slang)", highlight: true }
        ],
        examples: [
            { hebrew: "מָה נִשְׁמָע?", english: "What's up? / How are you?", inText: true }
        ]
    },
    
    "לוֹמֵד": {
        phonetic: "lo-MED",
        type_he: "פֹּעַל, קַל",
        type_en: "Verb, Pa'al",
        meanings: [
            { text: "learn / study (masculine)", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי לוֹמֵד עִבְרִית.", english: "I am learning Hebrew.", inText: true }
        ]
    },
    
    // === שמות עצם ===
    
    "בַּיִת": {
        phonetic: "BA-yit",
        type_he: "שֵׁם עֶצֶם, זָכָר",
        type_en: "Noun, masculine",
        meanings: [
            { text: "house / home", highlight: true }
        ],
        examples: [
            { hebrew: "הַבַּיִת שֶׁלִּי גָּדוֹל.", english: "My house is big.", inText: true }
        ]
    },
    
    "רְחוֹב": {
        phonetic: "re-KHOV",
        type_he: "שֵׁם עֶצֶם, זָכָר",
        type_en: "Noun, masculine",
        meanings: [
            { text: "street", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי גָּר בִּרְחוֹב הֶרְצֵל.", english: "I live on Herzl Street.", inText: true }
        ]
    },
    
    "מִסְפָּר": {
        phonetic: "mis-PAR",
        type_he: "שֵׁם עֶצֶם, זָכָר",
        type_en: "Noun, masculine",
        meanings: [
            { text: "number", highlight: true }
        ],
        examples: [
            { hebrew: "מָה מִסְפָּר הַטֵּלֵפוֹן?", english: "What is the phone number?", inText: true }
        ]
    },
    
    "אוּלְפָּן": {
        phonetic: "ul-PAN",
        type_he: "שֵׁם עֶצֶם, זָכָר",
        type_en: "Noun, masculine",
        meanings: [
            { text: "ulpan (Hebrew language school)", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנַחְנוּ בָּאוּלְפָּן.", english: "We are at the ulpan.", inText: true }
        ]
    },
    
    // === מספרים ===
    
    "שָׁלוֹשׁ": {
        phonetic: "sha-LOSH",
        type_he: "מִסְפָּר, נְקֵבָה",
        type_en: "Number, feminine",
        meanings: [
            { text: "three", highlight: true }
        ],
        examples: [
            { hebrew: "בַּיִת מִסְפָּר שָׁלוֹשׁ.", english: "House number three.", inText: true }
        ]
    },
    
    "חָמֵשׁ": {
        phonetic: "kha-MESH",
        type_he: "מִסְפָּר, נְקֵבָה",
        type_en: "Number, feminine",
        meanings: [
            { text: "five", highlight: true }
        ],
        examples: [
            { hebrew: "בַּיִת מִסְפָּר חָמֵשׁ.", english: "House number five.", inText: true }
        ]
    },
    
    // === תארים ותארי פועל ===
    
    "בְּסֵדֶר": {
        phonetic: "be-SE-der",
        type_he: "תֹּאַר הַפֹּעַל",
        type_en: "Adverb",
        meanings: [
            { text: "okay / fine / alright", highlight: true }
        ],
        examples: [
            { hebrew: "הַכֹּל בְּסֵדֶר!", english: "Everything is fine!", inText: true }
        ]
    },
    
    "נָכוֹן": {
        phonetic: "na-KHON",
        type_he: "שֵׁם תֹּאַר",
        type_en: "Adjective",
        meanings: [
            { text: "correct / right / true", highlight: true }
        ],
        examples: [
            { hebrew: "נָכוֹן!", english: "Correct! / Right!", inText: true }
        ]
    },
    
    "קָרוֹב": {
        phonetic: "ka-ROV",
        type_he: "שֵׁם תֹּאַר, זָכָר",
        type_en: "Adjective, masculine",
        meanings: [
            { text: "close / near", highlight: true }
        ],
        examples: [
            { hebrew: "זֶה קָרוֹב!", english: "That's close!", inText: true }
        ]
    },
    
    // === מילות יחס ואחרות ===
    
    "הַכֹּל": {
        phonetic: "ha-KOL",
        type_he: "שֵׁם עֶצֶם",
        type_en: "Noun",
        meanings: [
            { text: "everything", highlight: true }
        ],
        examples: [
            { hebrew: "הַכֹּל בְּסֵדֶר.", english: "Everything is fine.", inText: true }
        ]
    },
    
    "עִם": {
        phonetic: "im",
        type_he: "מִילַּת יַחַס",
        type_en: "Preposition",
        meanings: [
            { text: "with", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי גָּר עִם מִשְׁפָּחָה.", english: "I live with a family.", inText: true }
        ]
    },
    
    "אֵצֶל": {
        phonetic: "E-tsel",
        type_he: "מִילַּת יַחַס",
        type_en: "Preposition",
        meanings: [
            { text: "at (someone's place)", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי גָּר אֵצֶל מִשְׁפָּחָה.", english: "I live at a family's place.", inText: true }
        ]
    },
    
    "רַק": {
        phonetic: "rak",
        type_he: "תֹּאַר הַפֹּעַל",
        type_en: "Adverb",
        meanings: [
            { text: "only / just", highlight: true }
        ],
        examples: [
            { hebrew: "הֵם מְדַבְּרִים רַק עִבְרִית.", english: "They speak only Hebrew.", inText: true }
        ]
    },
    
    "לְבַד": {
        phonetic: "le-VAD",
        type_he: "תֹּאַר הַפֹּעַל",
        type_en: "Adverb",
        meanings: [
            { text: "alone / by oneself", highlight: true }
        ],
        examples: [
            { hebrew: "אֲנִי גָּר לְבַד.", english: "I live alone.", inText: true }
        ]
    }
    
    // === הוסף מילים חדשות כאן ===
    
};
