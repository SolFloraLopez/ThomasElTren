 import {directionEnum, matrixEnum} from './Enums.js'

export default class Water extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, column, row, texture)
    {
        super(scene, (column * 50) + 25, (row * 50) + 25, texture);
        scene.add.existing(this).setInteractive();
        scene.physics.add.existing(this);
        this.body.setSize(40,40);
        this.column = column;
        this.row = row;
        this.avoidable = false;

    }
    SetAvoidable(bool)
    {
        this.avoidable = bool;
    }

}