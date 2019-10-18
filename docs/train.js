export default class Train extends Phaser.GameObject.Sprite
{ 
    constructor(headPos)
    {
        this.headPos = headPos;
    }

    ReturnPos() 
    {
        return this.headPos;   
    }

    ChangePos(amount)
    {
        this.headPos += amount;
    }
}

