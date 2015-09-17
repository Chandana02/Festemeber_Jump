var canvas = document.getElementById("screen");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

var obstacles_above=[];
var obstacles_below=[];
// var widths = []
// var heights = [],y_coordinates = [];
var png = ["images/car-02_72x33.png", "images/postbox1_30x55.png", "images/bush_51x27.png", "images/signboard32x80.png", "images/cone-02_38x32.png"];
/*for(q=0;q<5;q++)
{
	widths[q]=png[q].width;
	heights[q]=png[q].height;
	y_coordinates[q]=ch-png[q].height;
}*/
var widths=[72,30,51,32,38];
var heights=[33,55,27,80,32];
var ch=window.innerHeight;
var cw=window.innerWidth;
var y_coordinates=[ch-33,ch-55,ch-27,ch-80,ch-32];
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
var lives = [], life, no_lives=4, life_loss = 0;
var BUFFER_OBSTACLE_SPACE = cw/4;
var jump_sound = new Audio("sounds/CanonShoot.wav");
var collision_sound = new Audio("sounds/explosion.wav");
var bg_sound = new Audio("sounds/bg.wav");
var obstacles = [];
var pw = 30; //pavementWidth
var ph = 22;  //pavementHeight
var widthsprite = 95*2;
var heightsprite = 78;
for(u=0;u<5;u++)
{
	obstacles[u] = new Image();
	obstacles[u].src = png[u];
}

var thief = new Image();
thief.src = "images/b2_190x78.png";
var buyer = new Image();
buyer.src = "images/thief.png";

function line(width, height, color) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = wallspace;
	this.y = 0;
}

l = new line(cw-2*wallspace, 10, "blue");

function create_player(options)
{
	var xyz = {},
			//frameIndex = 0,
			tickCount = 0,
			f=0,
			ha=0;
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
			xyz.numberOfFrames = options.numberOfFrames;
			xyz.frameIndex = 0;
			xyz.context = options.context;
			xyz.width = options.width;
			xyz.height = options.height;
			xyz.image = options.image;
			xyz.frames = options.frames;
			xyz.x = options.x;
			xyz.y = options.y;
			xyz.ini = options.ini;
			xyz.JUMP_ACTIVATE = 0;
			xyz.t=0;
			xyz.v=8;
			xyz.playerindex = options.playerindex; 
			xyz.update = function() 
			{
	            tickCount += 1;
	            if (tickCount > ticksPerFrame) 
	            {
	            	//console.log(frameIndex);
					tickCount = 0;
	                //if(xyz.playerindex==0)
	                {
	                if(xyz.frameIndex==0 || xyz.frameIndex==1 || xyz.frameIndex==2)
	                	xyz.frameIndex=3;
	                else if(xyz.frameIndex==3 && ha==0)
	                	{xyz.frameIndex=1;ha=1;}
	                else if(xyz.frameIndex==3 && ha==1)
	                	{xyz.frameIndex=0;ha=0;}
	                if(xyz.JUMP_ACTIVATE==1)
           			{
           				xyz.frameIndex=2;
           			}
           			//console.log(xyz.frameIndex);

	            	}	
	            	/*else 
	            	{
	            		//console.log(frameIndex);
	            		if(xyz.frameIndex==3 || xyz.frameIndex==2 || xyz.frameIndex==1)
	                	xyz.frameIndex=0;
	                else if(xyz.frameIndex==0 && f==0)
	                	{xyz.frameIndex=2;f=1;}
	                else if(xyz.frameIndex==0 && f==1)
	                	{xyz.frameIndex=3;f=0;}
	                if(xyz.JUMP_ACTIVATE==1)
           			{
           				xyz.frameIndex=1;
           			}
           		//	console.log(xyz.frameIndex);
	            	}*/	
	                
	                       
           		}
           		

        	};

        	xyz.jump = function() 
        	{
				if(this.t==0)
					jump_sound.play();
				if(this.t==120)
				{
					this.t=0;
				}
				else if(this.t>=25)	
				{
					this.y+=this.v;
					this.v+=0.02;
				}
				else 
				{
					this.v-=0.10;
					this.y-=this.v;
				}
				if(this.y>=this.ini)
				{
					this.JUMP_ACTIVATE = 0;
					this.y=this.ini;
				}
				this.t++;
				
			};
		
			xyz.render = function () 
			{
				// xyz.context.save();
			 //  	xyz.context.fillStyle = 'rgba(0,0,0,.6)';
			 //  	xyz.context.fillRect(xyz.x,xyz.y, xyz.width / xyz.numberOfFrames, xyz.height);
			 //  	xyz.context.restore();

				// xyz.context.save();
			 //  	xyz.context.translate(xyz.x, xyz.y);
			 //  	if(xyz.playerindex == 1) {
			 //    	xyz.context.scale(-1,1);
			 //    	xyz.context.translate(-xyz.width/xyz.numberOfFrames,0);
			 //  	}
			  	xyz.context.drawImage(
			    xyz.image,											//img source
			    xyz.frameIndex * (xyz.width / numberOfFrames),			//sx
			    f*xyz.height/xyz.frames,									//sy
			    xyz.width / numberOfFrames,						//sw
			    xyz.height / xyz.frames,									//sh
			    xyz.x,												//wx
			    xyz.y,													//wy
			    xyz.width / numberOfFrames,						//ww
			    xyz.height/xyz.frames);
			    //xyz.context.restore();										//wh
			};
		
		return xyz;
}

