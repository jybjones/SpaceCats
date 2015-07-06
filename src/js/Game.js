var gameState = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.background.autoScroll(-60, -20);
    this.setupPlayer();
    this.player;
    this.enemy;
    this.catTrail;
    this.setupButtons();
    this.setupLazers();
    this.setupEnemies();
    this.setupExplosions();
    // this.setupScore();
    this.score = 0;
    this.lives = 9;
    this.scoreString = '';
    this.scoreText;
    this.PlayerAlive = true;
    game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnEnemy, this);
        game.physics.startSystem(Phaser.Physics.ARCADE);
    ///////Phaser Properties/////////////
    this.game;      // a reference to the currently running game
    this.add;       // used to add sprites, text, groups, etc
    this.camera;    // a reference to the game camera
    this.cache;     // the game cache
    this.input;     // the global input manager (you can access this.input.keyboard,
                  //   this.input.mouse, as well from it)
    this.load;      // for preloading assets
    this.math;      // lots of useful common math operations
    this.sound;     // the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     // the game stage
    this.time;      // the clock
    this.tweens;    //  the tween manager
    this.state;     // the state manager
    this.world;     // the game world
    this.particles; // the particle manager
    this.physics;   // the physics manager
    this.rnd;       // the repeatable random number generator

    this.instructions = this.add.text( 400, 500,
      'Use mouse to Move, Press Spacebar to Fire\n' +
      'Good Luck',
      { font: '20px monospace', fill: '#fff', align: 'center' });
      this.instructions.anchor.setTo(0.5, 0.5);
      this.instExpire = this.time.now + 10000;

      var style = { font: '34px Arial', fill: '#fff'};
      this.scoreText = this.game.add.text(10,10,"Score : "+this.score,style);
      this.livesText = this.game.add.text(game.world.width - 300, 10,"Lives : "+this.lives,style);

    //  Text
      var stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = false;
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

      //check for player commands
        if( this.cursors.left.isDown ) {
            if( this.player.angle > (-90) )
                this.player.angle -= 0.5;
        }
        else if( this.cursors.right.isDown ){
            if( this.player.angle < 90 )
                this.player.angle += 0.5;
        }

        ////////LAZERS////////////
    // this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);

    // if (this.game.input.activePointer.isDown)
    // {
    //     fire();
    // }
      if(this.fireButton.isDown) {
        this.fireLazers();
        }

    game.physics.arcade.overlap( this.lazers, this.enemies, this.lazerHitsEnemy, null, this);
    // this.game.physics.arcade.overlap( this.lazers, null, this);
      this.game.physics.arcade.collide(this.enemies, this.player, this.enemyHitPlayer,null, this);
      this.game.physics.arcade.collide(this.enemies, this.lazers, this.lazerHitsEnemy,null, this);
        if (this.instructions.exists && this.time.now > this.instExpire) {
        this.instructions.destroy();
        }
    },

      lazerHitsEnemy : function(lazer, enemy) {
        //  When a lzaer hits an enemy we kill them both
      if(this.enemies.getIndex(enemy) > -1)
        this.enemies.remove(enemy);
      enemy.kill();
      lazer.kill();
      this.score += 10;
      this.scoreText.setText("Score : "+this.score);
        //  And create an explosion
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('boom', 30, false, true);
      },

    enemyHitPlayer : function(player, enemy){
      if(this.enemies.getIndex(enemy) > -1)
        this.enemies.remove(enemy);
        enemy.kill();
        this.lives -= 1;
        this.livesText.setText("Lives : "+this.lives);
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('boom', 30, false, true);
        game.physics.arcade.overlap(this.player, this.enemies, this.enemyHitPlayer, null, this);

      if(this.lives < 0)
        this.game.state.start('MainMenu');
    },

   fireLazers : function() {
        if( this.lazerTime == null )
            this.lazerTime = this.game.time.now;

        //  To avoid them being allowed to fire too fast we set a time limit
        if ( this.game.time.now > this.lazerTime )
        {
            //  Grab the first bullet we can from the pool
            var lazer = this.lazers.getFirstExists(false);
            if (lazer) {
                //  And fire it
                lazer.reset( this.player.x, this.player.y );
                this.player.angle = this.player.angle;
                lazer.body.velocity.y = Math.cos( this.player.angle * (Math.PI/180) ) * (-400);
                lazer.body.velocity.x = Math.sin( this.player.angle * (Math.PI/180) ) * 400;
                this.lazerTime = this.game.time.now + 300;
            }
        }
       },
        spawnEnemy: function() {
          var enemy = this.enemies.getFirstExists(false);
          var MIN_ENEMY_SPACING = 200;
          var MAX_ENEMY_SPACING = 3000;
          var ENEMY_SPEED = 200;
         //  if( enemy ) {
         //    enemy.reset( Math.random() * game.world.width, 0 ); //set enemy to emerge from top border
         //    enemy.body.velocity.y = 10; //downward velocity
         // }
         if (enemy) {
        enemy.reset(game.rnd.integerInRange(0, game.width), -20);
        enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
        enemy.body.velocity.y = ENEMY_SPEED;
        enemy.body.drag.x = 100;
        // enemy.body.velocity.y = this.rnd.integerInRange(30, 60);
        // enemy.play('fly');

        enemy.update = function(){
          enemy.angle = 20 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
          //  Kill enemies once they go off screen
          if (enemy.y > game.height + 200) {
            enemy.kill();
          }
        }
    }
  },
