// Initialize the game
var SpaceCats = SpaceCats || {};
SpaceCats.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');

SpaceCats.game.state.add('Boot', SpaceCats.Boot);
SpaceCats.game.state.add('Preload', SpaceCats.Preload);
SpaceCats.game.state.add('MainMenu', SpaceCats.MainMenu);
SpaceCats.game.state.add('Game', SpaceCats.Game);

SpaceCats.game.state.start('Boot');


