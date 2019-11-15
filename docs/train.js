import {directionEnum, matrixEnum, stateEnum, } from './Enums.js'

export default class Train extends Phaser.Physics.Arcade.Sprite
{ 
    constructor(scene, column, row, texture, speed)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)

        this.column = column;
        this.row = row;
        this.direction = directionEnum.UP;
        this.speed = speed;
        this.state = stateEnum.ONTRACK;
        this.setDepth(1);
    }

    preUpdate(time,delta)
     {
        if (this.state == stateEnum.ONTRACK) 
        {
            this.Move(this.speed,time,delta);
            this.column = Math.floor(this.x / 50);
            this.row = Math.floor(this.y / 50);
        }
        
        //console.table([{name: 'column', amount: this.column}, {name: 'row', amount: this.row}, {name: 'x', amount: this.x}, {name: 'y', amount: this.y}]);
    }

    ReturnPos()
     {
        let pos = {x: this.x,  y: this.y};
        return pos;
     }
     
    Move(amount,time,delta)
    {
        this.body.setVelocity(0);
        if(Math.abs(this.direction % 2 == 0))this.body.setVelocityY(10 * delta *-1)
        else this.body.setVelocityX(amount * this.direction);

    }

    ChangeDirection(direction)
    {
        this.direction = direction;
        this.angle = this.direction * 90;
    }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}

        return tile;
    }

    ReturnDirection()
    {
        return this.direction;
    }

    ChangeState(state) 
    {
        this.state = state;
    }
}

