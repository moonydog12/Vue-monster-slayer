# Vue-monster-slayer
A hand-holding project that helps student learn the basic of Vue.js
[Live Demo](https://moonydog12.github.io/Vue-monster-slayer/)
### Directives we practice in the project 
* **v-bind** to bind attribute in HTML element
* **v-on** to add event listener on HTML element
* **v-if**、**v-else-if**、**v-else** to conditional render DOM
* **v-for** to render repetitive element

### Options we use in js file
* **data**
Store play、monster data、current round number to track status change
& record the result of final winner
& logMessages as an array to print something on the screen
* **computed**
    * playerBarStyle & monsterBarStyle : use inline CSS to change bar width when data change
    * canUseSpecialAttack : track current round to toggle special attack
* **watch**
watch playerHealth & monsterHealth to change result variable
* **methods**
    * startGame : to restart the game
    * attackMonster: attck monster and unshift the value to array
    * specialAttackMonster: Same as above, but add round counter by 1
    * attackPlayer: same as attackMonster
    * healPlayer: add value to playerHealthBar but add round counter by 1
    * surrender: immediately lose the game
    * addLogMessage: unshift data in object format to logMessage array 
