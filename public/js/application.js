// key codes
// p = 80; q = 81

function Player(name, keycode) {
	this.name = name;
	this.keycode = keycode;
	this.currentCell = $('tr#' + this.name).find('.active');
}

Player.prototype = {
	advance: function() {
		var img = this.currentCell.html();
		this.currentCell.removeClass('active');
		this.currentCell.empty();
		this.currentCell.next().addClass('active');
		this.currentCell.next().append(img);
	}
}

var players = [];
var playing = true;

function Game() {
	this.play = function () {
		$(document).on("keyup", function(event) {
			if(playing) {
				for(i = 0; i < players.length; i++) {
					if(event.which === players[i].keycode) {
						players[i].advance();
						players[i].currentCell = $('tr#' + players[i].name).find('.active');
					}
				}
				for(i = 0; i < players.length; i++) {
					if(players[i].currentCell.is("td:last-child")) {
						var winner = players[i].name;
						$.post('/winner', {winner: winner}, function(result){
							$('.race').append(result);
						});
						playing = false;
					}
				}
			}	
		});
	}
}

$(document).ready(function() {
	var keycodes = [81, 80, 82, 83, 84, 85, 86, 87]; 
	i = 0;
	$('tr').each(function() {
		var name = $(this).attr('id');
		var keycode = keycodes[i];
		players.push(new Player(name, keycode));
		$('.legend #' + name + '_keycode').text(String.fromCharCode(keycode));	
		i++;
	});
	
	game = new Game();
	game.play();
});
