# ![alt text](https://github.com/JamesMernin/PACE/blob/master/Images/pokeball.png "Pokeball")Pokemon Attack: Calculate Effectiveness "PACE" ![alt text](https://github.com/JamesMernin/PACE/blob/master/Images/pokeball.png "Pokeball")

---

## App Description:
PACE stands for **P**okemon **A**ttack: **C**alculate **E**ffectiveness. The goal is to make it the definitive calculator for attack effectiveness. The app will take information about a Pokemon attacking another Pokemon and give back how effective the move would be by means of a multiplier.

---

## API:
The only API I will need for this project is the Pokemon API linked below:
[https://pokeapi.co/](https://pokeapi.co/)

---

## API Snippet:
Below is an example of an API call for information on my favorite Pokemon, Charizard, and a snippet of the returned information for its two types, which will be important for this project.
[https://pokeapi.co/api/v2/pokemon/charizard/](https://pokeapi.co/api/v2/pokemon/charizard/)
```json
"types": [
        {
            "slot": 1,
            "type": {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "flying",
                "url": "https://pokeapi.co/api/v2/type/3/"
            }
        }
    ],
```

---

## Wireframe:
# ![alt text](https://github.com/JamesMernin/PACE/blob/master/Images/Wireframe.png "Wireframe")

---

## MVP:
The following would be the minimum features I would like to include:
  * A way to choose the Pokemon attacking
  * A way to choose the type of the attack
  * A way to choose the Pokemon defending
  * A result that shows the multiplier for the strength of the attack and flavor text (i.e. "It's super effective!" for moves that do double the normal damage)
  * Perhaps some graphics for the two Pokemon, their types, and the attack type. If these could look like how they appear in Pokemon battles in the main game, that would be amazing.
  * Found this font that might be nice to implement: [https://github.com/PascalPixel/pokemon-font](https://github.com/PascalPixel/pokemon-font)

---

## Post-MVP:
A way to include additional options that would effect the damage multiplier. Some of these would be:
  * A way to change the type of Pokemon that can type change (Ditto, Kecleon, Arceus are three examples that come to mind)
  * A way to include effects of moves that change the Pokemon type (i.e. a fire Pokemon that has used "Burn Up", a toggle to see if the Pokemon has been hit by moves that change type, like "Trick-or-Treat", etc.
  * A way to include effects of moves like Foresight and Odor Sleuth that allow Ghost types to be hit by Normal and Fighting moves
  * A lot of these special scenarios are covered here: [https://pokemondb.net/pokebase/243502/how-many-type-changing-moves-items-abilities-are-there](https://pokemondb.net/pokebase/243502/how-many-type-changing-moves-items-abilities-are-there)

---

## Goals:
  * On Monday, I want to have the attacking and defending Pokemon to be selectable and to display their types upon being chosen.
  * On Tuesday, I would like to be able to implement the logic to choose an attack type and calculate the effectiveness of a move.
  * Wednesday can be spent tidying up the graphics and UI.
  * I can start implementing additional secondary effects for the remainder of the week, but the definite goal would be to have something working on Wednesday. The rest is gravy.

---

## Priority Matrix:
# ![alt text](https://github.com/JamesMernin/PACE/blob/master/Images/Priority%20Matrix.png "Priority Matrix")

---

## Timeframes:
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| HTML Structure | M | 4hrs |  |  |
| CSS Styling | M | 6hrs |  |  |
| Choose Attacking and Defending Pokemon | H | 6hrs |  |  |
| Choose attacking move type | H | 2hrs |  |  |
| Process and display attack effectiveness | H | 4hrs |  |  |
| Testing and bug fixing | H | 6hrs |  |  |
| Setting up custom domain | H | 2hrs |  |  |
| Add additional effects from post MVP (optional) | L | 10hrs |  |  |
| Total | H | 40hrs |  |  |
