// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    skullPrefab: cc.Prefab = null;
    @property(cc.Node)
    ground: cc.Node = null;
    @property
    maxSkullDuration: number = 0;
    @property
    minSkullDuration: number = 0;
    @property(cc.Node)
    flappybird: cc.Node = null;
    groundY: any;

    spawnNewSkull(){
        var newSkull = cc.instantiate(this.skullPrefab);
        this.node.addChild(newSkull);
        newSkull.setPosition(this.getNewSkullPosition());
    }

    getNewSkullPosition(){
        var randX = 0;
        var randY = this.groundY + Math.random() * this.flappybird.getComponent('flappybird').jumpHeight + 50;
        var maxX = this.node.width/2;
        randX = (Math.random() -0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    }

    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        this.spawnNewSkull();
    }

    start() {

    }

    // update (dt) {}
}
