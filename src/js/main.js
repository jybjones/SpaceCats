// Initialize Phaser
var game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameDiv',
  {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var background;
var cursors;
var bank;

var ACCELERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;


function preload() {
    game.load.image('starfield', 'images/menu_background.png');
    game.load.image('ship','images/flyingcat.png');
}

function create() {
    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 900, 700, 'starfield');

     //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //  Scroll the background
    starfield.tilePosition.y += 2;

    //  Reset the player, then check for movement keys
    player.body.acceleration.x = 0;

     if (cursors.left.isDown)
    {
        player.body.acceleration.x = -ACCELERATION;
    }
    else if (cursors.right.isDown)
    {
        player.body.acceleration.x = ACCELERATION;
    }

    // stop at the screen edges//
    if (player.x > game.width -50) {
      player.x = game.width -50;
      player.body.acceleration.x = 0;
    }
    if (player.x < 50) {
      player.x =50;
      player.body.acceleration.x = 0;
    }
    //  Squish and rotate ship for illusion of "banking"
    bank = player.body.velocity.x / MAXSPEED;
    player.scale.x = 1 - Math.abs(bank) / 2;
    player.angle = bank * 10;
}


function render() {

}

game.state.start('Game');
