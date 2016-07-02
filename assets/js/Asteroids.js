BasicGame.Asteroids = function(game) {
  this.cursors;
  this.player;
  this.bg;
}

BasicGame.Asteroids.prototype = {
  create: function () {
    this.add.tileSprite(0, 0, 1920, 1920, 'background');

    this.world.setBounds(0, 0, 1920, 1920);

    this.physics.startSystem(Phaser.Physics.P2JS);

    this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');

    this.physics.p2.enable(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera.follow(this.player);
	},
	update: function () {
    this.player.body.setZeroVelocity();

    if (this.cursors.up.isDown) {
        this.player.body.moveUp(300)
    }
    else if (this.cursors.down.isDown) {
        this.player.body.moveDown(300);
    }

    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -300;
    }
    else if (this.cursors.right.isDown) {
        this.player.body.moveRight(300);
    }
	}
};
