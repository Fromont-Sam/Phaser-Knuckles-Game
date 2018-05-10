
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.0 (Phaser v2.6.2)


/**
 * Splashscreen.
 */
function Splashscreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
let Splashscreen_proto = Object.create(Phaser.State.prototype);
Splashscreen.prototype = Splashscreen_proto;
Splashscreen.prototype.constructor = Splashscreen;
let effect;
let kuckles, title;

Splashscreen.prototype.init = function () {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
};

Splashscreen.prototype.preload = function () {
	(gameOver) ? this.load.image('knuckles', 'assets/images/knucklesend.png') : this.load.image('knuckles', 'assets/images/knuckles.png');
	(gameOver) ? this.load.image('title', 'assets/images/titleend.png') : this.load.image('title', 'assets/images/title.png');
    this.load.image('background', 'assets/images/background.png');
};

Splashscreen.prototype.create = function () {
	this.add.tileSprite(0, 0, 1440, 810, 'background');

    effect = this.make.bitmapData();
    effect.load('knuckles');
	kuckles = this.add.sprite(this.world.centerX, this.world.centerY-150, effect);
	//Gravity center
    kuckles.anchor.set(0.5);
	
	title = this.add.sprite(175, 560, 'title');

	//Zoom effect
	//Parameters : propertie, duration, ease, autoStart, delay, repeat, yoyo
	this.add.tween(kuckles.scale).to( { x: 2, y: 2 }, 3000, Phaser.Easing.Quartic.InOut, true, 0, -1, true);
	//Inputs 
	this.input.keyboard.onPressCallback = function () {
		gameOver = false;
		this.game.state.start('Game');
	};
	//Loop
	this.time.events.loop(Phaser.Timer.SECOND * 0.75, function () { blink(title) }, this);
};

Splashscreen.prototype.update = function () {
	kuckles.rotation += 0.01;
};

/* --- end generated code --- */
// -- user code here --