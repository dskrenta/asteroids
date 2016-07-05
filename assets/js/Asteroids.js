BasicGame.Asteroids = function(game) {
  this.cursors;
  this.player;
  this.bg;
  this.asteroids;
  this.fireButton;
  this.weapon;
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
    this.player.scale.setTo(1.5, 1.5);

    //this.physics.p2.enable(this.player);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.enableBody = true;

    this.player.body.drag.set(70);
    this.player.body.maxVelocity.set(200);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1);

    // sprite collisions
    //this.player.body.checkCollision.up = true;
    //this.player.body.checkCollision.down = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    /*
    // asteroids sprite group
    this.asteroids = this.add.group();
    this.asteroids.enableBody = true;

    for (var i = 0; i < 100; i++) {
      var asteroid = this.asteroids.create(this.world.randomX, this.world.randomY, 'asteroid3');
      asteroid.name = `asteroid${i}`;
      var randomScale = (1 + Math.random() * 4);
      asteroid.scale.setTo(randomScale, randomScale);
      asteroid.body.collideWorldBounds = true;
      asteroid.body.bounce.setTo(0.8, 0.8);
      asteroid.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
      this.physics.enable(asteroid, Phaser.Physics.ARCADE);
      this.physics.arcade.collide(asteroid, this.player, this.collisionHandler, null, this);
      //this.asteroids.create(this.world.randomX, this.world.randomY, 'asteroid3');
      //this.asteroids.scale.setTo(2, 2);
      //this.asteroids.body.collideWorldBounds = true;
      //this.asteroids.body.bounce.setTo(0.8, 0.8);
      //this.asteroids.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    }
    */

    this.asteroids();

    // weapon stuff

    this.weapon = this.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100;

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weapon.trackSprite(this.player, 0, 0, true);

	},
	update: function () {
    // collisions
    this.physics.arcade.overlap(this.player, this.asteroids, this.collisionHandler, null, this);

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

    if (this.fireButton.isDown) {
      this.weapon.fire();
    }
	},
  collisionHandler: function(weapon, asteroid) {
    console.log('collision occured');
  },
  asteroids: function() {
    this.asteroids = this.add.physicsGroup();
    this.asteroids.enableBody = true;

    for(var i = 0; i < 100; i++) {
      var x = this.rnd.between(0, 5000);
      var y = this.rnd.between(0, 5000);
      var scale = this.rnd.between(1, 4);
      var randomAngularVelocity = this.rnd.between(-30, 30);
      var spriteImg = `asteroid${this.rnd.between(1, 3)}`;

      var asteroid = this.asteroids.create(x, y, spriteImg);
      asteroid.name = `asteroid${i}`;
      asteroid.scale.setTo(scale, scale);
      asteroid.body.collideWorldBounds = true;
      asteroid.body.bounce.setTo(0.8, 0.8);
      asteroid.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
      asteroid.body.angularVelocity = randomAngularVelocity;
      asteroid.body.mass = 100;

      this.physics.arcade.enable(asteroid);
    }
  }
};
