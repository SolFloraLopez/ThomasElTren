import Game from './game.js'


export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload()
  {
    this.load.image('menuBG', 'img/MenuBG.png');
    this.load.image('playBtn', 'img/PlayBtn.png');
    this.load.image('infoBtn', 'img/InfoBtn.png');
    this.load.image('menuBtn', 'img/MainMenuBtn.png');
    this.load.image('playlockedBtn', 'img/PlayLockedBtn.png');
    this.load.image('fW', 'img/framework.png');
    this.load.image('level1', 'img/plainLevel.png');
    this.load.image('level2', 'img/snowLevel.png');
    this.load.image('level3', 'img/desertLevel.png');
    this.load.image('lock', 'img/lock.png');
    this.load.image('credits', 'img/credits.png');
    
    this.load.audio('button', ['soundFiles/buttonSound.mp3', 'soundFiles/buttonSound.ogg']);
    this.load.audio('buttonHover', ['soundFiles/buttonHoverSound.mp3', 'soundFiles/buttonHoverSound.ogg']);
  }

  create()
  {

    this.add.image(0,0,'menuBG').setOrigin(0);
    let lvl1Btn =  this.add.image(130,310,'level1').setOrigin(0);
    let lvl2Btn =  this.add.image(540,310,'level2').setOrigin(0);
    let lvl3Btn =  this.add.image(950,310,'level3').setOrigin(0);
    let framW = this.add.image(130,310,'fW').setOrigin(0);
    this.lock = this.add.image(130,310,'lock').setOrigin(0);
    this.credits = this.add.image(0,0,'credits').setOrigin(0);
    this.credits.setDepth(1);
    this.credits.visible = false;
    this.credits.setActive(false);
    this.lock.visible = false;
    this.levelSelected=0;
    this.sound.stopAll();



    let playButton = this.add.image(420,640,'playBtn').setOrigin(0);
    let infoButton = this.add.image(1030,640,'infoBtn').setOrigin(0);
    let menuButton = this.add.image(415,580,'menuBtn').setOrigin(0);
    menuButton.visible = false;
    menuButton.setDepth(1);

    this.buttonSound = this.sound.add('button');
    this.buttonHoverSound = this.sound.add('buttonHover');

    this.playLockedBtn = this.add.image(420,640,'playlockedBtn').setOrigin(0);
    playButton.setInteractive();
    lvl1Btn.setInteractive();
    lvl2Btn.setInteractive();
    lvl3Btn.setInteractive();
    infoButton.setInteractive();
    menuButton.setInteractive();

    playButton.on('pointerup',()=>{
      console.log(this.levelSelected);
      if(!this.credits.visible)this.buttonSound.play();
      if(this.levelSelected!=0){
        this.scene.add('main',new Game(this.levelSelected));
        this.scene.start('main');
      }
    });
    lvl1Btn.on('pointerover',()=>{
      framW.setPosition(lvl1Btn.x,lvl1Btn.y);
      if(!this.credits.visible) this-this.buttonHoverSound.play();
    });
    lvl2Btn.on('pointerover',()=>{
      framW.setPosition(lvl2Btn.x,lvl2Btn.y);
      if(!this.credits.visible) this-this.buttonHoverSound.play();
    });
    lvl3Btn.on('pointerover',()=>{
      framW.setPosition(lvl3Btn.x,lvl3Btn.y);
      if(!this.credits.visible) this-this.buttonHoverSound.play();
    });

    lvl1Btn.on('pointerup',()=>{
      this.lock.setPosition(lvl1Btn.x,lvl1Btn.y);
      if(!this.credits.visible) this.buttonSound.play();
      this.LockLevel(1);
    });
    lvl2Btn.on('pointerup',()=>{
      this.lock.setPosition(lvl2Btn.x,lvl2Btn.y);
      if(!this.credits.visible)this.buttonSound.play();
      this.LockLevel(2);
    });
    lvl3Btn.on('pointerup',()=>{
      this.lock.setPosition(lvl3Btn.x,lvl3Btn.y);
      if(!this.credits.visible)this.buttonSound.play();
      this.LockLevel(3);
    });
    infoButton.on('pointerup',()=>{
      this.buttonSound.play();
      this.credits.visible = true;
      menuButton.visible = true;
    });
    menuButton.on('pointerup',()=>{
      this.buttonSound.play();
      this.credits.visible = false;
      menuButton.visible = false;
    });

  }
  LockLevel(level){
    this.levelSelected = level;
    this.lock.visible = true;
    this.playLockedBtn.destroy();
  }
  
}
