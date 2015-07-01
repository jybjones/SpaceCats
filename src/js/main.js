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

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
game.state.add('Boot', bootState);
game.state.add('Preload', preloadState);
game.state.add('MainMenu', mainMenuState);
game.state.add('Game', gameState);

game.state.start('Boot');
