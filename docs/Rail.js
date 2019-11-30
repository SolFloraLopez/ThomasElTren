import {directionEnum, matrixEnum, stateEnum} from './Enums.js'

export default class Rail extends Phaser.GameObjects.Sprite
{
    constructor(scene, column, row, texture, pointer, railType, tileSize)
    {
        super(scene, (column * tileSize) + tileSize / 2, (row * tileSize) + tileSize / 2, texture);
        scene.add.existing(this).setInteractive();
        scene.physics.add.existing(this);
        scene.input.setDraggable(this);

        scene.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
            gameObject.body.enable = false;
            gameObject.rotatable = true;
        });
          scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
              gameObject.x = dragX;
              gameObject.y = dragY;
          });
          scene.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
            gameObject.body.enable = true;
            gameObject.rotatable = false;
        });
        
        this.tileSize = tileSize;
        this.column = column;
        this.row = row;
        this.railType = railType;
        this.selected = false;
        this.pointer = pointer;
        this.state = stateEnum.ONTRACK;
        this.rotatable = false;

        switch (this.railType)
        {
          case 0:
            this.angle = 0;
            break;
          case 1:
            this.angle = 90;
            break;
          case 2:
            this.angle = 180; 
            break;
          case 3:
            this.angle = 270;
            break;
          case 4:
            this.angle = 0;
            break;
          case 5: 
            this.angle = 90;
            break;
        }
    }

    preUpdate()
    {
        if (this.state == stateEnum.ONTRACK)
        {
            if(!this.pointer.isDown)
            {       
                this.column = Math.floor(this.x / this.tileSize);
                this.row = Math.floor(this.y / this.tileSize);
                this.x = (this.column * this.tileSize) + this.tileSize / 2;
                this.y = (this.row * this.tileSize) + this.tileSize / 2;
            }

            
            else if (this.rotatable )
            {
                if(Phaser.Input.Keyboard.JustDown(this.scene.r))
                {
                    this.angle += 90;
                
                    if (this.railType <= 3) this.railType = (this.railType + 1) % 4;
                    else this.railType =  4 + (this.railType + 1) % 2;
                }
            }
        }
    }

    ReturnTile()
    {
        let tile = {column: this.column, row: this.row}

        return tile;
    }

    ReturnRailType()
    {
        return this.railType;
    }

    ReturnPos()
    {
      let pos = {x: this.x,  y: this.y};
      return pos;
    }

    ChangeState(state) 
    {
        this.state = state;
    }
}