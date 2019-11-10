import {directionEnum, matrixEnum, stateEnum} from './Enums.js'

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
        this.state = stateEnum.ONTRACK;

        switch (orientation1 + orientation2)
      {
        case -3:
          this.angle = 180;
          break;
        case -1:
          this.angle = 270;
          break;
        case 1:
          this.angle = 90; 
          break;
        case 3:
          this.angle = 0;
          break;
      }
    }

    preUpdate()
    {
        if (this.state == stateEnum.ONTRACK)
        {
            if(!this.pointer.isDown)
            {       
                this.column = Math.floor(this.x / 50);
                this.row = Math.floor(this.y / 50);
                this.x = (this.column * 50) + 25;
                this.y = (this.row * 50) + 25;
            }
        }
    }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}

        return tile;
    }

    ReturnOrientation()
    {
        let orientation = {First: this.orientation1 , Second: this.orientation2}
        return orientation;
    }

    ChangeState(state) 
    {
        this.state = state;
    }
}