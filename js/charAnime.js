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
class renderSpriteAnime extends renderSpriteImage{
  constructor({
    imageSource,
    cvs,
    renderPos,
    size,
    trimmingInfo,
    totalNumber = trimmingInfo.length,
    loopFlag = false
  }){
    super({imageSource,cvs,renderPos,size,trimmingInfo,totalNumber});
    this.voicelessFlag = false;
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
  anime(speed = 210 * DISPLAY_REFRESH_RATE){
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
class renderSpriteAnimeMove extends renderSpriteAnime{
  constructor({
    imageSource,
    cvs,
    renderPos,
    size,
    trimmingInfo,
    totalNumber = trimmingInfo.length,
    move,
    clearRange = 140
    }){
    super({imageSource,cvs,renderPos,size,trimmingInfo,totalNumber});
    this.move = move;
    this.initPosX = renderPos.x;
    this.clearRange = clearRange;
  }

  anime(speed = 210 * DISPLAY_REFRESH_RATE){ //y軸移動は未実装
    this.count = 0;
    this.calculateRepeatMag(speed);
    this.moveCount = 0;//他に流用する場合、移動速度の調整が必要
    this.renderPos.x = this.initPosX;

    return new Promise(resolve => {
      let spriteAnimeMoveRepeat = () => {
        this.ctx.clearRect(this.clearRange,0,this.cvs.width,this.cvs.height);
        this.num = Math.trunc(this.count / this.repeatMag);
        this.render();
        this.count ++;
        this.moveCount ++;
        this.renderPos.x += 12 / DISPLAY_REFRESH_RATE; //他に流用する場合、移動速度の調整が必要

        if(this.count > this.totalNumber * this.repeatMag - 1 ){
          this.count = 0;
        }
        if(this.moveCount * 12 / DISPLAY_REFRESH_RATE > this.move.x){
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
  constructor({cvs,renderPos}){
    this.idle = new renderSpriteAnime({
      imageSource : VAMPIRE_IMAGE_PATH[0],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : VAMPIRE_IMAGE_POS_DEFAULT,
      totalNumber : 5,
      loopFlag : true
    });
    this.attackEmote = new renderSpriteAnime({
      imageSource : VAMPIRE_IMAGE_PATH[1],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : VAMPIRE_IMAGE_POS_DEFAULT,
      totalNumber : 6
    });
    this.attackEffect = new renderSpriteAnimeMove({
      imageSource : VAMPIRE_IMAGE_PATH[3],
      cvs : cvs,
      renderPos :  {x : renderPos.x + 90 , y : renderPos.y + 24},
      size : { width : 50 , height : 15},
      trimmingInfo : VAMPIRE_IMAGE_POS_SPA,
      totalNumber : 3,
      move : { x: 320, y : 0}
    });
    this.dead = new renderSpriteAnime({
      imageSource : VAMPIRE_IMAGE_PATH[2],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : VAMPIRE_IMAGE_POS_DEAD,
      totalNumber : 8
    });

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
    await this.attackEmote.anime(85 * DISPLAY_REFRESH_RATE);
    if(this.voicelessFlag === false) this.attackSE.play();
    await this.attackEffect.anime(42 * DISPLAY_REFRESH_RATE);
  }

  async renderAttack(){
    this.attackEffect.move.x = 320;
    await this.attack();
  }

  async renderDraw(){
    let i ='player';
    this.attackEffect.move.x = 320;
    if(this === renderChar.player) i = 'opponent'
    if(renderChar[i].class === 'Ranged') this.attackEffect.move.x = 120;
    await this.attack();
  }

  async renderDead(){
    if(this.voicelessFlag === false) this.screamSE.play();
    await this.dead.anime(165 * DISPLAY_REFRESH_RATE);
  }

}

/****************************************************************
*  wondererMagicianのキャラ定義
*****************************************************************/
class wondererMagician extends countessVampire{
  constructor({cvs,renderPos}){
    super({cvs,renderPos});
    this.idle = new renderSpriteAnime({
      imageSource : MAGICIAN_IMAGE_PATH[0],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 120 , height : 120},
      trimmingInfo : MAGICIAN_IMAGE_POS_DEFAULT,
      totalNumber : 8,
      loopFlag : true
    });
    this.attackEmote = new renderSpriteAnime({
      imageSource :MAGICIAN_IMAGE_PATH[1],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 120 , height : 120},
      trimmingInfo : MAGICIAN_IMAGE_POS_ATTACK,
      totalNumber : 7
    });
    this.attackEffect = new renderSpriteAnimeMove({
      imageSource : MAGICIAN_IMAGE_PATH[3],
      cvs : cvs,
      renderPos :  {x : renderPos.x + 125 , y : renderPos.y + 10},
      size : { width : 50 , height : 40},
      trimmingInfo : MAGICIAN_IMAGE_POS_SPA,
      totalNumber : 9,
      move : { x: 175, y : 0},
      clearRange : 170
    });
    this.dead = new renderSpriteAnime({
      imageSource : MAGICIAN_IMAGE_PATH[2],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 120 , height : 120},
      trimmingInfo : MAGICIAN_IMAGE_POS_DEAD,
      totalNumber : 4
    });
    this.attackSE = new Audio('./audio/SE/lightning.wav');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_03.mp3');
    this.class = 'Ranged'
  }

  async renderDead(){
    if(this.voicelessFlag === false) this.screamSE.play();
    await this.dead.anime(333 * DISPLAY_REFRESH_RATE);
  }

}

/****************************************************************
*  samuraiのキャラ定義
*****************************************************************/
class samurai extends countessVampire{
  constructor({cvs,renderPos}){
    super({cvs,renderPos});
    this.idle = new renderSpriteAnime({
      imageSource : SAMURAI_IMAGE_PATH[0],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : SAMURAI_IMAGE_POS_DEFAULT,
      totalNumber : 6,
      loopFlag : true
    });
    this.run = new renderSpriteAnimeMove({
      imageSource :SAMURAI_IMAGE_PATH[3],
      cvs : cvs,
      renderPos : {x : renderPos.x , y : renderPos.y},//参照渡しにすると値が初期化されない
      size : { width : 90 , height : 120},
      trimmingInfo : SAMURAI_IMAGE_POS_RUN,
      totalNumber : 8,
      move : { x: 300, y : 0},
      clearRange : 0
    });
    this.attackEmote = new renderSpriteAnime({
      imageSource : SAMURAI_IMAGE_PATH[1],
      cvs : cvs,
      renderPos :  {x : renderPos.x + 320 , y : renderPos.y - 50},
      size : { width : 140 , height : 160},
      trimmingInfo : SAMURAI_IMAGE_POS_ATTACK,
      totalNumber : 5
    });
    this.dead = new renderSpriteAnime({
      imageSource : SAMURAI_IMAGE_PATH[2],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 120 , height : 120},
      trimmingInfo : SAMURAI_IMAGE_POS_DEAD,
      totalNumber : 6
    });
    this.protection = new renderSpriteAnime({
      imageSource : SAMURAI_IMAGE_PATH[4],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : SAMURAI_IMAGE_POS_PROTECTION,
      totalNumber : 2
    });
    this.attackSE = new Audio('./audio/SE/sword-flash_01.mp3');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_02.mp3');
    this.class = 'Melee'
  }

  async attack(){
    await this.run.anime(42 * DISPLAY_REFRESH_RATE);
    if(this.voicelessFlag === false) this.attackSE.play();
    await this.attackEmote.anime(125 * DISPLAY_REFRESH_RATE);
  }

  async renderAttack(){
    await this.attack();
  }

  async renderDraw(){
    await sleep(1000);
    if(this.voicelessFlag === false) this.attackSE.play();
    await this.protection.anime(210 * DISPLAY_REFRESH_RATE);
  }

  async renderDead(){
    if(this.voicelessFlag === false) this.screamSE.play();
    await this.dead.anime(167 * DISPLAY_REFRESH_RATE);
  }

}

/****************************************************************
*  swordsmanのキャラ定義
*****************************************************************/
class swordsman extends samurai{
  constructor({cvs,renderPos}){
    super({cvs,renderPos});
    this.idle = new renderSpriteAnime({
      imageSource : SWORDSMAN_IMAGE_PATH[0],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : SWORDSMAN_IMAGE_POS_DEFAULT,
      totalNumber : 5,
      loopFlag : true
    });
    this.run = new renderSpriteAnimeMove({
      imageSource :SWORDSMAN_IMAGE_PATH[3],
      cvs : cvs,
      renderPos : {x : renderPos.x , y : renderPos.y},//参照渡しにすると値が初期化されない
      size : { width : 90 , height : 120},
      trimmingInfo : SWORDSMAN_IMAGE_POS_RUN,
      totalNumber : 8,
      move : { x: 300, y : 0},
      clearRange : 0
    });
    this.attackEmote = new renderSpriteAnime({
      imageSource : SWORDSMAN_IMAGE_PATH[1],
      cvs : cvs,
      renderPos :  {x : renderPos.x + 350 , y : renderPos.y - 50},
      size : { width : 140 , height : 160},
      trimmingInfo : SWORDSMAN_IMAGE_POS_ATTACK,
      totalNumber : 4
    });
    this.dead = new renderSpriteAnime({
      imageSource : SWORDSMAN_IMAGE_PATH[2],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 120 , height : 120},
      trimmingInfo : SWORDSMAN_IMAGE_POS_DEAD,
      totalNumber : 4
    });
    this.protection = new renderSpriteAnime({
      imageSource : SWORDSMAN_IMAGE_PATH[4],
      cvs : cvs,
      renderPos : renderPos,
      size : { width : 90 , height : 120},
      trimmingInfo : SWORDSMAN_IMAGE_POS_DEFAULT,
      totalNumber : 5
    });
    this.attackSE = new Audio('./audio/SE/sword-flash_02.wav');
    this.attackSE.volume = 0.5;
    this.screamSE = new Audio('./audio/SE/scream_04.wav');
    this.screamSE.volume = 0.5;
    this.class = 'Melee'
  }

}

const initPos = {
  x:50,
  y:150
}

///いい方法があれば教えてください。
const PLAYER_CHARACTER_LIST =  [
  new countessVampire({cvs:cvs.get('playerChar'), renderPos : initPos}),
  new wondererMagician({cvs:cvs.get('playerChar'), renderPos : initPos}),
  new samurai({cvs:cvs.get('playerChar'), renderPos : initPos}),
  new swordsman({cvs:cvs.get('playerChar'), renderPos : initPos}),
];

const OPPONENT_CHARACTER_LIST =  [
  new countessVampire({cvs:cvs.get('opponentChar'), renderPos : initPos}),
  new wondererMagician({cvs:cvs.get('opponentChar'), renderPos : initPos}),
  new samurai({cvs:cvs.get('opponentChar'), renderPos : initPos}),
  new swordsman({cvs:cvs.get('opponentChar'), renderPos : initPos}),
];

// グローバルスコープでキャラの初期状態を宣言
let renderChar = {}

//味方は選択できるようにできず
function randomDecideCharacter(){
  let randPChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);
  let randOChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);

  while (randOChar === randPChar)  {
    randOChar = Math.trunc(Math.random() * MAX_CHARACTER_NUMBER);
  }
  renderChar.player = PLAYER_CHARACTER_LIST[randPChar];
  renderChar.opponent = OPPONENT_CHARACTER_LIST[randOChar];

  if(screenFlag === 'title') {
    renderChar.player.voicelessFlag = true;
    renderChar.opponent.voicelessFlag = true;
  }else{
    renderChar.player.voicelessFlag = false;
    renderChar.opponent.voicelessFlag = false;
  }

}