player = create_player({
		context: canvas.getContext("2d"),
		width: widthsprite,
		height: heightsprite,
		image:	buyer,
		numberOfFrames: 4,
		frames: 1,
		ticksPerFrame: 15,
		x: wallspace+20,
		y: ch/2-heightsprite-ph,
		ini: ch/2-ph-heightsprite,
		playerindex:0
});

player1 = create_player({
		context: canvas.getContext("2d"),
		width: widthsprite,
		height: heightsprite,
		image:	thief,
		numberOfFrames: 4,
		frames: 1,
		ticksPerFrame: 15,
		x: cw-wallspace-widthsprite/4-20,
		y: ch-heightsprite-ph,
		ini: ch-ph-heightsprite,
		playerindex:1
});





function create_obstacle(options)
{
	var ob = {};
			
			ob.context = options.context;
			ob.width = options.width;
			ob.height = options.height;
			ob.image = options.image;
			ob.x = options.x;
			ob.y = options.y;
		
			ob.render = function () 
			{
				ob.context.drawImage(
			    ob.image,												//sh
			    ob.x,												//wx
			    ob.y		
			    );									
			};
		
		return ob;
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
       		// if(BUFFER_OBSTACLE_SPACE>=cw/7)
       		BUFFER_OBSTACLE_SPACE-=2;
	       	k1=Math.floor(Math.random()*5);
	       	obstacle = create_obstacle({
			context: canvas.getContext("2d"),
			width: widths[k1],
			height: heights[k1],
			image:	obstacles[k1],
			x: wallspace,
			y: y_coordinates[k1]-ph
			});	
	       	obstacles_below.push(obstacle);
       	}

	}

	if(t==n)
	{
		var last_obstacle = obstacles_above[ obstacles_above.length-1 ];
		if(!last_obstacle || cw - (last_obstacle.x + last_obstacle.width) >= wallspace+BUFFER_OBSTACLE_SPACE ) 
		{
			// if(BUFFER_OBSTACLE_SPACE>=cw/7)
			BUFFER_OBSTACLE_SPACE-=2;
			k=Math.floor(Math.random()*5);
			obstacle1 = create_obstacle({
			context: canvas.getContext("2d"),
			width: widths[k],
			height: heights[k],
			image:	obstacles[k],
			x: cw-widths[k]-wallspace,
			y: y_coordinates[k]-ch/2-ph
			});
			obstacles_above.push(obstacle1);
		}
	}
	
	i=0;
	player.render();
	player1.render();
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, wallspace, ch);
	ctx.fillRect(cw-wallspace, 0, wallspace, ch);
		
	while(i<obstacles_above.length)
	{
		if(obstacles_above[0].x<=wallspace)
		{
			obstacles_above.shift();
			a1--;
			s=0;
		}
		
		if(obstacles_above[0].x+obstacles_above[0].width<=player.x&&s==0) 
		{
			score+=10;
			a1++;
			s=1;
		}
		obstacle=obstacles_above[i];
		obstacle.x-=3;
		obstacle.render();
		i++;
	}

	i=0;
	
	while(i<obstacles_below.length)
	{
		if(obstacles_below[0].x+obstacles_below[0].width>=cw-wallspace)
		{
			obstacles_below.shift();
			a2--;
			s=0;
		}

		if(obstacles_below[0].x>=player1.x+player1.width&&s==0)
		{
			score+=10;
			a2++;
			s=1;
		}
		obstacle=obstacles_below[i];
		obstacle.x+=3;
		obstacle.render();
		i++;
	}
	t++;
}

function create_lives(x, y) {
	this.x = x;
	this.y = y;
}



function check_collision()
{
	for(i=0;i<obstacles_above.length;i++)
	 	{

		 if(player.x+widthsprite/player.numberOfFrames>=obstacles_above[i].x &&
		 	player.y+heightsprite/player.frames>=obstacles_above[i].y &&
		 	player.x<=obstacles_above[i].x+obstacles_above[i].width)
			{
				no_lives--;
				obstacles_above=[];
				obstacles_below=[];
			}
		}
		
		for(ji=0;ji<obstacles_below.length;ji++)
		{
			if(player1.x<=obstacles_below[ji].x+obstacles_below[ji].width &&
				player1.y+heightsprite/player1.frames>=obstacles_below[ji].y &&
				player1.x+widthsprite/player1.numberOfFrames>=obstacles_below[ji].x)
			{
				var _ = player1.x<=obstacles_below[ji].x+obstacles_below[ji].width,
					__ = player1.y+heightsprite/player1.frames>=obstacles_below[ji].y,
					___ = player1.x+widthsprite/player1.numberOfFrames>=obstacles_below[ji].x
				//alert("Dead!" + _ + __ + ___);
				no_lives--;
				obstacles_below=[];
				obstacles_above=[];
			}
		}
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
	ctx.fillStyle = "yellow";
	ctx.fillRect(l.x, l.y, player.x-wallspace, l.height);
	ctx.fillStyle = "red";
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
		try_again("Sorry! You lost! Better luck next time :P");

		window.onkeydown = function (e) {
			if(e.keyCode == 32)
				location.reload();
		}
	}
}

