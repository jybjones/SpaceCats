var mainMenuState = {
    create: function() {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        // Defining variables
        var gameTitleStyle = { font: "38px Arial", fill: "#00ff00" };
        var commonStyle = { font: "20px Arial", fill: "#00ff00" };

        // Adding a text centered on the screen
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
        this.background.autoScroll(-60, -20);
        var gameTitle = this.game.add.text( game.world.width/2, game.world.height/4, "SPACE CATS", gameTitleStyle );
        gameTitle.anchor.setTo(0.5, 0.5);

        var radarLogo = this.game.add.sprite(game.world.width/2, game.world.height/2.2, 'radarLogo');
        radarLogo.anchor.setTo(0.5, 0.5);

        var radarLogoAnimation = game.add.tween( radarLogo );
        radarLogoAnimation.to({angle: 360}, 3000);//Set the animation to change the angle of the sprite to 360° in 1000 milliseconds
        radarLogoAnimation.loop( true );
        radarLogoAnimation.start();

        var startText = this.game.add.text( game.world.width/2, game.world.height/1.5, "Press space to start", commonStyle );
        startText.anchor.setTo(0.5, 0.5);
    },

    // Start the actual game
    start: function() {
        this.game.state.start('Game');
    }
};
