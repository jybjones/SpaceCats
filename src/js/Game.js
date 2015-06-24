var SpaceCats = SpaceCats || {};
SpaceCats.Game = function(){
  this.player
  this.totalBunnies;
  this.bunnyGroup;
  this.totalSpacerocks;
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
    this.totalBunnies = 20;
    this.totalSpacerocks = 13;
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


    // this.game.world.setBounds(0, 0, 1920, 1920);
    // this.buildBunnies();
    // this.buildSpaceRocks();
        // this.buildEmitter();
    // this.countdown = this.add.bitmapText(10,10,'source here', 'Bunnies Left ' + this.totalBunnies, 20);
  },
    setupPlayer: function() {
      this.player = this.add.sprite(600, 400, 'player');
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
      this.catTrail = this.add.emitter(this.player.x, this.player.y, + 50, 400);
      this.catTrail.width =10;
      this.catTrail.makeParticles('sparklebutt');
      this.catTrail.setXSpeed(20, -20);
      this.catTrail.setYSpeed(100, 90);
      this.catTrail.setRotation(125, -125);
    // catTrail.setAlpha(1, 0.01, 800);
      this.catTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
      this.catTrail.start(false, 5000, 10);
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
        // this.player.body.acceleration.x = 0;
        // if(this.game.input.activePointer.justPressed()) {
      //move on the direction of the input
    //   this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    //   // this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    if (this.game.input.x < this.game.width -20 &&
        this.game.input.x > 20 &&
        this.game.input.y > 20 &&
        this.game.input.y < this.game.height - 20) {
        var minDist = 200;
        var dist = this.game.input.x - this.player.x;
        this.player.body.velocity.x = this.maxSpeed * this.game.math.clamp(dist / minDist, -1, 1);
    }
    // Squish and rotate ship for illusion of "banking"
      this.bank = this.player.body.velocity.x / this.maxSpeed;
       this.player.scale.x = 1 - Math.abs(this.bank) / 3;
        this.player.angle = this.bank * 70;
         ////higher the number the more he can turn
             ////keep the trail lined up with the butt
          this.catTrail.x = this.player.x;
        }
    }

    // stop at the screen edges//
    // if (this.player.x > this.game.width -50) {
    //   this.player.x = this.game.width -50;
    //   this.player.body.acceleration.x = 0;
    // }
    // if (this.player.x < 50) {
    //   this.player.x = 50;
    //   this.player.body.acceleration.x = 0;
    // }
     // Move player towards mouse pointer



    // buildBunnies: function() {
    //     this.bunnygroup = this.add.group();
    //     this.bunnygroup.enableBody = true;
    //     for(var i=0; i<this.totalBunnies; i++) {
    //         var b = this.bunnygroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'bunny', 'Bunny0000');
    //         b.anchor.setTo(0.5, 0.5);
    //         b.body.moves = false;
    //         b.animations.add('Rest', this.game.math.numberArray(1,58));
    //         b.animations.add('Walk', this.game.math.numberArray(68,107));
    //         b.animations.play('Rest', 24, true);
    //         this.assignBunnyMovement(b);
    //     }
    // },
    //   assignBunnyMovement: function(b) {
    //     var bposition = Math.floor(this.rnd.realInRange(50, this.world.width-50));
    //     var bdelay = this.rnd.integerInRange(2000, 6000); ///random times they move
    //     if(bposition < b.x){
    //         b.scale.x = 1;
    //     }else{
    //         b.scale.x = -1;
    //     }
    //     var t = this.add.tween(b).to({x:bposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay);
    //     t.onStart.add(this.startBunny, this);
    //     t.onComplete.add(this.stopBunny, this);
    // },

    //   startBunny: function(b) {
    //     b.animations.stop('Rest');
    //     b.animations.play('Walk', 24, true);
    // },

    //   stopBunny: function(b) {
    //     b.animations.stop('Walk');
    //     b.animations.play('Rest', 24, true);
    //     this.assignBunnyMovement(b);
    // },
    //  buildSpaceRocks: function() {
    //     this.spacerockgroup = this.add.group(); //new group
    //     for(var i=0; i<this.totalSpacerocks; i++) {
    //         var r = this.spacerockgroup.create(this.rnd.integerInRange(0,
    //             this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000');
    //         var scale = this.rnd.realInRange(0.3, 1.0);
    //         r.scale.x = scale;/////random sizes
    //         r.scale.y = scale;
    //         this.physics.enable(r, Phaser.Physics.ARCADE);
    //         r.enableBody = true;
    //         r.body.velocity.y = this.rnd.integerInRange(200, 400);
    //         r.animations.add('Fall');
    //         r.animations.play('Fall', 24, true);
    //         r.checkWorldBounds = true;
    //         r.events.onOutOfBounds.add(this.resetRock, this);
    //     }
    // },
    //  resetRock: function(r) {
    //   if(r.y > this.world.height) {
    //     this.respawnRock(r);
    //   }
    //  },
    //   respawnRock: function(r) {
    //     if(this.gameover == false) {
    //       r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
    //       r.body.velocity.y = this.rnd.integerInRange(200, 400);
    //       }
    //   },
    //   buildEmitter:function() {
    //     this.burst = this.add.emitter(0, 0, 80); //80 is the amount of particles being built
    //     this.burst.minParticleScale = 0.3;
    //     this.burst.maxParticleScale = 1.2;
    //     this.burst.minParticleSpeed.setTo(-30, 30);
    //     this.burst.maxParticleSpeed.setTo(30, -30);
    //     this.burst.makeParticles('explosion');
    //     this.input.onDown.add(this.fireBurst, this); //this is the input itself
    // },

    //   fireBurst: function(pointer) { //pointer is the input
    //     if(this.gameover == false) {
    //       this.burst.emitX = pointer.x;
    //       this.burst.emitY = pointer.y;
    //       this.burst.start(true, 2000, null, 20);
    //       ///true: explosion at once, 2000 is lifespan of each particle, null is for frequency, 20 is the amount of particles at a time
    //     }
    // },
    //    burstCollision: function(r, b) {
    //     this.respawnRock(r);
    // },
    //     bunnyCollision: function(r, b) {
    //       if(b.exists) {
    //         this.respawnRock(r);
    //         b.kill(); //remove the bunny if hit
    //         this.totalBunnies--; //decrement the bunny count
    //         this.checkBunniesLeft();
    //       }
    //     },

    //     checkBunniesLeft: function() {
    //       if(this.totalBunnies <= 0) {
    //         this.gameover = true;
    //         // this.countdown.setText('Bunnies Left 0');
    //       } else {
    //         // this.countdown.setText('Bunies Left ' + this.totalBunnies);
    //       }
    //     },

    //     // friendlyFire: function(b, e) {
    //     //   if(b.exists) {
    //     //     b.kill();
    //     //       this.totalBunnies--;
    //     //       this.checkBunniesLeft();
    //     //   }
    //     // },


    // update: function() {
    //     // this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
    //     // this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
    //     // this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);

    // }
