import type { MenuTabData, Language, HighlightItem } from '@/types';

export const menuPageData: Record<Language, MenuTabData> = {
  en: {
    tabs: ["Food", "Wine List", "Tasting Menu", "Group Events"],
    back: "← Back to Home",
    food: {
      sections: [
        {
          id: "cold",
          label: "Cold Starters",
          items: [
            { name: "Garden Salad", priceId: "cold.garden-salad", tags: ["vegetarian"] },
            {
              name: "Vegetarian Carpaccio",
              desc: "Seasonal fruit and vegetables, local cheese, toasted nuts",
              priceId: "cold.vegetarian-carpaccio",
              tags: ["vegetarian", "local"],
            },
            {
              name: "Beef Tartare",
              desc: "Sun-dried tomatoes, spring onion, truffle cream",
              priceId: "cold.beef-tartare",
              tags: ["chef"],
            },
            {
              name: "Pesto Burrata",
              desc: "Creamy burrata, basil pesto, grilled focaccia",
              priceId: "cold.pesto-burrata",
              tags: ["vegetarian"],
            },
            {
              name: "Local Platter",
              desc: "Dalmatian prosciutto, cheeses & condiments",
              priceId: "cold.local-platter",
              tags: ["local", "chef"],
            },
            {
              name: "Gambero Rosso Carpaccio",
              desc: "Wild seasonal herbs, beetroot reduction",
              priceId: "cold.gambero-rosso-carpaccio",
              tags: ["local", "chef"],
            },
          ],
        },
        {
          id: "warm",
          label: "Warm Starters",
          items: [
            {
              name: "Zucchini & Turmeric Cream Soup",
              priceId: "warm.zucchini-turmeric-cream-soup",
              tags: ["vegetarian"],
            },
            {
              name: "Grilled Broccoli",
              desc: "Parmesan cream, chili oil",
              priceId: "warm.grilled-broccoli",
              tags: ["vegetarian"],
            },
            {
              name: "Traditional Soparnik",
              desc: "Grilled Swiss chard pie with cheese",
              priceId: "warm.traditional-soparnik",
              tags: ["local"],
            },
            {
              name: "Grandma's Makaruni",
              desc: "Hand-rolled pasta, tomato salsa, young goat cheese, basil",
              priceId: "warm.grandmas-makaruni",
              tags: ["local", "chef"],
            },
            {
              name: "Wild Pesto Makaruni",
              desc: "Wild fennel pesto, sun-dried tomatoes, toasted almonds",
              priceId: "warm.wild-pesto-makaruni",
              tags: ["vegetarian", "local"],
            },
          ],
        },
        {
          id: "mains",
          label: "Main Courses",
          items: [
            {
              name: "Gnocchi & Rustic Beef",
              desc: "Slow-cooked beef in red wine",
              priceId: "mains.gnocchi-rustic-beef",
            },
            {
              name: "Grilled Octopus",
              desc: "Black beans, zucchini, potatoes, chimichurri",
              priceId: "mains.grilled-octopus",
              tags: ["local", "chef"],
            },
            {
              name: "Grilled Lamb",
              desc: "Crispy potatoes, seasonal vegetables",
              priceId: "mains.grilled-lamb",
              tags: ["local"],
            },
            {
              name: "Monkfish & Truffle Makaruni",
              desc: "Hand-rolled pasta with monkfish and Istrian truffles",
              priceId: "mains.monkfish-truffle-makaruni",
              tags: ["chef"],
            },
            {
              name: "Dry-Aged Rib Eye (21 Days)",
              desc: "Crispy potatoes, seasonal vegetables",
              priceId: "mains.dry-aged-rib-eye",
              tags: ["chef"],
            },
          ],
        },
        {
          id: "peka",
          label: "Peka",
          peka: true,
          note: "Pre-order required — minimum 24 hours in advance",
          items: [
            {
              name: "Lamb / Veal / Chicken",
              desc: "Traditional Slow-Roasted Dish",
              priceId: "peka.lamb-veal-chicken",
              unit: "pp",
            },
            {
              name: "Octopus",
              desc: "Traditional Slow-Roasted Dish",
              priceId: "peka.octopus",
              unit: "pp",
            },
            {
              name: "Daily Catch Fish",
              desc: "Traditional Slow-Roasted Dish",
              priceId: "peka.daily-catch-fish",
              unit: "kg",
            },
          ],
        },
        {
          id: "desserts",
          label: "Desserts",
          items: [
            {
              name: "Sweet of the Day",
              desc: "Chef's Choice",
              priceId: "desserts.sweet-of-the-day",
            },
            {
              name: "Traditional Sweets of Korčula",
              priceId: "desserts.traditional-sweets-of-korcula",
              tags: ["local"],
            },
          ],
        },
      ],
    },
    wine: {
      sections: [
        {
          label: "White Wines",
          items: [
            { name: "Konoba Maha Pošip", glassId: "wine.konoba-maha-posip.glass", bottleId: "wine.konoba-maha-posip.bottle" },
            { name: "Sauvignon Šoškić", bottleId: "wine.sauvignon-soskic.bottle" },
            { name: "Pošip Nerica", bottleId: "wine.posip-nerica.bottle" },
            { name: "Malvazija Kozlović", bottleId: "wine.malvazija-kozlovic.bottle" },
            { name: "Debit Ante Sladić", bottleId: "wine.debit-ante-sladic.bottle" },
            { name: "Maraština Markus", glassId: "wine.marastina-markus.glass", bottleId: "wine.marastina-markus.bottle" },
            { name: "Grk Radovanović", glassId: "wine.grk-radovanovic.glass", bottleId: "wine.grk-radovanovic.bottle" },
            { name: "Pošip Pavičić Sur Lie", bottleId: "wine.posip-pavicic-sur-lie.bottle" },
            {
              name: "Chardonnay Sur Lie Barun",
              glassId: "wine.chardonnay-sur-lie-barun.glass",
              bottleId: "wine.chardonnay-sur-lie-barun.bottle",
            },
            { name: "Chablis 1er Cru", bottleId: "wine.chablis-1er-cru.bottle" },
            { name: "Sancerre Silex", bottleId: "wine.sancerre-silex.bottle" },
          ],
        },
        {
          label: "Rosé Wines",
          items: [
            { name: "Rosé Galić", bottleId: "wine.rose-galic.bottle" },
            { name: "Miraval Château", bottleId: "wine.miraval-chateau.bottle" },
          ],
        },
        {
          label: "Red Wines",
          items: [
            { name: "Konoba Maha Plavac", glassId: "wine.konoba-maha-plavac.glass", bottleId: "wine.konoba-maha-plavac.bottle" },
            { name: "Plavac Single Barrel", bottleId: "wine.plavac-single-barrel.bottle" },
            { name: "Masi Campofiorin", bottleId: "wine.masi-campofiorin.bottle" },
            {
              name: "Maha & Bratiničević Zinfandel",
              glassId: "wine.maha-bratinicevic-zinfandel.glass",
              bottleId: "wine.maha-bratinicevic-zinfandel.bottle",
            },
            { name: "Degarra Bontera", glassId: "wine.degarra-bontera.glass", bottleId: "wine.degarra-bontera.bottle" },
            { name: "Pinot Noir Barun", glassId: "wine.pinot-noir-barun.glass", bottleId: "wine.pinot-noir-barun.bottle" },
            { name: "Pagan Reserva", bottleId: "wine.pagan-reserva.bottle" },
            { name: "Babić Gracin", glassId: "wine.babic-gracin.glass", bottleId: "wine.babic-gracin.bottle" },
            { name: "Veliko Crno Markus", bottleId: "wine.veliko-crno-markus.bottle" },
            { name: "Dingač Markus Pepeljuh", bottleId: "wine.dingac-markus-pepeljuh.bottle" },
            { name: "Markus Franz Ferdinand", bottleId: "wine.markus-franz-ferdinand.bottle" },
          ],
        },
        {
          label: "Sparkling",
          items: [
            { name: "Maha Elegance", glassId: "wine.maha-elegance.glass", bottleId: "wine.maha-elegance.bottle" },
            { name: "Barun Le Rosé Pinot Noir", bottleId: "wine.barun-le-rose-pinot-noir.bottle" },
          ],
        },
        {
          label: "Champagne",
          items: [
            { name: "Taittinger Brut", bottleId: "wine.taittinger-brut.bottle" },
            {
              name: "Leclerc Briant Réserve Brut Bio",
              bottleId: "wine.leclerc-briant-reserve-brut-bio.bottle",
              tag: "Organic · Vegan",
            },
          ],
        },
      ],
    },
    tasting: {
      title: "Tasting Menu",
      subtitle: "A journey through the island",
      courses: [
        {
          num: "01",
          name: "Amuse-bouche",
          desc: "Cracker, hummus, and anchovy",
        },
        {
          num: "02",
          name: "Carpaccio",
          desc: "Selection of seasonal ingredient",
        },
        { num: "03", name: "Soparnik", desc: "Grilled crispy Swiss chard pie" },
        {
          num: "04",
          name: "Žrnovski Makaruni",
          desc: "Pasta with wild fennel pesto",
        },
        {
          num: "05",
          name: "Broccoli",
          desc: "With Parmesan espuma and chili oil",
        },
        { num: "06", name: "Peka", desc: "Veal, lamb, or octopus" },
        { num: "07", name: "Dessert", desc: "Chef's choice" },
      ],
      price1: { label: "Menu", priceId: "tasting.menu", sub: "per person" },
      price2: {
        label: "With Wine & Cocktail Pairing",
        priceId: "tasting.menu-pairing",
        sub: "per person",
      },
    },
    group: {
      title: "Group Events",
      subtitle: "Family-style dining for your group",
      badge: "Exclusively 10+ Guests",
      courses: [
        { name: "Focaccia, Cracker, Olive Oil", type: "Bread & Welcome" },
        {
          name: "Beef Tartare, Cheese Selection, 24-month Aged Prosciutto",
          type: "Starters",
        },
        {
          name: "Žrnovski Makaruni — two options: basil pesto or slowly cooked beef ragù",
          type: "Pasta",
        },
        {
          name: "Peka — meat, fish or octopus under the bell, depending on preference",
          type: "Main",
        },
        {
          name: "Grilled pear or peach with mascarpone cream, crunch and lemon curd",
          type: "Dessert",
        },
      ],
      price1: { label: "Food only", priceId: "group.food-only", sub: "per person" },
      price2: {
        label: "Food, wine & cocktail pairing",
        priceId: "group.food-wine-pairing",
        sub: "per person",
      },
      note: "Available exclusively for parties of more than 10 guests. A unified menu selection is required for the entire group and must be confirmed at booking or no later than 24 hours before arrival.",
      style: "5 courses · Family Style",
    },
  },

  hr: {
    tabs: ["Hrana", "Karta Vina", "Degustacijski Meni", "Grupni Dogadjaji"],
    back: "← Povratak na Početnu",
    food: {
      sections: [
        {
          id: "cold",
          label: "Hladna Predjela",
          items: [
            { name: "Vrtna Salata", priceId: "cold.garden-salad", tags: ["vegetarian"] },
            {
              name: "Vegetarijanski Carpaccio",
              desc: "Sezonsko voće i povrće, lokalni sir, tostani orasi",
              priceId: "cold.vegetarian-carpaccio",
              tags: ["vegetarian", "local"],
            },
            {
              name: "Goveđi Tartar",
              desc: "Sušeni paradajz, mladi luk, krem od tartufa",
              priceId: "cold.beef-tartare",
              tags: ["chef"],
            },
            {
              name: "Pesto Burrata",
              desc: "Kremasta burrata, pesto od bosiljka, pečena focaccia",
              priceId: "cold.pesto-burrata",
              tags: ["vegetarian"],
            },
            {
              name: "Pršut, Sir i Ostalo",
              desc: "Dalmatinski pršut, sirevi i dodaci",
              priceId: "cold.local-platter",
              tags: ["local", "chef"],
            },
            {
              name: "Gambero Rosso Carpaccio",
              desc: "Divlje sezonsko bilje, redukcija cikle",
              priceId: "cold.gambero-rosso-carpaccio",
              tags: ["local", "chef"],
            },
          ],
        },
        {
          id: "warm",
          label: "Topla Predjela",
          items: [
            {
              name: "Krem Juha od Tikvica i Kurkume",
              priceId: "warm.zucchini-turmeric-cream-soup",
              tags: ["vegetarian"],
            },
            {
              name: "Grill Brokula",
              desc: "Parmezanova krema, ulje čilija",
              priceId: "warm.grilled-broccoli",
              tags: ["vegetarian"],
            },
            {
              name: "Soparnik s Paškim Sirom",
              desc: "Pita od blitve sa sirom pečena na grillu",
              priceId: "warm.traditional-soparnik",
              tags: ["local"],
            },
            {
              name: "Žrnovski Makaruni u Babinoj Salsi",
              desc: "Ručno valjana tjestenina, umak od rajčice, mladi kozji sir, bosiljak",
              priceId: "warm.grandmas-makaruni",
              tags: ["local", "chef"],
            },
            {
              name: "Makaruni u Samoniklom Pestu",
              desc: "Pesto od divljeg komorača, sušeni paradajz, tostani bademi",
              priceId: "warm.wild-pesto-makaruni",
              tags: ["vegetarian", "local"],
            },
          ],
        },
        {
          id: "mains",
          label: "Glavna Jela",
          items: [
            {
              name: "Njoki i Rustikalna Govedina",
              desc: "Polagano kuhana govedina u crnom vinu",
              priceId: "mains.gnocchi-rustic-beef",
            },
            {
              name: "Grill Hobotnica",
              desc: "Crni grah, tikvice, krumpir, chimichurri",
              priceId: "mains.grilled-octopus",
              tags: ["local", "chef"],
            },
            {
              name: "Janjetina",
              desc: "Hrskavi krumpir, sezonsko povrće",
              priceId: "mains.grilled-lamb",
              tags: ["local"],
            },
            {
              name: "Grdobina & Makaruni s Tartufima",
              desc: "Ručno valjana tjestenina s grdobinom i istarskim tartufima",
              priceId: "mains.monkfish-truffle-makaruni",
              tags: ["chef"],
            },
            {
              name: "Suho Odležani Rib Eye (21 Dana)",
              desc: "Hrskavi krumpir, sezonsko povrće",
              priceId: "mains.dry-aged-rib-eye",
              tags: ["chef"],
            },
          ],
        },
        {
          id: "peka",
          label: "Peka",
          peka: true,
          note: "Obavezna narudžba — najmanje 24 sata unaprijed",
          items: [
            {
              name: "Janjetina / Teletina / Piletina",
              desc: "Tradicionalno Jelo Pečeno Ispod Peke",
              priceId: "peka.lamb-veal-chicken",
              unit: "pp",
            },
            {
              name: "Hobotnica",
              desc: "Tradicionalno Jelo Pečeno Ispod Peke",
              priceId: "peka.octopus",
              unit: "pp",
            },
            { name: "Riba", desc: "Dnevni Ulov", priceId: "peka.daily-catch-fish", unit: "kg" },
          ],
        },
        {
          id: "desserts",
          label: "Deserti",
          items: [
            {
              name: "Slatko Dana",
              desc: "Izbor Chefa Kuhinje",
              priceId: "desserts.sweet-of-the-day",
            },
            {
              name: "Tradicionalne Slastice Korčule",
              priceId: "desserts.traditional-sweets-of-korcula",
              tags: ["local"],
            },
          ],
        },
      ],
    },
    wine: {
      sections: [
        {
          label: "Bijela Vina",
          items: [
            { name: "Konoba Maha Pošip", glassId: "wine.konoba-maha-posip.glass", bottleId: "wine.konoba-maha-posip.bottle" },
            { name: "Sauvignon Šoškić", bottleId: "wine.sauvignon-soskic.bottle" },
            { name: "Pošip Nerica", bottleId: "wine.posip-nerica.bottle" },
            { name: "Malvazija Kozlović", bottleId: "wine.malvazija-kozlovic.bottle" },
            { name: "Debit Ante Sladić", bottleId: "wine.debit-ante-sladic.bottle" },
            { name: "Maraština Markus", glassId: "wine.marastina-markus.glass", bottleId: "wine.marastina-markus.bottle" },
            { name: "Grk Radovanović", glassId: "wine.grk-radovanovic.glass", bottleId: "wine.grk-radovanovic.bottle" },
            { name: "Pošip Pavičić Sur Lie", bottleId: "wine.posip-pavicic-sur-lie.bottle" },
            {
              name: "Chardonnay Sur Lie Barun",
              glassId: "wine.chardonnay-sur-lie-barun.glass",
              bottleId: "wine.chardonnay-sur-lie-barun.bottle",
            },
            { name: "Chablis 1er Cru", bottleId: "wine.chablis-1er-cru.bottle" },
            { name: "Sancerre Silex", bottleId: "wine.sancerre-silex.bottle" },
          ],
        },
        {
          label: "Rosé Vina",
          items: [
            { name: "Rosé Galić", bottleId: "wine.rose-galic.bottle" },
            { name: "Miraval Château", bottleId: "wine.miraval-chateau.bottle" },
          ],
        },
        {
          label: "Crna Vina",
          items: [
            { name: "Konoba Maha Plavac", glassId: "wine.konoba-maha-plavac.glass", bottleId: "wine.konoba-maha-plavac.bottle" },
            { name: "Plavac Single Barrel", bottleId: "wine.plavac-single-barrel.bottle" },
            { name: "Masi Campofiorin", bottleId: "wine.masi-campofiorin.bottle" },
            {
              name: "Maha & Bratiničević Zinfandel",
              glassId: "wine.maha-bratinicevic-zinfandel.glass",
              bottleId: "wine.maha-bratinicevic-zinfandel.bottle",
            },
            { name: "Degarra Bontera", glassId: "wine.degarra-bontera.glass", bottleId: "wine.degarra-bontera.bottle" },
            { name: "Pinot Noir Barun", glassId: "wine.pinot-noir-barun.glass", bottleId: "wine.pinot-noir-barun.bottle" },
            { name: "Pagan Reserva", bottleId: "wine.pagan-reserva.bottle" },
            { name: "Babić Gracin", glassId: "wine.babic-gracin.glass", bottleId: "wine.babic-gracin.bottle" },
            { name: "Veliko Crno Markus", bottleId: "wine.veliko-crno-markus.bottle" },
            { name: "Dingač Markus Pepeljuh", bottleId: "wine.dingac-markus-pepeljuh.bottle" },
            { name: "Markus Franz Ferdinand", bottleId: "wine.markus-franz-ferdinand.bottle" },
          ],
        },
        {
          label: "Pjenušavo",
          items: [
            { name: "Maha Elegance", glassId: "wine.maha-elegance.glass", bottleId: "wine.maha-elegance.bottle" },
            { name: "Barun Le Rosé Pinot Noir", bottleId: "wine.barun-le-rose-pinot-noir.bottle" },
          ],
        },
        {
          label: "Champagne",
          items: [
            { name: "Taittinger Brut", bottleId: "wine.taittinger-brut.bottle" },
            {
              name: "Leclerc Briant Réserve Brut Bio",
              bottleId: "wine.leclerc-briant-reserve-brut-bio.bottle",
              tag: "Organic · Vegan",
            },
          ],
        },
      ],
    },
    tasting: {
      title: "Degustacijski Meni",
      subtitle: "Putovanje kroz okuse otoka",
      courses: [
        { num: "01", name: "Amuse-bouche", desc: "Krekeri, humus i inćun" },
        { num: "02", name: "Carpaccio", desc: "Selekcija sezonskih sastojaka" },
        { num: "03", name: "Soparnik", desc: "Pečena hrskava pita od blitve" },
        {
          num: "04",
          name: "Žrnovski Makaruni",
          desc: "Tjestenina s pestom od divljeg komorača",
        },
        {
          num: "05",
          name: "Brokula",
          desc: "S parmezanskom espumom i uljem čilija",
        },
        { num: "06", name: "Peka", desc: "Teletina, janjetina ili hobotnica" },
        { num: "07", name: "Desert", desc: "Kuharev izbor" },
      ],
      price1: { label: "Meni", priceId: "tasting.menu", sub: "po osobi" },
      price2: {
        label: "S Paringom Vina i Koktela",
        priceId: "tasting.menu-pairing",
        sub: "po osobi",
      },
    },
    group: {
      title: "Grupni Meni",
      subtitle: "Obiteljski stil posluživanja za vašu grupu",
      badge: "Isključivo 10+ Gostiju",
      courses: [
        { name: "Focaccia, Krekeri, Maslinovo Ulje", type: "Dobrodošlica" },
        {
          name: "Goveđi Tartare, Selekcija Sireva, Pršut Odležan 24 Mj.",
          type: "Predjela",
        },
        {
          name: "Žrnovski Makaruni — dvije opcije: pesto od bosiljka ili lagano kuhani goveđi ragù",
          type: "Tjestenina",
        },
        {
          name: "Peka — meso, riba ili hobotnica ispod peke, prema preferenciji",
          type: "Glavno Jelo",
        },
        {
          name: "Pečena kruška ili breskva s kremom od mascarponea, hrskavcem i lemon curdom",
          type: "Desert",
        },
      ],
      price1: { label: "Samo Hrana", priceId: "group.food-only", sub: "po osobi" },
      price2: {
        label: "Hrana, Vino & Kokteli",
        priceId: "group.food-wine-pairing",
        sub: "po osobi",
      },
      note: "Grupni meni se odnosi samo na grupu veću od 10 osoba. Meni moraju prihvatiti svi članovi grupe te se mora naručiti prilikom rezervacije ili najkasnije 24 sata prije dolaska.",
      style: "5 slijeda · Obiteljski stil",
    },
  },
};

