var holeObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
}
holeObj.prototype.num=5;

holeObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}
//画大鱼喂小鱼的圈
holeObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>140){		//半径足够大， 则消失
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/140	//透明度和半径程反比
			//绘制
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.strokeStyle="rgba(230,45,255,"+ alpha +")";
			ctx1.stroke();	//如果定义了样式，则一定要绘制
			ctx1.closePath();
		}
	}
	ctx1.restore();
}
//出生
holeObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			//出生
			this.alive[i]=true;
			this.r[i]=60;	//半径
			this.x[i]=x;
			this.y[i]=y;
			return;
		}

	}
}