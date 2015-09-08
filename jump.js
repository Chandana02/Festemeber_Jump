var canvas = document.getElementById("screen");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

var obstacles_above=[];
var obstacles_below=[];
var widths=[20,30,25,20,30,25,45,15,65,45];
var heights=[35,35,40,30,40,40,20,55,10,45];
var ch=window.innerHeight;
var cw=window.innerWidth;
var y_coordinates=[ch-35,ch-35,ch-40,ch-30,ch-40,ch-40,ch-20,ch-55,ch-10,ch-45];
var radius = 10;
var player;
var player1;
var j;
var score=0;
var setAnimation;
var GAME_OVER = 0;
var s=0;
var a1=0,a2=0;
var wallspace = window.innerWidth/8;
var l;
var lives = [], life, no_lives=3, life_loss = 0;
var BUFFER_OBSTACLE_SPACE = 300;
var jump_sound = new Audio("jump.wav");
var collision_sound = new Audio("collision2.wav");


function line(width, height, color) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = wallspace;
	this.y = 0;
}

l = new line(cw-2*wallspace, 10, "blue");

function create_player(x,y,color,ini)
{
	this.x=x;
	this.y=y;
	this.color=color;
	this.initial = ini;
	this.JUMP_ACTIVATE = 0;
	this.t=0;
	this.v=4;
}

function create_lives(x, y) {
	this.x = x;
	this.y = y;
}

create_player.prototype.jump = function()
{
	
	jump_sound.play();
	if(this.t==120)
	{
		this.t=0;
	}
	else if(this.t>=30)	
	{
		
		this.y+=this.v;
		this.v+=0.03;
	}
	else 
	{
		this.v-=0.09;
		this.y-=this.v;
	}
	if(this.y>=this.initial)
	{
		this.JUMP_ACTIVATE = 0;
		this.y=this.initial
	}
	this.t++;
	
}

function calculate_distance(pl, ob)
{
	z1=pl.x;
	z2=pl.y;
	z3=ob.x;
	z4=ob.y;
	z5=ob.x+ob.width;
	y1=(z4-z2)*(z4-z2);
	if(z1<z3)
	{
		x1=(z3-z1)*(z3-z1);
		r=Math.sqrt(x1+y1);
	}
	else
	{
		x2=(z5-z1)*(z5-z1);
		r=Math.sqrt(x2+y1);
	}
	return r;
}

function check_collision()
{
	 	for(i=0;i<obstacles_above.length;i++)
	 	{

		 if(player.x+radius>=obstacles_above[i].x&&player.y+radius>=obstacles_above[i].y&&player.x-radius<=obstacles_above[i].x+obstacles_above[i].width)
			{
				dist=calculate_distance(player, obstacles_above[i]);
				if(dist<=radius) {
					no_lives--;
					obstacles_above=[];
					obstacles_below=[];
					collision_sound.play();
					//lose_life();
					//life_loss = 1;
					//GAME_OVER=0;
					break;
				}
				no_lives--;
				obstacles_above=[];
				obstacles_below=[];
				collision_sound.play();
				//lose_life();
				//life_loss = 1;
				//GAME_OVER=0;
			}
	}
		
		for(ji=0;ji<obstacles_below.length;ji++)
		{
			if(player1.x-radius<=obstacles_below[ji].x+obstacles_below[ji].width&&player1.y+radius>=obstacles_below[ji].y&&player1.x+radius>=obstacles_below[ji].x)
			{
				dist=calculate_distance(player1, obstacles_below[ji]);
				if(dist<=radius) {
					no_lives--;
					obstacles_below=[];
					obstacles_above=[];
					collision_sound.play();
					//lose_life();
					//life_loss = 1;
					//GAME_OVER=0;
					break;
				}
				no_lives--;
				obstacles_below=[];
				obstacles_above=[];
				collision_sound.play();
				//lose_life();
				//life_loss = 1;
				//GAME_OVER=0;
			}
	}
}

function create_obstacle(x,y,height,width)
{
	this.x=x;
	this.y=y;
	this.height=height;
	this.width=width;
}

player = new create_player(wallspace+20+radius,ch/2-radius,'yellow',ch/2-radius);
player1 = new create_player(cw-wallspace-radius-20,ch-radius,'red',ch-radius);

