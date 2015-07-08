// // Initialize the game
// var SpaceCats = SpaceCats || {};
// SpaceCats.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
// // window.onload = function() {
// //   var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
// // game.state.add('Boot', SpaceCats.Boot);
// // game.state.add('Preload', SpaceCats.Preload);
// // game.state.add('MainMenu', SpaceCats.MainMenu);
// // game.state.add('Game', SpaceCats.Game);

// // game.state.start('Boot');

// // };

// SpaceCats.game.state.add('Boot', SpaceCats.Boot);
// SpaceCats.game.state.add('Preload', SpaceCats.Preload);
// SpaceCats.game.state.add('MainMenu', SpaceCats.MainMenu);
// SpaceCats.game.state.add('Game', SpaceCats.Game);

// SpaceCats.game.state.start('Boot');

'use strict';

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
game.state.add('Boot', bootState);
game.state.add('Preload', preloadState);
game.state.add('MainMenu', mainMenuState);
game.state.add('Game', gameState);
game.state.add('GameOver', gameOverState);

game.state.start('Boot');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDOztBQUUxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJzcmMvanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC8vIEluaXRpYWxpemUgdGhlIGdhbWVcbi8vIHZhciBTcGFjZUNhdHMgPSBTcGFjZUNhdHMgfHwge307XG4vLyBTcGFjZUNhdHMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBQaGFzZXIuQVVUTywgJ2dhbWVEaXYnKTtcbi8vIC8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vIC8vICAgdmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwgUGhhc2VyLkFVVE8sICdnYW1lRGl2Jyk7XG4vLyAvLyBnYW1lLnN0YXRlLmFkZCgnQm9vdCcsIFNwYWNlQ2F0cy5Cb290KTtcbi8vIC8vIGdhbWUuc3RhdGUuYWRkKCdQcmVsb2FkJywgU3BhY2VDYXRzLlByZWxvYWQpO1xuLy8gLy8gZ2FtZS5zdGF0ZS5hZGQoJ01haW5NZW51JywgU3BhY2VDYXRzLk1haW5NZW51KTtcbi8vIC8vIGdhbWUuc3RhdGUuYWRkKCdHYW1lJywgU3BhY2VDYXRzLkdhbWUpO1xuXG4vLyAvLyBnYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XG5cbi8vIC8vIH07XG5cblxuLy8gU3BhY2VDYXRzLmdhbWUuc3RhdGUuYWRkKCdCb290JywgU3BhY2VDYXRzLkJvb3QpO1xuLy8gU3BhY2VDYXRzLmdhbWUuc3RhdGUuYWRkKCdQcmVsb2FkJywgU3BhY2VDYXRzLlByZWxvYWQpO1xuLy8gU3BhY2VDYXRzLmdhbWUuc3RhdGUuYWRkKCdNYWluTWVudScsIFNwYWNlQ2F0cy5NYWluTWVudSk7XG4vLyBTcGFjZUNhdHMuZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBTcGFjZUNhdHMuR2FtZSk7XG5cbi8vIFNwYWNlQ2F0cy5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XG5cbnZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIFBoYXNlci5BVVRPLCAnZ2FtZURpdicpO1xuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBib290U3RhdGUpO1xuZ2FtZS5zdGF0ZS5hZGQoJ1ByZWxvYWQnLCBwcmVsb2FkU3RhdGUpO1xuZ2FtZS5zdGF0ZS5hZGQoJ01haW5NZW51JywgbWFpbk1lbnVTdGF0ZSk7XG5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIGdhbWVTdGF0ZSk7XG5nYW1lLnN0YXRlLmFkZCgnR2FtZU92ZXInLCBnYW1lT3ZlclN0YXRlKTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xuXG4iXX0=
