export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
    this.load.spritesheet(
      'keyspritesheet', 'img/nokia.png', { frameWidth: 500, frameHeight: 500 });
  }

  create() {
    this.add.sprite(300, 200, 'keyspritesheet');
  }

  update(time, delta) {    
  }
}