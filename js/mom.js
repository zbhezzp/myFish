var momObj=function(){
	this.x;
	this.y;
	this.angle;
	//鱼尾定时器，用来显示鱼尾的动画
	this.momTailTimer=0;
	this.momTailCount=0;
	//鱼眼睛
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;
}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
}
momObj.prototype.draw=function(){
	//鱼随着鼠标移动
	this.x=mx+(this.x-mx)*0.99;	//比率：越大，速度越慢
	this.y=my+(this.y-my)*0.99;

	//鱼旋转角度,大鱼的角度跟随鼠标的角度
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;	//360°旋转
	this.angle=lerpAngle(beta,this.angle,0.6);	//commonFunction里面的函数，用于求旋转角度

	//大鱼尾巴
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	var momTailCount=this.momTailCount;

	//鱼眼睛
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;

		if(this.momEyeCount==0){	//闭眼，要睁开眼睛
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=300;	//睁开眼，要闭眼，眨眼
		}
	}
	var momEyeCount=this.momEyeCount;

	var momBodyCount=this.momBodyCount;
	

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	if(data.double==1){		
		//绘制橙色
		ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
	}else{
		//绘制蓝色
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}