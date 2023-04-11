class Link
{
    constructor(bodyA, bodyB)
    {
        var lastLink = bodyA.body.bodies.length - 2
        this.Link = Constraint.create
        (
            {
                bodyA:bodyA.body.bodies[lastLink], 
                pointA:{x:0, y:0}, 
                bodyB:bodyB,
                pointB:{x:0, y:0},
                length:-10, 
                stiffness:0.01
            }
        )
        World.add(engine.world, this.Link)
    }
    detatch()
    {
        World.remove(engine.world, this.Link)

    }
}