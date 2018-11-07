
$(function() {
	$(".change-devoured").on("click", function(event) {
		var id = $(this).data("id");
		var newDevoured = $(this).data("newdevoured");
		console.log($(this).data());

		var newDevouredState = {
			devoured: newDevoured
		};

		// Send the PUT request
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: newDevouredState
		}).then(
			function() {
				console.log("Changed devoured to", newDevoured);
				// reload the page to get the updated list
				location.reload();
				
			}
		);
	});

	$(".create-form").on("submit", function(event) {
		// make sure to precent default on submitting
		event.preventDefault();

		var newBurger = {
			burger_name: $("#bu").val().trim(),
			devoured: $("[name=devoured]:checked").val().trim()
		};

		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(
			function() {
				console.log("crated a new burger", newBurger);
				// relaod the page to update the list
				location.reload();
			}
		);
	});

	$(".delete-burger").on("click", function(event) {
		var id = $(this).data("id");

		// send the delelete request
		$.ajax("/api/burgers" + id, {
			type: "DELETE"
		}).then(
				function() {
					console.log("deleted burger", id);
					// relaod the page to update the list
					location.reload()
				}
		);
	});

});

