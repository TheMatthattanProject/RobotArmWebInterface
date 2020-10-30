var port = "9090"

var baseURL = 'ws://' + window.location.host;

var parsedURL = baseURL.substring(0, baseURL.lastIndexOf(':')) + ":" + port;

console.log(parsedURL);

var ros = new ROSLIB.Ros(
    {
        url: parsedURL
    }
)
//Connected
ros.on('connection', function(){
    console.log('Connected to websocket server.')
});

//Error handling
ros.on('error', function(error){
    console.log('Bit of a problem: ', error);
});


//Closing
ros.on('close', function(){
    console.log('Connection to websocket server has closed.')
});






//Bulk of program
//Topic

function movePart(partName, amount)
{
    var cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: "/" + partName + "/command",
        messageType: "std_msgs/Float64"

    });

    //Message
    var move = new ROSLIB.Message({
        data: amount*(Math.PI/180)
    });

    //Move test
    cmdVel.publish(move);
	console.log(move);
}
