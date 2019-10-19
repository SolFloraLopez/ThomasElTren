export default class Rail extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, pointer)
    {
        super(scene, x, y, texture);
        scene.add.existing(this).setInteractive();
        scene.input.setDraggable(this);

        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });
        
        this.selected = false;
        this.pointer = pointer;
    }

    preUpdate()
    {
        if(!this.pointer.isDown)
        {       
            this.x = Math.floor(this.x / 50) * 50 + 25;
            this.y = Math.floor(this.y / 50) * 50 + 25;
        }
    }
}