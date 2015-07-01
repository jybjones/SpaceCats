
// var  player, lazer, lazerBall, lazerTimer,  catTrail, fireButton;

SpaceCats.Game = function (game) {}
var SpaceCats = SpaceCats || {};
SpaceCats.Game = function(game){
  this.player;
  this.lazerBall;
  this.fireRate = 100;
  this.nextFire = 0;
  this.burst; ///explosition particles
  this.gameover;
  // this.bank;
  this.catTrail;
  this.game;
  // this.countdown;
  // this.totalBunnies;
  // this.bunnyGroup;
  this.totalSpacerocks;
  this.spacerockGroup;
  // this.burst; ///explosition particles
  this.gameover;
  this.fireButton;
  this.lazerTimer = 0;
};


SpaceCats.Game.prototype = {
create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.background.autoScroll(-60, -20);
    // this.physics.arcade.gravity.y = 150;

    //////////PLAYER!!!!///////

      this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
      this.player.anchor.set(0.5);
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.allowRotation = false;
      this.catTrail = SpaceCats.game.add.emitter(this.player.x, this.player.y + 50, 40);

      this.player.addChild(this.catTrail);
      this.catTrail.start(false, 2000, 100);
      this.catTrail.y = 0;
      this.catTrail.x = 0;
      this.catTrail.width =10;
      this.catTrail.makeParticles('sparklebutt');
      this.catTrail.setXSpeed(20, -20);
      this.catTrail.setYSpeed(100, 90);
      this.catTrail.setRotation(125, -125);
      this.catTrail.setScale(0.15, 0.8, 0.15, 0.8, 2000, Phaser.Easing.Quintic.Out);

      this.lazerBall = this.add.group();
      this.lazerBall.enableBody = true;
      this.lazerBall.physicsBodyType = Phaser.Physics.ARCADE;
      this.lazerBall.createMultiple(50, 'lazerBall');
      this.lazerBall.setAll('checkWorldBounds', true);
      this.lazerBall.setAll('outOfBoundsKill', true);

      this.gameover = false;
      this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.totalBunnies = 20;
    // this.totalSpacerocks = 13;

    // this.countdown = this.add.bitmapText(10,10,'source here', 'Bunnies Left ' + this.totalBunnies, 20);
  },

update: function() {

    //  If the PLAYER is > 8px away from the pointer then let's move to it
    if (this.physics.arcade.distanceToPointer(this.player, this.game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        this.physics.arcade.moveToPointer(this.player, 400);
        this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        this.player.body.velocity.set(0);
        }
        ////////LAZERS////////////
    // this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);

    // if (this.game.input.activePointer.isDown)
    // {
    //     fire();
    // }
    if (this.fireButton.isDown || this.game.input.activePointer.isDown)
  {
    var fireRate = 100;
    var nextFire = 0;

    if (this.game.time.now > nextFire && this.lazerBall.countDead() > 0)

    {
        nextFire = this.game.time.now + fireRate;

        var lazer = this.lazerBall.getFirstDead();

        lazer.reset(this.player.x - 8, this.player.y - 8);

        this.game.physics.arcade.moveToPointer(lazer, 300);
    }
   }

}

};


//////////////FUNCTIONS HERE!! SpaceCats.game refer///////
//  function fireLazers () {
//   debugger
//   // var fireRate = 100;
//   //   var nextFire = 0;

//   //   if (this.game.time.now > nextFire && this.lazerBall.countDead() > 0)

//   //   {
//   //       nextFire = this.game.time.now + fireRate;

//   //       var lazer = this.lazerBall.getFirstDead();

//   //       lazer.reset(this.player.x - 8, this.player.y - 8);

//   //       this.game.physics.arcade.moveToPointer(lazer, 300);
//   //   }

// }

//    function fireLazers() {
//  debugger;
//     //  To avoid them being allowed to fire too fast we set a time limit
//     console.log('player')
//     if (SpaceCats.game.time.now > lazerTimer)

//     {
//         var LAZER_SPEED = 400;
//         var LAZER_SPACING = 250;
//         //  Grab the first lazer we can from the pool
//         // var lazer = lazerBall.getFirstExists(false);
//         var lazer = lazerBall

//         if (lazer)
//         {
//             //  And fire it
//             //  Make lazer come out of tip of ship with right angle
//             var lazerOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
//             lazer.reset(this.player.x + lazerOffset, this.player.y);
//             lazer.angle = this.player.angle;
//             this.game.physics.arcade.velocityFromAngle(lazer.angle - 90, LAZER_SPEED, lazer.body.velocity);
//             lazer.body.velocity.x += this.player.body.velocity.x;

//             lazerTimer = game.time.now + LAZER_SPACING;
//         }
//     }
// }

