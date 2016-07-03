BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar

		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

	    this.load.image('tetris1', 'sprites/tetrisblock1.png');
	    this.load.image('tetris2', 'sprites/tetrisblock2.png');
	    this.load.image('tetris3', 'sprites/tetrisblock3.png');
	    this.load.image('hotdog', 'sprites/hotdog.png');
	    this.load.image('starfield', 'skies/deep-space.jpg');

			this.load.image('background', 'test/debug-grid-1920x1920.png');
			//this.load.image('player', 'sprites/hotdog.png');
			this.load.image('player', 'sprites/ship.png');

			this.load.image('asteroid1', 'sprites/asteroid1.png');
			this.load.image('asteroid2', 'sprites/asteroid2.png');
			this.load.image('asteroid3', 'sprites/asteroid3.png');

	},

	create: function () {

		//this.state.start('MainMenu');
		this.state.start('Asteroids');

	}

};
