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
    this.fontStyle;

    this.score = 0;
    this.lives = 9;
    this.scoreString = '';
    this.scoreText;
    this.PlayerAlive = true;
    this.endTime = 0;

    this.music;
    this.ouch;
    this.boom;
    this.ding;

    // this.setupPlayerIcons();

    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnEnemy, this);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.advancedTiming = true;
    this.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 3, align: "center" };
    this.instructions = this.add.text( 400, 500,
      'Use mouse to Move, Press Spacebar to Fire\n' + 'Good Luck',
      { font: '28px Arial', fill: '#fff', align: 'center' });
      this.instructions.anchor.setTo(0.5, 0.5);
      this.instExpire = this.time.now + 10000;

      // var style = { font: '34px Arial', fill: '#fff'};
      this.scoreText = this.game.add.text(60,10,"Score : "+this.score,this.fontStyle);
      this.livesText = this.game.add.text(game.world.width - 200, 10,"Lives : "+this.lives,this.fontStyle);

    //  Text
      var stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = false;

 // set the end time to 30 seconds in the future
        this.endTime = game.time.now + (1000 * 50 );
        // every time the user clicks, add 5 seconds to the end time
        game.input.onDown.add(function() {
            this.endTime = this.endTime + (1000 * 5);
            console.log("Added 5 seconds");
        }, this);
      this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');

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
        this.player.body.velocity.set(0);
        }

      // //check for player commands
      //   if( this.cursors.left.isDown ) {
      //       if( this.player.angle > (-90) )
      //           this.player.angle -= 0.5;
      //   }
      //   else if( this.cursors.right.isDown ){
      //       if( this.player.angle < 90 )
      //           this.player.angle += 0.5;
      //   }
// get time remaining in miliseconds
        var style = { font: '34px Arial', align: 'center'};
        var timeLeft = this.endTime - game.time.now;
        if (timeLeft >= 0) {
            // show time remaining in seconds (divide by 1000)
            game.debug.text(Math.ceil(timeLeft / 1000) + " seconds left!", 500, 100, "#00ff00");
        }
        else {
            game.debug.text("Ran out of time!", 500, 100, "#ff0000");
             // this.music.stop();
            game.state.start('GameOver');
        }

        ////////LAZERS////////////
    // this.player.rotation = this.game.physics.arcade.angleToPointer(this.lazer);
      if(this.PlayerAlive && this.fireButton.isDown) {
        this.fireLazers();
        }
    //     if (game.time.now > firingTimer)
    // {
    //     enemyFires();
    // }
   //  function updateCounter() {
   //  this.total++;
   //  }
   //  function render() {
   // this. game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
   //  this.game.debug.text('Loop Count: ' + total, 32, 64);

   //  }

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
      this.boom.play();
      enemy.kill();
      lazer.kill();
      this.score += 10;
      this.scoreText.setText("Score : "+this.score);
        //  And create an explosion
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('boom', 30, false, true);
        // enemyBullets.callAll('kill',this);
        // restart();
      },


    enemyHitPlayer : function(player, enemy){
      if(this.enemies.getIndex(enemy) > -1)
        this.enemies.remove(enemy);
        enemy.kill();
         this.ouch.play();
        this.lives -= 1;
        this.livesText.setText("Lives : "+this.lives);
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('boom', 30, false, true);
        game.physics.arcade.overlap(this.player, this.enemies, this.enemyHitPlayer, null, this);

      if(this.lives < 0)
        this.game.state.start('GameOver');
        // this.music.stop();

    },

   fireLazers : function() {
        if( this.lazerTime == null )
            this.lazerTime = this.game.time.now;

        //  To avoid them being allowed to fire too fast we set a time limit
        if ( this.game.time.now > this.lazerTime )
        {
            //  Grab the first bullet we can from the pool
            var lazer = this.lazers.getFirstExists(false);
            // if (lazer) {
                //  And fire it
                lazer.reset( this.player.x, this.player.y);
                this.player.angle = this.player.angle;
                lazer.body.velocity.y = Math.cos( this.player.angle * (Math.PI/180) ) * (-400);
                lazer.body.velocity.x = Math.sin( this.player.angle * (Math.PI/180) ) * 400;
                this.lazerTime = this.game.time.now + 300;
                lazer.rotation = true;
                if (this.tracking)
        {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }

        if (this.scaleSpeed > 0)
        {
            this.scale.x += this.scaleSpeed;
            this.scale.y += this.scaleSpeed;
        }
            // lazer.rotation = this.game.physics.arcade.moveToObject(lazer, this.player, 500);
            // lazer.rotation = game.physics.arcade.moveToPointer(lazer, 1000, game.input.activePointer, 500);
            }
          },

          addToScore: function (score) {
         this.score += score;
        this.scoreText.text = this.score;
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
        this.lazers.setAll('anchor.y', 0.5);
        this.lazers.setAll('outOfBoundsKill', true);
        this.lazers.setAll('checkWorldBounds', true);
        this.lazers.tracking = false;
        this.lazers.scaleSpeed = 0;
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
        this.catTrail = game.add.emitter(this.player.x - 50, this.player.y + 23, 400);

        this.player.addChild(this.catTrail);
        this.catTrail.start(false, 2000, 100);
        this.catTrail.y = 0;
        this.catTrail.x = 0;
        this.catTrail.width =10;
        this.catTrail.makeParticles('sparklebutt');
        this.catTrail.setXSpeed(20, -20);
        this.catTrail.setYSpeed(100, 90);
        this.catTrail.setRotation(0,0);
        this.catTrail.setScale(0.15, 0.8, 0.15, 0.8, 2000, Phaser.Easing.Quintic.Out);
      },


  };

