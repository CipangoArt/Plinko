  // module aliases
  var Engine = Matter.Engine;
  var    World= Matter.World;
  var   Bodies = Matter.Bodies;
  var Events=Matter.Events;

  var engine;
  var world;

  var particles=[];
  var plinkos=[];
  var verticalBounds = [];
  var baseBounds = [];
  var cols=9;
  var rows=8;
  var spacing;
  var canvasHeight;
  var canvasWidth;

  const FOLDER = 'resources/sound/', EXT = '.ogg',PREFIX = 'bounce'
      INDEX_START = 1, INDEX_END = 2,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);
      
function preload() {
  for (let i = 0; i < INDEX_TOTAL; ++i)
  
    sounds[i] = loadSound(FOLDER +PREFIX+ (i + INDEX_START) + EXT);
}
 
function collision(event)
  {
    var pairs = event.pairs;
    for (var i =0;i<pairs.length; i++)
    {
      var labelA=pairs[i].bodyA.label;
      var labelB=pairs[i].bodyB.label;
      console.log(labelA);
      console.log(labelB);
    }
  
  if( labelA=='particle'&&labelB=='peg'||labelA=='peg'&&labelB=='particle')
    {

   sounds[getRandomInt(0,1)].play()
    }

    if(labelA=='particle'&&labelB=='boundary1'||labelA=='boundary1'&&labelB=='particle'||
    labelA=='particle'&&labelB=='boundary8'||labelA=='boundary8'&&labelB=='particle')
    {
      SubmitSearch();
    }
  }

  function setup() 
  {
    if(windowWidth>600)
    {
canvasWidth=600;
    }
    else
    {
      canvasWidth=windowWidth;
    }
    if(windowHeight>700)
    {
canvasHeight=700;
    }
    else
    {
      canvasHeight=windowHeight;
    }
    var cnv=createCanvas(canvasWidth, canvasHeight);
    cnv.style('display', 'block');
    engine= Engine.create();
    world=engine.world;
    Events.on(engine,'collisionStart',collision);
    //newParticle();
    spacing=height/cols;
    console.log(spacing);
    for(var i=0; i<cols+1;i++)
    {
      for(var j=0; j<rows-1;j++)
      {
        var x =  i * spacing;
        if (j%2==1)
        {
          x+=spacing/2;
        }
        
        var y = spacing + j *spacing;
       if(i!=0){
        var peg = new Plinko(x,y,16);
        plinkos.push(peg);
       } 
      }
    }
    //var b= new Boundary(width/2,height+50,width,100);
    //bounds.push(b);
    for(var i=0; i<cols;i++)
    {
      if(i!=0)
      var x= i*spacing-w;
      var h= 120;
      var w = 10;
      var y=height-h/2;
      var bound = new Boundary(x,y,w,h);
      verticalBounds.push(bound);
      var wbase = spacing;
      var xbase= i*spacing-wbase;
      var hbase= 10;
      
      var ybase=height-10;
      var boundBase = new Boundary(xbase,ybase,wbase,hbase);
      boundBase.body.label="boundary"+i.toString();
      baseBounds.push(boundBase);
    }

  }

function newParticle()
{
  var p = new Particle(width/2,50,12);
      particles.push(p);
}

  function draw() {
    if(frameCount%0==0)//rate at which a new particle spawns
    {
      newParticle();
    }
    
    background(51);
    Engine.update(engine);
    for(var i=0; i<particles.length;i++)
    {
      particles[i].show();
      if(particles[i].isOffscreen())
      {
        World.remove(world,particles[i].body);
          particles.splice(i,1);
          i--;
      }
    }
    for(var i=0; i<plinkos.length;i++)
    {
      plinkos[i].show();
    }
    for(var i=0; i<verticalBounds.length;i++)
    {
      verticalBounds[i].show();
    }
    for(var i=0; i<verticalBounds.length;i++)
    {
      baseBounds[i].show();
    }
    
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SubmitSearch() {
  document.getElementById("Search").submit();
  return;
}