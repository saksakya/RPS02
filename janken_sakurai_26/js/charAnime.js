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

// 下記関数は、クラスを配列でまとめれば、最適化可能。時間がなかったため妥協してコピー
// キャラの増加をみこすのであれば、配列化しておくのが無難
/****************************************************************
* キャラクターを表示
*****************************************************************/
//classを定義
async function renderChar(cvs,image,loopFlag = false){
  let onloadRenderChar = new onloadSpriteAnime(image,cvs,VAMPIRE_IMAGE_POS_DEFAULT,50,150,90,120,5,loopFlag);
  await onloadRenderChar.onload();
  await onloadRenderChar.anime();
}

/****************************************************************
* 攻撃エモートを表示
*****************************************************************/
//classを定義
async function renderAttackEmote(cvs,image,loopFlag = false){
  let onloadRenderAttackEmotion = new onloadSpriteAnime(image,cvs,VAMPIRE_IMAGE_POS_DEFAULT,50,150,90,120,6,loopFlag);
  await onloadRenderAttackEmotion.onload();
  await onloadRenderAttackEmotion.anime(100);
}

/****************************************************************
* 消滅を表示
*****************************************************************/
//classを定義
async function renderLose(cvs,image,loopFlag = false){
  let onloadRenderLose = new onloadSpriteAnime(image,cvs,VAMPIRE_IMAGE_POS_DEAD,50,150,90,120,6,loopFlag);
  await onloadRenderLose.onload();
  await onloadRenderLose.anime();
}

/****************************************************************
* 攻撃を表示
*****************************************************************/
async function renderAttackEffect(cvs,image){
  let onloadAttackEffect = new onloadSpriteAnimeMove(image,cvs,VAMPIRE_IMAGE_POS_SPA,140,174,50,15,3,320,0);
  await onloadAttackEffect.onload();
  await onloadAttackEffect.anime();
}