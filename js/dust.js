var dustObj=function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.No=[];
	this.alpha;
}

dustObj.prototype.num=30;

dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=20+Math.random()*20;
		this.No[i]=Math.floor(Math.random()*7);	//[0-7) -> [0-6] 
	}
	this.alpha=0;
}

dustObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.001;	//要和海葵摆动地节奏一样
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var no=this.No[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
	}
}
