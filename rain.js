var light=[];
var lightX=[];
var lightY=[];
var randomX,randomY,randomX2,randomY2;
var resetLight=0;
window.addEventListener("load",function(){
	effect.start();
});
var effect={
	canvas:document.createElement("canvas"),
	start:function(){
		this.canvas.width=600;
		this.canvas.height=600;
		this.ctx=this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval=setInterval(updateEffect,20);
	},
	clear:function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}
function circle(x,y,radius)
{
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.draw=function(){
		effect.ctx.beginPath();
		effect.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		effect.ctx.strokeStyle="blue";
		effect.ctx.stroke();
	}
}
function updateEffect()
{
	effect.ctx.fillStyle="gray";
	effect.ctx.fillRect(0,0,600,600);
	for(let i=0;i<30;++i)
	{
		randomX=Math.floor(Math.random()*561);
		randomY=Math.floor(Math.random()*561);
		let count=0
		if(randomX==300 || randomY==300) count=1;
		for(let j=0;j<lightX.length;++j)
		{
			if(randomX==lightX[j])
			{
				count=1;
				break;
			}
		}
		if(count==0)
		{
			randomX2=Math.floor(Math.random()*40);
			randomY2=Math.floor(Math.random()*40);
			let createLight=new circle(randomX+randomX2,randomY+randomY2,0.5,0,2*Math.Pi);
			if(light.length < 600) 
			{
				light.push(createLight);
				lightX.push(randomX);
                lightY.push(randomY);				
			}
			else 
			{
				light[resetLight]=createLight;
				lightX[resetLight]=randomX;
				lightY[resetLight]=randomY;
				resetLight=(resetLight%600+1)%600;
				console.log(resetLight);
			}
		}
	}
	for(let i=0;i<light.length;++i)
	{	
        light[i].x=light[i].x+(light[i].x-300)/100;
		light[i].y=light[i].y+(light[i].y-300)/100;	
		if((light[i].x - lightX[i])*(light[i].x - lightX[i]) >= 50*50)
		{
			lightX=lightX.slice(i+1);
			lightY=lightY.slice(i+1);
		}
        light[i].radius+=1/20;	
		light[i].draw();
	}
}