export function getHighlights(lang: Language): HighlightItem[] {
  const isEN = lang === 'en';
  return [
    { name: isEN ? 'Gambero Rosso Carpaccio' : 'Gambero Rosso Carpaccio', desc: isEN ? 'Wild seasonal herbs, beetroot reduction' : 'Divlje sezonsko bilje, redukcija cikle', tag: isEN ? 'Cold Starter' : 'Hladno Predjelo' },
    { name: isEN ? "Grandma's Makaruni" : 'Makaruni u Babinoj Salsi', desc: isEN ? 'Hand-rolled pasta, tomato salsa, young goat cheese, basil' : 'Ručno valjana tjestenina, umak od rajčice, mladi kozji sir', tag: isEN ? 'Warm Starter' : 'Toplo Predjelo' },
    { name: isEN ? 'Grilled Octopus' : 'Grill Hobotnica', desc: isEN ? 'Black beans, zucchini, potatoes, chimichurri' : 'Crni grah, tikvice, krumpir, chimichurri', tag: isEN ? 'Main Course' : 'Glavno Jelo' },
    { name: isEN ? 'Lamb Peka' : 'Peka Janjetina', desc: isEN ? 'Slow-roasted, rosemary, root vegetables — 24h pre-order' : 'Polako pečena, ružmarin, korjenasto povrće — 24h narudžba', tag: isEN ? '✦ Signature' : '✦ Specijalitet' },
    { name: isEN ? 'Dry-Aged Rib Eye (21 Days)' : 'Rib Eye Steak (Odležan 21 Dan)', desc: isEN ? 'Crispy potatoes, seasonal vegetables' : 'Hrskavi krumpir, sezonsko povrće', tag: isEN ? 'Main Course' : 'Glavno Jelo' },
    { name: isEN ? 'Traditional Sweets of Korčula' : 'Tradicionalni Korčulanski Kolačići', desc: '', tag: isEN ? 'Dessert' : 'Desert' },
  ];
}
