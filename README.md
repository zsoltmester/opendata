# TODO

- Dokumentáció (teszt, felhasználói, meg egy segítség a tanárnak)
- Deploy

# Elvárások

- Kikapcsolt JavaScript mellett az 1. beadandót kapjuk vissza.
- Dokumentáció:
	- a funkcióban érintett fájlok mind kliens- és szerveroldalon
	- a funkció működésének, folyamatának szöveges leírása (mikor mi történik, milyen eseményekre hogyan reagál, melyik kódrészlet fut le, melyik függvény hívódik meg)
	- valamelyik funkciónál 1 szekvenciadiagram a kiszolgálás folyamatáról
	- Felhasználói dokumentáció
		- A futtatáshoz ajánlott hardver-, szoftver konfiguráció
		- Telepítés lépései: hogyan kerül a Githubról a célgépre a program, hogyan kell elindítani
		- A program használata
- Tesztek:
	- A tesztesetek felsorolása továbbra is szükséges, ezek mellett automatikus tesztek is szükségesek. Nem kell teljeskörű tesztelés, a hallgató mutassa meg, hogy képes ilyen tesztek írására.
	- Tesztelési környezet bemutatása a dokumentációban (Selenium telepítése, tesztek futtatása)
	- Funkcionális felületi tesztek: legalább 4 folyamat tesztelése Selenium IDE használatával


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

## Tervezés

### Oldalak

#### Fejléc

Minden oldalon található egy fejléc, amin az alkalmazás logóján kívűl a következők vannak:

##### Vendégeknek

- Bejelentkezés gomb
- Regisztráció gomb

##### Felhasználóknak

- Adathalmaz hozzáadása
- Profil gomb, melynek felirata a felhasználónév
- Kijelentkezés gomb

##### Adminisztrátoroknak

Ugyanaz, mint a felhasználóknak, plusz:
- Felhasználók böngészése gomb

#### Oldaltérkép

Az oldaltérkép a fejléc alatti tartalomra vonatkozik.

##### Vendégeknek

- Főoldal: adathalmaz bejegyzések böngészése és keresése
- -> Adathalmaz bejegyzés megtekintése oldal
- Regisztrációs oldal

##### Felhasználóknak

- Főoldal: adathalmaz bejegyzések böngészése
- -> Adathalmaz bejegyzés megtekintése és értékelése oldal; saját bejegyzés és értékelés esetén azt törölni is itt lehet
- -> Adathalmaz hozzáadása oldal
- -> Adathalmaz szerkesztése oldal
- Profil megtekintése és szerkesztése oldal

##### Adminisztrátoroknak

- Főoldal: adathalmaz bejegyzések böngészése és keresése
- -> Adathalmaz bejegyzés megtekintése és értékelése oldal; törölni a bejegyzést vagy az egyes értékeléseket is itt lehet
- -> Adathalmaz hozzáadása oldal
- -> Adathalmaz szerkesztése oldal
- Profil megtekintése és szerkesztése oldal
- Felhasználók böngészése és kitiltása oldal

#### Felugró ablakok

Felugró ablakokban lesz:
- a bejelentkezés,
- az értékelés adatainak kitöltése,
- az összes megerősítő kérdés (*Tényleg kitörlöd ezt a bejegyzést?*, stb).

#### Oldalvázlatok

##### Főoldal

![Főoldal](docs/images/main.jpg)

##### Adathalmaz bejegyzés megtekintése és értékelése

![Adathalmaz bejegyzés megtekintése és értékelése oldal](docs/images/details.jpg)

##### Adathalmaz hozzáadása vagy szerkesztése

![Adathalmaz hozzáadása vagy szerkesztése](docs/images/create-or-edit.jpg)

##### Regisztrációs

![Regisztrációs](docs/images/sign-up.jpg)

##### Profil megtekintése és szerkesztése

![Profil megtekintése és szerkesztése](docs/images/profile.jpg)

##### Felhasználók böngészése és kitiltása

![Felhasználók böngészése és kitiltása](docs/images/users.jpg)

#### Végpontok

- `GET /`: főoldal

##### Felhasználó

- `GET	/signup`: regisztrációs oldal
- `POST	/signup`: regisztrációs adatok beküldése
- `POST	/login`: bejelentkezési adatok beküldése
- `GET	/logout`: kijelentkezési szándék beküldése
- `GET	/profile`: profil megtekintése és szerkesztése oldal
- `POST	/profile`: szerkesztett profil adatok beküldése

##### Admin

- `GET	/manage/users`: felhasználók böngészése és kitiltása oldal
- `POST	/manage/users`: felhasználó törlése szándék beküldése

##### Adathalmaz

- `GET	/dataset/add`: bejegyzés létrehozása oldal
- `POST	/dataset/add`: bejegyzés létrehozásához szükséges adatok beküldése
- `GET	/dataset/:id/show`: adathalmaz bejegyzés megtekintése oldal
- `GET	/dataset/:id/modify`: bejegyzés szerkesztése oldal
- `POST	/dataset/:id/modify`: szerkesztett bejegyzési adatok beküldése
- `GET	/dataset/:id/delete`: bejegyzés törlése szándék beküldése
- `POST	/dataset/:id/review/add`: értékelés adatainak beküldése
- `GET	/dataset/:id/review/:review_id/delete`: értékelés törlése szándék beküldése

#### Dinamikus működés

![Dinamikus működés 1](docs/images/dynamic-1.png)
![Dinamikus működés 2](docs/images/dynamic-2.png)

