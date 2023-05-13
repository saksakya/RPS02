/****************************************************************
*  定数及びグローバル変数を定義したファイル
*****************************************************************/
'use strict';


// 勝ち負けの判定確率(デフォルト)
const RPS_JUDGE_RANGE = {
  win:333,
  draw:333,
  lose:333,
}
RPS_JUDGE_RANGE.all = RPS_JUDGE_RANGE.win + RPS_JUDGE_RANGE.draw + RPS_JUDGE_RANGE.lose;

//PONが出るまでの時間の乱数範囲(ミリ秒指定)
const RPS_START_RAND_RANGE = {
  start:500,
  end:5000
}

//PONが出てから負になるまでの時間(ミリ秒指定)
const RPS_LOSE_TIME = 5000;

//MasterBGM
const Master_BGM = 0.5;


// 描写間隔(1000/62.5fps = 16)
const STANDARD_INTERVAL = 16;

// 背景画像のパス(全20ステージ)(21は没)
const MAX_STAGE_COUNT = 20;
let BG_IMAGE_PATH = [];
for (let i = 0; i < MAX_STAGE_COUNT; i++){
  BG_IMAGE_PATH[i] = `./img/background/${i + 1}.jpg`;
};

// じゃんけんの手画像のパス
const RPS_IMAGE_PATH = './img/sprit_RPS.png';

// じゃんけんの手(スプライト画像)の切り抜き範囲を定義
const RPS_IMAGE_POS = [
  {startX:50,startY:30,width:400,height:400},
  {startX:540,startY:30,width:400,height:400},
  {startX:1030,startY:30,width:400,height:400},
  {startX:50,startY:520,width:400,height:400},
  {startX:540,startY:520,width:400,height:400},
  {startX:1030,startY:520,width:400,height:400},
];

// HTMLのcanvas要素
const canvas = document.querySelectorAll("canvas");


// 描画キャンバス数から1を引いた数を入れる
const CANVAS_NUM = canvas.length - 1;

// 各キャンバス要素を命名
const cvs = new Map([
  ['background',canvas[0]],
  ['playerChar',canvas[1]],
  ['opponentChar',canvas[2]],
  ['opponentHand',canvas[3]],
  ['button',canvas[4]],
  ['letter',canvas[5]]
]);

//canvasに画像や図形を描画する要素を定義
const ctx = new Map;
for(let [key,value] of cvs){
  ctx.set(key,value.getContext("2d"))
};

//opponentChar領域は基本的に反転で使用するため、反転フラグをセット
ctx.get('opponentChar').scale(-1,1);
ctx.get('opponentChar').translate(-cvs.get('opponentChar').width, 0);
ctx.get('opponentChar').save();

/****************************************************************
*  画像読み込み用クラスの定義(1画像)
*****************************************************************/
class onloadImages{
  constructor(imageSource,cvs,drawPosX = 0,drawPosY = 0,width = cvs.width,height = cvs.height){
    this.image = new Image();
    this.image.src = imageSource;
    this.cvs = cvs;
    this.ctx = this.cvs.getContext("2d");
    this.drawPosX = drawPosX;
    this.drawPosY = drawPosY;
    this.width = width;
    this.height = height;
  }
  draw() {
    this.image.onload = () => {
      this.ctx.drawImage(this.image,this.drawPosX,this.drawPosY,this.width,this.height);
    }

  }
}

/****************************************************************
*  スプライト画像読み込み用クラスの定義(1画像)
*****************************************************************/
class onloadSpriteImage extends onloadImages{
  constructor(imageSource,cvs,trimmingInfo,drawPosX = 0,drawPosY = 0,width,height,totalNumber = trimmingInfo.length,num = 0){
    super(imageSource,cvs,drawPosX,drawPosY,width,height);
    this.trimmingInfo = {};
    this.totalNumber = totalNumber;
    this.num = num;
    this.onloadFlag = false;

    for(let i = 0; i < this.totalNumber; i ++)
      this.trimmingInfo[i] = {
        x:trimmingInfo[i].startX,
        y:trimmingInfo[i].startY,
        w:trimmingInfo[i].width,
        h:trimmingInfo[i].height
      }
    }
  // 読み込み判定を非同期で一度確認
  onload() {
    return new Promise(resolve => {
      this.image.onload = () =>{
          resolve();
      }
    });
  }
  // 実際に読み込み
  render(){
    this.ctx.drawImage(this.image,this.trimmingInfo[this.num].x,this.trimmingInfo[this.num].y,
        this.trimmingInfo[this.num].w,this.trimmingInfo[this.num].h,this.drawPosX,this.drawPosY,this.width,this.height);
  }

}

/****************************************************************
*  他関数をまたいで使用するグローバル関数
*  グローバル変数の使用はできれば避けたい。
*****************************************************************/
let countTimerStart = null; //タイマーの開始***カウント開始前のクリックを判定するために必要***
let opponentHandResult = null; //決定した相手の手***相手の手の回転を止める位置を判定するために必要***
let winOrLoseFlag = null; //勝敗フラグ***勝敗決定時に各関数のタイマに割り込むために必要***
let drawFlag = null; //ドローフラグ***ドロー時に各関数のタイマに割り込みために必要***
let screenFlag = 'opening'; //スタートフラグ***スクリーン遷移の把握に必要***