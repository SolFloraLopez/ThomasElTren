import {directionEnum, matrixEnum} from './Enums.js'

export default class Train extends Phaser.GameObjects.Sprite
{ 
    constructor(scene, column, row, texture, speed)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this);

        this.column = column;
        this.row = row;
        this.direction = directionEnum.UP;
        this.speed = speed;
        this.setDepth(1);
    }

    preUpdate()
     {
        this.Move(this.speed)
        this.column = Math.floor(this.x / 50);
        this.row = Math.floor(this.y / 50);
        
        //console.table([{name: 'column', amount: this.column}, {name: 'row', amount: this.row}, {name: 'x', amount: this.x}, {name: 'y', amount: this.y}]);
    }

    ReturnPos()
     {
          let pos = {x: this.x,  y: this.y};
          return pos;
     }
     
    Move(amount)
    {
        if(Math.abs(this.direction % 2 == 0)) this.y += amount * (this.direction / 2);

        else this.x += amount * this.direction;
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
}

