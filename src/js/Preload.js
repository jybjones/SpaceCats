var SpaceCats = SpaceCats || {};
SpaceCats.Preload = function(){
  this.preloadBar = null;
  this.logo = null;
  this.ready = false;
};

SpaceCats.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.logo = this.add.image(this.world.centerX, this.world.centerY -220, 'logo');
    this.logo.anchor.setTo(0.5, 0.5);
    this.preloadBar.scale.setTo(3);
    ///this.load.bitmapFont('', 'fonts/asfsdfda.png', 'fonts/adfasdf.fnt');

    ///////////////LOAD GAME ASSETS///////////////
    this.load.image('space', 'images/menu_background.png');
    this.load.image('player','images/flyingcat.png');
    this.load.image('sparklebutt', 'images/sparklebutt2.png');
    this.load.image('lazers', 'images/lazer-eyes.png');
    this.load.spritesheet('explosion', 'images/explosion.png');
    this.load.atlasXML('bunny', 'images/bunny.png', 'images/bunny.xml');
    this.load.atlasXML('spacerock', 'images/SpaceRock.png', 'images/SpaceRock.xml');
    // this.load.audio('collect', 'assets/audio/collect.ogg');
    // this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },

  create: function() {
    console.log( 'preload')
    this.preloadBar.cropEnabled = false;
  },

  update: function () {
    this.ready = true;
    this.state.start('MainMenu');
  }
};
