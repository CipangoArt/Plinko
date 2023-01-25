function Plinko(x,y,radius)
{
    var options= 
    {
        isStatic: true,
        restitution:1,
        friction:0
    }
    this.body=Bodies.circle(x,y,radius,options);
    this.body.label="peg";
    this.radius=radius;
    World.add(world,this.body);

}

Plinko.prototype.show= function()
{
    fill(0,0,255);
    stroke(255);
    var pos= this.body.position;
    push();
    translate(pos.x,pos.y);
    ellipse(0,0,this.radius*2);
    pop();

}