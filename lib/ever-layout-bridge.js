var socket = require("socket.io")();
var fs = require("fs");
var args = require("minimist")(process.argv.splice(2));

// Directory of layout files
var directory = args.dir;
if (! directory) directory = "Layouts";

// Listening port
var port = args.port;
if (! port) port = 3000;

// Make sure this directory exists
if (fs.existsSync(directory) == false)
{
	console.log("Could not find directory: " + directory);
	process.exit();
}

socket.on("connection" , function(client){
	console.log("Connected");

	client.emit("connection");

	client.on("disconnect" , function(){
		console.log("Disconnected");
	});

	client.on("report" , function(data){
		if (message = data.message)
		{
			console.log(message);
		}
	})
});

// Watch the layouts directory for changes
fs.watch(directory , function(event , filename){
	fs.readFile(directory + "/" + filename , function(err , data){
		if (err) return console.log("There was an error");
		console.log("Serving " + filename);
		// Parse the JSON from the file
		try 
		{
			socket.emit("layout-update" , {
				"layoutName": filename,
				"layout": data
			});
		}
		catch (e)
		{
			console.log("Error parsing JSON file");
		}
	});
});

socket.listen(port);
console.log("Listening on port " + port);