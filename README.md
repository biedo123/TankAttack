# Typescript startproject

Dit is het project van Jeroen Monster voor PRG01-8. 

## Het project

- De **docs** map bevat de client side:html en css. De js file wordt hier automatisch in gezet door de compiler.
- De **dev** map bevat de typescript files.

## Compileren
- Druk op CONTROL+SHIFT+B en kies voor `watch mode`. Je `.ts` files worden nu samengevoegd in `main.js`.
- tsconfig.json bevat instellingen voor het compileren.

## Bekijken
Open index.html in `localhost`

##Inleverdocument prg01-8

##inleiding
De speler bevindt zich in de woestijn. Van alle kanten komen vijandige tanks aan. 
Hou zo lang mogelijk stand:

 [w] = omhoog
 [a] = links
 [s] = beneden
 [d] = rechts
 [spatie] = schiet!


##speelbare game:
Het spel is te spelen op http://jeroenmonster.nl/TankAttack/docs/

##Klassendiagram

het klassendiagram is in de hoofdmap te vinden, onder TankAttack-diagram.pdf

##singleton
De singelton heb ik binnen Game toegepast. Hier mag maar maximaal 1 van runnen

##polymorphisme:
er zijn 2 factory patterns aanwezig. met dank aan deze patterns kan ik meerdere 
factory's aanmaken die weer verschillende producten (tanks/bullets) aanmaken met ieder
hun eigen gegevens. Het fijne hieraan is dat er snel variaties gemaakt kunnen worden,
als er nieuwe tanks bij komen of nieuwe soorten kogels. 

daarnaast maken tanks en bullets ook gebruik van over-erving van gameobject. 
tank, playertank en bullet hebben allen een locatie, hitbox etc. deze passen
prima in gameobject. Op deze manier kan er snel weer iets nieuws aangemaakt
worden zonder de basis-code weer opnieuw te typen.

##strategy

Ik heb het strategy pattern gebruikt bij Tank. Het idee was dat er 2 veschillenden
standen waren waarin de enemy's konden zijn. De eerste zou kalm zijn en de 2e wat 
agresiever. Het gedrag wordt aan het aanmaken van de tank willekeurig gekozen. 
Als een non-agresieve tank geraakt wordt, zal deze agresief worden.

##Ovserver
Ik heb de ovserver pattern gebruikt om informatie van playertank en game door te geven
aan UserInterface. De userinterface moet kennis hebben van de staat van de speler en 
het level, om zo de juiste informatie te kunnen weergeven.

##gameplay elementen

- bots met ai:
de enemy tanks komen langzaam op de speler af. ze draaien richting de speler en vuren
bullets af richting de speler. als de speler een non-agresieve tank raakt wordt deze
agresief

- levels:
level 1 heeft 1 tank, level 2 heeft 2 tanks, etc etc. 

- interactief geluid: 
het afvueren van een kogel geeft geluid, het raken van iets met een kogel ook.

- visueel aantrekkelijk:
het heeft een simpele look, maar consisten. 