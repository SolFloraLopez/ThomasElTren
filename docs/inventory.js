 import {directionEnum, matrixEnum} from './Enums.js'

export default class Inventory extends Phaser.GameObjects.GameObject {
    constructor(scene,railCounter)
    {
        super(scene);
        scene.add.existing(this);
        this.railCounter = railCounter;
        let num = this.railCounter-1;
        this.railCounterText = this.scene.add.text(1155, 90, 'Raíles: '+ num, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' ,fontSize: '35px'});
    }
    
    UpdateRailCounterText(){
        let num = this.railCounter-1;
        if(num<0) num =0;
    this.railCounterText.setText('Raíles: '+ num);
    }
    ModifyRailCounter(num)
    {
        this.railCounter+=num;
        this.UpdateRailCounterText();
    }
    GetRailCounter(){
        return this.railCounter;
    }
}