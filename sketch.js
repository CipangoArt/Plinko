

  // module aliases
  var Engine = Matter.Engine;
  var    World= Matter.World;
  var   Bodies = Matter.Bodies;
  

  var engine;
  var world;
  
  var particles=[];
  var plinkos=[];
  var bounds = [];
  var cols=9;
  var rows=8;
  var spacing;

  const FOLDER = 'Resources/Sounds/', EXT = '.ogg',PREFIX = 'metal'
      INDEX_START = 1, INDEX_END = 8,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);

function preload() {
  for (let i = 0; i < INDEX_TOTAL; ++i)
    sounds[i] = loadSound(FOLDER +PREFIX+ (i + INDEX_START) + EXT);
}
 

  function setup() 
  {
    createCanvas(600, 700);
    engine= Engine.create();
    world=engine.world;
    newParticle();
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
        var peg = new Plinko(x,y,16);
        plinkos.push(peg);
      }
    }
    var b= new Boundary(width/2,height+50,width,100);
    bounds.push(b);
    for(var i=0; i<cols+2;i++)
    {
      var x= i*spacing;
      var h= 120;
      var w = 10;
      var y=height-h/2;
      var bound = new Boundary(x,y,w,h);
      bounds.push(bound);
    }

  }

function newParticle()
{
  var p = new Particle(width/2,50,12);
      particles.push(p);
}

  function draw() {
    if(frameCount%60==0)
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
    for(var i=0; i<bounds.length;i++)
    {
      bounds[i].show();
    }
    
  }

// create an engine

// create a renderer
