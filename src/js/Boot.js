var SpaceCats = SpaceCats || {};
SpaceCats.Boot = function(){};

// setting the game config & adding assets for loading screen
SpaceCats.Boot.prototype = {
  preload: function(){
    this.load.image('logo', 'images/logo.png');
    console.log(' Boot', "awesomeTHIS")
    this.load.image('preloadbar', 'images/glowingloadingbar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#FFF';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = 240;
  this.scale.minHeight = 170;
  this.scale.maxWidth = 2880;
  this.scale.maxHeight = 1920;

  //have the game centered horizontally
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  //screen size will be set automatically
  this.scale.setScreenSize(true);

  //physics system for movement
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};