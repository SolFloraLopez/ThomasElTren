import Train, * as train from './train.js'
import Rail, * as rail from './Rail.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

      this.directionEnum = {
       UP: -2,
       LEFT: -1,
        NONE: 0,
       RIGHT: 1,
       DOWN: 2,
    };
  }
  preload() 
  { 
    this.load.image('fondosprite', 'img/fondo.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('plantillasprite', 'img/Plantilla.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('trainsprite', 'img/trainwagon.png', { frameWidth: 50, frameHeight: 50 });
    this.load.image('railsprite', 'img/favicon.png', {frameWidth: 27, frameHeight: 40});
  }

  create() 
  {
    this.add.sprite(700, 400, 'fondosprite');
    this.plantilla = this.add.sprite(700, 400, 'plantillasprite');
    this.newTrain = new Train(this, 700, 350, 'trainsprite');
    this.Rail = new Rail(this, 200, 200, 'railsprite', this.input.activePointer);
    // this.w = this.input.keyboard.addKey('W');
    // this.a = this.input.keyboard.addKey('A');
    // this.s = this.input.keyboard.addKey('S');
    // this.d = this.input.keyboard.addKey('D');
  }

  update(time, delta) 
  {
  }

}