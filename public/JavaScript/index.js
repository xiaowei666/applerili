window.onload=function(){//注意：所有的代码哦度要写在这两个大括号内

var zhou_1 = document.getElementsByClassName('zhou_all'),
mouth = document.getElementsByClassName('mouth_all'),
jintian_s  = document.getElementsByClassName('tojintian'),

secend= document.getElementsByClassName('secend'),
mulus  = document.getElementById('mulus');
var day = ['周一','周二','周三','周四','周五','周六','周日'];
var zhou = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
var months=[],jiri = 1;

// -------------------------------------------------------------------
jintian_s[0].onclick = function(){
	console.log('aa');
	location.reload();
}
var ajax = function(e){
	var req = new XMLHttpRequest();
	req.open('get',e.url);
	req.send();
	req.onreadystatechange = function(){
		if(this.readyState == this.DONE && this.status == 200){
			e.success(this.response);
		}
	}

}

for(var i = 0 ; i < 7 ; i++){
	var zhouji = document.createElement('div');
	zhouji.setAttribute('class','zhouji');
	zhouji.innerHTML = day[i];
	zhou_1[0].appendChild(zhouji);
}
for(i = 0 ; i < 32 ;i++){
	if(i>0　&& i <32　){
		months.push(i);
	}
}
for(i=0;i < 48;i++){
	 var li = document.createElement('div');
	 li.setAttribute('class','liebiao');
	 li.style.top = 21*i+30+'px' ;
	 liebiao.appendChild(li);
}
for(i=0;i<25;i++){
	 var mulu = document.createElement('div');
	 mulu.setAttribute('class','mulu');
	 liebiao.appendChild(mulu);
	 mulu.style.top = (42*i)+34+'px';
	 mulu.innerHTML=i;
	 if( i == 12 ){
	 	mulu.innerHTML = '中午' ;
	 }else if(i == 0 ){
	 	mulu.innerHTML = '日程';
	 }else if(i == 24){
	 	mulu.innerHTML = '0';
	 }
}

var jintian = function(){
	var date = new Date();
	var year = date.getFullYear() ;
	var month= date.getMonth(); 
	var dayaa  = date.getDate();
	var timeid = year + '-' + (Number(month)+1) + '-' + dayaa ;
	return timeid; 
}
var dayaa = jintian();
console.log(dayaa);
var addclass = function(el,st){
	var tmp = el.getAttribute('class').split(' '); 
	var dict = {} ; 
	for(var i = 0 ; i < tmp.length ; i++ ){
		dict[tmp[i]] = true ;
	}
	if(!dict[st]){
		el.setAttribute('class',el.getAttribute('class')+' '+st);
	}
}
var removeclass = function(el,st){
	var tmp = el.getAttribute('class').split(' '); 
	var dict = {} ; 
	for(var i = 0 ; i < tmp.length ; i++ ){
		dict[tmp[i]] = true ;
	}
	delete dict[st];
	var ns = ' ';
	for(var name in dict){
		ns += name ; 
	}
	el.setAttribute('class',ns) ;
}
// 小日历点击处理-----------------------------------------------------
var 
todays= document.getElementById('today_this'),
days  = document.getElementsByClassName('everyday'),
rightricheng = document.getElementById('xuanzhong');
var 
previousl = document.getElementById('left'),
previousr = document.getElementById('right');
var targetYear , targetMonth , targetDate ; 
var curYear , curMonth , curDate;
var monthday = [31,28,31,30,31,30,31,31,30,31,30,31];
var date = new Date();

//画日历-------------------------------
var shangyige,dangqian,el ;
var draw = function(){
	var tmp = date.getDate();
	date.setDate(1);
	var xingqi = date.getDay();
	date.setDate(tmp);
	var upmonthday = monthday[date.getMonth()-1];
	if( date.getMonth() == 0 ){
		upmonthday = monthday[11]
	} 
	if( xingqi == 0 ){
		l = 6 ;
	}else{
		l=xingqi-1
	}
	for( i = 0 ; i < l; i++ ){							//上月
 		days[i].innerHTML = upmonthday-(l-i-1);
 		days[i].style.color = 'rgb(249, 107, 51)';
 		days[i].removeAttribute('id');
 		days[i].setAttribute('pr',true);
 	}
 	for(;i<monthday[date.getMonth()]+l;i++){
 		days[i].index = i ;
 		days[i].setAttribute('id','D'+(i-l+1));
 		days[i].innerHTML = (i-l+1);
 		days[i].style.color = 'black' ; 
 		days[i].removeAttribute('pr');
 		days[i].removeAttribute('nt');
 	}
 	cm = i;
 	for(;i<42;i++){
 		days[i].innerHTML = i-cm+1 ;
 		days[i].style.color = 'rgb(249, 107, 51)';
 		days[i].removeAttribute('id');
 		days[i].setAttribute('nt',true);
 	}
}
draw();
var  
years = document.getElementsByClassName('year_s'),
month = document.getElementsByClassName('month_s'),
day_s = document.getElementsByClassName('day_s');
var diyihang = document.getElementsByClassName('diyihang');
var everyday = document.getElementsByClassName('everyday');;
var photo = document.getElementsByClassName('photo');
var jintian = document.getElementsByClassName('jintian');
//左右键切换日期-------------------------------------------
var changedate = function(){			// 负责全局ui  日期变动这些ui 全会改变 ; 
	
	if(shangyige){
		shangyige.style.color='black';
	}else{
		dangqian = date.getDate();
		el = document.getElementById('D'+dangqian);
		console.log(date.getMonth());
		el.style.color = 'red';
		shangyige=el; 
	}
	for(i =0;i<2;i++){
		years[i].innerHTML = date.getFullYear();
		month[i].innerHTML = date.getMonth()+1;
		day_s[i].innerHTML = date.getDate();
	}
	todays.innerHTML = date.getDate();
 	rightricheng.innerHTML = zhou[date.getDay()];
 	var qq = function(){
 		return Number(years[1].innerHTML)+'_'+Number(month[1].innerHTML)+'_'+Number(day_s[1].innerHTML);
 	}
 	var xiangqing = document.getElementsByClassName('xiangqing');
 	var photo     = document.getElementsByClassName('photo');
 	var big_photo = document.getElementsByClassName('big_photo');
 	var photo_aa  = document.getElementsByClassName('photo_aa');
 	var guanbi	  = document.getElementsByClassName('guanbi');
	ajax({
		url:'http://localhost/jilu?time='+qq()+'&b=2',
		success:function(res){
			if( res !== 'none'){
				var res = JSON.parse(res);
				for(var i = 0 ; i < res.length ; i++){
					photo[i].style.background ='url(./images/da/'+res[i]+') no-repeat' ;
					photo[i].style.backgroundSize = 'cover';
					photo[i].index = i ; 
					photo[i].onclick = function(){
						photo_aa[0].style.backgroundImage = 'url(./images/da/'+res[this.index]+')';
						photo_aa[0].style.backgroundSize = 'cover';
						big_photo[0].style.display = 'block'; 
					}
					guanbi[0].onclick = function(){
						big_photo[0].style.display = 'none'; 
					}
				}
			}else{
				for(var i = 0 ; i < photo.length ; i++){
					photo[i].style.background = 'none';
				}
			}
		}
	});
}
changedate();
var isrunnian = function(year){
	if(year% 4 == 0 && year%400 != 0 || year%400 == 0  ){
		return true ; 
	}
}
var previousdayl = function(){				//-------head右箭头切换日期
	curYear = date.getFullYear();
	curMonth= date.getMonth();
	curDate = date.getDate();
	targetDate  = curDate - 1 ;
	if( targetDate == 0  ){
		targetYear  = curYear ; 
		targetMonth = curMonth - 1 ;
		if( targetMonth == -1){
			targetYear  = curYear - 1 ;
			targetMonth = 11;
		}
		if( targetMonth == 1 ){
			if( isrunnian(targetYear) ){
				monthday[1] = 29 ;
			}
		}
		targetDate = monthday[targetMonth] ;
	}else{
		targetYear  = curYear ;
		targetMonth = curMonth ;
	}
	date = new Date( targetYear,targetMonth,targetDate );
}
var previousdayr = function(){			//-------head右箭头切换日期
	curYear = date.getFullYear();
	curMonth= date.getMonth();
	curDate = date.getDate();
	targetDate  = curDate + 1 ;
	if( targetDate == monthday[targetMonth]+1  ){
		targetYear  = curYear ; 
		targetMonth = curMonth  ;
		if( targetMonth == 12){
			targetYear  = curYear + 1 ;
			targetMonth = 0;
		}
		if(targetMonth == 1 ){
			monthday[targetMonth];
		}
	}else{
		targetYear  = curYear ;
		targetMonth = curMonth ;
	}
	date = new Date( targetYear,targetMonth,targetDate );
}
previousl.onclick = function(){			//调用函数且切换ui
	previousdayl();
	draw();		
	changedate();
	
}
previousr.onclick = function(){			//调用函数且切换ui
	previousdayr();
	draw();	
	changedate();
}
// 更改 class--------------------------------------------------
// 点击日历-------------------------------------
for(i=0;i<days.length;i++){
	days[i].index = i ;
	days[i].onclick = function(){
		var a = date.getFullYear();
		var b = date.getMonth();
		var c = date.getDate();
 		if(this.hasAttribute('id')){
 			date.setDate(this.innerHTML);
 			changedate();
 		}else if(this.hasAttribute('pr')){
 			var z = Number(this.innerHTML);
 			var y = b-1;
 			var x = a ; 
	 		date = new Date(x,y,z);
 			draw();
 			changedate();
 		}else if(this.hasAttribute('nt')){
 			var z = Number(this.innerHTML);
 			var y = b+1;
 			var x = a ; 
 			if(y==1 && isrunnian(x)){
 				monthday[1]=29;
 			}
 			date = new Date(x,y,z);
 			draw();
 			changedate();
 		}
 		var a = date.getFullYear();
		var b = date.getMonth();
		var c = date.getDate();
 		var timeid2 = a+'-'+(Number(b)+Number(1))+'-'+Number(c);
 		// console.log(timeid2);
 		if(timeid2 == dayaa){
 			this.setAttribute('id','jintian');
 			this.style.color = 'white' ;
 		}else{
 			this.setAttribute('id','none');
 		}
 	}

}

//	1.鼠标经过 灰色
//	2.当前日期为粉色。点击为红色白字	不在时候为粉色黑字
//	3.点击箭头 背景灰色
//	4.六行变五行
//	5.红线，只有日期为今天才会变为红色
// 	npm install express -g
//  npm install express-generator  -g

var body = document.getElementById('body');
body.onmousedown = function(e){
	e.preventDefault();
}
var xingcheng = document.getElementsByClassName('xingcheng');
var time = document.getElementsByClassName('time');
var xing = setInterval( function(){
	var date = new Date();
	var H = date.getHours();
	var N = date.getMinutes();
	var S = date.getSeconds();

	var sec  = H*60*60+N*60+S;
	var baifenbi =Number(sec)/(24*60*60); 
	xingcheng[0].style.top =Math.floor(baifenbi*1017) +'px';
	var nian = date.getFullYear(),yue = date.getMonth()+1,ri = date.getDate();
	var cike = nian+'年'+yue+'月'+ri+'日';
	if(todays.innerHTML == date.getDate()){
		xingcheng[0].style.display = 'block';
	}else{
		xingcheng[0].style.display = 'none';
	}
	if(baifenbi>0.5){
		time[0].innerHTML = '下午' ;
	}else {
		time[0].innerHTML = '上午' ;
	}
},100);

};/*这里是结束的那个花括号*/