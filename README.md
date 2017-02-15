# EverLayout Bridge

EverLayout Bridge is a basic web server which sends layout files to iOS Apps running 
EverLayout. 

You can find more info on EverLayout [here](https://github.com/acrocat/EverLayout)

## Installation

` npm install -g ever-layout-bridge`

# Usage

Navigate to your project directory and run

`ever-layout-bridge`

By default EverLayout Bridge will listen on port `3000` and monitor `./Layouts` for file changes. You can change the port and layout directory by passing arguments.

`ever-layout-bridge --port=1234 --dir="my-layouts/"`

When the server detects a change in one of your layout files, it will send the data to all connected clients via sockets.