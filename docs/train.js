import {directionEnum, matrixEnum, stateEnum, } from './Enums.js'

export default class Train extends Phaser.Physics.Arcade.Sprite
{ 
    constructor(scene, column, row, texture, speed)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)
        this.body.setSize(40,40);

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
        if(this.direction!==directionEnum.NONE){
            if(this.direction===directionEnum.UP || this.direction===directionEnum.DOWN)this.body.setVelocityY(10 * delta *this.direction/2)
            else this.body.setVelocityX(10 * delta *this.direction);
        }
        

    }
    Compatible(rail){
        console.log(this.direction);
        let offset = 10;
        switch(this.direction){
            case directionEnum.UP:
                if((rail.ReturnRailType()===0 || rail.ReturnRailType()===1) && this.y>rail.ReturnPos().y+offset)return false;
                else if(this.y<rail.ReturnPos().y){
                    if(rail.ReturnRailType()===2)this.ChangeDirection(directionEnum.LEFT);
                    else if(rail.ReturnRailType()===3)this.ChangeDirection(directionEnum.RIGHT);
                } 
                break;
            case directionEnum.DOWN:
                if((rail.ReturnRailType()===2 || rail.ReturnRailType()===3) && this.y<rail.ReturnPos().y-offset)return false;
                else if(this.y>rail.ReturnPos().y){
                    if(rail.ReturnRailType()===0)this.ChangeDirection(directionEnum.LEFT);
                    else if(rail.ReturnRailType()===1)this.ChangeDirection(directionEnum.RIGHT);
                } 
                break;
            case directionEnum.LEFT:
                    if((rail.ReturnRailType()===0 || rail.ReturnRailType()===2) && this.x>rail.ReturnPos().x+offset)return false;
                    else if(this.x<rail.ReturnPos().x){
                        if(rail.ReturnRailType()===1)this.ChangeDirection(directionEnum.UP);
                        else if(rail.ReturnRailType()===3)this.ChangeDirection(directionEnum.DOWN);
                    } 
                break;
            case directionEnum.RIGHT:
                     if((rail.ReturnRailType()===1 || rail.ReturnRailType()===3) && this.x<rail.ReturnPos().x-offset)return false;
                     else if(this.x>rail.ReturnPos().x){
                        if(rail.ReturnRailType()===0)this.ChangeDirection(directionEnum.UP);
                        else if(rail.ReturnRailType()===2)this.ChangeDirection(directionEnum.DOWN);
                    } 
                break;
        }
        return true;

    }
    ChangeDirection2(){
        switch(this.direction){
            case directionEnum.UP:
                break;
            case directionEnum.DOWN:
                break;
            case directionEnum.LEFT:
                break;
            case directionEnum.RIGHT:
                break;
        }
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

