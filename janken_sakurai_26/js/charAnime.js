/****************************************************************
*  キャラのアニメを描画するファイル
*****************************************************************/

'use strict';




// 最大キャラ数
const MAX_CHARACTER_NUMBER = 4;

//CountessVampire
const VAMPIRE_IMAGE_PATH = [
    "./img/character/Countess_Vampire/Idle.png",
    "./img/character/Countess_Vampire/Attack_1.png",
    "./img/character/Countess_Vampire/Dead.png",
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

//WandererMagician
const MAGICIAN_IMAGE_PATH = [
  "./img/character/Wanderer_Magician/Idle.png",
  "./img/character/Wanderer_Magician/Attack_1.png",
  "./img/character/Wanderer_Magician/Dead.png",
  "./img/character/Wanderer_Magician/Charge_1.png"
];

const MAGICIAN_IMAGE_POS_DEFAULT = [
  {startX:32,startY:55,width:75,height:80},
  {startX:160,startY:55,width:75,height:80},
  {startX:288,startY:55,width:75,height:80},
  {startX:416,startY:55,width:75,height:80},
  {startX:544,startY:55,width:75,height:80},
  {startX:672,startY:55,width:75,height:80},
  {startX:800,startY:55,width:75,height:80},
  {startX:928,startY:55,width:75,height:80},
];

const MAGICIAN_IMAGE_POS_ATTACK = [
  {startX:20,startY:55,width:77,height:80},
  {startX:149,startY:55,width:77,height:80},
  {startX:277,startY:55,width:77,height:80},
  {startX:405,startY:55,width:77,height:80},
  {startX:533,startY:55,width:77,height:80},
  {startX:661,startY:55,width:77,height:80},
  {startX:789,startY:55,width:77,height:80},
  {startX:917,startY:55,width:77,height:80},
];

const MAGICIAN_IMAGE_POS_DEAD = [
{startX:22,startY:55,width:75,height:80},
{startX:150,startY:55,width:75,height:80},
{startX:278,startY:55,width:75,height:80},
{startX:406,startY:55,width:75,height:80},
];

const MAGICIAN_IMAGE_POS_SPA = [
  {startX:30,startY:41,width:45,height:48},
  {startX:95,startY:41,width:45,height:48},
  {startX:160,startY:41,width:45,height:48},
  {startX:225,startY:41,width:45,height:48},
  {startX:290,startY:41,width:45,height:48},
  {startX:355,startY:41,width:45,height:48},
  {startX:410,startY:41,width:45,height:48},
  {startX:460,startY:41,width:45,height:48},
  {startX:510,startY:41,width:45,height:48},
];

//Samurai
const SAMURAI_IMAGE_PATH = [
  "./img/character/Samurai/Idle.png",
  "./img/character/Samurai/Attack_2.png",
  "./img/character/Samurai/Dead.png",
  "./img/character/Samurai/Run.png",
  "./img/character/Samurai/Protection.png"
];

const SAMURAI_IMAGE_POS_DEFAULT = [
  {startX:0,startY:55,width:60,height:80},
  {startX:128,startY:55,width:60,height:80},
  {startX:256,startY:55,width:60,height:80},
  {startX:384,startY:55,width:60,height:80},
  {startX:512,startY:55,width:60,height:80},
  {startX:639,startY:55,width:60,height:80},
];

const SAMURAI_IMAGE_POS_ATTACK = [
  {startX:25,startY:20,width:105,height:110},
  {startX:155,startY:20,width:105,height:110},
  {startX:283,startY:20,width:105,height:110},
  {startX:405,startY:20,width:105,height:110},
  {startX:533,startY:20,width:105,height:110},

];

const SAMURAI_IMAGE_POS_DEAD = [
{startX:22,startY:55,width:85,height:80},
{startX:150,startY:55,width:85,height:80},
{startX:278,startY:55,width:85,height:80},
{startX:406,startY:55,width:85,height:80},
{startX:534,startY:55,width:85,height:80},
{startX:662,startY:55,width:85,height:80},
];

const SAMURAI_IMAGE_POS_RUN = [
  {startX:5,startY:55,width:62,height:80},
  {startX:133,startY:55,width:62,height:80},
  {startX:261,startY:55,width:62,height:80},
  {startX:389,startY:55,width:62,height:80},
  {startX:517,startY:55,width:62,height:80},
  {startX:644,startY:55,width:62,height:80},
  {startX:772,startY:55,width:62,height:80},
  {startX:900,startY:55,width:62,height:80},
  ];


  const SAMURAI_IMAGE_POS_PROTECTION = [
    {startX:50,startY:55,width:60,height:80},
    {startX:178,startY:55,width:60,height:80},
  ];


//Swordsman
const SWORDSMAN_IMAGE_PATH = [
  "./img/character/Swordsman/Idle.png",
  "./img/character/Swordsman/Attack_1.png",
  "./img/character/Swordsman/Dead.png",
  "./img/character/Swordsman/Pick_Up.png",
  "./img/character/Swordsman/Enabling.png",
];

const SWORDSMAN_IMAGE_POS_DEFAULT = [
  {startX:20,startY:60,width:80,height:80},
  {startX:148,startY:60,width:80,height:80},
  {startX:276,startY:60,width:80,height:80},
  {startX:404,startY:60,width:80,height:80},
  {startX:532,startY:60,width:80,height:80},
];

const SWORDSMAN_IMAGE_POS_ATTACK = [
  {startX:25,startY:20,width:105,height:110},
  {startX:155,startY:20,width:105,height:110},
  {startX:283,startY:20,width:105,height:110},
  {startX:405,startY:20,width:105,height:110},
  {startX:533,startY:20,width:105,height:110},

];

const SWORDSMAN_IMAGE_POS_DEAD = [
  {startX:20,startY:60,width:80,height:80},
  {startX:148,startY:60,width:80,height:80},
  {startX:276,startY:60,width:80,height:80},
  {startX:404,startY:60,width:80,height:80},
];

const SWORDSMAN_IMAGE_POS_RUN = [
  {startX:25,startY:55,width:62,height:80},
  {startX:155,startY:55,width:62,height:80},
  {startX:283,startY:55,width:62,height:80},
  {startX:405,startY:55,width:62,height:80},
  {startX:533,startY:55,width:62,height:80},
  {startX:663,startY:55,width:62,height:80},
  {startX:793,startY:55,width:62,height:80},
  {startX:927,startY:55,width:62,height:80},
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
    this.repeatMag = Math.trunc(60  * speed / 1000); //他に流用する場合、引数等での移動速度の調整が必要
  }

  timerStart(){
    this.stopFlag = false;
  }

  timerStop(){
    this.stopFlag = true;
  }

  //speed初期値は500ms秒で、1画像切り替わり
  anime(speed = 500){
    this.count = 0;
    this.calculateRepeatMag(speed);
    return new Promise(resolve => {
      let spriteAnimeRepeat = () => {
        this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
        this.num = Math.trunc(this.count / this.repeatMag);
        this.render();
        this.count ++;

        if(this.count > this.totalNumber * this.repeatMag -1 && this.loopFlag === true){
          this.count = 0;
        } else if (this.count > this.totalNumber * this.repeatMag -1 ||
          (this.loopFlag === true && this.stopFlag === true)){
          return resolve();
        }
        requestAnimationFrame(spriteAnimeRepeat);
      }
      spriteAnimeRepeat();
    });
  }
}