### Entitások

( Az implementáció során kiderült, hogy az AdonisJs-ben könnyű kezelni minden táblánál egy `created_at` és egy `updated_at` mezőt. A lenti két ábrán a `date` helyett ezekre kell gondolni. )

#### Adatmodell

![Adatmodell](docs/images/data-modell.png)

#### Adatbázismodell

![Adatbázismodell](docs/images/database-modell.png)

## Implementáció

A szerveroldal **Node.js** alapon működik és az **AdonisJs** MVC framework segítségével épül fel.

### Könyvtárstruktúra

Az alkalmazást a repository **webapp** könyvtárában találod meg. A könyvtárstruktúrát az AdonisJs definiálta, amiről [itt](http://www.adonisjs.com/docs/3.1/directory-structure) olvashatsz.

### Fejlesztői környezet

Bármilyen szövegszerkesztő használható a fejlesztéshez. Én [Atom](https://atom.io/)-ot használtam.

## Tesztelés (funkcionális)

Az alkalmazáshoz csak funkcionális tesztek készültek.

Ezek a tesztek a [Selenium IDE](http://www.seleniumhq.org/projects/ide/) segítségével készültek el. Telepíteni egy firefox plugin-ként lehet, [innen](https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/). Elindítani a *Developer* menüből lehet.

A tesztek a `/test/functional/selenium` mappában találhatóak. Ezek megnyitásához először be kell tölteni a test suite-ot: `File / Open Test Suite...` és a `/test/functional/selenium/opendata.html`-t kell kiválasztani. A toolbar-on megtalálható *Base URL*-hez a következőt kell beírni: http://zsmester.ddns.net:8080/. Ezután el kell navigálni erre az oldalra a firefoxban, majd a Selenium IDE-ben az `Actions / Play entire test suite`-el lehet indítani a teszteket.

### Tesztesetek

A következő funkcionális tesztesetekre kell tesztet csinálni, helyes és helytelen adatokkal is. Demonstráció céljából most csak 5 készült el.

- Regisztráció (kész)
- Bejelentkezés (kész)
- Profil megtekintése
- Profil módosítás
- Kijelentkezés (kész)
- Felhasználók listázása
- Felhasználók kitiltása
- Adathalmaz hozzáadása (kész)
- Adathalmaz és a hozzá tartozó értékelések megtekintése (kész)
- Adathalmaz módosítása
- Adathalmaz törlése (kész)
- Értékelés hozzáadása
- Értékelés módosítása
- Értékelés törlése

## Felhasználói dokumentáció

### Követelmények

- Operációs rendszernek Linux ajánlott, de az alkalmázás képes elfutni bármilyen Unix vagy Windows alapú rendszeren.
- Az OS hardveres követelményénél erősebb hardveret nem igényel.
- Az alábbi szoftverek megléte kötelező. A verzók ajánlottak, más verzókkal is működhet az alkalmazás.
	- git --version
	git version 2.7.4
	- npm --version
	3.5.2
	- node --version
	v4.2.6
	- firefox --version
	Mozilla Firefox 50.1.0

### Letöltés

A https://github.com/zsoltmester/opendata oldalról lehet a forrást letölteni zip-ként, vagy a repository-t clone-ozni: `git clone git@github.com:zsoltmester/opendata.git`. A `master` branchen mindig a legfrissebb release található meg.

### Telepítés (Linux rendszeren)

A gyökérkönyvtárban kell az alábbiakat végrehajtani.

1. A dependált npm modulok letöltése: `npm install`.
2. A `.env.example` alapján hozz létre egy `.env` fájlt rootban.
3. Az adatbázis létrehozása: `./ace migration:run`.
4. Az adatbázis inicializálása: `./ace db:seed`.

### Elindítás

Az alkalmazás indítása: `npm start`. Fejlesztéshez ajánlott az `npm run dev`.

### Használat

1. Böngészőben nyissuk meg a főoldalt.
2. Regisztráljunk felhasználónév, email és jelsző megadásával.
3. Jelentkezzünk be az előbb megadott felhasználónévvel és jelszóval.

Ezután a következő funkciókra leszünk jogosultak:

- Az adathalmazok böngészése.
- Egy adathalmaz és a hozzá tartozó értékelések megtekintése.
- Új adathalmaz hozzáadása.
- Saját magunk által hozzáadott adathalmazok szerkesztése és törlése.
- Bármely adahalmaz értékelése, ennek módosítása és törlése.

## Lehetséges fejlesztések

- A jelszót kétszer bekérni regisztrálásnál és jelszó változtatásnál.
- Profil módosítánál a jelenlegi jelszó bekérése.
- Review előtöltése, ha már van.
- A rate automatikusan frissüljön.
- Ha nem található az adott ID: response.notFound(msg).
- Rendezve küldje le a szerver a listákat.
- A validáció fejlesztése (trim, character whitelist, stb).
- About page hazzáadása.

## Ismert hibák

- A delete dataset funkcióhoz a confirmation nem jelenik meg minden esetben elsőre.

## Irodalomjegyzék

- http://webprogramozas.inf.elte.hu/alkfejl.php
- http://www.adonisjs.com/docs/3.1
- http://knexjs.org/
- http://chancejs.com/
- http://jquery.com/
- https://bootswatch.com/sandstone/
- http://1000hz.github.io/bootstrap-validator/
- http://www.guru99.com/first-selenium-test-script.html
