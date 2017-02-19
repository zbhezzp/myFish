var fruitObj=function(){
	this.alive=[]; //boolean 是否存活
	this.x=[];
	this.y=[];
	this.l=[];
	this.aneNo=[]; 	//记录海葵号
	this.speed=[];
	this.fruitType=[];		//设置果实类型
	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;	//果实的数量
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNo[i]=0;
		this.speed[i]=Math.random()*0.017+0.003;	//果实成长速度和漂浮速度
		this.fruitType[i]="";
	}
	this.orange.src="./images/fruit.png";	//黄色的果实
	this.blue.src="./images/blue.png";		//蓝色的果实
}
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//画果实 先找到一个海葵
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			if(this.l[i]<=14){	//控制大小，不能一直变大
				var aneNo=this.aneNo[i];	//摆动海葵
				this.x[i]=ane.headx[aneNo];	//摆动海葵
				this.y[i]=ane.heady[aneNo];	//摆动海葵
				this.l[i]+=this.speed[i]*deltaTime;
			}else{		//到达一定大小后，就漂浮上去
				this.y[i]-=this.speed[i]*7*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);	//因为画图是从0,0开始的，所以要减去圆半径
			if(this.y[i]<10){		//如果超出屏幕，则死亡
				this.alive[i]=false;
			}
		}
	}	
}
fruitObj.prototype.born=function(i){ 
	//随机找一个海葵，并且记录
	//var aneId=Math.floor(Math.random()*ane.num);
	// this.x[i]=ane.rootx[aneId];
	// this.y[i]=ane.heady[aneId];	//平滑地生长
	this.aneNo[i]=Math.floor(Math.random()*ane.num);	//摆动地生长
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.15){	//控制蓝色果实出生的几率
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
	
}

//监控果实的数量
function fruitMonitor(){
	var num=0;		//存活数量
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;	
		}
	}
	if(num<15){
		sendFruit();
		return;
	}
}
//生长果实
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);	//果实出生
			return;		
		}
	}
}

//果实被吃
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}