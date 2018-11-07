var express = require("express");

var router = express.Router();

// import the burger model

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
	burger.all(function(data) {
		var hbsObject = {
			burgers: data
		}
		console.log(hbsObject);
		res.render("index", hbsObject)

	});
});

router.post("/api/burgers", function(req, res) {
	burger.create([
		"burger_name", "devoured"
	], [
		req.body.burger_name, req.body.devoured
	], function(result) {
		// send back the id of the new quote
		res.json({id: result.insertId});
	});
});

router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	console.log("req.body", req.body);

	burger.update({
		devoured: req.body.devoured
	}, condition, function(result) {
		if (result.changedRows == 0) {
			// if no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

router.delete("/api/burgers/:id", function(req, res) {
	var condition = "id = "  + req.params.id;

	burger.delete(condition, function(result) {
		if (result.affectedRows == 0) {
			// if no rows were changted, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;