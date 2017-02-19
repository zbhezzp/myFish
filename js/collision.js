//判断大鱼和果实的距离
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive){
				//计算距离
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					//果实被吃掉
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){
						data.double=2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				} 
			}
		}
	}
}

//大鱼喂小鱼
function monBabyCollision(){
	if(data.fruitNum>0 && !data.gameOver){
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			baby.babyBodyCount=0;
			//喂了后，大鱼的能量消失
			data.addScore();
			data.reset();
			mom.momBodyCount=0;
			hole.born(baby.x,baby.y);
		}
	}
}