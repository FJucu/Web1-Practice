# Beadás előtt ki kell venni. Vagy dokumentációva fejlesztési ötletek mellé beírni ha lesz ilyen

### /js/app.js 

clubs tömb feltöltése statikus helyett dinamikusan.

`let clubs = [
    { id: 1, name: 'Vasas FC' },
    { id: 2, name: 'Ferencvárosi TC' },
    { id: 3, name: 'Puskás Akadémia FC' },
    { id: 4, name: 'Debreceni VSC' },
    { id: 5, name: 'Budapest Honvéd FC' },
    { id: 6, name: 'Szombathelyi Haladás' },
    { id: 7, name: 'Paksi FC' },
    { id: 8, name: 'Mezőkövesd Zsóry FC' },
    { id: 9, name: 'Diósgyőri VTK' },
    { id: 10, name: 'Újpest FC' },
    { id: 11, name: 'Balmazújváros FC' },
    { id: 12, name: 'Videoton FC' }
];`

Megcsinálni úgy, hogy a fájlból olvassa az adatokat.
Esetleg a CRUD funkciót is meglehetne csinálni fájlba írással,de ez már HC mode :D
 