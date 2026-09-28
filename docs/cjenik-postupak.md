# Postupak: promjena cijene i objava cjenika

Pravna osnova: Odluka o isticanju dodatne cijene i Odluka o objavi cjenika, NN 101/2026
(na snazi od 1. listopada 2026.). Dan sidrenja za usluge: **10.09.2026.**

## Promjena cijene

1. Cijena se mijenja **samo** u `src/lib/prices.ts`, u polju `current`.
   Polje `anchor` se **ne dira** — to je zamrznuta povijesna činjenica (vidi
   [ADR-0003](adr/0003-anchor-prices-are-frozen-data.md)).
2. `npm run cjenik` → nova datoteka u `public/cjenik/` + zapis u `manifest.json`.
3. `npm run build` mora proći (prebuild provjera usporedi cijene s objavljenim cjenikom).
4. Commit + deploy **prije 8:00** na dan kad nova cijena vrijedi.

## Održavanje

5. Datoteke starije od 30 dana brisati ručno iz `public/cjenik/` i iz `manifest.json`
   (nikad zadnju — vrijedeći cjenik uvijek mora biti dostupan).
6. Nova stavka: dodati je u `prices.ts` s `anchor` = cijena pri prvom uvrštenju, pa je
   dodati u **oba** jezična bloka u `src/lib/menuData.ts`. Provjera javlja grešku ako je
   stavka u samo jednom jeziku ili ako cijena nije nigdje prikazana.
