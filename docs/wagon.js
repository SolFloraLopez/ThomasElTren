import {directionEnum, matrixEnum, stateEnum, } from './Enums.js'

export default class Wagon extends Phaser.Physics.Arcade.Sprite
{ 
    constructor(scene,targetToFollow,spacer, x, y, texture)
    {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(40,40);

        this.wagonPath=[];
        this.target = targetToFollow;
        this.spacer = spacer;

        this.column = Math.floor(this.x / 50);
        this.row = Math.floor(this.y / 50);
        // this.direction = direction;
        // this.angle = this.direction * 90;
        this.setDepth(1);
        for (var i = 0; i <= this.spacer; i++)
        {
          this.wagonPath[i] = new Phaser.Geom.Point(this.target.x, this.target.y);
        }
    }

    preUpdate(time,delta)
     {
        this.column = Math.floor(this.x / 50);
        this.row = Math.floor(this.y / 50);

        let part = this.wagonPath.pop();

        part.setTo(this.target.x, this.target.y);

        this.wagonPath.unshift(part);

        this.x = (this.wagonPath[this.spacer]).x;
        this.y = (this.wagonPath[this.spacer]).y;
        
    }
    UpdateSpeed(){
        for (var i = 0; i <= this.spacer; i++)
        {
          this.wagonPath[i]+=2;
        }
    }


     
    // Move(amount,time,delta)
    // {
    //     this.body.setVelocity(0);
    //     if(this.direction !== directionEnum.NONE){
    //         if(this.direction === directionEnum.UP || this.direction === directionEnum.DOWN) this.body.setVelocityY(amount * delta * this.direction/2)
    //         else this.body.setVelocityX(amount * delta * this.direction);
    //     }
        

    // }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}

        return tile;
    }

}

