var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
game.state.add('Boot', bootState);
game.state.add('Preload', preloadState);
game.state.add('MainMenu', mainMenuState);
game.state.add('Game', gameState);
game.state.add('GameOver', gameOverState);

game.state.start('Boot');

