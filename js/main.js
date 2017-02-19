document.body.onload=game;

var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var daltaTime;

var bgPic=new Image();		//背景图片
	
var ane;	//海葵
var fruit;	//果实
var mom;	//大鱼
var baby;	//小鱼

var mx;		//鼠标x坐标
var my;		//鼠标y坐标

var babyTail=[];  //定义小鱼尾巴
var babyEye=[];	//定义小鱼眼睛
var babyBody=[];	//定义小鱼身体

var momTail=[];	//定义大鱼尾巴
var momEye=[];	//定义大鱼眼睛
var momBodyOrange=[];	//定义大鱼身体
var momBodyBlue=[];	//定义大鱼身体

var data;	//分值数据

var wave;	//画特效圈
var hole;	//画大鱼喂小鱼的圈

var dust;	//漂浮物
var dustPic=[];

function game(){
	//游戏初始化
	init();
	lastTime=Date.now();
	daltaTime=0;
	gameloop();
}

function init(){
	//获得canvas context
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext('2d');	//绘制鱼，UI，特效

	can2=document.getElementById("canvas2");
	ctx2=can2.getContext('2d');	//绘制背景

	can1.addEventListener('mousemove', onMouseMove,false);

	bgPic.src="./images/background.jpg";

	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();	//绘制海葵
	ane.init();

	fruit=new fruitObj();	//绘制果实
	fruit.init();

	mom=new momObj();	//绘制大鱼
	mom.init();

	baby=new babyObj();		//绘制小鱼
	baby.init();

	data=new dataObj();		

	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0;i<8;i++){		//设定鱼尾巴的数组
		babyTail[i]=new Image();
		babyTail[i].src="./images/babyTail"+i+".png";
		momTail[i]=new Image();			//大鱼尾巴
		momTail[i].src="./images/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){		//设定鱼眼睛的数组
		babyEye[i]=new Image();
		babyEye[i].src="./images/babyEye"+i+".png";
		momEye[i]=new Image();		//大鱼眼睛
		momEye[i].src="./images/bigEye"+i+".png";
	}
	for(var i=0;i<20;i++){		//设定鱼身体颜色变化
		babyBody[i]=new Image();
		babyBody[i].src="./images/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){		//设定大鱼身体两种样式的变化
		momBodyOrange[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOrange[i].src="./images/bigSwim"+i+".png";
		momBodyBlue[i].src="./images/bigSwimBlue"+i+".png";
	}

	//本应该在data里面写的，但是为了简化资源，就放在Init里面，用于绘制分数
	ctx1.fillStyle="white";
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";

	wave=new waveObj();
	wave.init();

	hole=new holeObj();
	hole.init();

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./images/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);		//智能计算，根据计算机的性能决定刷新时间
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40){
		deltaTime=40;
	}
	//console.log(deltaTime);  保证匀速运动
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);		//清除
	mom.draw();
	baby.draw();
	momFruitsCollision();
	monBabyCollision();

	data.draw();	//游戏数值的更新
	wave.draw();		//画小圈
	hole.draw();	//画大圈

	dust.draw();	//漂浮物
}
//游戏鼠标移动
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
			mx=e.offsetX==undefined? e.layerX:e.offsetX;
			my=e.offsetY==undefined? e.layerY:e.offsetY;
		}
	}
}