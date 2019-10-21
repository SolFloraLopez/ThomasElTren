import Train, * as train from './train.js'
import Rail, * as rail from './Rail.js'
import {directionEnum, matrixEnum} from './Enums.js'

const COLUMNS_CONST = 28;
const ROWS_CONST = 16;
const POOL_LENGTH_CONST = 100;

class MatrixStruct 
{
  constructor(object, direction)
  {
    this.object = object;
    this.direction = direction;
  }
}

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

    this.points = 0;
    this.railPool = [];
    this.trainArray = []
    this.gameMatrix = [];
  }

  preload() 
  { 
    this.load.image('fondosprite', 'img/fondo.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('plantillasprite', 'img/Plantilla.png', {frameWidth: 1400, frameHeight: 800})
    this.load.image('railsprite', 'img/rail.png', {frameWidth: 27, frameHeight: 40})
    this.trainImage = this.load.image('trainsprite', 'img/trainwagon.png', { frameWidth: 50, frameHeight: 50 })
  }

  create() 
  {
    this.createMatrix(this.gameMatrix);

    this.add.sprite(700, 400, 'fondosprite');
    this.plantilla = this.add.sprite(700, 400, 'plantillasprite');
    this.trainArray[0] = new Train(this, 14, 7, 'trainsprite');
    this.trainArray[1] = new Train(this, 14, 8, 'trainsprite');

    //this.trainArray[0].setDepth(1);
    for(let i = 0; i < POOL_LENGTH_CONST; i++)
    {
      this.railPool[i] = new Rail(this, 13, 9, 'railsprite', this.input.activePointer);
    }

    this.gameMatrix[14][6].object = matrixEnum.RAIL;
    this.gameMatrix[14][6].direction = directionEnum.RIGHT;
    
    this.gameMatrix[18][6].object = matrixEnum.RAIL;
    this.gameMatrix[18][6].direction = directionEnum.DOWN;

    this.gameMatrix[18][10].object = matrixEnum.RAIL;
    this.gameMatrix[18][10].direction = directionEnum.LEFT;

    this.gameMatrix[14][10].object = matrixEnum.RAIL;
    this.gameMatrix[14][10].direction = directionEnum.UP;
  }

  update() 
  {
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
        matrix[i][j] = new MatrixStruct(matrixEnum.EMPTY, directionEnum.NONE);
      }
    }
  }

  updateMatrix(Matrix)
  {
    for (let i = 0; i < COLUMNS_CONST; i++) 
    {
      for (let j = 0; j < ROWS_CONST; j++)
      {
        Matrix[i][j] = matrixEnum.EMPTY;
      }
    }
  }

  checkTrain(i)
  {
    let pos = this.trainArray[i].ReturnPos();
    let trainTile = this.trainArray[i].ReturnTile();
    let dir = this.trainArray[i].ReturnDirection();
    let tile = this.gameMatrix[trainTile.column][trainTile.fila];

    if(tile.object == matrixEnum.RAIL && tile.direction != dir && pos.x == trainTile.column * 50 + 25 
      && pos.y == trainTile.fila * 50 + 25)
    {
      this.trainArray[i].ChangeDirection(tile.direction);
      this.trainArray[i].angle = this.trainArray[0].ReturnDirection() * 90;
    }
  }

}