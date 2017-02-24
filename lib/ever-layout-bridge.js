var http = require('http');
var fs = require("fs");
var url = require("url");
var args = require("minimist")(process.argv.splice(2));

// Directory of layout files
var layoutDirectory = args.layouts;
if (! layoutDirectory) layoutDirectory = "Layouts";

// Directory of images
var imageDirectory = args.images
if (! imageDirectory) imageDirectory = "Images"

// Listening port
var port = args.port;
if (! port) port = 3000;

var server = http.createServer(function(req , res){
	var request = url.parse(req.url , true);
	var action = request.pathname;
	console.log(action);

	var imagePath = imageDirectory + action;
	if (fs.existsSync(imagePath)) {
		var image = fs.readFileSync("images" + action);
		console.log("Serving image " + action);
		res.end(image , "binary");
	} else {
		console.log("Couldn't find an image named " + action);
		res.end();
	}
});

// Make sure this directory exists
if (fs.existsSync(layoutDirectory) == false) {
	console.log("Could not find directory: " + layoutDirectory);
	process.exit();
}

if (fs.existsSync(imageDirectory) == false) {
	console.log("Could not find the images directory: " + imageDirectory);
	console.log("Images cannot be served.")
}

// Create sockets
var socket = require("socket.io")(server);
socket.on("connection" , function(client){
	console.log("Connected");

	client.emit("connection");

	client.on("disconnect" , function(){
		console.log("Disconnected");
	});

	client.on("report" , function(data){
		if (message = data.message) {
			console.log(message);
		}
	})
});

// Watch the layouts directory for changes
fs.watch(layoutDirectory , function(event , filename){
	fs.readFile(layoutDirectory + "/" + filename , function(err , data){
		if (err) return console.log("There was an error");
		console.log("Serving " + filename);
		// Parse the JSON from the file
		socket.emit("layout-update" , {
			"layoutName": filename,
			"layout": data
		});
	});
});


server.listen(port);
console.log("Listening on port " + port);