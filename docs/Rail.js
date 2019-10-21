import {directionEnum, matrixEnum} from './Enums.js'

export default class Rail extends Phaser.GameObjects.Sprite
{
    constructor(scene, columna, fila, texture, pointer)
    {
        super(scene, (columna * 50) + 25, (fila * 50) + 25, texture);
        scene.add.existing(this).setInteractive();
        scene.input.setDraggable(this);

        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });
        
        this.orientation = directionEnum.NONE;
        this.selected = false;
        this.pointer = pointer;
    }

    preUpdate()
    {
        if(!this.pointer.isDown)
        {       
            this.columna = Math.floor(this.x / 50);
            this.fila = Math.floor(this.y / 50);
            this.x = (this.columna * 50) + 25;
            this.y = (this.fila * 50) + 25;
        }
    }
}