import Game from './game.js'


export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    
  }

  preload()
  {
    this.load.image('menuBG', 'img/MenuBG.png');
    this.load.image('playBtn', 'img/PlayBtn.png');
    // this.load.image('mainMenuBtn', 'img/MainMenuBtn.png');
  }

  create()
  {

    this.add.image(0,0,'menuBG').setOrigin(0);

    this.scene.add('main',new Game(1));
    let playButton = this.add.image(420,640,'playBtn').setOrigin(0);
    playButton.setInteractive();

    playButton.on('pointerup',()=>{
      this.scene.start('main');
    });

  }
  update()
  {
    console.log("abode");
  }
  
}
