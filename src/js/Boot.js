// var SpaceCats = SpaceCats || {};
// SpaceCats.Boot = function(){};

// var SpaceCats = {};
// SpaceCats.Boot = function(game) {

// };

var bootState = {
  preload: function(){
    this.game.load.image('radarLogo', 'images/logo.png');
    this.game.load.image('preloadbar', 'images/preloader-bar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#FFF';
    this.input.addPointer();
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 470;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    this.scale.setScreenSize(true);

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.time.events.add(Phaser.Timer.SECOND * 470, this).autoDestroy = true;
    this.game.state.start('Preload');
    }
  };



// setting the game config & adding assets for loading screen
// SpaceCats.Boot.prototype = {

