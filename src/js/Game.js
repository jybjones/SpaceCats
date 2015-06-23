var SpaceCats = SpaceCats || {};
SpaceCats.Game = function(){};

SpaceCats.Game.prototype = {
  create: function() {
    //set world dimenstions here:
    this.game.world.setBounds(0, 0, 1920, 1920);
    ///background:
    this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    ///create player:
    this.player = this.game.add.sprite(650, 600, 'ship');
    // this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.player.scale.setTo(1.5);
    this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
    this.player.animations.play('fly');

     //player initial score of zero
    this.playerScore = 0;

    //enable player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    this.player.body.collideWorldBounds = true;
  },
  update: function() {
  },
};