var vsx = 0;
var img = new Image();
img.src = 'images/brick-02_30x22.png';
function render_pavement() {

    for(u=0;u<40;u++)
    {
    	ctx.drawImage(img, 0, 0, img.width , img.height, wallspace+u*img.width, ch/2 - img.height, img.width - vsx, img.height);
    	ctx.drawImage(img, 0, 0, img.width , img.height, wallspace+u*img.width, ch - img.height, img.width - vsx, img.height);
    }
   
}


var vsx1 = 0;
var bg1 = new Image();
bg1.src = 'images/bg1.png';
function render_background()
{
	 
    ctx.drawImage(bg1, vsx1, 0, bg1.width - vsx1, bg1.height, wallspace, 0, bg1.width - vsx1, bg1.height);
    ctx.drawImage(bg1, 0, 0, bg1.width, bg1.height, wallspace + bg1.width - vsx1, 0, bg1.width, bg1.height);
    ctx.drawImage(bg1, 0, 0, bg1.width, bg1.height, wallspace + 2 * bg1.width - vsx1, 0, bg1.width, bg1.height);

    ctx.drawImage(bg1, 0, 0, bg1.width, bg1.height, wallspace + vsx1, ch/2, bg1.width, bg1.height);
    ctx.drawImage(bg1, 0, 0, bg1.width, bg1.height, wallspace + vsx1 + bg1.width, ch/2, bg1.width, bg1.height);
    ctx.drawImage(bg1, bg1.width - vsx1, 0, vsx1 , bg1.height, wallspace, ch/2, vsx1, bg1.height);
   
    vsx1 += 2;
    if(vsx1 >= bg1.width) {
        vsx1 = 0;
    }
}

function try_again(str)
{
	divtag=document.createElement('div');
	divtag.id = "again";
	divtag.style.height=window.innerHeight;
	divtag.style.width=window.innerWidth;
	divtag.style.backgroundColor="black";
	divtag.style.opacity="0.8";
	divtag.style.position = "absolute";
	divtag.style.left = "0px";
	divtag.style.top = "0px";
	divtag.style.fontSize = "40px";
	divtag.style.color = "white";
	divtag.style.fontFamily = "Comic Sans MS";
	divtag.align = "center";
	divtag.innerHTML = "Your score is:" + score + "<br>" + str + "<br> Press SPACEBAR to continue<br>";
	document.body.appendChild(divtag);
	share = document.createElement('img');
	share.src = 'images/facebookshare.jpeg';
	share.width = 70;
	share.height = 20;
	share.onclick = function() {
		FB.ui({
		  method: 'share',
		  name: "Just Jump",
		  link: "http://games.festember.com/just-jump/",
		  
		  description: "I scored " + score + ". Can you beat this?"});
};
document.getElementById("again").appendChild(share);

	like = document.createElement('img');
	like.src = 'images/like.jpeg';
	like.width = 70;
	like.height = 20;
	like.onclick = function() {
		FB.ui({
		  method: 'like',
		  name: "Just Jump",
		  link: "http://games.festember.com/just-jump/",
		  
		  description: "I scored " + score + ". Can you beat this?"});
};
document.getElementById("again").appendChild(like);

	//document.getElementById("again").appendChild(but);
}

//bg_sound.play();
bg = 1;

if(bg == 1) { 
	start_Game();
}


		
function start_Game() {
//ga('send', 'pageview');
	
	if(GAME_OVER!=1&&no_lives!=0) {
			requestAnimationFrame(start_Game);
			// bg_sound.play();
			bg = 1;
			ctx.clearRect(0,0,cw,ch);
			render_background();
			render_pavement();
			make_obstacle();
			check_collision();
			write_score();
			closeness();
			check_no_lives();
			draw_lives();
			player.update();
			player1.update();
			if(player.JUMP_ACTIVATE!=0)
			{
				player.jump();
				player.x+=(window.innerWidth/10000)*5;
			}
			if(player1.JUMP_ACTIVATE!=0)
			{
				player1.jump();
				player1.x-=(window.innerWidth/10000)*5;
			}
			if(player.x>=player1.x) {
				GAME_OVER = 1;
				try_again("You win! Wanna play again?");
				 window.onkeydown = function (e) {
				if(e.keyCode == 32)
				location.reload();
				}

			}
	}
}


window.onkeydown = function(event) 
{
	e=event.keyCode;
	if(e==65)
	{
		if(player.y==player.ini)
		{
			player.v=8;
			player.JUMP_ACTIVATE = 1;
			player.t=0;
		}
	}
	else if(e==76)
	{
		if(player1.y==player1.ini)
		{
			player1.JUMP_ACTIVATE = 1;
			player1.t=0;
			player1.v=8;
		}
	}
}


