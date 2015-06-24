var SpaceCats = SpaceCats || {};
SpaceCats.Game = function(){
  this.player
  // this.totalSpacerocks;
  this.spacerockGroup;
  this.burst; ///explosition particles
  this.gameover;
  this.maxSpeed = 400;
  this.acceleration = 400;
  this.drag = 300;
  this.bank;
  this.catTrail;
  // this.countdown;
};


SpaceCats.Game.prototype = {
create: function() {
    this.gameover = false;
    // this.totalSpacerocks = 13;
    this.playerSpeed = 400;
    this.maxSpeed = 400;
    this.acceleration = 400;
    this.drag = 100;
    this.buildWorld();
  },

    buildWorld: function() {
      this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
      this.background.autoScroll(-60, -20);
      this.setupPlayer();
      this.buildTailEmitter();
      this.buildSpaceRocks();
      this.buildEmitter();
    // this.countdown = this.add.bitmapText(10,10,'source here', 'Bunnies Left ' + this.totalBunnies, 20);
  },
    setupPlayer: function() {
      this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.scale.setTo(1.5);
      this.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.speed = this.playerSpeed;
      this.player.maxSpeed = this.maxSpeed;
      this.player.acceleration = this.acceleration;
      this.player.drag = this.drag;
      this.player.body.collideWorldBounds = true;
      this.input.onDown.add(this.cursors, this);
  },
  // emitter for catbutt sparkletbutt
    buildTailEmitter:function() {
      this.catTrail = this.add.emitter(this.player.x, this.player.y);
      this.catTrail.width =10;
      this.catTrail.makeParticles('sparklebutt');
      this.catTrail.setXSpeed(220, -20);
      this.catTrail.setYSpeed(100, 90);
      this.catTrail.setRotation(125, -125);
      // this.catTrail.setAlpha(1, 0.01, 800);
      this.catTrail.setScale(0.5, 0.8, 0.5, 0.8, Phaser.Easing.Quintic.Out);
      this.catTrail.start(false, 1000, 10);
        },
      cursors: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        // Reset the player, then check for movement keys
        this.player.body.acceleration.x = 0;
     if (this.cursors.left.isDown)
    {
        this.player.body.acceleration.x = -this.player.acceleration;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.acceleration.x = ACCELERATION;
    }
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    if (this.game.input.x < this.game.width -20 &&
        this.game.input.x > 20 &&
        this.game.input.y > 20 &&
        this.game.input.y < this.game.height - 20) {
        var minDist = 200;
        var dist = this.game.input.x - this.player.x;
        this.player.body.velocity.x = this.maxSpeed * this.game.math.clamp(dist / minDist, -1, 1);
    }
    //rotate ship for illusion of "banking"
      this.bank = this.player.body.velocity.x / this.maxSpeed;
       this.player.scale.x = 1 - Math.abs(this.bank) / 3;
        this.player.angle = this.bank * 100;
         ////higher the number the more he can turn
             ////keep the trail lined up with the butt
          this.catTrail.x = this.player.x;
        }
      };

