function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnName = $('<h2 class="column-name">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnRename = $('<button class="btn-rename">rename column</button>');

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnRename.click(function(){
			self.renameColumn();
		});

		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
		        url: baseUrl + '/card',
		        method: 'POST',
		        data: {
		            name: cardName,
    				bootcamp_kanban_column_id: self.id
		        },
		        success: function(response) {
		            var card = new Card(response.id, cardName, self.id);
        			self.createCard(card);
		        }
		    });
		});

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnName)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList)
			.append(columnRename);
			return column;
		}
}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},

	deleteColumn: function() {
    var self = this;
	    $.ajax({
	      url: baseUrl + '/column/' + self.id,
	      method: 'DELETE',
	      success: function(response){
	        self.element.remove();
	      }
	    });
	},

	renameColumn: function() {
		var self = this;
		var newColumnName = prompt("Enter new name of the column");
		event.preventDefault();
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
		        name: newColumnName
		    },
		    success: function(response) {
		        $(self.element).find(".column-name").text(newColumnName);
		    }

		});

	}

};



