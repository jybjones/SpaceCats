var gameOverState = {

  create : function() {
    console.log('Game Over State');
    this.background = game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.background.autoScroll(-60, -20);

    var style = { font: '74px Arial', fill: '#fff', align: 'center'};
      this.gameOverText = this.game.add.text(400, 300,"GAME OVER, PLAY AGAIN!!!!",style);

    // transition to the main menu screen after 2 seconds
    game.time.events.add(Phaser.Timer.SECOND * 2, this.transition, this);
  },
  transition : function() {
    // show menu screen
    this.game.state.start('MainMenu');
  }
};

