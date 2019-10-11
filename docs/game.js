export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
    this.load.image('moneco','img/nokia.png');

  }

  create() {
    player = scene.add.image(100,200,'moneco');
  }

  update(time, delta) {    
  }
}