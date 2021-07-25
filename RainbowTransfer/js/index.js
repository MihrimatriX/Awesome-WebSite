var s = c.width = c.height = 500,
		ctx = c.getContext( '2d' ),
		
		particles = [],
		clouds = [],
		
		cx = s / 2,
		cy = s / 3 * 2,
		
		cloudCx1 = cx - s / 3,
		cloudCx2 = cx + s / 3;

ctx.lineWidth = 2;

function Particle(){
	
	this.reset();
}
Particle.prototype.reset = function(){
	
	this.rad = -Math.PI;
	this.speed = .01 + Math.random() * .02;
	
	var depth = Math.random() * 80;
	this.color = 'hsl(hue,80%,50%)'.replace( 'hue', depth / 8 * 36 );
	this.len = s / 3 + depth - 40;
}
Particle.prototype.step = function(){
	
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.arc( cx, cy, this.len, this.rad, this.rad += this.speed );
	ctx.stroke();
	
	if( this.rad > 0 )
		this.reset();
}

function Cloud(){
	this.reset();
}
Cloud.prototype.reset = function(){
	
	this.x = Math.random() < .5 ? cloudCx1 : cloudCx2;
	this.x += Math.random() * 50 * ( Math.random() < .5 ? 1 : -1 );
	this.y = cy + Math.random() * 10 * ( Math.random() < .5 ? 1 : -1 );
	
	this.maxRadius = 30 + 10 * Math.random();
	this.tick = 0;
	this.maxTick = ( 40 + 10 * Math.random() ) |0;
}
Cloud.prototype.step = function(){
	
	++this.tick;
	
	var radius = this.maxRadius * ( Math.cos( this.tick / this.maxTick * Math.PI * 2 - Math.PI ) / 2 + .5 ), 
			gradient = ctx.createRadialGradient( this.x, this.y, 0, this.x, this.y, radius );
	
	gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
	gradient.addColorStop( 1, 'rgba(255,255,255,0)' );
	
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc( this.x, this.y, radius, 0, Math.PI * 2 );
	ctx.fill();
	
	if( this.tick > this.maxRadius )
		this.reset();
}
function anim(){
	
	window.requestAnimationFrame( anim );
	
	ctx.fillStyle = 'rgba(0,0,0,.04)';
	ctx.fillRect( 0, 0, s, s );
	
	if( particles.length < 200 && Math.random() < .5 )
		particles.push( new Particle );
	
	if( clouds.length < 30 && Math.random() < .1 )
		clouds.push( new Cloud );
	
	particles.map( function( particle ){ particle.step(); } );
	clouds.map( function( cloud ){ cloud.step(); } );
}

ctx.fillStyle = '#333';
ctx.fillRect( 0, 0, s, s );
anim();