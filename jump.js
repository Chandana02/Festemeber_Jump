(function(){function H(b){var a={},c=0,d=0;ticksPerFrame=b.m||0;numberOfFrames=b.h||1;a.h=b.h;a.a=0;a.context=b.context;a.width=b.width;a.height=b.height;a.b=b.b;a.frames=b.frames;a.x=b.x;a.y=b.y;a.f=b.f;a.g=0;a.t=0;a.c=8;a.j=b.j;a.update=function(){c+=1;c>ticksPerFrame&&(c=0,0==a.a||1==a.a||2==a.a?a.a=3:3==a.a&&0==d?d=a.a=1:3==a.a&&1==d&&(d=a.a=0),1==a.g&&(a.a=2))};a.l=function(){0==this.t&&W.play();120==this.t?this.t=0:25<=this.t?(this.y+=this.c,this.c+=.02):(this.c-=.1,this.y-=this.c);this.y>=
this.f&&(this.g=0,this.y=this.f);this.t++};a.i=function(){a.context.drawImage(a.b,a.width/numberOfFrames*a.a,0*a.height/a.frames,a.width/numberOfFrames,a.height/a.frames,a.x,a.y,a.width/numberOfFrames,a.height/a.frames)};return a}function I(b){var a={};a.context=b.context;a.width=b.width;a.height=b.height;a.b=b.b;a.x=b.x;a.y=b.y;a.i=function(){a.context.drawImage(a.b,a.x,a.y)};return a}function X(b,a){this.x=b;this.y=a}function J(){for(var b=0;b<v;b++)d.fillStyle="black",d.beginPath(),d.arc(F[b].x,
F[b].y,5,0,2*Math.PI),d.fill(),d.stroke()}function K(b){divtag=document.createElement("div");divtag.id="again";divtag.style.height=window.innerHeight;divtag.style.width=window.innerWidth;divtag.style.backgroundColor="black";divtag.style.opacity="0.8";divtag.style.position="absolute";divtag.style.left="0px";divtag.style.top="0px";divtag.style.fontSize="40px";divtag.style.color="white";divtag.style.fontFamily="Comic Sans MS";divtag.align="center";divtag.innerHTML="Your score is:"+w+"<br>"+b+"<br> Press SPACEBAR to continue<br>";
"You win! Wanna play again?"==b&&(divtag.style.backgroundColor="green");document.body.appendChild(divtag);ref=document.createElement("a");ref.id="ref";share=document.createElement("img");share.src="images/facebookshare.jpeg";share.width=70;share.height=20;share.style.position="absolute";share.style.left=r/2;share.style.top=l/2;share.style.zIndex=999;document.getElementById("again").appendChild(ref);document.getElementById("ref").appendChild(share);share.onclick=function(){ref.href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgames.festember.com%2Fjust-jump";
ref.title="Facebook";ref.target="_BLANK"};b=document.createElement("iframe");b.id="one";b.src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2Fgames.festember.com%2Fjust-jump&layout=button_count&show_faces=false&width=90&action=like&colorscheme=light";b.scrolling="no";b.frameBorder=0;b.allowTransparency="true";b.style.border="none";b.style.overflow="hidden";b.style.width="90px";b.style.height="20px";b.style.position="absolute";b.style.left=r/2-100;b.style.top=l/2;document.getElementById("again").appendChild(b);
window.onkeydown=function(a){32==a.keyCode&&(y=0,document.body.removeChild(divtag),h.x=f+20,g.x=r-f-47.5-20,v=4,w=0,C())}}function L(){y=1;0!=v&&(lost=document.createElement("div"),lost.id="again",lost.style.height=window.innerHeight,lost.style.width=window.innerWidth,lost.style.backgroundColor="red",lost.style.opacity="0.8",lost.style.position="absolute",lost.style.left="0px",lost.style.top="0px",lost.style.fontSize="40px",lost.style.color="white",lost.style.fontFamily="Comic Sans MS",lost.align=
"center",lost.innerHTML="You lost a life! <br> Press SPACEBAR to continue<br>",document.body.appendChild(lost),window.onkeydown=function(b){32==b.keyCode&&(y=0,document.body.removeChild(lost),C())})}function C(){ga("send","pageview");if(1!=y&&0!=v){requestAnimationFrame(C);M.play();bg=1;Y();d.clearRect(0,0,r,l);d.drawImage(c,q,0,c.width-q,c.height,f,0,c.width-q,c.height);d.drawImage(c,0,0,c.width,c.height,f+c.width-q,0,c.width,c.height);d.drawImage(c,0,0,c.width,c.height,f+2*c.width-q,0,c.width,c.height);
d.drawImage(c,0,0,c.width,c.height,f+q,l/2,c.width,c.height);d.drawImage(c,0,0,c.width,c.height,f+q+c.width,l/2,c.width,c.height);try{d.drawImage(c,c.width-q,0,q,c.height,f,l/2,q,c.height)}catch(b){}q+=2;q>=c.width&&(q=0);for(u=0;40>u;u++)d.drawImage(p,0,0,p.width,p.height,f+u*p.width,l/2-p.height,p.width-N,p.height),d.drawImage(p,0,0,p.width,p.height,f+u*p.width,l-p.height,p.width-N,p.height);O=Math.floor(20*Math.random()+1);P=Math.floor(20*Math.random()+1);20==B&&(B=0);if(B==O){var a=m[m.length-
1];if(!a||a.x>=f+z)z-=2,k1=Math.floor(5*Math.random()),obstacle=I({context:x.getContext("2d"),width:G[k1],height:Q[k1],b:D[k1],x:f,y:R[k1]-22}),m.push(obstacle)}B==P&&(a=n[n.length-1],!a||r-(a.x+a.width)>=f+z)&&(z-=2,k=Math.floor(5*Math.random()),obstacle1=I({context:x.getContext("2d"),width:G[k],height:Q[k],b:D[k],x:r-G[k]-f,y:R[k]-l/2-22}),n.push(obstacle1));i=0;h.i();g.i();d.fillStyle="black";d.fillRect(0,0,f,l);for(d.fillRect(r-f,0,f,l);i<n.length;)n[0].x<=f&&(n.shift(),S--,A=0),n[0].x+n[0].width<=
h.x&&0==A&&(w+=10,S++,A=1),obstacle=n[i],obstacle.x-=3,obstacle.i(),i++;for(i=0;i<m.length;)m[0].x+m[0].width>=r-f&&(m.shift(),T--,A=0),m[0].x>=g.x+g.width&&0==A&&(w+=10,T++,A=1),obstacle=m[i],obstacle.x+=3,obstacle.i(),i++;B++;for(i=0;i<n.length;i++)h.x+190/h.h>=n[i].x&&h.y+78/h.frames>=n[i].y&&h.x<=n[i].x+n[i].width&&(v--,L(),n=[],m=[]);for(ji=0;ji<m.length;ji++)g.x<=m[ji].x+m[ji].width&&g.y+78/g.frames>=m[ji].y&&g.x+190/g.h>=m[ji].x&&(v--,L(),m=[],n=[]);d.font="40px Georgia";d.fillStyle="black";
d.fillText(w,r-f-50,50);d.fill();d.fillStyle=t.color;d.fillRect(t.x,t.y,t.width,t.height);d.fillStyle="yellow";d.fillRect(t.x,t.y,h.x-f,t.height);d.fillStyle="red";d.fillRect(g.x,t.y,r-f-g.x,t.height);0==v&&(y=1,K("Sorry! You lost! Better luck next time :P"));J();h.update();g.update();0!=h.g&&(h.l(),h.x+=window.innerWidth/1E4*5);0!=g.g&&(g.l(),g.x-=window.innerWidth/1E4*5);h.x>=g.x&&(y=1,K("You win! Wanna play again?"))}}function Y(){window.onkeydown=function(b){e=b.keyCode;65==e?h.y==h.f&&(h.c=8,
h.g=1,h.t=0):76==e&&g.y==g.f&&(g.g=1,g.t=0,g.c=8)}}var x=document.getElementById("screen");x.height=window.innerHeight;x.width=window.innerWidth;var d=x.getContext("2d"),n=[],m=[],E=["images/car-02_72x33.png","images/postbox1_30x55.png","images/bush_51x27.png","images/signboard32x80.png","images/cone-02_38x32.png"],G=[72,30,51,32,38],Q=[33,55,27,80,32],l=window.innerHeight,r=window.innerWidth,R=[l-33,l-55,l-27,l-80,l-32],h,g,w=0,y=0,A=0,S=0,T=0,f=window.innerWidth/8,t,F=[],U,v=4,z=r/4,W=new Audio("sounds/CanonShoot.wav");
new Audio("sounds/explosion.wav");var M=new Audio("sounds/bg.wav"),D=[];for(u=0;5>u;u++)D[u]=new Image,D[u].src=E[u];E=new Image;E.src="images/b2_190x78.png";var V=new Image;V.src="images/thief.png";t=new function(b,a,c){this.width=b;this.height=a;this.color=c;this.x=f;this.y=0}(r-2*f,10,"blue");h=H({context:x.getContext("2d"),width:190,height:78,b:V,h:4,frames:1,m:15,x:f+20,y:l/2-78-22,f:l/2-22-78,j:0});g=H({context:x.getContext("2d"),width:190,height:78,b:E,h:4,frames:1,m:15,x:r-f-47.5-20,y:l-78-
22,f:l-22-78,j:1});var B=0,O,P;(function(){for(var b=0;b<v;b++)U=new X(f+20+20*b,t.height+20),F.push(U)})();J();var N=0,p=new Image;p.src="images/brick-02_30x22.png";var q=0,c=new Image;c.src="images/bg1.png";M.play();bg=1;1==bg&&C()})();