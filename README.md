# Stemtool – casus Diergaarde Blijdorp

Stemtool voor 6 groepspresentaties. Bezoekers scannen een QR-code en stemmen op hun telefoon. Op de beamer verschijnt daarna de uitslag.

- `index.html`: de stempagina voor telefoons (QR-code verwijst hiernaar)
- `uitslag.html`: het beamerscherm met QR-code, stemmenteller en de knop "Onthul de winnaar" (spatiebalk werkt ook)
- `config.js`: de Firebase-gegevens, de groepen en de dieren

## Testen zonder Firebase
Zet `?demo` achter de URL, bijvoorbeeld `uitslag.html?demo`. De stemmen worden dan alleen in je eigen browser bewaard. Op de uitslagpagina wis je in demomodus alles met de toets **r**.

## Stemmen wissen na een testronde
Ga in de Firebase-console naar de database en verwijder `votes`. Bij de Realtime Database: ga met de muis op `votes` staan en klik op het prullenbakje. Bij Firestore: kies ⋮ → *Delete collection*.
Wie op een telefoon al gestemd heeft, ziet daarna nog steeds "Bedankt". Wis in dat geval de websitegegevens in de browser of gebruik een privévenster.

## Instellingen
Met `vraagEigenGroep: false` in `config.js` slaat de stempagina de vraag "Bij welke groep zit jij?" over.

Illustraties: eigen ontwerp. QR-bibliotheek: qrcode-generator (MIT).
Dit is geen officiële pagina van Diergaarde Blijdorp.
