import type { MenuTabData, Language, HighlightItem } from '@/types';

export const menuPageData: Record<Language, MenuTabData> = {
  en: {
    tabs: ['Food', 'Wine List', 'Tasting Menu', 'Group Events'],
    back: '← Back to Home',
    food: {
      sections: [
        {
          id: 'cold',
          label: 'Cold Starters',
          items: [
            { name: 'Garden Salad', price: '10,00 €', tags: ['vegetarian'] },
            { name: 'Vegetarian Carpaccio', desc: 'Seasonal fruit and vegetables, local cheese, toasted nuts', price: '20,00 €', tags: ['vegetarian', 'local'] },
            { name: 'Beef Tartare', desc: 'Sun-dried tomatoes, spring onion, truffle cream', price: '21,00 €', tags: ['chef'] },
            { name: 'Pesto Burrata', desc: 'Creamy burrata, basil pesto, grilled focaccia', price: '23,00 €', tags: ['vegetarian'] },
            { name: 'Local Platter', desc: 'Dalmatian prosciutto, cheeses & condiments', price: '26,00 €', tags: ['local', 'chef'] },
            { name: 'Gambero Rosso Carpaccio', desc: 'Wild seasonal herbs, beetroot reduction', price: '28,00 €', tags: ['local', 'chef'] },
          ],
        },
        {
          id: 'warm',
          label: 'Warm Starters',
          items: [
            { name: 'Zucchini & Turmeric Cream Soup', price: '11,00 €', tags: ['vegetarian'] },
            { name: 'Grilled Broccoli', desc: 'Parmesan cream, chili oil', price: '23,00 €', tags: ['vegetarian'] },
            { name: 'Traditional Soparnik', desc: 'Grilled Swiss chard pie with cheese', price: '24,00 €', tags: ['local'] },
            { name: "Grandma's Makaruni", desc: 'Hand-rolled pasta, tomato salsa, young goat cheese, basil', price: '25,00 €', tags: ['local', 'chef'] },
            { name: 'Wild Pesto Makaruni', desc: 'Wild fennel pesto, sun-dried tomatoes, toasted almonds', price: '27,00 €', tags: ['vegetarian', 'local'] },
          ],
        },
        {
          id: 'mains',
          label: 'Main Courses',
          items: [
            { name: 'Gnocchi & Rustic Beef', desc: 'Slow-cooked beef in red wine', price: '36,00 €' },
            { name: 'Grilled Octopus', desc: 'Black beans, zucchini, potatoes, chimichurri', price: '38,00 €', tags: ['local', 'chef'] },
            { name: 'Grilled Lamb', desc: 'Crispy potatoes, seasonal vegetables', price: '40,00 €', tags: ['local'] },
            { name: 'Monkfish & Truffle Makaruni', desc: 'Hand-rolled pasta with monkfish and Istrian truffles', price: '42,00 €', tags: ['chef'] },
            { name: 'Dry-Aged Rib Eye (21 Days)', desc: 'Crispy potatoes, seasonal vegetables', price: '45,00 €', tags: ['chef'] },
          ],
        },
        {
          id: 'peka',
          label: 'Peka',
          peka: true,
          note: 'Pre-order required — minimum 24 hours in advance',
          items: [
            { name: 'Lamb / Veal / Chicken', desc: 'Traditional Slow-Roasted Dish', price: '45,00 € / p.p.' },
            { name: 'Octopus', desc: 'Traditional Slow-Roasted Dish', price: '49,00 € / p.p.' },
            { name: 'Daily Catch Fish', desc: 'Traditional Slow-Roasted Dish', price: '99,00 € / kg' },
          ],
        },
        {
          id: 'desserts',
          label: 'Desserts',
          items: [
            { name: 'Sweet of the Day', desc: "Chef's Choice", price: '11,00 €' },
            { name: 'Traditional Sweets of Korčula', price: '9,00 €', tags: ['local'] },
          ],
        },
      ],
    },
    wine: {
      sections: [
        {
          label: 'White Wines',
          items: [
            { name: 'Konoba Maha Pošip', glass: '8,00 €', bottle: '38,00 €' },
            { name: 'Sauvignon Šoškić', bottle: '35,00 €' },
            { name: 'Pošip Nerica', bottle: '50,00 €' },
            { name: 'Malvazija Kozlović', bottle: '52,00 €' },
            { name: 'Debit Ante Sladić', bottle: '52,00 €' },
            { name: 'Maraština Markus', glass: '12,00 €', bottle: '57,00 €' },
            { name: 'Grk Radovanović', glass: '13,00 €', bottle: '60,00 €' },
            { name: 'Pošip Pavičić Sur Lie', bottle: '66,00 €' },
            { name: 'Chardonnay Sur Lie Barun', glass: '15,00 €', bottle: '69,00 €' },
            { name: 'Chablis 1er Cru', bottle: '80,00 €' },
            { name: 'Sancerre Silex', bottle: '104,00 €' },
          ],
        },
        {
          label: 'Rosé Wines',
          items: [
            { name: 'Rosé Galić', bottle: '41,00 €' },
            { name: 'Miraval Château', bottle: '67,00 €' },
          ],
        },
        {
          label: 'Red Wines',
          items: [
            { name: 'Konoba Maha Plavac', glass: '8,00 €', bottle: '39,00 €' },
            { name: 'Plavac Single Barrel', bottle: '49,00 €' },
            { name: 'Masi Campofiorin', bottle: '52,00 €' },
            { name: 'Maha & Bratiničević Zinfandel', glass: '12,00 €', bottle: '57,00 €' },
            { name: 'Degarra Bontera', glass: '12,00 €', bottle: '59,00 €' },
            { name: 'Pinot Noir Barun', glass: '14,00 €', bottle: '67,00 €' },
            { name: 'Pagan Reserva', bottle: '82,00 €' },
            { name: 'Babić Gracin', glass: '18,00 €', bottle: '89,00 €' },
            { name: 'Veliko Crno Markus', bottle: '156,00 €' },
            { name: 'Dingač Markus Pepeljuh', bottle: '195,00 €' },
            { name: 'Markus Franz Ferdinand', bottle: '1.100 €' },
          ],
        },
        {
          label: 'Sparkling',
          items: [
            { name: 'Maha Elegance', glass: '11,00 €', bottle: '55,00 €' },
            { name: 'Barun Le Rosé Pinot Noir', bottle: '57,00 €' },
          ],
        },
        {
          label: 'Champagne',
          items: [
            { name: 'Taittinger Brut', bottle: '117,00 €' },
            { name: 'Leclerc Briant Réserve Brut Bio', bottle: '150,00 €', tag: 'Organic · Vegan' },
          ],
        },
      ],
    },
    tasting: {
      title: 'Tasting Menu',
      subtitle: 'A journey through the island',
      courses: [
        { num: '01', name: 'Amuse-bouche', desc: 'Cracker, hummus, and anchovy' },
        { num: '02', name: 'Carpaccio', desc: 'Selection of seasonal ingredient' },
        { num: '03', name: 'Soparnik', desc: 'Grilled crispy Swiss chard pie' },
        { num: '04', name: 'Žrnovski Makaruni', desc: 'Pasta with wild fennel pesto' },
        { num: '05', name: 'Broccoli', desc: 'With Parmesan espuma and chili oil' },
        { num: '06', name: 'Peka', desc: 'Veal, lamb, or octopus' },
        { num: '07', name: 'Dessert', desc: "Chef's choice" },
      ],
      price1: { label: 'Menu', value: '145 €', sub: 'per person' },
      price2: { label: 'With Wine & Cocktail Pairing', value: '190 €', sub: 'per person' },
    },
    group: {
      title: 'Group Events',
      subtitle: 'Family-style dining for your group',
      badge: 'Exclusively 10+ Guests',
      courses: [
        { name: 'Focaccia, Cracker, Olive Oil', type: 'Bread & Welcome' },
        { name: 'Beef Tartare, Cheese Selection, 24-month Aged Prosciutto', type: 'Starters' },
        { name: 'Žrnovski Makaruni — two options: basil pesto or slowly cooked beef ragù', type: 'Pasta' },
        { name: 'Peka — meat, fish or octopus under the bell, depending on preference', type: 'Main' },
        { name: 'Grilled pear or peach with mascarpone cream, crunch and lemon curd', type: 'Dessert' },
      ],
      price1: { label: 'Food only', value: '110 €', sub: 'per person' },
      price2: { label: 'Food, wine & cocktail pairing', value: '150 €', sub: 'per person' },
      note: 'Available exclusively for parties of more than 10 guests. A unified menu selection is required for the entire group and must be confirmed at booking or no later than 24 hours before arrival.',
      style: '5 courses · Family Style',
    },
  },

  hr: {
    tabs: ['Hrana', 'Karta Vina', 'Degustacijski Meni', 'Grupni Dogadjaji'],
    back: '← Povratak na Početnu',
    food: {
      sections: [
        {
          id: 'cold',
          label: 'Hladna Predjela',
          items: [
            { name: 'Salata iz Vrta', price: '10,00 €', tags: ['vegetarian'] },
            { name: 'Vegetarijanski Carpaccio', desc: 'Sezonsko voće i povrće, lokalni sir, tostani orasi', price: '20,00 €', tags: ['vegetarian', 'local'] },
            { name: 'Goveđi Tartare', desc: 'Sušeni paradajz, mladi luk, krem od tartufa', price: '21,00 €', tags: ['chef'] },
            { name: 'Pesto Burrata', desc: 'Kremasta burrata, pesto od bosiljka, pečena focaccia', price: '23,00 €', tags: ['vegetarian'] },
            { name: 'Lokalni Pladanj', desc: 'Dalmatinski pršut, sirevi i dodaci', price: '26,00 €', tags: ['local', 'chef'] },
            { name: 'Gambero Rosso Carpaccio', desc: 'Divlje sezonsko bilje, redukcija cikle', price: '28,00 €', tags: ['local', 'chef'] },
          ],
        },
        {
          id: 'warm',
          label: 'Topla Predjela',
          items: [
            { name: 'Krem Juha od Tikvica i Kurkume', price: '11,00 €', tags: ['vegetarian'] },
            { name: 'Pečeni Brokula', desc: 'Parmezanova krema, ulje čilija', price: '23,00 €', tags: ['vegetarian'] },
            { name: 'Tradicionalni Soparnik', desc: 'Pečena pita od blitve sa sirom', price: '24,00 €', tags: ['local'] },
            { name: 'Bakini Makaruni', desc: 'Ručno valjana tjestenina, umak od rajčice, mladi kozji sir, bosiljak', price: '25,00 €', tags: ['local', 'chef'] },
            { name: 'Makaruni s Divljim Pestom', desc: 'Pesto od divljeg komorača, sušeni paradajz, tostani bademi', price: '27,00 €', tags: ['vegetarian', 'local'] },
          ],
        },
        {
          id: 'mains',
          label: 'Glavna Jela',
          items: [
            { name: 'Njoki i Rustikalna Govedina', desc: 'Polagano kuhana govedina u crnom vinu', price: '36,00 €' },
            { name: 'Pečena Hobotnica na Žaru', desc: 'Crni grah, tikvice, krumpir, chimichurri', price: '38,00 €', tags: ['local', 'chef'] },
            { name: 'Janjetina na Žaru', desc: 'Hrskavi krumpir, sezonsko povrće', price: '40,00 €', tags: ['local'] },
            { name: 'Grdobina & Makaruni s Tartufima', desc: 'Ručno valjana tjestenina s grdobinom i istarskim tartufima', price: '42,00 €', tags: ['chef'] },
            { name: 'Suho Odležani Rib Eye (21 Dana)', desc: 'Hrskavi krumpir, sezonsko povrće', price: '45,00 €', tags: ['chef'] },
          ],
        },
        {
          id: 'peka',
          label: 'Peka',
          peka: true,
          note: 'Obavezna narudžba — najmanje 24 sata unaprijed',
          items: [
            { name: 'Janjetina / Teletina / Piletina', desc: 'Tradicionalno Jelo Pečeno Ispod Peke', price: '45,00 € / p.p.' },
            { name: 'Hobotnica', desc: 'Tradicionalno Jelo Pečeno Ispod Peke', price: '49,00 € / p.p.' },
            { name: 'Svježa Riba Dana', desc: 'Tradicionalno Jelo Pečeno Ispod Peke', price: '99,00 € / kg' },
          ],
        },
        {
          id: 'desserts',
          label: 'Deserti',
          items: [
            { name: 'Slastica Dana', desc: 'Kuharev Izbor', price: '11,00 €' },
            { name: 'Tradicionalne Slastice Korčule', price: '9,00 €', tags: ['local'] },
          ],
        },
      ],
    },
    wine: {
      sections: [
        {
          label: 'Bijela Vina',
          items: [
            { name: 'Konoba Maha Pošip', glass: '8,00 €', bottle: '38,00 €' },
            { name: 'Sauvignon Šoškić', bottle: '35,00 €' },
            { name: 'Pošip Nerica', bottle: '50,00 €' },
            { name: 'Malvazija Kozlović', bottle: '52,00 €' },
            { name: 'Debit Ante Sladić', bottle: '52,00 €' },
            { name: 'Maraština Markus', glass: '12,00 €', bottle: '57,00 €' },
            { name: 'Grk Radovanović', glass: '13,00 €', bottle: '60,00 €' },
            { name: 'Pošip Pavičić Sur Lie', bottle: '66,00 €' },
            { name: 'Chardonnay Sur Lie Barun', glass: '15,00 €', bottle: '69,00 €' },
            { name: 'Chablis 1er Cru', bottle: '80,00 €' },
            { name: 'Sancerre Silex', bottle: '104,00 €' },
          ],
        },
        {
          label: 'Rosé Vina',
          items: [
            { name: 'Rosé Galić', bottle: '41,00 €' },
            { name: 'Miraval Château', bottle: '67,00 €' },
          ],
        },
        {
          label: 'Crna Vina',
          items: [
            { name: 'Konoba Maha Plavac', glass: '8,00 €', bottle: '39,00 €' },
            { name: 'Plavac Single Barrel', bottle: '49,00 €' },
            { name: 'Masi Campofiorin', bottle: '52,00 €' },
            { name: 'Maha & Bratiničević Zinfandel', glass: '12,00 €', bottle: '57,00 €' },
            { name: 'Degarra Bontera', glass: '12,00 €', bottle: '59,00 €' },
            { name: 'Pinot Noir Barun', glass: '14,00 €', bottle: '67,00 €' },
            { name: 'Pagan Reserva', bottle: '82,00 €' },
            { name: 'Babić Gracin', glass: '18,00 €', bottle: '89,00 €' },
            { name: 'Veliko Crno Markus', bottle: '156,00 €' },
            { name: 'Dingač Markus Pepeljuh', bottle: '195,00 €' },
            { name: 'Markus Franz Ferdinand', bottle: '1.100 €' },
          ],
        },
        {
          label: 'Pjenušavo',
          items: [
            { name: 'Maha Elegance', glass: '11,00 €', bottle: '55,00 €' },
            { name: 'Barun Le Rosé Pinot Noir', bottle: '57,00 €' },
          ],
        },
        {
          label: 'Champagne',
          items: [
            { name: 'Taittinger Brut', bottle: '117,00 €' },
            { name: 'Leclerc Briant Réserve Brut Bio', bottle: '150,00 €', tag: 'Organic · Vegan' },
          ],
        },
      ],
    },
    tasting: {
      title: 'Degustacijski Meni',
      subtitle: 'Putovanje kroz okuse otoka',
      courses: [
        { num: '01', name: 'Amuse-bouche', desc: 'Krekeri, humus i inćun' },
        { num: '02', name: 'Carpaccio', desc: 'Selekcija sezonskih sastojaka' },
        { num: '03', name: 'Soparnik', desc: 'Pečena hrskava pita od blitve' },
        { num: '04', name: 'Žrnovski Makaruni', desc: 'Tjestenina s pestom od divljeg komorača' },
        { num: '05', name: 'Brokula', desc: 'S parmezanskom espumom i uljem čilija' },
        { num: '06', name: 'Peka', desc: 'Teletina, janjetina ili hobotnica' },
        { num: '07', name: 'Desert', desc: 'Kuharev izbor' },
      ],
      price1: { label: 'Meni', value: '145 €', sub: 'po osobi' },
      price2: { label: 'S Paringom Vina i Koktela', value: '190 €', sub: 'po osobi' },
    },
    group: {
      title: 'Grupni Dogadjaji',
      subtitle: 'Obiteljski stil posluživanja za vašu grupu',
      badge: 'Isključivo 10+ Gostiju',
      courses: [
        { name: 'Focaccia, Krekeri, Maslinovo Ulje', type: 'Dobrodošlica' },
        { name: 'Goveđi Tartare, Selekcija Sireva, Pršut Odležan 24 Mj.', type: 'Predjela' },
        { name: 'Žrnovski Makaruni — dvije opcije: pesto od bosiljka ili lagano kuhani goveđi ragù', type: 'Tjestenina' },
        { name: 'Peka — meso, riba ili hobotnica ispod peke, prema preferenciji', type: 'Glavno Jelo' },
        { name: 'Pečena kruška ili breskva s kremom od mascarponea, hrskavcem i lemon curdom', type: 'Desert' },
      ],
      price1: { label: 'Samo Hrana', value: '110 €', sub: 'po osobi' },
      price2: { label: 'Hrana, Vino & Kokteli', value: '150 €', sub: 'po osobi' },
      note: 'Grupni meni dostupan je isključivo za grupe od više od 10 gostiju. Potrebno je odabrati jedinstveni meni za cijelu grupu i potvrditi ga pri rezervaciji ili najkasnije 24 sata prije dolaska.',
      style: '5 slijeda · Obiteljski stil',
    },
  },
};

