var http = require('http');
var fs = require('fs');
/*Socket.IO既能在服务端也能在客户端工作，要使用它，必须将其添加到服务器端的JavaScript(Node.js)和客户端的JavaScript(JQuery)中，这是以为内通信通常是双向的，所以Sokcet.IO需要能在两边工作。*/
var server = http.createServer(function (req,res) {
	fs.readFile('./index.html',function (error,data) {
		res.writeHead('200',{'Content-Type':'text/html'});
		res.end(data,'utf-8')
	});
}).listen(3000,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
/*而且必须将Socket.IO库包含起来，才能加入Socket.IO的功能。*/
var io = require('socket.io').listen(server);
/*然后加入一个事件来响应客户端到底是连接了，还是断开了。事件如下：*/
io.sockets.on('connection',function(socket){
	console.log('User connected');
	socket.on('disconnect',function(){
		console.log('User disconnected');
	});
});

/*io.socket.on('connection',function (socket) {
	//发送单个用户
	socket.emit('message',{text:'你上线了'});
	//发送所有用户
	socket.broadcast.emit('message',{text:'你的好友XXX上线了'})
});*/
