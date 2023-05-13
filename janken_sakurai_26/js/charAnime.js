/****************************************************************
*  キャラのアニメを描画するファイル
*****************************************************************/

'use strict';

// 人物
const VAMPIRE_IMAGE_PATH = [
    "./img/character/Countess_Vampire/Idle.png",
    "./img/character/Countess_Vampire/Attack_1.png",
    "./img/character/Countess_Vampire/dead.png",
    "./img/character/Countess_Vampire/Blood_Charge_1.png"
];

const VAMPIRE_IMAGE_POS_DEFAULT = [
    {startX:29,startY:55,width:60,height:80},
    {startX:157,startY:55,width:60,height:80},
    {startX:285,startY:55,width:60,height:80},
    {startX:413,startY:55,width:60,height:80},
    {startX:541,startY:55,width:60,height:80},
    {startX:669,startY:55,width:60,height:80},
];

const VAMPIRE_IMAGE_POS_DEAD = [
  {startX:22,startY:55,width:60,height:80},
  {startX:150,startY:55,width:60,height:80},
  {startX:278,startY:55,width:60,height:80},
  {startX:406,startY:55,width:60,height:80},
  {startX:534,startY:55,width:60,height:80},
  {startX:662,startY:55,width:60,height:80},
  {startX:790,startY:55,width:60,height:80},
  {startX:818,startY:55,width:60,height:80},
];

const VAMPIRE_IMAGE_POS_SPA = [
  {startX:5,startY:18,width:30,height:15},
  {startX:68,startY:18,width:30,height:15},
  {startX:131,startY:18,width:30,height:15},
];

/****************************************************************
*  スプライト画像をアニメーションにするクラスの定義
*****************************************************************/
class onloadSpriteAnime extends onloadSpriteImage{
  constructor(imageSource,cvs,trimmingInfo,drawPosX = 0,drawPosY = 0,width,height,totalNumber = trimmingInfo.length,loopFlag = false){
    super(imageSource,cvs,trimmingInfo,drawPosX,drawPosY,width,height,totalNumber,length);
    this.loopFlag = loopFlag;
    this.stopFlag = false;
  }

  calculateRepeatMag(speed){
    this.repeatMag = Math.trunc((1 / STANDARD_INTERVAL)  * speed); //他に流用する場合、引数等での移動速度の調整が必要
  }

  //speed初期値は250ms秒で、1画像切り替わり
  anime(speed = 250){
    this.count = 0;
    this.calculateRepeatMag(speed);
    return new Promise(resolve => {
      let spriteAnimeTimer = setInterval(() => {
        this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
        this.num = Math.trunc(this.count / this.repeatMag);
        this.render();
        this.count ++;

        if(this.count > this.totalNumber * this.repeatMag -1 && this.loopFlag === true){
          this.count = 0;
          //stopFlagがオンになれば有無を言わさず終了したいが、、、、
        } else if (this.count > this.totalNumber * this.repeatMag -1 || (this.loopFlag === true && winOrLoseFlag !== null)){/********時間がなくグローバル変数でストップ要改善!!!!!! */
        // } else if (this.count > this.totalNumber * 10 -1 || (this.loopFlag === true && this.stopFlag === true)){/**ストップフラグを外部から書き換える方法分からず */
          clearInterval(spriteAnimeTimer);
          resolve();
        }
      },STANDARD_INTERVAL);
    });
  }
}

/****************************************************************
*  スプライト画像をアニメーションしながら動かすクラスの定義
*****************************************************************/
class onloadSpriteAnimeMove extends onloadSpriteAnime{
  constructor(imageSource,cvs,trimmingInfo,drawPosX = 0,drawPosY = 0,width,height,totalNumber = trimmingInfo.length,moveX,moveY){
    super(imageSource,cvs,trimmingInfo,drawPosX,drawPosY,width,height,totalNumber,length);
    this.moveX = moveX;
    this.moveY = moveY;
  }

  anime(speed = 250){ //y軸移動は未実装
    this.count = 0;
    this.calculateRepeatMag(speed);
    this.moveCountX = 0;//他に流用する場合、移動速度の調整が必要

    return new Promise(resolve => {
      let spriteAnimeMoveTimer = setInterval(() => {
        this.ctx.clearRect(140,0,this.cvs.width,this.cvs.height);
        this.num = Math.trunc(this.count / this.repeatMag);
        this.render();
        this.count ++;
        this.moveCountX ++;
        this.drawPosX += 10; //他に流用する場合、移動速度の調整が必要

        if(this.count > this.totalNumber * this.repeatMag - 1 ){
          this.count = 0;
        }
        if(this.moveCountX * 10 > this.moveX){
          this.ctx.clearRect(140,0,this.cvs.width,this.cvs.height);
          clearInterval(spriteAnimeMoveTimer);
          resolve();
        }
      },STANDARD_INTERVAL);
    });
  }
}

/****************************************************************
*  CountessVampireのキャラ定義
*****************************************************************/
class countessVampire{
  constructor(cvs,drawPosX,drawPosY){
    this.idle = new onloadSpriteAnime(VAMPIRE_IMAGE_PATH[0],cvs,VAMPIRE_IMAGE_POS_DEFAULT,drawPosX,drawPosY,90,120,5,true);
    this.attackEmote = new onloadSpriteAnime(VAMPIRE_IMAGE_PATH[1],cvs,VAMPIRE_IMAGE_POS_DEFAULT,drawPosX,drawPosY,90,120,6);
    this.attackEffect = new onloadSpriteAnimeMove(VAMPIRE_IMAGE_PATH[3],cvs,VAMPIRE_IMAGE_POS_SPA,drawPosX + 90,drawPosY + 24,50,15,3,320,0);
    this.dead = new onloadSpriteAnime(VAMPIRE_IMAGE_PATH[2],cvs,VAMPIRE_IMAGE_POS_DEAD,drawPosX,drawPosY,90,120,8);
    this.fbSE = new Audio('./audio/SE/fire-breath.wav');
    this.fbSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_01.mp3');
  }

  async renderIdle(){
    await this.idle.onload();
    await this.idle.anime();
  }

  async renderAttack(){
    //await this.attackEmote.onload();
    //await this.attackEffect.onload();
    await this.attackEmote.anime(100);
    this.fbSE.play();
    await this.attackEffect.anime(150);
  }

  async renderDead(){
    //await this.dead.onload();
    this.screamSE.play();
    await this.dead.anime(150);
  }

}

// グローバルスコープでキャラの初期状態を宣言
let renderChar = {}
renderChar.player = new countessVampire(cvs.get('playerChar'),50,150);
renderChar.opponent = new countessVampire(cvs.get('opponentChar'),50,150);