export function getHighlights(lang: Language): HighlightItem[] {
  const isEN = lang === 'en';
  return [
    { name: isEN ? 'Gambero Rosso Carpaccio' : 'Gambero Rosso Carpaccio', desc: isEN ? 'Wild seasonal herbs, beetroot reduction' : 'Divlje sezonsko bilje, redukcija cikle', price: '28,00 €', tag: isEN ? 'Cold Starter' : 'Hladno Predjelo' },
    { name: isEN ? "Grandma's Makaruni" : 'Bakini Makaruni', desc: isEN ? 'Hand-rolled pasta, tomato salsa, young goat cheese, basil' : 'Ručno valjana tjestenina, umak od rajčice, mladi kozji sir', price: '25,00 €', tag: isEN ? 'Warm Starter' : 'Toplo Predjelo' },
    { name: isEN ? 'Grilled Octopus' : 'Pečena Hobotnica', desc: isEN ? 'Black beans, zucchini, potatoes, chimichurri' : 'Crni grah, tikvice, krumpir, chimichurri', price: '38,00 €', tag: isEN ? 'Main Course' : 'Glavno Jelo' },
    { name: isEN ? 'Lamb under Peka' : 'Janjetina ispod Peke', desc: isEN ? 'Slow-roasted, rosemary, root vegetables — 24h pre-order' : 'Polako pečena, ružmarin, korjenasto povrće — 24h narudžba', price: '45,00 €', tag: isEN ? '✦ Signature' : '✦ Specijalitet' },
    { name: isEN ? 'Dry-Aged Rib Eye (21 Days)' : 'Suho Odležani Rib Eye (21 Dana)', desc: isEN ? 'Crispy potatoes, seasonal vegetables' : 'Hrskavi krumpir, sezonsko povrće', price: '45,00 €', tag: isEN ? 'Main Course' : 'Glavno Jelo' },
    { name: isEN ? 'Traditional Sweets of Korčula' : 'Tradicionalne Slastice Korčule', desc: '', price: '9,00 €', tag: isEN ? 'Dessert' : 'Desert' },
  ];
}
