import Train, * as train from './train.js'

import Rail, * as rail from './Rail.js'
import Passenger, * as passenger from './passenger.js'
import CurvedRail, * as curvedRail from './CurvedRail.js'
import {directionEnum, matrixEnum, stateEnum} from './Enums.js'


const COLUMNS = 28;
const ROWS = 16;
const POOL_LENGTH = 100;
const TRAIN_SPEED = 10;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

    this.points = 0;
    this.state = stateEnum.ONTRACK;
    this.railPool = [];
    this.trainArray = [];
    this.gameMatrix = [];
  }

  preload()
  {
    // this.load.image('fondosprite', 'img/fondo.png', {frameWidth: 1400, frameHeight: 800})
    // this.load.image('plantillasprite', 'img/Plantilla.png', {frameWidth: 1400, frameHeight: 800})
    this.load.tilemapTiledJSON('tilemap','./tilemap.json')
    this.load.image('patronesTilemap','img/terrain.png')
    this.load.image('railsprite', 'img/rail.png', {frameWidth: 32, frameHeight: 48})
    this.load.image('trainsprite', 'img/trainwagon.png', { frameWidth: 50, frameHeight: 50 })

    this.load.image('passengersprite', 'img/passenger.png', { frameWidth: 50, frameHeight: 50 })

    this.load.image('curvedrailsprite', 'img/curvedrail.png', {frameWidth: 32, frameHeight: 32})

  }

  create()
  {
    this.map = this.make.tilemap({
      key: 'tilemap',
      tileWidth: 64,
      tileHeight: 64
    });
    this.map.addTilesetImage('terrain','patronesTilemap');
    //crea capa con tileset "terrain"
    this.backgroundLayer = this.map.createStaticLayer('Background','terrain');
    //se añade colision a las partes que tengan atributo collides == true
    this.backgroundLayer.setCollisionByProperty({collides: true});

    //para ver la caja de colisiones del layer
    const debugGraphics = this.add.graphics().setAlpha(0.75);
     this.backgroundLayer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
   
    //grupos de colisiones
    this.railsGroup = this.physics.add.group();
    this.trainsGroup = this.physics.add.group();
    this.passengersGroup = this.physics.add.group();

    
    this.createMatrix(this.gameMatrix);
    console.log(this.gameMatrix[0][0].object);

    // this.add.sprite(700, 400, 'fondosprite');
    // this.plantilla = this.add.sprite(700, 400, 'plantillasprite');

    //crea las entidades (los pasajeros seran un array tambien)
    this.passenger = new Passenger(this,14,9,'passengersprite');
    this.trainArray[0] = new Train(this, 14, 14, 'trainsprite', TRAIN_SPEED);
    this.trainArray[1] = new Train(this, 14, 15, 'trainsprite', TRAIN_SPEED);

    //se añaden a los grupos de colisiones
    this.passengersGroup.add(this.passenger);

    this.trainsGroup.add(this.trainArray[0]);
    this.trainsGroup.add(this.trainArray[1]);
    // this.physics.add.overlap(this.trainArray[0],this.railsGroup);

    //creacion de colisiones entre entidades y callbacks
    this.physics.add.collider(this.trainsGroup, this.passengersGroup, (o1, o2) => {
      o2.destroy();
  });
    this.physics.add.collider(this.trainsGroup,this.backgroundLayer, () => {
      this.scene.pause();
  });
    // new CurvedRail(this, 10, 10, 'curvedrailsprite', this.input.activePointer, 0);


    for(let i = 0; i < POOL_LENGTH; i++)
    {
      // let dir1;
      // let dir2;

      //el tipo de rail definira su angulo
      let railType = i%4;

      // switch (i % 4)
      // {
      //   case 0:
      //     dir1 = directionEnum.UP;
      //     dir2 = directionEnum.LEFT;
      //     break;
      //   case 1:
      //     dir1 = directionEnum.UP;
      //     dir2 = directionEnum.RIGHT;
      //     break;
      //   case 2:
      //     dir1 = directionEnum.DOWN;
      //     dir2 = directionEnum.LEFT;
      //     break;
      //   case 3:
      //     dir1 = directionEnum.DOWN;
      //     dir2 = directionEnum.RIGHT;
      //     break;
      // }

      this.railPool[i] = new CurvedRail(this, i % 4, 9, 'curvedrailsprite', this.input.activePointer, /*dir1, dir2*/railType);
      //ademas de crearlos se añaden al grupo de colisiones
      this.railsGroup.add(this.railPool[i]);

      // console.log(this.railPool[i].ReturnTile());
      // console.log(this.railPool[i].ReturnOrientation());
    }
  }

  update()
  {
    //Nota: como ya no se puede comprobar la posición exacta del tren con el rail para cambiar la direccion (porque con las fisicas se salta frames) hay que poner un pequeño offset en las comprobaciones
    //y abarcar todos los casos en Compatible();
    //si se superponen trenes y railes
    this.physics.overlap(this.trainsGroup,this.railsGroup,(o1, o2) => {
      console.log(o2.ReturnRailType());
      //comprueba si el rail es compatible con el tren, es decir, si puede entrar por ese lado del rail
      if(o1.Compatible(o2)){

      }
      else this.scene.pause();
  });


    if (this.state == stateEnum.ONTRACK)
    {
      this.updateMatrix(this.gameMatrix);

      for (let i = 0; i < this.trainArray.length; i++)
      {
        this.checkTrain(i);
      }
    }
  }

  createMatrix(matrix) {

    for (let i = 0; i < COLUMNS; i++)
    {
      matrix[i] = [];
      for (let j = 0; j < ROWS; j++)
      {
        matrix[i][j] = {object: matrixEnum.EMPTY, direction1: directionEnum.NONE, direction2: directionEnum.NONE};
      }
    }
  }

  updateMatrix()
  {
    for (let i = 0; i < COLUMNS; i++)
    {
      for (let j = 0; j < ROWS; j++)
      {
        let k = 0;
        let flag = false;

        while(k < POOL_LENGTH && !flag)
        {
          let railTile = this.railPool[k].ReturnTile();

          if(railTile.column != i || railTile.row != j) this.gameMatrix[i][j] = {object: matrixEnum.EMPTY, direction1: directionEnum.NONE, direction2: directionEnum.NONE}

           else
          {
            let orientation = this.railPool[k].ReturnOrientation();
            this.gameMatrix[i][j] = {object: matrixEnum.RAIL, direction1: orientation.First, direction2: orientation.Second }
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
    let tileDirection = {First: this.gameMatrix[trainTile.column][trainTile.row].direction1, Second: this.gameMatrix[trainTile.column][trainTile.row].direction2};

    if(tileObject == matrixEnum.RAIL && pos.x == trainTile.column * 50 + 25 && pos.y == trainTile.row * 50 + 25)
    {
      // if (dir == -tileDirection.First) this.trainArray[i].ChangeDirection(tileDirection.Second);
      // else if (dir == -tileDirection.Second) this.trainArray[i].ChangeDirection(tileDirection.First);
      // else this.changeState(stateEnum.CRASHED);
    }
  }

  // changeState(state)
  // {
  //   this.state = state;

  //   for(let i = 0; i < POOL_LENGTH; i++)
  //   {
  //     this.railPool[i].ChangeState(state);
  //   }

  //   for(let i = 0; i < this.trainArray.length; i++)
  //   {
  //     this.trainArray[i].ChangeState(state);
  //   }
  // }
}
