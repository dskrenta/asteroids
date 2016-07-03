BasicGame.Asteroids = function(game) {
  this.cursors;
  this.player;
  this.bg;
  this.asteroids;
}

BasicGame.Asteroids.prototype = {
  create: function () {
    //this.add.tileSprite(0, 0, 1920, 1920, 'background');
    this.add.tileSprite(0, 0, 5000, 5000, 'starfield');
    //this.world.setBounds(0, 0, 1920, 1920);
    this.world.setBounds(0, 0, 5000, 5000);

    //this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');
    this.player.anchor.set(0.5);

    //this.physics.p2.enable(this.player);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.drag.set(70);
    this.player.body.maxVelocity.set(200);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

    // asteroids sprite group
    this.asteroids = this.add.group();

    for (var i = 0; i < 500; i++) {
        this.asteroids.create(1 + Math.random() * 5000, 1 + Math.random() * 5000, 'asteroid3');
        this.asteroids.scale.setTo(2, 2);
    }
	},
	update: function () {
    if (this.cursors.up.isDown) {
        this.physics.arcade.accelerationFromRotation(this.player.rotation, 200, this.player.body.acceleration);
    }
    else {
        this.player.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown) {
        this.player.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown) {
        this.player.body.angularVelocity = 200;
    }
    else {
        this.player.body.angularVelocity = 0;
    }
	}
};
