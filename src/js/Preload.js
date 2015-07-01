// var SpaceCats = SpaceCats || {};

var preloadState = {
 preload: function() {
//     //show loading screen
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.radarLogo = this.add.image(this.world.centerX, this.world.centerY -220, 'radarLogo');
    this.radarLogo.anchor.setTo(0.5, 0.5);
    this.preloadBar.scale.setTo(3);
    this.load.setPreloadSprite(this.preloadBar);
    ///this.load.bitmapFont('', 'fonts/asfsdfda.png', 'fonts/adfasdf.fnt');

    ///////////////LOAD GAME ASSETS///////////////
    this.game.load.image('space', 'images/menu_background.png');
    this.game.load.image('player','images/flyingcat.png');
    this.game.load.image('sparklebutt', 'images/sparklebutt2.png');
    this.game.load.image('lazers', 'images/lazer-eyes.png');
    this.game.load.spritesheet('explode', 'images/explode.png', 128, 128, 16);
    this.game.load.spritesheet('lazerBall', 'images/prettyLaserball.png');
    this.game.load.spritesheet('explosionBig', 'images/explodeBig.png');
    this.game.load.atlasXML('bunny', 'images/bunny.png', 'images/bunny.xml');
    this.game.load.atlasXML('spacerock', 'images/SpaceRock.png', 'images/SpaceRock.xml');
    this.game.load.image('enemy', 'images/enemy-green.png');
    // this.load.audio('collect', 'assets/audio/collect.ogg');
    // this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
    console.log( 'preload')
    this.preloadBar.cropEnabled = false;
  },

  update: function () {
    this.ready = true;
    this.game.state.start('MainMenu');
  }
};

// SpaceCats.Preload = function(game){
//   this.preloadBar = null;
//   this.logo = null;
//   this.ready = false;
// };

// SpaceCats.Preload.prototype = {
//   preload: function() {
//     //show loading screen
//     this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
//     this.preloadBar.anchor.setTo(0.5, 0.5);
//     this.load.setPreloadSprite(this.preloadBar);
//     this.logo = this.add.image(this.world.centerX, this.world.centerY -220, 'logo');
//     this.logo.anchor.setTo(0.5, 0.5);
//     this.preloadBar.scale.setTo(3);
//     this.load.setPreloadSprite(this.preloadBar);
//     ///this.load.bitmapFont('', 'fonts/asfsdfda.png', 'fonts/adfasdf.fnt');

//     ///////////////LOAD GAME ASSETS///////////////
//     this.load.image('space', 'images/menu_background.png');
//     this.load.image('player','images/flyingcat.png');
//     this.load.image('sparklebutt', 'images/sparklebutt2.png');
//     this.load.image('lazers', 'images/lazer-eyes.png');
//     this.load.spritesheet('explode', 'images/explosion.png');
//     this.load.spritesheet('lazerBall', 'images/prettyLaserball.png');
//     this.load.spritesheet('explosionBig', 'images/explodeBig.png');
//     this.load.atlasXML('bunny', 'images/bunny.png', 'images/bunny.xml');
//     this.load.atlasXML('spacerock', 'images/SpaceRock.png', 'images/SpaceRock.xml');
//     this.load.image('enemy', 'images/enemy-green.png');
//     // this.load.audio('collect', 'assets/audio/collect.ogg');
//     // this.load.audio('explosion', 'assets/audio/explosion.ogg');
//   },

//   create: function() {
//     console.log( 'preload')
//     this.preloadBar.cropEnabled = false;
//   },

//   update: function () {
//     this.ready = true;
//     this.state.start('MainMenu');
//   }
// };
