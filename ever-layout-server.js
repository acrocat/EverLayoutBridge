var socket = require("socket.io")();
var fs = require("fs");

socket.on("connection" , function(client){
	console.log("Connected");

	client.emit("connection");

	client.on("disconnect" , function(){
		console.log("Disconnected");
	});
});

// Watch the layouts directory for changes
fs.watch("Layouts" , function(event , filename){
	fs.readFile("layouts/" + filename , function(err , data){
		if (err) return console.log("There was an error");
		console.log("Serving " + filename);

		// Parse the JSON from the file
		try 
		{
			socket.emit("layout-update" , {
				"layoutName": filename,
				"layout": JSON.parse(data)
			});
		}
		catch (e)
		{
			console.log("Error parsing JSON file");
		}
		
	});
});

socket.listen(3000);