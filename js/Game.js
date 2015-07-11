'use strict';

var gameState = {
  create: function create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
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
    this.wee;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnEnemy, this);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.advancedTiming = true;

    this.instructions = this.add.text(game.world.centerX, game.world.centerY, 'Use mouse to Move, Press Spacebar to Fire\n' + 'Good Luck, you have 9 lives and 30 seconds', { font: '30px Arial', fill: '#ff0044', align: 'center' });
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 9000;

    this.fontStyle = { font: '40px Arial', fill: '#FFCC00', stroke: '#333', strokeThickness: 3, align: 'center' };
    this.scoreText = this.game.add.text(60, 10, 'Score : ' + this.score, this.fontStyle);
    this.livesText = this.game.add.text(game.world.width - 200, 10, 'Lives : ' + this.lives, this.fontStyle);

    this.endTime = game.time.now + 1000 * 30;
    this.music = this.add.audio('game_audio');
    this.music.play('', 0, 0.3, true);
    this.ouch = this.add.audio('hurt_audio');
    this.boom = this.add.audio('explosion_audio');
    this.ding = this.add.audio('select_audio');
    this.pew = this.add.audio('pew_audio');
    this.wee = this.add.audio('wee_audio');
  },

  update: function update() {
    //  If the PLAYER is > 8px away from the pointer then let's move to it
    if (this.physics.arcade.distanceToPointer(this.player, this.game.input.activePointer) > 8) {
      //  Make the object seek to the active pointer (mouse or touch).
      this.physics.arcade.moveToPointer(this.player, 400);
      this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
    } else {
      this.player.body.velocity.set(0);
    }

    var style = { font: '34px Arial', align: 'center' };
    var timeLeft = this.endTime - game.time.now;
    if (timeLeft >= 0) {
      // show time remaining in seconds (divide by 1000)
      game.debug.text(Math.ceil(timeLeft / 1000) + ' seconds left!', 500, 100, '#00ff00');
    } else {
      game.debug.text('Ran out of time!', 500, 100, '#ff0000');
      game.state.start('GameOver');
    }

    if (this.PlayerAlive && this.fireButton.isDown) {
      this.fireLazers();
      this.pew.play();
    }

    game.physics.arcade.overlap(this.lazers, this.enemies, this.lazerHitsEnemy, null, this);
    this.game.physics.arcade.collide(this.enemies, this.player, this.enemyHitPlayer, null, this);
    this.game.physics.arcade.collide(this.enemies, this.lazers, this.lazerHitsEnemy, null, this);
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
    }
  },
  lazerHitsEnemy: function lazerHitsEnemy(lazer, enemy) {
    if (this.enemies.getIndex(enemy) > -1) this.enemies.remove(enemy);
    this.boom.play();
    enemy.kill();
    lazer.kill();
    this.score += 10;
    this.scoreText.setText('Score : ' + this.score);
    //  And create an explosion
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('boom', 30, false, true);
  },

  enemyHitPlayer: function enemyHitPlayer(player, enemy) {
    if (this.enemies.getIndex(enemy) > -1) this.enemies.remove(enemy);
    enemy.kill();
    this.ouch.play();
    this.lives -= 1;
    this.livesText.setText('Lives : ' + this.lives);
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('boom', 30, false, true);
    game.physics.arcade.overlap(this.player, this.enemies, this.enemyHitPlayer, null, this);

    if (this.lives < 0) this.game.state.start('GameOver');
  },

  fireLazers: function fireLazers() {
    if (this.lazerTime == null) this.lazerTime = this.game.time.now;

    if (this.game.time.now > this.lazerTime) {

      var lazer = this.lazers.getFirstExists(false);
      lazer.reset(this.player.x, this.player.y);
      this.player.angle = this.player.angle;
      lazer.body.velocity.y = Math.cos(this.player.angle * (Math.PI / 180)) * -400;
      lazer.body.velocity.x = Math.sin(this.player.angle * (Math.PI / 180)) * 400;
      this.lazerTime = this.game.time.now + 300;
      lazer.rotation = true;
      if (this.tracking) {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
      }
    }
  },

  addToScore: function addToScore(score) {
    this.score += score;
    this.scoreText.text = this.score;
  },

  spawnEnemy: function spawnEnemy() {
    var enemy = this.enemies.getFirstExists(false);
    var MIN_ENEMY_SPACING = 200;
    var MAX_ENEMY_SPACING = 1000;
    var ENEMY_SPEED = 200;

    if (enemy) {
      enemy.reset(game.rnd.integerInRange(0, game.width), -20);
      enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
      enemy.body.velocity.y = ENEMY_SPEED;
      enemy.body.drag.x = 100;
      this.wee.play('', 0, 0.3);

      enemy.update = function () {
        enemy.angle = 20 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
        //  Kill enemies once they go off screen
        if (enemy.y > game.height + 200) {
          enemy.kill();
        }
      };
    }
  },

  setupExplosions: function setupExplosions() {
    this.explosions = game.add.group();
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'lazerBall');

    this.explosions.forEach(function (explosion) {
      explosion.anchor.x = 0.5;
      explosion.anchor.y = 0.5;
      explosion.animations.add('boom');
    }, this);
  },
  setupButtons: function setupButtons() {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  setupLazers: function setupLazers() {
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

  setupEnemies: function setupEnemies() {
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.scale.setTo(1.6);
    this.enemies.createMultiple(30, 'enemy');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('outOfBoundsKill', true);
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.callAll('animations.add', 'animations', 'fly10', [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 18, 18, 19, 20, 21], 4, true);
    this.enemies.callAll('play', null, 'fly10');
    this.enemyDelay = 200;
  },
  //////////PLAYER!!!!///////
  setupPlayer: function setupPlayer() {
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
    this.catTrail.width = 10;
    this.catTrail.makeParticles('sparklebutt');
    this.catTrail.setXSpeed(20, -20);
    this.catTrail.setYSpeed(100, 90);
    this.catTrail.setRotation(0, 0);
    this.catTrail.setScale(0.15, 0.8, 0.15, 0.8, 2000, Phaser.Easing.Quintic.Out);
  }

};
//# sourceMappingURL=data:application/json;base64,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LE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDL0U7O0NBRUosQ0FBQyIsImZpbGUiOiJzcmMvanMvR2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnYW1lU3RhdGUgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gZ2FtZS5hZGQudGlsZVNwcml0ZSgwLDAsIHRoaXMuZ2FtZS53b3JsZC53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmhlaWdodCwgJ3NwYWNlJyk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLmF1dG9TY3JvbGwoLTYwLCAtMjApO1xuICAgIHRoaXMuc2V0dXBQbGF5ZXIoKTtcbiAgICB0aGlzLnBsYXllcjtcbiAgICB0aGlzLmVuZW15O1xuICAgIHRoaXMuZW5lbXlUd287XG4gICAgdGhpcy5jYXRUcmFpbDtcbiAgICB0aGlzLnNldHVwQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0dXBMYXplcnMoKTtcbiAgICB0aGlzLnNldHVwRW5lbWllcygpO1xuICAgIHRoaXMuc2V0dXBFeHBsb3Npb25zKCk7XG4gICAgdGhpcy5mb250U3R5bGU7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxpdmVzID0gOTtcbiAgICB0aGlzLnNjb3JlU3RyaW5nID0gJyc7XG4gICAgdGhpcy5zY29yZVRleHQ7XG4gICAgdGhpcy5QbGF5ZXJBbGl2ZSA9IHRydWU7XG4gICAgdGhpcy5lbmRUaW1lID0gMDtcblxuICAgIHRoaXMubXVzaWM7XG4gICAgdGhpcy5vdWNoO1xuICAgIHRoaXMuYm9vbTtcbiAgICB0aGlzLmRpbmc7XG4gICAgdGhpcy5wZXc7XG4gICAgdGhpcy53ZWVcbiAgICB0aGlzLmZpcmVSYXRlID0gMTAwMDtcbiAgICB0aGlzLm5leHRGaXJlID0gMDtcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcblxuICAgIGdhbWUudGltZS5ldmVudHMubG9vcChQaGFzZXIuVGltZXIuU0VDT05EICogMiwgdGhpcy5zcGF3bkVuZW15LCB0aGlzKTtcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBnYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5pbnN0cnVjdGlvbnMgPSB0aGlzLmFkZC50ZXh0KCBnYW1lLndvcmxkLmNlbnRlclgsIGdhbWUud29ybGQuY2VudGVyWSxcbiAgICAnVXNlIG1vdXNlIHRvIE1vdmUsIFByZXNzIFNwYWNlYmFyIHRvIEZpcmVcXG4nICsgJ0dvb2QgTHVjaywgeW91IGhhdmUgOSBsaXZlcyBhbmQgMzAgc2Vjb25kcycsXG4gICAgeyBmb250OiBcIjMwcHggQXJpYWxcIiwgZmlsbDogXCIjZmYwMDQ0XCIsIGFsaWduOiBcImNlbnRlclwiIH0pO1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcbiAgICAgIHRoaXMuaW5zdEV4cGlyZSA9IHRoaXMudGltZS5ub3cgKyA5MDAwO1xuXG4gICAgICB0aGlzLmZvbnRTdHlsZSA9IHsgZm9udDogXCI0MHB4IEFyaWFsXCIsIGZpbGw6IFwiI0ZGQ0MwMFwiLCBzdHJva2U6IFwiIzMzM1wiLCBzdHJva2VUaGlja25lc3M6IDMsIGFsaWduOiBcImNlbnRlclwiIH07XG4gICAgICB0aGlzLnNjb3JlVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dCg2MCwxMCxcIlNjb3JlIDogXCIrdGhpcy5zY29yZSx0aGlzLmZvbnRTdHlsZSk7XG4gICAgICB0aGlzLmxpdmVzVGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChnYW1lLndvcmxkLndpZHRoIC0gMjAwLCAxMCxcIkxpdmVzIDogXCIrdGhpcy5saXZlcyx0aGlzLmZvbnRTdHlsZSk7XG5cbiAgICAgIHRoaXMuZW5kVGltZSA9IGdhbWUudGltZS5ub3cgKyAoMTAwMCAqIDMwICk7XG4gICAgICB0aGlzLm11c2ljID0gdGhpcy5hZGQuYXVkaW8oJ2dhbWVfYXVkaW8nKTtcbiAgICAgIHRoaXMubXVzaWMucGxheSgnJywgMCwgMC4zLCB0cnVlKTtcbiAgICAgIHRoaXMub3VjaCA9IHRoaXMuYWRkLmF1ZGlvKCdodXJ0X2F1ZGlvJyk7XG4gICAgICB0aGlzLmJvb20gPSB0aGlzLmFkZC5hdWRpbygnZXhwbG9zaW9uX2F1ZGlvJyk7XG4gICAgICB0aGlzLmRpbmcgPSB0aGlzLmFkZC5hdWRpbygnc2VsZWN0X2F1ZGlvJyk7XG4gICAgICAgIHRoaXMucGV3ID0gdGhpcy5hZGQuYXVkaW8oJ3Bld19hdWRpbycpO1xuICAgICAgICB0aGlzLndlZSA9IHRoaXMuYWRkLmF1ZGlvKCd3ZWVfYXVkaW8nKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vICBJZiB0aGUgUExBWUVSIGlzID4gOHB4IGF3YXkgZnJvbSB0aGUgcG9pbnRlciB0aGVuIGxldCdzIG1vdmUgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBoeXNpY3MuYXJjYWRlLmRpc3RhbmNlVG9Qb2ludGVyKHRoaXMucGxheWVyLCB0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlcikgPiA4KVxuICAgICAge1xuICAgICAgICAvLyAgTWFrZSB0aGUgb2JqZWN0IHNlZWsgdG8gdGhlIGFjdGl2ZSBwb2ludGVyIChtb3VzZSBvciB0b3VjaCkuXG4gICAgICAgIHRoaXMucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlcih0aGlzLnBsYXllciwgNDAwKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucm90YXRpb24gPSB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuYW5nbGVUb1BvaW50ZXIodGhpcy5wbGF5ZXIpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnNldCgwKTtcbiAgICAgICAgfVxuXG4gICAgICB2YXIgc3R5bGUgPSB7IGZvbnQ6ICczNHB4IEFyaWFsJywgYWxpZ246ICdjZW50ZXInfTtcbiAgICAgIHZhciB0aW1lTGVmdCA9IHRoaXMuZW5kVGltZSAtIGdhbWUudGltZS5ub3c7XG4gICAgICAgIGlmICh0aW1lTGVmdCA+PSAwKSB7XG4gICAgICAgICAgICAvLyBzaG93IHRpbWUgcmVtYWluaW5nIGluIHNlY29uZHMgKGRpdmlkZSBieSAxMDAwKVxuICAgICAgZ2FtZS5kZWJ1Zy50ZXh0KE1hdGguY2VpbCh0aW1lTGVmdCAvIDEwMDApICsgXCIgc2Vjb25kcyBsZWZ0IVwiLCA1MDAsIDEwMCwgXCIjMDBmZjAwXCIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmRlYnVnLnRleHQoXCJSYW4gb3V0IG9mIHRpbWUhXCIsIDUwMCwgMTAwLCBcIiNmZjAwMDBcIik7XG4gICAgICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdHYW1lT3ZlcicpO1xuICAgICAgICB9XG5cbiAgICAgIGlmKHRoaXMuUGxheWVyQWxpdmUgJiYgdGhpcy5maXJlQnV0dG9uLmlzRG93bikge1xuICAgICAgICB0aGlzLmZpcmVMYXplcnMoKTtcbiAgICAgICAgdGhpcy5wZXcucGxheSgpO1xuICAgICAgICB9XG5cbiAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAoIHRoaXMubGF6ZXJzLCB0aGlzLmVuZW1pZXMsIHRoaXMubGF6ZXJIaXRzRW5lbXksIG51bGwsIHRoaXMpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLnBsYXllciwgdGhpcy5lbmVteUhpdFBsYXllcixudWxsLCB0aGlzKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZW5lbWllcywgdGhpcy5sYXplcnMsIHRoaXMubGF6ZXJIaXRzRW5lbXksbnVsbCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmluc3RydWN0aW9ucy5leGlzdHMgJiYgdGhpcy50aW1lLm5vdyA+IHRoaXMuaW5zdEV4cGlyZSkge1xuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgICAgbGF6ZXJIaXRzRW5lbXkgOiBmdW5jdGlvbihsYXplciwgZW5lbXkpIHtcbiAgICAgIGlmKHRoaXMuZW5lbWllcy5nZXRJbmRleChlbmVteSkgPiAtMSlcbiAgICAgICAgdGhpcy5lbmVtaWVzLnJlbW92ZShlbmVteSk7XG4gICAgICAgIHRoaXMuYm9vbS5wbGF5KCk7XG4gICAgICAgIGVuZW15LmtpbGwoKTtcbiAgICAgICAgbGF6ZXIua2lsbCgpO1xuICAgICAgICB0aGlzLnNjb3JlICs9IDEwO1xuICAgICAgICB0aGlzLnNjb3JlVGV4dC5zZXRUZXh0KFwiU2NvcmUgOiBcIit0aGlzLnNjb3JlKTtcbiAgICAgICAgLy8gIEFuZCBjcmVhdGUgYW4gZXhwbG9zaW9uXG4gICAgICAgIHZhciBleHBsb3Npb24gPSB0aGlzLmV4cGxvc2lvbnMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgICAgICBleHBsb3Npb24ucmVzZXQoZW5lbXkuYm9keS54LCBlbmVteS5ib2R5LnkpO1xuICAgICAgICBleHBsb3Npb24ucGxheSgnYm9vbScsIDMwLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgIH0sXG5cbiAgICBlbmVteUhpdFBsYXllciA6IGZ1bmN0aW9uKHBsYXllciwgZW5lbXkpe1xuICAgICAgaWYodGhpcy5lbmVtaWVzLmdldEluZGV4KGVuZW15KSA+IC0xKVxuICAgICAgICB0aGlzLmVuZW1pZXMucmVtb3ZlKGVuZW15KTtcbiAgICAgICAgZW5lbXkua2lsbCgpO1xuICAgICAgICAgdGhpcy5vdWNoLnBsYXkoKTtcbiAgICAgICAgdGhpcy5saXZlcyAtPSAxO1xuICAgICAgICB0aGlzLmxpdmVzVGV4dC5zZXRUZXh0KFwiTGl2ZXMgOiBcIit0aGlzLmxpdmVzKTtcbiAgICAgICAgdmFyIGV4cGxvc2lvbiA9IHRoaXMuZXhwbG9zaW9ucy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XG4gICAgICAgIGV4cGxvc2lvbi5yZXNldChwbGF5ZXIuYm9keS54LCBwbGF5ZXIuYm9keS55KTtcbiAgICAgICAgZXhwbG9zaW9uLnJlc2V0KGVuZW15LmJvZHkueCwgZW5lbXkuYm9keS55KTtcbiAgICAgICAgZXhwbG9zaW9uLnBsYXkoJ2Jvb20nLCAzMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgdGhpcy5lbmVteUhpdFBsYXllciwgbnVsbCwgdGhpcyk7XG5cblxuICAgICAgaWYodGhpcy5saXZlcyA8IDApXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnR2FtZU92ZXInKTtcblxuICAgIH0sXG5cbiAgICBmaXJlTGF6ZXJzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCB0aGlzLmxhemVyVGltZSA9PSBudWxsIClcbiAgICAgICAgICAgIHRoaXMubGF6ZXJUaW1lID0gdGhpcy5nYW1lLnRpbWUubm93O1xuXG4gICAgICAgIGlmICggdGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5sYXplclRpbWUgKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIHZhciBsYXplciA9IHRoaXMubGF6ZXJzLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBsYXplci5yZXNldCggdGhpcy5wbGF5ZXIueCwgdGhpcy5wbGF5ZXIueSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5nbGUgPSB0aGlzLnBsYXllci5hbmdsZTtcbiAgICAgICAgICAgICAgICBsYXplci5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLmNvcyggdGhpcy5wbGF5ZXIuYW5nbGUgKiAoTWF0aC5QSS8xODApICkgKiAoLTQwMCk7XG4gICAgICAgICAgICAgICAgbGF6ZXIuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5zaW4oIHRoaXMucGxheWVyLmFuZ2xlICogKE1hdGguUEkvMTgwKSApICogNDAwO1xuICAgICAgICAgICAgICAgIHRoaXMubGF6ZXJUaW1lID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMzAwO1xuICAgICAgICAgICAgICAgIGxhemVyLnJvdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja2luZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguYXRhbjIodGhpcy5ib2R5LnZlbG9jaXR5LnksIHRoaXMuYm9keS52ZWxvY2l0eS54KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNjYWxlU3BlZWQgPiAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggKz0gdGhpcy5zY2FsZVNwZWVkO1xuICAgICAgICAgICAgdGhpcy5zY2FsZS55ICs9IHRoaXMuc2NhbGVTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBhZGRUb1Njb3JlOiBmdW5jdGlvbiAoc2NvcmUpIHtcbiAgICAgICAgICB0aGlzLnNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgIHRoaXMuc2NvcmVUZXh0LnRleHQgPSB0aGlzLnNjb3JlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICBzcGF3bkVuZW15OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZW5lbXkgPSB0aGlzLmVuZW1pZXMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xuICAgICAgICAgIHZhciBNSU5fRU5FTVlfU1BBQ0lORyA9IDIwMDtcbiAgICAgICAgICB2YXIgTUFYX0VORU1ZX1NQQUNJTkcgPSAxMDAwO1xuICAgICAgICAgIHZhciBFTkVNWV9TUEVFRCA9IDIwMDtcblxuICAgICAgICAgaWYgKGVuZW15KSB7XG4gICAgICAgICAgZW5lbXkucmVzZXQoZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgZ2FtZS53aWR0aCksIC0yMCk7XG4gICAgICAgICAgZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoLTMwMCwgMzAwKTtcbiAgICAgICAgICBlbmVteS5ib2R5LnZlbG9jaXR5LnkgPSBFTkVNWV9TUEVFRDtcbiAgICAgICAgICBlbmVteS5ib2R5LmRyYWcueCA9IDEwMDtcbiAgICAgICAgICB0aGlzLndlZS5wbGF5KCcnLCAwLCAwLjMgKTtcblxuICAgICAgICBlbmVteS51cGRhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgIGVuZW15LmFuZ2xlID0gMjAgLSBnYW1lLm1hdGgucmFkVG9EZWcoTWF0aC5hdGFuMihlbmVteS5ib2R5LnZlbG9jaXR5LngsIGVuZW15LmJvZHkudmVsb2NpdHkueSkpO1xuICAgICAgICAgIC8vICBLaWxsIGVuZW1pZXMgb25jZSB0aGV5IGdvIG9mZiBzY3JlZW5cbiAgICAgICAgICBpZiAoZW5lbXkueSA+IGdhbWUuaGVpZ2h0ICsgMjAwKSB7XG4gICAgICAgICAgICBlbmVteS5raWxsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9LFxuXG4gICAgICBzZXR1cEV4cGxvc2lvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV4cGxvc2lvbnMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbnMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbnMuY3JlYXRlTXVsdGlwbGUoMzAsICdsYXplckJhbGwnKTtcblxuICAgICAgICB0aGlzLmV4cGxvc2lvbnMuZm9yRWFjaCggZnVuY3Rpb24oZXhwbG9zaW9uICkge1xuICAgICAgICAgICAgZXhwbG9zaW9uLmFuY2hvci54ID0gMC41O1xuICAgICAgICAgICAgZXhwbG9zaW9uLmFuY2hvci55ID0gMC41O1xuICAgICAgICAgICAgZXhwbG9zaW9uLmFuaW1hdGlvbnMuYWRkKCdib29tJyk7XG4gICAgICAgIH0sIHRoaXMgKTtcblxuICAgICAgfSxcbiAgICAgIHNldHVwQnV0dG9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3Vyc29ycyA9IGdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuICAgICAgICB0aGlzLmZpcmVCdXR0b24gPSBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xuICAgICAgfSxcbiAgICAgIHNldHVwTGF6ZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sYXplcnMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMubGF6ZXJzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhemVycy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgICAgIHRoaXMubGF6ZXJzLmNyZWF0ZU11bHRpcGxlKDMwLCAnbGF6ZXJzJyk7XG4gICAgICAgIHRoaXMubGF6ZXJzLnNldEFsbCgnYW5jaG9yLngnLCAwLjUpO1xuICAgICAgICB0aGlzLmxhemVycy5zZXRBbGwoJ2FuY2hvci55JywgMC41KTtcbiAgICAgICAgdGhpcy5sYXplcnMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYXplcnMuc2V0QWxsKCdjaGVja1dvcmxkQm91bmRzJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGF6ZXJzLnRyYWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGF6ZXJzLnNjYWxlU3BlZWQgPSAyMDtcbiAgICAgIH0sXG5cbiAgICAgIHNldHVwRW5lbWllczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW5lbWllcyA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMuZW5lbWllcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLnNjYWxlLnNldFRvKDEuNik7XG4gICAgICAgIHRoaXMuZW5lbWllcy5jcmVhdGVNdWx0aXBsZSgzMCwgJ2VuZW15Jyk7XG4gICAgICAgIHRoaXMuZW5lbWllcy5zZXRBbGwoJ2FuY2hvci54JywgMC41KTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLnNldEFsbCgnYW5jaG9yLnknLCAwLjUpO1xuICAgICAgICB0aGlzLmVuZW1pZXMuc2V0QWxsKCdvdXRPZkJvdW5kc0tpbGwnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLnNldEFsbCgnY2hlY2tXb3JsZEJvdW5kcycsIHRydWUpO1xuICAgICAgICB0aGlzLmVuZW1pZXMuY2FsbEFsbCgnYW5pbWF0aW9ucy5hZGQnLCAnYW5pbWF0aW9ucycsICdmbHkxMCcsIFswLDEsMiwzLDQsNSw2LDcsOCw4LDgsIDksIDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE4LDE4LDE5LCAyMCwgMjFdLCA0LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLmNhbGxBbGwoJ3BsYXknLCBudWxsLCAnZmx5MTAnKTtcbiAgICAgICAgdGhpcy5lbmVteURlbGF5ID0gMjAwO1xuXG4gICAgICB9LFxuICAgIC8vLy8vLy8vLy9QTEFZRVIhISEhLy8vLy8vL1xuICAgICAgc2V0dXBQbGF5ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IGdhbWUuYWRkLnNwcml0ZShnYW1lLndvcmxkLmNlbnRlclgsIGdhbWUud29ybGQuY2VudGVyWSwgJ3BsYXllcicpO1xuICAgICAgICB0aGlzLnBsYXllci5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLnBsYXllciwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS5hbGxvd1JvdGF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuUGxheWVyQWxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhdFRyYWlsID0gZ2FtZS5hZGQuZW1pdHRlcih0aGlzLnBsYXllci54LCB0aGlzLnBsYXllci55ICsgNTAsIDQwKTtcbiAgICAgICAgdGhpcy5jYXRUcmFpbCA9IGdhbWUuYWRkLmVtaXR0ZXIodGhpcy5wbGF5ZXIueCAtIDUwLCB0aGlzLnBsYXllci55ICsgMjMsIDQwMCk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXIuYWRkQ2hpbGQodGhpcy5jYXRUcmFpbCk7XG4gICAgICAgIHRoaXMuY2F0VHJhaWwuc3RhcnQoZmFsc2UsIDIwMDAsIDEwMCk7XG4gICAgICAgIHRoaXMuY2F0VHJhaWwueSA9IDA7XG4gICAgICAgIHRoaXMuY2F0VHJhaWwueCA9IDA7XG4gICAgICAgIHRoaXMuY2F0VHJhaWwud2lkdGggPTEwO1xuICAgICAgICB0aGlzLmNhdFRyYWlsLm1ha2VQYXJ0aWNsZXMoJ3NwYXJrbGVidXR0Jyk7XG4gICAgICAgIHRoaXMuY2F0VHJhaWwuc2V0WFNwZWVkKDIwLCAtMjApO1xuICAgICAgICB0aGlzLmNhdFRyYWlsLnNldFlTcGVlZCgxMDAsIDkwKTtcbiAgICAgICAgdGhpcy5jYXRUcmFpbC5zZXRSb3RhdGlvbigwLDApO1xuICAgICAgICB0aGlzLmNhdFRyYWlsLnNldFNjYWxlKDAuMTUsIDAuOCwgMC4xNSwgMC44LCAyMDAwLCBQaGFzZXIuRWFzaW5nLlF1aW50aWMuT3V0KTtcbiAgICAgIH0sXG5cbiAgfTtcblxuIl19
