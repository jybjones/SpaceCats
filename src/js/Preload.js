var SpaceCats = SpaceCats || {};
SpaceCats.Preload = function(){};

SpaceCats.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('space', 'images/menu_background.png');
    this.load.image('ship','images/flyingcat.png', 12, 12);
    this.load.image('sparklebutt', 'images/sparklebutt2.png', 12, 12);
    this.load.image('lazers', 'images/lazer-eyes.png');
    // this.load.audio('collect', 'assets/audio/collect.ogg');
    // this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },

  create: function() {
    console.log( 'preload')
    this.state.start('MainMenu');
  }
};
