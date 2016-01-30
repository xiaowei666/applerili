
var express = require('express');
var app = express();
var http= require('http').Server(app);
app.use(express.static('public'));



var fs = require('fs');
var photocase = {} ;
fs.readdir('./public/images/da/',function(err,files){
	// console.log(files);	//这是一个数组
	for(var i = 0 ; i < files.length ; i ++ ){
		fs.stat('./public/images/da/'+files[i],(function(i){
			return	function(err,info){		//参数和信息
				// console.log(info);
				var time = info.mtime ;
				var key  = time.getFullYear()+'_'+(time.getMonth()+1)+'_'+time.getDate() ; 
				// console.log(key);
				if( !photocase[key] ){
					photocase[key]=[];
				}
				photocase[key].push(files[i]);
				// console.log(photocase,'photocase');
			}

		})(i));
	}
	
});


app.get('/jilu',function(req,res){
	var plus ={
		1448496000000:[' aa1.jpg',' bb1.jpg',' cc1.jpg'],
		1448323200000:[' a1.jpg' ,' a2.jpg' ,' a3.jpg'],
		1448409600000:[' b1.jpg' ,' b2.jpg' ,' b3.jpg'],
		1448236800000:[' c1.jpg',' c2.jpg',' c3.jpg']
	};
	console.log(req.query.time);
	if(photocase[req.query.time]){
		res.json(photocase[req.query.time]);
	
	}else{
		res.send('none');
	}
	
		
});
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
http.listen(80,function(){
	console.log('listening on *:80');
});


//res.json() 用来发送一个数组 或者是对象 或者是数组包含对象

//res.send() 发送 字符串 之类的

//res.sendFile() 发送文件之类的