function draw_player()
{
	ctx.beginPath();
	ctx.fillStyle=player.color;
	ctx.arc(player.x,player.y, radius, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.fillStyle = player1.color;
	ctx.arc(player1.x, player1.y, radius, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,ch/2);
	ctx.lineTo(cw,ch/2);
	ctx.stroke();
}

var t=0;
var m,n;

function make_obstacle()
{
	m = Math.floor((Math.random() * 20) + 1);
    n = Math.floor((Math.random() * 20) + 1);
    if(t==20)
     	t=0;
    if(t==m) 
    {
       	var last_obstacle = obstacles_below[ obstacles_below.length-1 ];
       	if(!last_obstacle ||last_obstacle.x >= wallspace+BUFFER_OBSTACLE_SPACE ) 
       	{
       		BUFFER_OBSTACLE_SPACE-=4;
	       	k1=Math.floor(Math.random()*10);
	       	obstacle = new create_obstacle(wallspace+10,y_coordinates[k1],heights[k1],widths[k1]);
	       	obstacles_below.push(obstacle);
       	}

	}

	if(t==n)
	{
		var last_obstacle = obstacles_above[ obstacles_above.length-1 ];
		if(!last_obstacle || cw - (last_obstacle.x + last_obstacle.width) >= wallspace+BUFFER_OBSTACLE_SPACE ) 
		{
			BUFFER_OBSTACLE_SPACE-=4;
			k=Math.floor(Math.random()*10);
			obstacle1 = new create_obstacle((cw-10-wallspace),y_coordinates[k]-ch/2,heights[k],widths[k]);
			obstacles_above.push(obstacle1);
		}
	}
	
	i=0;
	ctx.clearRect(0,0,cw,ch);
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, wallspace, ch);
	ctx.fillRect(cw-wallspace, 0, wallspace, ch);
	draw_player();
	
		
		
	while(i<obstacles_above.length)
	{
		if(obstacles_above[0].x+obstacles_above[0].width<=wallspace)
		{
			obstacles_above.shift();
			a1--;
			s=0;
		}
		
		if(obstacles_above[0].x+obstacles_above[0].width<=player.x-radius&&s==0) 
		{
			score++;
			a1++;
			s=1;
		}
		obstacle=obstacles_above[i];
		obstacle.x-=2;
		draw_obstacle(obstacle);
		i++;
	}

	i=0;
	
	while(i<obstacles_below.length)
	{
		if(obstacles_below[0].x>=cw-wallspace)
		{
			obstacles_below.shift();
			a2--;
			s=0;
		}

		if(obstacles_below[0].x>=player1.x+radius&&s==0)
		{
			score++;
			a2++;
			s=1;
		}
		obstacle=obstacles_below[i];
		obstacle.x+=2;
		draw_obstacle(obstacle);
		i++;
	}
	t++;
}

function draw_obstacle(obstacle)
{
	ctx.fillStyle="black";
	ctx.fillRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);
}

function write_score()
{
	ctx.font = "40px Georgia";
	ctx.fillStyle = "black";
	ctx.fillText(score, cw-wallspace-50, 50);
	ctx.fill();
}

function closeness() {
	ctx.fillStyle = l.color;
	ctx.fillRect(l.x, l.y, l.width, l.height);
	ctx.fillStyle = player.color;
	ctx.fillRect(l.x, l.y, player.x-wallspace, l.height);
	ctx.fillStyle = player1.color;
	ctx.fillRect(player1.x, l.y, cw-wallspace-player1.x, l.height);
}

live_lives();
draw_lives();

function live_lives() {
	for(var li=0; li<no_lives; li++) {
		life = new create_lives(wallspace+20+20*li, l.height+20);
		lives.push(life);
	}
}

function draw_lives() {
	for(var li=0; li<no_lives; li++) {
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(lives[li].x,lives[li].y, 5, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

function check_no_lives() {
	if(no_lives==0) {
		GAME_OVER = 1;
		try_again("Sorry! You lost! Better luck next time :P" + "<br><br> <button id=\"but\">Try again</button>", "but");

	}
}

draw_player();

function try_again(str, id)
{
	divtag=document.createElement('div');
	divtag.style.height=window.innerHeight;
	divtag.style.width=window.innerWidth;
	divtag.style.backgroundColor="black";
	divtag.style.opacity="0.8";
	divtag.style.position = "absolute";
	divtag.style.left = "0px";
	divtag.style.top = "0px";
	divtag.style.fontSize = "100px";
	divtag.style.color = "white";
	divtag.align = "center";
	divtag.innerHTML = str;
	document.body.appendChild(divtag);
	but = document.getElementById(id);
	but.style.backgroundColor = "black";
	but.style.width = "150px";
	but.style.height = "50px";
	but.style.fontSize = "30px";
	but.style.color = "white";  
	but.onclick = function() {location.reload();}
}

setAnimation = requestAnimationFrame(function()
 {
	if(GAME_OVER!=1&&no_lives!=0) {
			requestAnimationFrame(arguments.callee);
			
			make_obstacle();
			check_collision();
			write_score();
			closeness();
			check_no_lives();
			draw_lives();
			if(player.JUMP_ACTIVATE!=0)
			{
				player.jump();
				player.x+=(window.innerWidth/10000)*3;
			}
			if(player1.JUMP_ACTIVATE!=0)
			{
				player1.jump();
				player1.x-=(window.innerWidth/10000)*3;
			}
			if(player.x>=player1.x) {
				GAME_OVER = 1;
				try_again("You win! Wanna play again? <br><br> <button id=\"play\">Play again</button>", "play");

			}
	}
 });


window.onkeydown = function(event) 
{
	e=event.keyCode;
	if(e==65)
	{
		if(player.y==player.initial)
		{
			player.v=4;
			player.JUMP_ACTIVATE = 1;
			player.t=0;
		}
	}
	else if(e==76)
	{
		if(player1.y==player1.initial)
		{
			player1.JUMP_ACTIVATE = 1;
			player1.t=0;
			player1.v=4;
		}
	}
}