// };

    // update: function() {
    //     // this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
    //     // this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
    //     // this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);

    // },





  // buildPlayer: function() {
  //     this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
  //     this.player.anchor.setTo(0.5, 0.5);
  //     this.player.scale.setTo(2.5);
  //     this.physics.enable(this.player, Phaser.Physics.ARCADE);
  //     // this.player.speed = this.playerSpeed;
  //     this.player.maxSpeed = this.maxSpeed;
  //     this.player.acceleration = this.acceleration;
  //     // this.player.drag = this.drag;
  //     this.player.body.collideWorldBounds = true;
  //     this.input.onDown.add(this.cursors, this);

  // // emitter for catbutt sparkletbutt
  //     this.player.catTrail = this.add.emitter(this.player.x, this.player.y + 50, 400);
  //     this.player.catTrail.width =20;
  //     this.player.catTrail.makeParticles('sparklebutt');
  //     this.player.catTrail.setXSpeed(20, -20);
  //     this.player.catTrail.setYSpeed(100, 90);
  //     this.player.catTrail.setRotation(125, -125);
  //     this.player.catTrail.setScale(0.5, 0.8, 0.5, 0.8, Phaser.Easing.Quintic.Out);
  //     this.player.catTrail.start(false, 500, 10);
  //     this.player.catTrail.minParticleScale = .3;
  //     this.player.catTrail.minParticleScale = 1.2;
  //     this.player.catTrail.minParticleSpeed.setTo(-30,30);
  //     this.player.catTrail.maxParticleSpeed.setTo(30,-30);
  //       },
  // buildBunnies: function() {
   //      this.bunnygroup = this.add.group();
   //      this.bunnygroup.enableBody = true;
   //      for(var i=0; i<this.totalBunnies; i++) {
   //          var b = this.bunnygroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'bunny', 'Bunny0000');
   //          b.anchor.setTo(0.5, 0.5);
   //          b.body.moves = false;
   //          b.animations.add('Rest', this.game.math.numberArray(1,58));
   //          b.animations.add('Walk', this.game.math.numberArray(68,107));
   //          b.animations.play('Rest', 24, true);
   //          this.assignBunnyMovement(b);
   //      }
   //  },
   //  assignBunnyMovement: function(b) {
   //      var bposition = Math.floor(this.rnd.realInRange(50, this.world.width-50));
   //      var bdelay = this.rnd.integerInRange(2000, 6000); ///random times they move
   //      if(bposition < b.x){
   //          b.scale.x = 1;
   //      }else{
   //          b.scale.x = -1;
   //      }
   //      var t = this.add.tween(b).to({x:bposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay);
   //      t.onStart.add(this.startBunny, this);
   //      t.onComplete.add(this.stopBunny, this);
   //  },

   //    startBunny: function(b) {
   //      b.animations.stop('Rest');
   //      b.animations.play('Walk', 24, true);
   //  },
   //  stopBunny: function(b) {
   //      b.animations.stop('Walk');
   //      b.animations.play('Rest', 24, true);
   //      this.assignBunnyMovement(b);
   //  },

   //  buildSpaceRocks: function() {
   //      this.spacerockgroup = this.add.group(); //new group
   //      for(var i=0; i<this.totalSpacerocks; i++) {
   //          var r = this.spacerockgroup.create(this.rnd.integerInRange(0,
   //              this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000');
   //          var scale = this.rnd.realInRange(0.3, 1.0);
   //          r.scale.x = scale;/////random sizes
   //          r.scale.y = scale;
   //          this.physics.enable(r, Phaser.Physics.ARCADE);
   //          r.enableBody = true;
   //          r.body.velocity.y = this.rnd.integerInRange(200, 400);
   //          r.animations.add('Fall');
   //          r.animations.play('Fall', 24, true);
   //          r.checkWorldBounds = true;
   //          r.events.onOutOfBounds.add(this.resetRock, this);
   //      }
   //  },
   //  resetRock: function(r) {
   //    if(r.y > this.world.height) {
   //      this.respawnRock(r);
   //    }
   //   },
   //   respawnRock: function(r) {
   //      if(this.gameover === false) {
   //        r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
   //        r.body.velocity.y = this.rnd.integerInRange(200, 400);
   //        }
   //    },

   //     buildEmitter:function() {
   //      this.burst = this.add.emitter(0, 0, 80); //80 is the amount of particles being built
   //      this.burst.minParticleScale = 0.3;
   //      this.burst.maxParticleScale = 1;
   //      this.burst.minParticleSpeed.setTo(-30, 30);
   //      this.burst.maxParticleSpeed.setTo(30, -30);
   //      this.burst.makeParticles('explosion');
   //      this.input.onDown.add(this.fireBurst, this); //this is the input itself
   //  },
   //    fireBurst: function(pointer) { //pointer is the input
   //      if(this.gameover === false) {
   //        this.burst.emitX = pointer.x;
   //        this.burst.emitY = pointer.y;
   //        this.burst.start(true, 2000, null, 20);
   //        ///true: explosion at once, 2000 is lifespan of each particle, null is for frequency, 20 is the amount of particles at a time
   //      }
   //  },
   //    burstCollision: function(r, b) {
   //  this.respawnRock(r);
   //    },
   //  bunnyCollision: function(r, b) {
   //     if(b.exists) {
   //     this.respawnRock(r);
   //     b.kill(); //remove the bunny if hit
   //    // this.totalBunnies--; //decrement the bunny count
   //    //  this.checkBunniesLeft();
   //           }
   //     },
    // checkBunniesLeft: function() {
    //     if(this.totalBunnies <= 0){
    //         this.gameover = true;
    //         this.music.stop();
    //         this.countdown.setText('Bunnies Left 0');
    //         this.overmessage = this.add.bitmapText(this.world.centerX-180, this.world.centerY-40, 'eightbitwonder', 'GAME OVER\n\n' + this.secondsElapsed, 42);
    //         this.overmessage.align = "center";
    //         this.overmessage.inputEnabled = true;
    //         this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
    //     }else {
    //         this.countdown.setText('Bunnies Left ' + this.totalBunnies);
    //     }
    // },
