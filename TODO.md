# Planning

## Steps

- Modellek leírása diagramokkal: adat, adatbázis és állapot
- Dinamikus működés bemutatása szekvenciadiagramal

## Examples
- https://github.com/horvathgyozo/alkfejl_minta
- http://webprogramozas.inf.elte.hu/alkfejl/01/#/13
- http://webprogramozas.inf.elte.hu/alkfejl/04/#/8
- https://github.com/pessaai/ckd193-beadando

## Diagramok

- [use-case](http://www.nomnoml.com.s3-website-eu-west-1.amazonaws.com/#view/%5B%3Cactor%3EVend%C3%A9g%5D%20-%20%5B%3Cusecase%3EB%C3%B6ng%C3%A9sz%C3%A9s%5D%0A%5B%3Cactor%3EVend%C3%A9g%5D%20-%20%5B%3Cusecase%3EKeres%C3%A9s%5D%0A%5B%3Cactor%3EVend%C3%A9g%5D%20-%20%5B%3Cusecase%3ERegisztr%C3%A1ci%C3%B3%5D%0A%5B%3Cactor%3EVend%C3%A9g%5D%20-%20%5B%3Cusecase%3EBejelentkez%C3%A9s%5D%0A%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%3C%3A--%5BVend%C3%A9g%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3EKijelentkez%C3%A9s%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3EProfil%20megtekint%C3%A9se%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3EProfil%20szerkeszt%C3%A9se%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3E%C3%89rt%C3%A9kel%C3%A9s%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3EHozz%C3%A1d%C3%A1s%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3ESaj%C3%A1t%20szerkeszt%C3%A9se%5D%0A%5B%3Cactor%3EFelhaszn%C3%A1l%C3%B3%5D%20-%20%5B%3Cusecase%3ESaj%C3%A1t%20t%C3%B6rl%C3%A9se%5D%0A%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%3C%3A--%5BFelhaszn%C3%A1l%C3%B3%5D%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%20-%20%5B%3Cusecase%3EFelhaszn%C3%A1l%C3%B3%20kitilt%C3%A1sa%5D%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%20-%20%5B%3Cusecase%3EB%C3%A1rmely%20szerkeszt%C3%A9se%5D%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%20-%20%5B%3Cusecase%3EB%C3%A1rmely%20t%C3%B6rl%C3%A9se%5D%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%20-%20%5B%3Cusecase%3EB%C3%A1rmely%20%C3%A9rt%C3%A9kel%C3%A9s%20szerkeszt%C3%A9se%5D%0A%5B%3Cactor%3EAdminisztr%C3%A1tor%5D%20-%20%5B%3Cusecase%3EB%C3%A1rmely%20%C3%A9rt%C3%A9kel%C3%A9s%20t%C3%B6rl%C3%A9se%5D)
- [use-case-example](http://www.nomnoml.com.s3-website-eu-west-1.amazonaws.com/#view/%5B%3Cstart%3Estart%5D%20-%3E%20%5B%3Cchoice%3EBe%20van-e%20jelentkezve%3F%5D%0A%5BBe%20van-e%20jelentkezve%3F%5D%20igen%20-%3E%20%5B%3Cstate%3EKeres%C3%A9s%5D%20%0A%5BBe%20van-e%20jelentkezve%3F%5D%20nem%20-%3E%20%5B%3Cstate%3EBejelentkez%C3%A9s%5D%0A%5BBejelentkez%C3%A9s%5D%20-%3E%20%5BKeres%C3%A9s%5D%0A%5BKeres%C3%A9s%5D%20-%3E%20%5B%3Cstate%3EBejegyz%C3%A9s%20metekint%C3%A9se%5D%0A%5BBejegyz%C3%A9s%20metekint%C3%A9se%5D%20-%3E%20%5B%3Cchoice%3ESaj%C3%A1t%20bejegyz%C3%A9se%3F%5D%0A%5BSaj%C3%A1t%20bejegyz%C3%A9se%3F%5D%20nem%20-%3E%20%5BKeres%C3%A9s%5D%0A%5BSaj%C3%A1t%20bejegyz%C3%A9se%3F%5D%20igen%20-%3E%20%5B%3Cstate%3EBejegyz%C3%A9s%20szerkeszt%C3%A9se%5D%0A%5BBejegyz%C3%A9s%20szerkeszt%C3%A9se%5D%20-%3E%20%5B%3Cchoice%3EElmenti%20a%20v%C3%A1ltoz%C3%A1sokat%3F%5D%0A%5BElmenti%20a%20v%C3%A1ltoz%C3%A1sokat%3F%5D%20nem%20-%3E%20%5BKeres%C3%A9s%5D%0A%5BElmenti%20a%20v%C3%A1ltoz%C3%A1sokat%3F%5D%20igen%20-%3E%20%5B%3Cend%3Eend%5D)
