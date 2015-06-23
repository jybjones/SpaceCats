// Initialize the game
var SpaceCats = SpaceCats || {};
SpaceCats.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceCats.game.state.add('Boot', SpaceCats.Boot);
SpaceCats.game.state.add('Preload', SpaceCats.Preload);
SpaceCats.game.state.add('MainMenu', SpaceCats.MainMenu);
SpaceCats.game.state.add('Game', SpaceCats.Game);

SpaceCats.game.state.start('Boot');


// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv',
//   {preload: preload, create: create, update: update, render: render});

// var player;
// var starfield;
// var background;
// var cursors;
// var bank;
// var catTrail;
// var lazers;
// var fireButton;
// var lazerTimer = 0;

// var ACCELERATION = 400;
// var DRAG = 300;
// var MAXSPEED = 400;


// function preload() {
//     game.load.image('starfield', 'images/menu_background.png');
//     game.load.image('ship','images/flyingcat.png');
//     game.load.image('sparklebutt', 'images/sparklebutt2.png');
//     game.load.image('lazers', 'images/lazer-eyes.png')
// }

// function create() {
//     //  The scrolling starfield background
//     starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

//     //  Our lazer group
//     lazers = game.add.group();
//     lazers.enableBody = true;
//     lazers.physicsBodyType = Phaser.Physics.ARCADE;
//     lazers.createMultiple(20, 'lazers');
//     lazers.setAll('anchor.x', .5);
//     lazers.setAll('anchor.y', .5);
//     lazers.setAll('outOfBoundsKill', true);
//     lazers.setAll('checkWorldBounds', true);

//      //  The player
//     player = game.add.sprite(400, 500, 'ship');
//     player.anchor.setTo(0.5, 0.5);
//     game.physics.enable(player, Phaser.Physics.ARCADE);
//     player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
//     player.body.drag.setTo(DRAG, DRAG);

//     //  And some controls to play the game with
//     cursors = game.input.keyboard.createCursorKeys();
//     fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//     // emitter for catbutt sparkletbutt
//     catTrail = game.add.emitter(player.x, player.y + 50, 400);
//     catTrail.width =10;
//     catTrail.makeParticles('sparklebutt');
//     catTrail.setXSpeed(20, -20);
//     catTrail.setYSpeed(100, 90);
//     catTrail.setRotation(125, -125);
//     // catTrail.setAlpha(1, 0.01, 800);
//     catTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
//     catTrail.start(false, 5000, 10);
// }

// function update() {
//     //  Scroll the background
//     starfield.tilePosition.y += 2;

//     //  Reset the player, then check for movement keys
//     player.body.acceleration.x = 0;

//      if (cursors.left.isDown)
//     {
//         player.body.acceleration.x = -ACCELERATION;
//     }
//     else if (cursors.right.isDown)
//     {
//         player.body.acceleration.x = ACCELERATION;
//     }

//     // stop at the screen edges//
//     if (player.x > game.width -50) {
//       player.x = game.width -50;
//       player.body.acceleration.x = 0;
//     }
//     if (player.x < 50) {
//       player.x = 50;
//       player.body.acceleration.x = 0;
//     }

//    // Fire Lazers//
//    if (fireButton.isDown || game.input.activePointer.isDown) {
//     fireLazers();
//    }

//     //  Move ship towards mouse pointer
//     if (game.input.x < game.width - 20 &&
//         game.input.x > 20 &&
//         game.input.y > 20 &&
//         game.input.y < game.height - 20) {
//         var minDist = 200;
//         var dist = game.input.x - player.x;
//         player.body.velocity.x = MAXSPEED * game.math.clamp(dist / minDist, -1, 1);
//     }

//     //  Squish and rotate ship for illusion of "banking"
//     bank = player.body.velocity.x / MAXSPEED;
//     player.scale.x = 1 - Math.abs(bank) / 3;
//     player.angle = bank * 70;
//     ////higher the number the more he can turn
//     ////keep the trail lined up with the butt
//     catTrail.x = player.x;
// }


// function render() {

// }

// function fireLazers() {
//     //  To avoid them being allowed to fire too fast we set a time limit
//     if (game.time.now > lazerTimer)
//     {
//         var LAZER_SPEED = 400;
//         var LAZER_SPACING = 250;
//         //  Grab the first lazer we can from the pool
//         var lazer = lazers.getFirstExists(false);

//         if (lazer)
//         {
//             //  And fire it
//             //  Make lazer come out of tip of ship with right angle
//             var lazerOffset = 20 * Math.sin(game.math.degToRad(player.angle));
//             lazer.reset(player.x + lazerOffset, player.y);
//             lazer.angle = player.angle;
//             game.physics.arcade.velocityFromAngle(lazer.angle - 90, LAZER_SPEED, lazer.body.velocity);
//             lazer.body.velocity.x += player.body.velocity.x;

//             lazerTimer = game.time.now + LAZER_SPACING;
//         }
//     }
// }
// game.state.start('Game');
