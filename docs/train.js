export default class Train extends Phaser.GameObjects.Sprite
{ 
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.direction = scene.directionEnum.DOWN;
        this.speed = 10;
    }

     preUpdate()
     {
         this.Move(this.speed)
     }

    ReturnPos() 
    {
        return this.x;   
    }

    Move(amount)
    {
        if(Math.abs(this.direction % 2 == 0)) this.y += amount * (this.direction / 2);

        else this.x += amount * this.direction;
    }

    ChangeDirection(direction)
    {
        this.direction = direction;
    }

    IsDragged(){}
}

