'use strict';

var preloadState = {
  preload: function preload() {
    var preloadbar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
    preloadbar.anchor.setTo(0.5, 0.5);
    preloadbar.scale.setTo(3);
    this.load.setPreloadSprite(preloadbar);
    this.radarLogo = this.add.image(this.world.centerX, this.world.centerY - 220, 'radarLogo');
    this.radarLogo.anchor.setTo(0.5, 0.5);

    ///////////////LOAD GAME ASSETS///////////////
    this.game.load.image('space', 'images/menu_background.png');
    this.game.load.image('enemyBullet', 'images/bullet.png');
    this.game.load.image('player', 'images/flyingcat.png');
    this.game.load.image('eyes', 'images/lazer-eyes.png');
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
    this.game.load.audio('pew_audio', 'audio/pew.mp3');
    this.game.load.audio('wee_audio', 'audio/wee.mp3');
  },
  create: function create() {
    console.log('preload');
    // this.preloadBar.cropEnabled = false;
    game.time.events.add(Phaser.Timer.SECOND * 1, this.transition, this);
  },
  update: function update() {
    if (this.cache.isSoundDecoded('game_audio') && this.ready == false) {
      this.ready = true;
      // this.state.start('StartMenu');
    }
  },
  transition: function transition() {
    // start game
    this.game.state.start('MainMenu');
  }
};

//   update: function () {
//     this.ready = true;
//     this.game.state.start('MainMenu');
//   }
// };
//# sourceMappingURL=data:application/json;base64,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SUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbkQsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztHQUVwRDtBQUNELFFBQU0sRUFBRSxrQkFBVztBQUNqQixXQUFPLENBQUMsR0FBRyxDQUFFLFNBQVMsQ0FBQyxDQUFBOztBQUV2QixRQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDdEU7QUFDRCxRQUFNLEVBQUUsa0JBQVk7QUFDZCxRQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFFO0FBQy9ELFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztLQUVyQjtHQUNOO0FBQ0QsWUFBVSxFQUFHLHNCQUFXOztBQUV0QixRQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDbkM7Q0FDRixDQUFDIiwiZmlsZSI6InNyYy9qcy9QcmVsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHByZWxvYWRTdGF0ZSA9IHtcbiBwcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJlbG9hZGJhciA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLndvcmxkLmNlbnRlclgsIHRoaXMud29ybGQuY2VudGVyWSwgJ3ByZWxvYWRiYXInKTtcbiAgICBwcmVsb2FkYmFyLmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICBwcmVsb2FkYmFyLnNjYWxlLnNldFRvKDMpO1xuICAgIHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHByZWxvYWRiYXIpO1xuICAgIHRoaXMucmFkYXJMb2dvID0gdGhpcy5hZGQuaW1hZ2UodGhpcy53b3JsZC5jZW50ZXJYLCB0aGlzLndvcmxkLmNlbnRlclkgLTIyMCwgJ3JhZGFyTG9nbycpO1xuICAgIHRoaXMucmFkYXJMb2dvLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy9MT0FEIEdBTUUgQVNTRVRTLy8vLy8vLy8vLy8vLy8vXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3NwYWNlJywgJ2ltYWdlcy9tZW51X2JhY2tncm91bmQucG5nJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2VuZW15QnVsbGV0JywgJ2ltYWdlcy9idWxsZXQucG5nJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsJ2ltYWdlcy9mbHlpbmdjYXQucG5nJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2V5ZXMnLCdpbWFnZXMvbGF6ZXItZXllcy5wbmcnKTtcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnc3BhcmtsZWJ1dHQnLCAnaW1hZ2VzL3NwYXJrbGVidXR0Mi5wbmcnKTtcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnbGF6ZXJzJywgJ2ltYWdlcy9idWxsZXRPcmFuZ2UucG5nJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2V4cGxvZGUnLCAnaW1hZ2VzL2V4cGxvZGUucG5nJywgMTI4LCAxMjgsIDE2KTtcbiAgICB0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnZW5lbXknLCAnaW1hZ2VzL2RvZ2dyaWQucG5nJywgNzAsIDcwKTtcbiAgICB0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnbGF6ZXJCYWxsJywgJ2ltYWdlcy9wcmV0dHlMYXNlcmJhbGwucG5nJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2V4cGxvc2lvbkJpZycsICdpbWFnZXMvZXhwbG9kZUJpZy5wbmcnKTtcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhc1hNTCgnc3BhY2Vyb2NrJywgJ2ltYWdlcy9TcGFjZVJvY2sucG5nJywgJ2ltYWdlcy9TcGFjZVJvY2sueG1sJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ2V4cGxvc2lvbl9hdWRpbycsICdhdWRpby9leHBsb3Npb24ubXAzJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ2h1cnRfYXVkaW8nLCAnYXVkaW8vaHVydC5tcDMnKTtcbiAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnc2VsZWN0X2F1ZGlvJywgJ2F1ZGlvL3NlbGVjdC5tcDMnKTtcbiAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnZ2FtZV9hdWRpbycsICdhdWRpby9iZ20ubXAzJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ3Bld19hdWRpbycsICdhdWRpby9wZXcubXAzJyk7XG4gICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ3dlZV9hdWRpbycsICdhdWRpby93ZWUubXAzJyk7XG5cbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyggJ3ByZWxvYWQnKVxuICAgIC8vIHRoaXMucHJlbG9hZEJhci5jcm9wRW5hYmxlZCA9IGZhbHNlO1xuICAgIGdhbWUudGltZS5ldmVudHMuYWRkKFBoYXNlci5UaW1lci5TRUNPTkQgKiAxLCB0aGlzLnRyYW5zaXRpb24sIHRoaXMpO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYodGhpcy5jYWNoZS5pc1NvdW5kRGVjb2RlZCgnZ2FtZV9hdWRpbycpICYmIHRoaXMucmVhZHkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgLy8gdGhpcy5zdGF0ZS5zdGFydCgnU3RhcnRNZW51Jyk7XG4gICAgICAgIH1cbiAgfSxcbiAgdHJhbnNpdGlvbiA6IGZ1bmN0aW9uKCkge1xuICAgIC8vIHN0YXJ0IGdhbWVcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ01haW5NZW51Jyk7XG4gIH1cbn07XG5cblxuLy8gICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbi8vICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbi8vICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ01haW5NZW51Jyk7XG4vLyAgIH1cbi8vIH07XG5cbiJdfQ==
