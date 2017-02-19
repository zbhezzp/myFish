var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//鱼尾定时器，用来显示鱼尾的动画
	this.babyTailTimer=0;
	this.babyTailCount=0;
	//鱼眼睛
	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;
	//鱼身体
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
}
babyObj.prototype.draw=function(){
	//小鱼跟随大鱼
	this.x=mom.x+(this.x-mom.x)*0.993;	//比率：越大，速度越慢
	this.y=mom.y+(this.y-mom.y)*0.993;

	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;	//360°旋转
	this.angle=lerpAngle(beta,this.angle,0.6);

	//鱼尾计数工作
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;	//自循环
		this.babyTailTimer%=50;		//自循环，50为循环一次的时间
	}
	var babyTailCount=this.babyTailCount;
	
	//鱼眼睛
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0){	//闭眼，要睁开眼睛
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;	//睁开眼，要闭眼，眨眼
		}
	}
	var babyEyeCount=this.babyEyeCount;

	//鱼身体
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;	//计时器归0
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//游戏结束
			data.gameOver=true;
		}
	}
	var babyBodyCount=this.babyBodyCount;

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	ctx1.restore();


}