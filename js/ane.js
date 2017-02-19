var aneObj=function(){
	this.rootx=[];	//起始点  控制点可以用起始点求出来
	this.headx=[];	//结束点
	this.heady=[];	//结束点
	this.alpha=0;	//角度
	this.amp=[];	//振幅
}

aneObj.prototype.num=50;	//海葵的个数
aneObj.prototype.init=function(){	//初始化
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;	//x的位置
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+25;	//摆动幅度
	}
}
aneObj.prototype.draw=function(){	//开始绘制海葵
	this.alpha+=deltaTime*0.001;
	var l=Math.sin(this.alpha);	//正弦值  为了让海葵来回摆动
	ctx2.save();
	ctx2.globalAlpha=0.6;	//透明度
	ctx2.lineWidth=20;		//线宽度
	ctx2.lineCap="round";		//线结束样式
	ctx2.strokeStyle="#3b154e";	//颜色  紫色
	for(var i=0;i<this.num;i++){
		//beginPath开始绘制   moveTo开始点  lineTo结束点 stroke绘制  strokeStyle绘制样式  globalAlpha透明度
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);	//起始点
		//ctx2.lineTo(this.x[i],canHeight-this.len[i]);	//结束点
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();		//这一段样式只在这两个函数之间有效
}
