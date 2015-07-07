var preloadState = {
 preload: function() {
    var preloadbar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
    preloadbar.anchor.setTo(0.5,0.5);
    preloadbar.scale.setTo(3);
    this.load.setPreloadSprite(preloadbar);
    this.radarLogo = this.add.image(this.world.centerX, this.world.centerY -220, 'radarLogo');
    this.radarLogo.anchor.setTo(0.5, 0.5);

    ///////////////LOAD GAME ASSETS///////////////
    this.game.load.image('space', 'images/menu_background.png');
    this.game.load.image('enemyBullet', 'images/bullet.png');
    this.game.load.image('player','images/flyingcat.png');
    this.game.load.image('eyes','images/lazer-eyes.png');
    this.game.load.image('sparklebutt', 'images/sparklebutt2.png');
    this.game.load.image('lazers', 'images/bulletOrange.png');
    this.game.load.spritesheet('explode', 'images/explode.png', 128, 128, 16);
    this.game.load.spritesheet('enemy', 'images/doggrid.png', 70, 70);
    this.game.load.spritesheet('lazerBall', 'images/prettyLaserball.png');
    this.game.load.spritesheet('explosionBig', 'images/explodeBig.png');
    this.game.load.atlasXML('spacerock', 'images/SpaceRock.png', 'images/SpaceRock.xml');
    this.game.load.audio('explosion_audio', 'audio/explosion.mp3');
    this.game.load.audio('hurt_audio', 'audio/hurt.mp3');
    this.game.load.audio('select_audio', 'audio/select.mp3');
    this.game.load.audio('game_audio', 'audio/bgm.mp3');
    // this.game.load.image('enemy', 'images/enemy-green.png');
    // this.load.audio('collect', 'assets/audio/collect.ogg');
    // this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
    console.log( 'preload')
    // this.preloadBar.cropEnabled = false;
    game.time.events.add(Phaser.Timer.SECOND * 2, this.transition, this);
  },
  update: function () {
        if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {
            this.ready = true;
            // this.state.start('StartMenu');
        }
  },
  transition : function() {
    // start game
    this.game.state.start('MainMenu');
  }
};


//   update: function () {
//     this.ready = true;
//     this.game.state.start('MainMenu');
//   }
// };