//     //  Send another enemy soon
//     game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchGreenEnemy);
// }
  //     setupScore: function() {
  //       var score = 0;
  //       var scoreString = '';
  //       var scoreText;
  //       var lives;
  //       var stateText;
  //       //  The score
  //     scoreString = 'Score : ';
  //    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
  //   //  Lives
  //   lives = game.add.group();
  //   game.add.text(game.world.width - 300, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

  //   //  Text
  //   stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
  //   stateText.anchor.setTo(0.5, 0.5);
  //   stateText.visible = false;

  //   for (var i = 0; i < 3; i++)
  //   {
  //       var player = lives.create(game.world.width - 160 + (60 * i), 45, 'player');
  //       player.scale.x = 0.2;
  //       player.scale.y = 0.2;
  //       player.anchor.setTo(0.5, 0.5);
  // //      ship.angle = 90;
  //       player.alpha = 0.6;
  //   }
  // },

      setupExplosions: function() {
        this.explosions = game.add.group();
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(30, 'explode');

        this.explosions.forEach( function(explosion ) {
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;
            explosion.animations.add('boom');
        }, this );

      },
      setupButtons: function() {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      },
      setupLazers: function() {
        this.lazers = this.game.add.group();
        this.lazers.enableBody = true;
        this.lazers.physicsBodyType = Phaser.Physics.ARCADE;
        this.lazers.createMultiple(30, 'lazers');
        this.lazers.setAll('anchor.x', 0.5);
        this.lazers.setAll('anchor.y', 1.0);
        this.lazers.setAll('outOfBoundsKill', true);
        this.lazers.setAll('checkWorldBounds', true);

      },
      setupEnemies: function() {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.scale.setTo(1.5);
        this.enemies.createMultiple(30, 'enemy');
        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        this.enemies.setAll('outOfBoundsKill', true);
        this.enemies.setAll('checkWorldBounds', true);
        this.enemies.callAll('animations.add', 'animations', 'fly10', [0,1,2,3,4,5,6,7,8,8,8, 9], 6, true);
        // this.enemies.callAll('animations.add', 'animations', 'fly10', [14,15,16,17,18, 20, 21,22,23], 4, true);

        this.enemies.callAll('play', null, 'fly10');

        this.nextEnemyAt = 0;
        this.enemyDelay = 1000;

      },

    //////////PLAYER!!!!///////
      setupPlayer: function() {
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.set(0.5);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.allowRotation = false;
        this.PlayerAlive = true;
        this.catTrail = game.add.emitter(this.player.x, this.player.y + 50, 40);

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
      },
};


    // this.totalBunnies = 20;
    // this.totalSpacerocks = 13;

    // this.countdown = this.add.bitmapText(10,10,'source here', 'Bunnies Left ' + this.totalBunnies, 20);


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
