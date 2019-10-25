import Train, * as train from './train.js'
import Rail, * as rail from './Rail.js'
import {directionEnum, matrixEnum} from './Enums.js'

const COLUMNS_CONST = 28;
const ROWS_CONST = 16;
const POOL_LENGTH_CONST = 100;
const TRAIN_SPEED_CONST = 0.5;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

    this.points = 0;
    this.railPool = [];
    this.trainArray = [];
    this.gameMatrix = [];
  }

  preload() 
  { 
    this.load.image('fondosprite', 'img/fondo.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('plantillasprite', 'img/Plantilla.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('railsprite', 'img/rail.png', {frameWidth: 27, frameHeight: 40})
    this.load.image('trainsprite', 'img/trainwagon.png', { frameWidth: 50, frameHeight: 50 })
  }

  create() 
  {
    this.createMatrix(this.gameMatrix);
    console.log(this.gameMatrix[0][0].object);

    this.add.sprite(700, 400, 'fondosprite');
    this.plantilla = this.add.sprite(700, 400, 'plantillasprite');
    this.trainArray[0] = new Train(this, 14, 14, 'trainsprite', TRAIN_SPEED_CONST);
    this.trainArray[1] = new Train(this, 14, 15, 'trainsprite', TRAIN_SPEED_CONST);

    for(let i = 0; i < POOL_LENGTH_CONST; i++)
    {
      let dir = ((i % 2) + 1) * Math.sign(-2.1 + 1 + i % 4);
      this.railPool[i] = new Rail(this, i % 4, 9, 'railsprite', this.input.activePointer, dir);   
      console.log(this.railPool[i].ReturnTile());
      console.log(this.railPool[i].ReturnOrientation());
    }
  }

  update() 
  {
    this.updateMatrix(this.gameMatrix);

    for (let i = 0; i < 2; i++) 
    {
      this.checkTrain(i);
    }
  }

  createMatrix(matrix) {
    
    for (let i = 0; i < COLUMNS_CONST; i++) 
    {
      matrix[i] = [];
      for (let j = 0; j < ROWS_CONST; j++) 
      {
        matrix[i][j] = {object: matrixEnum.EMPTY, direction: directionEnum.NONE};
      }
    }
  }

  updateMatrix()
  {
    for (let i = 0; i < COLUMNS_CONST; i++) 
    {
      for (let j = 0; j < ROWS_CONST; j++)
      {
        let k = 0;
        let flag = false;

        while(k < POOL_LENGTH_CONST && !flag)
        {
          let railTile = this.railPool[k].ReturnTile();

          if(railTile.column != i || railTile.row != j) this.gameMatrix[i][j] = {object: matrixEnum.EMPTY, direction: directionEnum.NONE}

           else 
          {
            this.gameMatrix[i][j] = {object: matrixEnum.RAIL, direction: this.railPool[k].ReturnOrientation()}
            flag = true;
          }

          k++;
        }
      }
    }
  }

  checkTrain(i)
  {
    let pos = this.trainArray[i].ReturnPos();
    let trainTile = this.trainArray[i].ReturnTile();
    let dir = this.trainArray[i].ReturnDirection();
    let tileObject = this.gameMatrix[trainTile.column][trainTile.row].object;
    let tileDirection = this.gameMatrix[trainTile.column][trainTile.row].direction;

    if(tileObject == matrixEnum.RAIL && tileDirection != dir && pos.x == trainTile.column * 50 + 25 && pos.y == trainTile.row * 50 + 25)
    {
      this.trainArray[i].ChangeDirection(tileDirection);
      console.log(trainTile);
    }
  }
}