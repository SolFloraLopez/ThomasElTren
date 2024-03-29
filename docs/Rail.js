import {directionEnum, matrixEnum, stateEnum} from './Enums.js'
import Inventory from './inventory.js';

export default class Rail extends Phaser.GameObjects.Sprite
{
    constructor(scene, column, row, texture, pointer, railType, tileSize,inventory)
    {
        super(scene, (column * tileSize) + tileSize / 2, (row * tileSize) + tileSize / 2, texture);
        scene.add.existing(this).setInteractive();
        scene.physics.add.existing(this);
        scene.input.setDraggable(this);
        this.on('dragstart', function (pointer, gameObject, dragX, dragY) {
          if(this.railType<4){
            
            if(inventory.GetRailCounter('A')>0 || (inventory.GetRailCounter('A')===0 && (this.column!=24 || this.row!=8))){

              this.body.enable = false;
              this.rotatable = true;
            }
          }
          else if (this.railType>=4){
            if(inventory.GetRailCounter('B')>0 || (inventory.GetRailCounter('B')===0 && (this.column!=26 || this.row!=8))){
              this.body.enable = false;
              this.rotatable = true;
            }
          }
          

        });
          scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if(gameObject.railType<4){
              if(inventory.GetRailCounter('A')>0 || (inventory.GetRailCounter('A')===0 && (gameObject.column!=24 || gameObject.row!=8))){
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.column = Math.floor(gameObject.x / gameObject.tileSize);
              }
            }
            else if (gameObject.railType>=4){
              if(inventory.GetRailCounter('B')>0 || (inventory.GetRailCounter('B')===0 && (gameObject.column!=26 || gameObject.row!=8))){
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.column = Math.floor(gameObject.x / gameObject.tileSize);
              }
            }

          });
          this.on('dragend', function (pointer, gameObject, dragX, dragY) {
            this.body.enable = true;
            this.rotatable = false;
            
            let overlapTemp = this.scene.physics.add.overlap(this,scene.backgroundLayer,(o1, o2) => {
              if(o2.properties.collides) this.MoveToInventory(inventory);
              overlapTemp.destroy();
            });
            let overlapTemp2 = this.scene.physics.add.overlap(this,scene.waterGroup,(o1, o2) => {
              if(this.railType<4) this.MoveToInventory(inventory);
              overlapTemp2.destroy();
            });

            // if(this.column>22){
            //   this.MoveToInventory(inventory);
            // }
            if(this.railType>=4){
              let pointerC = Math.floor((pointer.x/50));
              let pointerR = Math.floor((pointer.y/50))
              let pointerPos = {column: pointerC,row: pointerR};
              let objectReturned = scene.SearchWater(pointerPos);
             if(objectReturned.found && !objectReturned.water.avoidable) objectReturned.water.SetAvoidable(true);
           }
            // this.scene.physics.overlap(this,scene.backgroundLayer,(o1, o2) => {
            //   console.log(o1.column);
            //   console.log(o2);
            //   //buscar el tile de background layer que coincida con la posicion de o1, y desactivar su colision
            //   console.log("s");
            //   console.log(this.scene.backgroundLayer);
            //   o2.setCollision(false);
            // });
            
        });
        this.on('pointerdown', ()=>{
          if(this.railType<4){
            if(inventory.GetRailCounter('A')>0 && (this.column===24 && this.row===8)) inventory.ModifyRailCounter(-1,'A');
          }
          else if (this.railType>=4){
            if(inventory.GetRailCounter('B')>0 && (this.column===26 && this.row===8)) inventory.ModifyRailCounter(-1,'B');
          }
          scene.CreateRail();
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
            else if (this.rotatable)
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
    MoveToInventory(inventory){
      if(this.railType<4){
        inventory.ModifyRailCounter(1,'A');
        this.column = 24;
        this.railType = 0;
      }
      else if (this.railType>=4){
        inventory.ModifyRailCounter(1,'B');
        this.column = 26;
        this.railType = 4;
      }
      this.row = 8;
      this.x = (this.column * this.tileSize) + this.tileSize / 2;
      this.y = (this.row * this.tileSize) + this.tileSize / 2;
      this.angle = 0;
    }
}