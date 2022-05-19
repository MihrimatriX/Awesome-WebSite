var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		opts = {
			
			particles: 200,
			particleInitialVel: 2,
			particleInertia: 1000,
			particleFriction: .99,
			particleTemplateColor: 'hsla(hue,60%,45%,.1)',
			particleSize: 4, //more efficient if it's an even number
			
			orbits: 7,
			orbitTemplateColor: 'hsla(hue,80%,55%,.1)',
			orbitBaseVel: 1,
			orbitAddedVel: .5,
			orbitVelWaveIncrementer: .01,
			orbitRadIncrementer: .01,
			orbitAddedRad: .01,
			orbitAddedRadWaveIncrementer: .001,
			orbitSize: 20,
			orbitLines: 10,
			
			repaintAlpha: .1,
			cx: w / 2,
			cy: h / 2
		},
		calc = {
			
			particleHalfSize: opts.particleSize / 2,
			repaintColor: 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha )
		},
		
		particleCaches = {},
		particles = [],
		orbits = [],
		tick = 0;

function setup(){
	
	for( var i = 0; i < opts.orbits; ++i )
		orbits.push( new Orbit );
	
	ctx.fillStyle = '#111';
	ctx.fillRect( 0, 0, w, h );
	
	anim();
}
function redraw(){
	
	ctx.fillStyle = calc.repaintColor;
	ctx.fillRect( 0, 0, w, h );
}
function anim(){
	
	window.requestAnimationFrame( anim );
	
	++tick;
	
	if( particles.length < opts.particles )
		particles.push( new Particle );
	
	redraw();
	orbits.map( stepOrbit );
	particles.map( stepParticle );
}

function stepOrbit( orbit ){ orbit.step(); }
function stepParticle( particle ){ particle.step(); }

function Orbit(){
	
	this.x = Math.random() * w;
	this.y = Math.random() * h;
	
	this.rad = Math.random() * Math.PI * 2;
	this.radWave = Math.random() * Math.PI * 2;
	this.velWave = Math.random() * Math.PI * 2;
}
Orbit.prototype.step = function(){
	
	this.rad += opts.orbitRadIncrementer + opts.orbitAddedRad * Math.sin( this.radWave += ( Math.random() * opts.orbitAddedRadWaveIncrementer ) );
	
	var len = opts.orbitBaseVel + opts.orbitAddedVel * Math.sin( this.velWave += opts.orbitVelWaveIncrementer ),
			vx = len * Math.cos( this.rad ),
			vy = len * Math.sin( this.rad ),
			revertX = true,
			revertY = true;
	
	this.x += vx;
	this.y += vy;
	
	if( this.x < 0 )
		this.x = 0;
	else if( this.x > w )
		this.x = w;
	else
		revertX = false;
	
	if( this.y < 0 )
		this.y = 0;
	else if( this.y > h )
		this.y = h;
	else
		revertY = false;
	
	if( revertX || revertY ){
		if( revertX )
			vx *= -1;
		if( revertY )
			vy *= -1;
		
		this.rad = Math.atan( vy/vx ) + ( vx < 0 ? Math.PI : 0 );
	}
	
	ctx.strokeStyle = opts.orbitTemplateColor.replace( 'hue', this.x / w * 360 + tick );
	ctx.beginPath();
	for( var i = 0; i < opts.orbitLines; ++i ){
		
		var len = ( 1 - Math.sqrt( Math.random() ) ) * opts.orbitSize,
				rad = Math.random() * Math.PI * 2;
		
		ctx.moveTo( this.x + len * Math.cos( rad ), this.y + len * Math.sin( rad ) );
		ctx.lineTo( this.x, this.y );
	}
	ctx.stroke();
}

function Particle(){
	
	this.reset();
}
Particle.prototype.reset = function(){
	
	this.x = opts.cx;
	this.y = opts.cy;
	
	var rad = Math.random() * Math.PI * 2;
	
	this.vx = opts.particleInitialVel * Math.cos( rad );
	this.vy = opts.particleInitialVel * Math.sin( rad );
}
Particle.prototype.step = function(){
	
	for( var i = 0; i < orbits.length; ++i ){
		
		var dx = orbits[ i ].x - this.x,
				dy = orbits[ i ].y - this.y,
				squareD = dx*dx + dy*dy,
				force = opts.particleInertia / squareD,
				rad = Math.atan( dy/dx ) + ( dx < 0 ? Math.PI : 0 );
		
		this.vx += force * Math.cos( rad );
		this.vy += force * Math.sin( rad );
	}
	
	this.vx *= opts.particleFriction;
	this.vy *= opts.particleFriction;
	
	//ctx.strokeStyle = 'hsla(hue,80%,50%,.1)'.replace( 'hue', this.x / w * 360 + tick );
	//ctx.beginPath();
	//ctx.moveTo( this.x, this.y );
	
	this.x += this.vx;
	this.y += this.vy;
	
	//ctx.lineTo( this.x, this.y );
	//ctx.stroke();
	
	var hue = ( this.x / w * 360 + tick ) |0,
			cache = particleCaches[ hue ];
	
	if( !cache ){
		
		var canvas = document.createElement( 'canvas' ),
				context = canvas.getContext( '2d' );
		
		canvas.width = canvas.height = opts.particleSize;
		context.fillStyle = opts.particleTemplateColor.replace( 'hue', hue );
		context.beginPath();
		context.arc( calc.particleHalfSize, calc.particleHalfSize, calc.particleHalfSize, 0, Math.PI * 2 );
		context.fill();
		
		cache = particleCaches[ hue ] = canvas;
	}
	
	ctx.drawImage( cache, ( this.x |0 ) - calc.particleHalfSize, ( this.y |0 ) - calc.particleHalfSize );
	
	if( this.x < 0 || this.x > w || this.y < 0 || this.y > h )
		this.reset();
}
setup();

c.addEventListener( 'mousemove', function( e ){
	
	opts.cx = e.clientX;
	opts.cy = e.clientY;
});
c.addEventListener( 'mouseleave', function(){
	
	opts.cx = w / 2;
	opts.cy = h / 2;
});
window.addEventListener( 'resize', function(){
	
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	
	opts.cx = w / 2;
	opts.cy = h / 2;
	
	ctx.fillStyle = '#111';
	ctx.fillRect( 0, 0, w, h );
})