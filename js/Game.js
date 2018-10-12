function Game() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
let Game_proto = Object.create(Phaser.State.prototype);
let player, text, health, points;
let healthText, pointsText;
let isColliding;
let group;
let enemies = [];
Game.prototype.constructor = Game;

Game.prototype.init = function () {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
};

Game.prototype.preload = function () {
	this.load.image('grass', 'assets/images/grass.png');
	this.load.image('text', 'assets/images/text.png');
	this.load.image('knuckles', 'assets/images/knuckles.png');
	this.load.spritesheet('player', 'assets/images/player.png', 112, 93, 3);
	this.load.spritesheet('enemy', 'assets/images/enemy.png', 112, 93, 3);
	this.load.bitmapFont('bubble', 'assets/fonts/BubbleGum.png', 'assets/fonts/BubbleGum.fnt');
};

Game.prototype.create = function () {
	this.add.tileSprite(0, 0, 1440, 810, 'grass');
	this.input.keyboard.onPressCallback = null;
	//Init
	health = 3, points=0;
	enemies = [];
	isColliding = false;

	//Setting physics
	this.physics.startSystem(Phaser.Physics.ARCADE);

	//Displaying player
	player = this.add.sprite(40, 310, 'player');
    player.animations.add('run');
	this.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.body.setCircle(30, 25, 20)

	//Displaying health
	healthText = this.add.text(20, 20, 'Health : 3', { font: "48px bubble", fill: "#ea3737" });
	pointsText = this.add.text(1300, 700, '0', { font: "48px bubble", fill: "#fed521" });

	//Displaying text
	text = this.add.sprite(55, 666, 'text');
	text.alpha = 0;
	this.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
	//Spawning enemies
	this.time.events.repeat(Phaser.Timer.SECOND, 20, createBox, this);
	this.time.events.loop(100, addPoints, this);
};

Game.prototype.update = function () {
	//this.game.debug.body(player);
	if(gameOver) {
		return;
	}
	//Colliding tests
	for (let i = 0; i < enemies.length; i++) {
		this.game.debug.body(enemies[i]);
		if (this.physics.arcade.overlap(player, enemies[i]) && !isColliding) {
			isColliding = true;
			this.time.events.add(Phaser.Timer.SECOND * 2.6, function() { isColliding = false; }, this);
			this.time.events.repeat(Phaser.Timer.SECOND * 0.1, 26, function() { player.visible = !player.visible; }, this);
			health -= 1;
			healthText.text = 'Health : ' + health;
			if(health<=0) {
				gameOver = true;
				this.game.state.start('Splashscreen');
			}
			break;
		}
	}
	//Inputs
	var vertical = true;
	var horizontal = true;
	if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
		player.x -= 4;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
		player.x += 4;
	}
	else {
		vertical = false;
	}

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
		player.y -= 4;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
		player.y += 4;
	}
	else {
		horizontal = false;
	}
	if(!vertical && !horizontal) {
		player.frame = 0;
		player.animations.stop();
	}
	else {
		player.animations.play('run', 9, true);
	}
};

function createBox() {
	if(gameOver) {
		return;
	}
	//Init sprites
	sprite = this.add.sprite(this.world.randomX, this.world.randomY, 'enemy');
    sprite.animations.add('run');
    sprite.animations.play('run', 9, true);
    this.physics.arcade.enable(sprite);
	sprite.body.collideWorldBounds = true;
	//Hitbox and speed
	sprite.body.setCircle(30, 25, 20);
    sprite.body.bounce.set(1);
	sprite.body.velocity.x = this.rnd.realInRange(-200, 200);
	sprite.body.velocity.y = this.rnd.realInRange(-200, 200);
	enemies.push(sprite);
	//Display sprites in front
	this.world.bringToTop(player);
	this.world.bringToTop(healthText);
	this.world.bringToTop(pointsText);
}

function addPoints() {
	points += 1;
	pointsText.text = points+"";
}
