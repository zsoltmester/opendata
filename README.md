# Open Data Hub

Az *Open Data Hub* egy webes alkalmazás, melyen gyűjteni és rendszerezni tudjuk a nyílt adathalmazokat.

##  Követelményanalízis

### Funkcionális követelmények

- Böngészés és keresés az adathalmazok közt.
- Regisztráció felhasználónév, jelszó és email cím megadásával.
- Bejelentkezés felhasználónév és jelszó megadásával.
- Bejelentkezett felhasználóként:
	- saját jelszó és email cím megtekintése és megváltoztatása,
	- bármely adathalmaz értékelése,
	- sajátok hozzáadása, szerkesztése és törlése.
- Adminisztrátorként:
	- felhasználók kitiltása,
	- adathalamazok és értékelések szerkesztése, törlése.

### Nem funkcionális követelmények

- Kinézete modern, az aktuális trendeknek megfelelő.
- Könnyen átlátható és kezelhető felület.
- Gyorsnak ható működés.
- A felhasználók adatainak biztonságos tárolása.
- Könnyű konfigurálhatóság és bővíthetőség.

### Fogalomjegyzék

- **Nyílt adathalmaz**: Olyan adatok összessége, melyek szabadon elérhetőek az interneten.

### Szerepkörök

- **Vendég**: Csak böngészni és keresni tud az adathalmazok közt. Van lehetősége regisztrálni és bejelentkezni.
- **Felhasználó**: Bejelentkezés után a vendég funkcióit továbbra is eléri, ezen felül meg tudja változtatni a saját jelszavát és email címét, tudja bármelyik adathalmazt értékelni és sajátokat hozzáadni, szerkeszteni és törölni.
- **Adminisztrátor**: Bejelentkezés után a vendég és a felhasználó funkcióit is eléri, ezen felül bármely felhasználót ki tud tiltani és bármely adathalmazt és értékelést tud szerkeszteni és törölni.

#### Szerepkörök szerinti használati esetek

![Szerepkörök szerinti használati esetek diagram](docs/images/use-case.png)

##### Példa egy használati eset folyamatára

Felhasználóként egy adathalmaz bejegyzés módosítása:

1. Bejelentkezik, ha ezt még nem tette meg.
2. Megkeresi azt a saját bejegyzését, amit szerkeszteni szeretne.
3. Szerkeszti a bejegyzést.
4. Elmenti vagy elveti a változásokat.

![Felhasználóként egy adathalmaz bejegyzés módosítása](docs/images/use-case-example.png)
