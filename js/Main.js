var gameOver = false;

window.onload = function() {
	var game = new Phaser.Game(1440, 810, Phaser.AUTO);

	game.state.add('Splashscreen', Splashscreen);
	game.state.add('Game', Game);
	
	game.state.start('Splashscreen');
};

function blink(component) {
	component.visible = !component.visible;
}