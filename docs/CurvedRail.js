import {directionEnum, matrixEnum} from './Enums.js'

export default class CurvedRail extends Phaser.GameObjects.Sprite
{
    constructor(scene, column, row, texture, pointer, orientation1, orientation2)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this).setInteractive();
        scene.input.setDraggable(this);

        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });
        
        this.column = column;
        this.row = row;
        this.orientation1 = orientation1;
        this.orientation2 = orientation2;
        this.selected = false;
        this.pointer = pointer;

        if (orientation1 != 2) this.angle = (this.orientation1 + this.orientation2) * 90 + 90;
        else this.angle = 0;
    }

    preUpdate()
    {
        if(!this.pointer.isDown)
        {       
            this.column = Math.floor(this.x / 50);
            this.row = Math.floor(this.y / 50);
            this.x = (this.column * 50) + 25;
            this.y = (this.row * 50) + 25;
        }
    }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}

        return tile;
    }

    ReturnOrientation()
    {
        return this.orientation1;
    }
}