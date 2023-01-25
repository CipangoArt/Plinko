// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var velocity =Matter.Vector.create(1, 0);

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var circle= Bodies.circle(200,200,80);

Matter.Body.applyForce(circle, circle.position, velocity);

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB,circle, ground]);
render.canvas.width = window.innerWidth;
render.canvas.height=window.innerHeight;
// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);