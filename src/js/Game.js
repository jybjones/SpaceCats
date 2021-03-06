var gameState = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.background.autoScroll(-60, -20);
    this.setupPlayer();
    this.player;
    this.enemy;
    this.enemyTwo;
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
    this.pew;
    this.wee
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnEnemy, this);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.advancedTiming = true;

    this.instructions = this.add.text( game.world.centerX, game.world.centerY,
    'Use mouse to Move, Press Spacebar to Fire\n' + 'Good Luck, you have 9 lives and 30 seconds',
    { font: "30px Arial", fill: "#ff0044", align: "center" });
      this.instructions.anchor.setTo(0.5, 0.5);
      this.instExpire = this.time.now + 9000;

      this.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 3, align: "center" };
      this.scoreText = this.game.add.text(60,10,"Score : "+this.score,this.fontStyle);
      this.livesText = this.game.add.text(game.world.width - 200, 10,"Lives : "+this.lives,this.fontStyle);

      this.endTime = game.time.now + (1000 * 30 );
      this.music = this.add.audio('game_audio');
      this.music.play('', 0, 0.3, true);
      this.ouch = this.add.audio('hurt_audio');
      this.boom = this.add.audio('explosion_audio');
      this.ding = this.add.audio('select_audio');
        this.pew = this.add.audio('pew_audio');
        this.wee = this.add.audio('wee_audio');
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

      var style = { font: '34px Arial', align: 'center'};
      var timeLeft = this.endTime - game.time.now;
        if (timeLeft >= 0) {
            // show time remaining in seconds (divide by 1000)
      game.debug.text(Math.ceil(timeLeft / 1000) + " seconds left!", 500, 100, "#00ff00");

        }
        else {
            game.debug.text("Ran out of time!", 500, 100, "#ff0000");
            game.state.start('GameOver');
        }

      if(this.PlayerAlive && this.fireButton.isDown) {
        this.fireLazers();
        this.pew.play();
        }

    game.physics.arcade.overlap( this.lazers, this.enemies, this.lazerHitsEnemy, null, this);
      this.game.physics.arcade.collide(this.enemies, this.player, this.enemyHitPlayer,null, this);
      this.game.physics.arcade.collide(this.enemies, this.lazers, this.lazerHitsEnemy,null, this);
        if (this.instructions.exists && this.time.now > this.instExpire) {
        this.instructions.destroy();
        }
    },
      lazerHitsEnemy : function(lazer, enemy) {
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

    },

    fireLazers : function() {
        if( this.lazerTime == null )
            this.lazerTime = this.game.time.now;

        if ( this.game.time.now > this.lazerTime )
        {

            var lazer = this.lazers.getFirstExists(false);
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
            }
          },

          addToScore: function (score) {
          this.score += score;
          this.scoreText.text = this.score;
            },

        spawnEnemy: function() {
          var enemy = this.enemies.getFirstExists(false);
          var MIN_ENEMY_SPACING = 200;
          var MAX_ENEMY_SPACING = 1000;
          var ENEMY_SPEED = 200;

         if (enemy) {
          enemy.reset(game.rnd.integerInRange(0, game.width), -20);
          enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
          enemy.body.velocity.y = ENEMY_SPEED;
          enemy.body.drag.x = 100;
          this.wee.play('', 0, 0.3 );

        enemy.update = function(){
          enemy.angle = 20 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
          //  Kill enemies once they go off screen
          if (enemy.y > game.height + 200) {
            enemy.kill();
          }
        }
    }
  },

      setupExplosions: function() {
        this.explosions = game.add.group();
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(30, 'lazerBall');

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
        this.lazers.scaleSpeed = 20;
      },

      setupEnemies: function() {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.scale.setTo(1.6);
        this.enemies.createMultiple(30, 'enemy');
        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        this.enemies.setAll('outOfBoundsKill', true);
        this.enemies.setAll('checkWorldBounds', true);
        this.enemies.callAll('animations.add', 'animations', 'fly10', [0,1,2,3,4,5,6,7,8,8,8, 9, 11,12,13,14,15,16,17,18,18,18,19, 20, 21], 4, true);
        this.enemies.callAll('play', null, 'fly10');
        this.enemyDelay = 200;

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

