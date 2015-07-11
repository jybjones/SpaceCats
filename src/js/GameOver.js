var gameOverState = {

  create : function() {
    console.log('Game Over State');
    this.background = game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.background.autoScroll(-60, -20);

    this.gameOverText = this.add.text( game.world.centerX, game.world.centerY,
    ' GAME OVER  ' + 'PLAY AGAIN!!!!',
    { font: "50px Arial", fill: "#ff0044", align: "center" });
    this.gameOverText.anchor.setTo(0.5, 0.5);
    // transition to the main menu screen after 2 seconds
    game.time.events.add(Phaser.Timer.SECOND * 3, this.transition, this);
  },
  transition : function() {
    this.game.state.start('MainMenu');
  }
};

