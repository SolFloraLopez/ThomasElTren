import {directionEnum, matrixEnum} from './Enums.js'

export default class Rail extends Phaser.GameObjects.Sprite{
    constructor(scene, column, row, texture)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this);

        this.column = column;
        this.row = row;
        this.direction = directionEnum.UP;
        this.setDepth(1);
    }
    
    preUpdate(){
        this.column = Math.floor(this.x / 50);
        this.row = Math.floor(this.y / 50);
    }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}
        return tile;
    }
}