/****************************************************************
*  スプライト画像をアニメーションしながら動かすクラスの定義
*****************************************************************/
class onloadSpriteAnimeMove extends onloadSpriteAnime{
  constructor(imageSource,cvs,trimmingInfo,drawPosX = 0,drawPosY = 0,width,height,totalNumber = trimmingInfo.length,moveX,moveY,clearRange = 140){
    super(imageSource,cvs,trimmingInfo,drawPosX,drawPosY,width,height,totalNumber,length);
    this.moveX = moveX;
    this.moveY = moveY;
    this.initPosX = drawPosX;
    this.clearRange = clearRange;
  }

  anime(speed = 500){ //y軸移動は未実装
    this.count = 0;
    this.calculateRepeatMag(speed);
    this.moveCountX = 0;//他に流用する場合、移動速度の調整が必要
    this.drawPosX = this.initPosX;

    return new Promise(resolve => {
      let spriteAnimeMoveRepeat = () => {
        this.ctx.clearRect(this.clearRange,0,this.cvs.width,this.cvs.height);
        this.num = Math.trunc(this.count / this.repeatMag);
        this.render();
        this.count ++;
        this.moveCountX ++;
        this.drawPosX += 5; //他に流用する場合、移動速度の調整が必要

        if(this.count > this.totalNumber * this.repeatMag - 1 ){
          this.count = 0;
        }
        if(this.moveCountX * 5 > this.moveX){
          this.ctx.clearRect(this.clearRange,0,this.cvs.width,this.cvs.height);
          return resolve();
        }
        requestAnimationFrame(spriteAnimeMoveRepeat);
      };
      spriteAnimeMoveRepeat();
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
    this.attackSE = new Audio('./audio/SE/fire-breath.wav');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_01.mp3');
    this.class = 'Ranged'
  }

  idleStart(){
    this.idle.timerStart();
  }

  idleStop(){
    this.idle.timerStop();
  }

  async renderIdle(){
    await this.idle.anime();
  }

  async attack(){
    await this.attackEmote.anime(200);
    this.attackSE.play();
    await this.attackEffect.anime(100);
  }

  async renderAttack(){
    this.attackEffect.moveX = 320;
    await this.attack();
  }

  async renderDraw(){
    let i ='player';
    this.attackEffect.moveX = 320;
    if(this === renderChar.player) i = 'opponent'
    if(renderChar[i].class === 'Ranged') this.attackEffect.moveX = 115;
    await this.attack();
  }


  async renderDead(){
    this.screamSE.play();
    await this.dead.anime(400);
  }

}

/****************************************************************
*  wondererMagicianのキャラ定義
*****************************************************************/
class wondererMagician extends countessVampire{
  constructor(cvs,drawPosX,drawPosY){
    super(cvs,drawPosX,drawPosY);
    this.idle = new onloadSpriteAnime(MAGICIAN_IMAGE_PATH[0],cvs,MAGICIAN_IMAGE_POS_DEFAULT,drawPosX,drawPosY,120,120,8,true);
    this.attackEmote = new onloadSpriteAnime(MAGICIAN_IMAGE_PATH[1],cvs,MAGICIAN_IMAGE_POS_ATTACK,drawPosX,drawPosY,120,120,7);
    this.attackEffect = new onloadSpriteAnimeMove(MAGICIAN_IMAGE_PATH[3],cvs,MAGICIAN_IMAGE_POS_SPA,drawPosX + 125,drawPosY + 10,50,40,9,320,0,175);
    this.dead = new onloadSpriteAnime(MAGICIAN_IMAGE_PATH[2],cvs,MAGICIAN_IMAGE_POS_DEAD,drawPosX,drawPosY,120,120,4);
    this.attackSE = new Audio('./audio/SE/lightning.wav');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_03.mp3');
    this.class = 'Ranged'
  }

  async renderDead(){
    this.screamSE.play();
    await this.dead.anime(800);
  }

}

/****************************************************************
*  samuraiのキャラ定義
*****************************************************************/
class samurai extends countessVampire{
  constructor(cvs,drawPosX,drawPosY){
    super(cvs,drawPosX,drawPosY);
    this.idle = new onloadSpriteAnime(SAMURAI_IMAGE_PATH[0],cvs,SAMURAI_IMAGE_POS_DEFAULT,drawPosX,drawPosY,90,120,6,true);
    this.run = new onloadSpriteAnimeMove(SAMURAI_IMAGE_PATH[3],cvs,SAMURAI_IMAGE_POS_RUN,drawPosX,drawPosY,90,120,8,300,0,0);
    this.attackEmote = new onloadSpriteAnime(SAMURAI_IMAGE_PATH[1],cvs,SAMURAI_IMAGE_POS_ATTACK,drawPosX + 320,drawPosY - 50,140,160,5);
    this.dead = new onloadSpriteAnime(SAMURAI_IMAGE_PATH[2],cvs,SAMURAI_IMAGE_POS_DEAD,drawPosX,drawPosY,120,120,6);
    this.protection = new onloadSpriteAnime(SAMURAI_IMAGE_PATH[4],cvs,SAMURAI_IMAGE_POS_PROTECTION,drawPosX,drawPosY,90,120,2);
    this.attackSE = new Audio('./audio/SE/sword-flash_01.mp3');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_02.mp3');
    this.class = 'Melee'
  }

  async attack(){
    await this.run.anime(100);
    this.attackSE.play();
    await this.attackEmote.anime(300);
  }

  async renderAttack(){
    await this.attack();
  }

  async renderDraw(){
    await sleep(1000);
    this.attackSE.play();
    await this.protection.anime(500);
  }


  async renderDead(){
    this.screamSE.play();
    await this.dead.anime(400);
  }

}

/****************************************************************
*  swordsmanのキャラ定義
*****************************************************************/
class swordsman extends samurai{
  constructor(cvs,drawPosX,drawPosY){
    super(cvs,drawPosX,drawPosY);
    this.idle = new onloadSpriteAnime(SWORDSMAN_IMAGE_PATH[0],cvs,SWORDSMAN_IMAGE_POS_DEFAULT,drawPosX,drawPosY,90,120,5,true);
    this.run = new onloadSpriteAnimeMove(SWORDSMAN_IMAGE_PATH[3],cvs,SWORDSMAN_IMAGE_POS_RUN,drawPosX,drawPosY,90,120,8,300,0,0);
    this.attackEmote = new onloadSpriteAnime(SWORDSMAN_IMAGE_PATH[1],cvs,SWORDSMAN_IMAGE_POS_ATTACK,drawPosX + 360,drawPosY - 50,140,160,4);
    this.dead = new onloadSpriteAnime(SWORDSMAN_IMAGE_PATH[2],cvs,SWORDSMAN_IMAGE_POS_DEAD,drawPosX,drawPosY,120,120,4);
    this.protection = new onloadSpriteAnime(SWORDSMAN_IMAGE_PATH[4],cvs,SWORDSMAN_IMAGE_POS_DEFAULT,drawPosX,drawPosY,90,120,5);
    this.attackSE = new Audio('./audio/SE/sword-flash_02.wav');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_04.wav');
    this.screamSE.volume = 0.5;
    this.class = 'Melee'
  }

}



///いい方法があれば教えてください。
const PLAYER_CHARACTER_LIST =  [
  new countessVampire(cvs.get('playerChar'),50,150),
  new wondererMagician(cvs.get('playerChar'),50,150),
  new samurai(cvs.get('playerChar'),50,150),
  new swordsman(cvs.get('playerChar'),50,150),
];

const OPPONENT_CHARACTER_LIST =  [
  new countessVampire(cvs.get('opponentChar'),50,150),
  new wondererMagician(cvs.get('opponentChar'),50,150),
  new samurai(cvs.get('opponentChar'),50,150),
  new swordsman(cvs.get('opponentChar'),50,150),
];

// グローバルスコープでキャラの初期状態を宣言
let renderChar = {}

  //味方は選択できるようにする予定。
  let randPChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);
  renderChar.player = PLAYER_CHARACTER_LIST[randPChar];

  // 敵キャラはランダム
  let randOChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);

  while (randOChar === randPChar)  {
    randOChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);
  }

  renderChar.opponent = OPPONENT_CHARACTER_LIST[randOChar];


