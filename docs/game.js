import Train, * as train from './train.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
    this.load.spritesheet('keyspritesheet', 'img/nokia.png', { frameWidth: 500, frameHeight: 500 });
  }

  create() {
    var newTrain = new Train(100);
    this.add.sprite(newTrain.ReturnPos(), newTrain.ReturnPos(), 'keyspritesheet');
  }

  update(time, delta) 
  {
    
  }
}