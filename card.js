// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();
	this.columnId = columnId;

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardName = $('<p class="card-name"></p>');
		var cardRenameBtn = $('<button class="btn-rename">rename card</button>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardRenameBtn.click(function(){
			self.renameCard();
		});

		card.append(cardDeleteBtn, cardRenameBtn);
		cardName.text(self.name);
		card.append(cardName)
		return card;
	}
}


Card.prototype = {
	removeCard: function() {
	    var self = this;
	    $.ajax({
	    	url: baseUrl + '/card/' + self.id,
	    	method: 'DELETE',
	    	success: function() {
	    		self.element.remove();
	      	}
	    });
	},

	renameCard: function() {
		var self = this;
		var newCardName = prompt("Enter new name of the card");
		event.preventDefault();
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
		        name: newCardName,
		        bootcamp_kanban_column_id: self.columnId
		    },
		    success: function(response) {
		        $(self.element).find(".card-name").text(newCardName);
		    }

		});

	}
}
