function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const game = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      result: null,
      logMessages: [],
    };
  },
  computed: {
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    canUseSpecialAttack() {
      // 回傳目前回合是否能使用特殊攻擊( 3回合1次)
      return this.currentRound % 3 !== 0 && this.currentRound !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.result = 'draw';
      } else if (value <= 0) {
        // Player lost
        this.result = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.result = 'draw';
      } else if (value <= 0) {
        // Monster lost
        this.result = 'player';
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.result = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      // 隨機產生 5 - 12 的數字
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      // 把資料加到 logMessage array (object)
      this.addLogMessage('player', 'attack', attackValue);
      // 怪物被攻擊之後回擊
      this.attackPlayer();
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      //   檢查玩家血量加上回復量是否大於100
      if (this.playerHealth + healValue > 100) {
        // 若為真，玩家血量設定為100
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.result = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
game.mount('#game');
