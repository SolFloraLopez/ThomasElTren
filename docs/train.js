import {directionEnum, matrixEnum} from './Enums.js'

export default class Train extends Phaser.GameObjects.Sprite
{ 
    constructor(scene, column, fila, texture)
    {
        super(scene, (column * 50) + 25, (fila * 50) + 25, texture);
        scene.add.existing(this);

        this.column = column;
        this.fila = fila;
        this.direction = directionEnum.UP;
        this.speed = 1;
        this.setDepth(1);
    }

    preUpdate()
     {
        this.Move(this.speed)
        this.column = Math.floor(this.x / 50);
        this.fila = Math.floor(this.y / 50);
        
        //console.table([{name: 'column', amount: this.column}, {name: 'fila', amount: this.fila}, {name: 'x', amount: this.x}, {name: 'y', amount: this.y}]);
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
    }

    ReturnTile()
    {
        let tile = {column: this.column, fila: this.fila}

        return tile;
    }

    ReturnDirection()
    {
        return this.direction;
    }
}

