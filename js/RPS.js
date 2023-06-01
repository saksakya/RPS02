/****************************************************************
*  じゃんけん画面のメインロジック
*****************************************************************/
'use strict';

const battleBGM = new Audio('./audio/bgm/battle_01.mp3');
battleBGM.loop = true;
battleBGM.volume = 0.4 *  Master_BGM;

/****************************************************************
*  文字スクロール専用のクラス
*****************************************************************/
class scrollText extends textAnimation{
	constructor ({cvs}) {
    super({cvs})
	}

  renderTextAnimation({initElement,finalElement,str}){
    return new Promise(resolve => {
      this.str = str;
      this.timeLine.to(initElement,{
        x:finalElement.x,
        y:finalElement.y,
        opacity : finalElement.opacity,
        duration : finalElement.duration,
        ease : "power4.inout",
        //yoyo: true,
        //repeat: 1,
        //repeatDelay:2,
        onUpdate: () => {
          this.reRenderText(initElement,true);
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  //以下2つのメソッドは実装できず
  renderTextRotation({initElement,finalElement,str}){
    return new Promise(resolve => {
      this.str = str;
      this.timeLine.to(initElement,{
        x:finalElement.x,
        y:finalElement.y,
        opacity : finalElement.opacity,
        rotate : finalElement.rotate,
        duration : 1,
        ease : "power4.inout",
        //yoyo: true,
        //repeat: 1,
        //repeatDelay:2,
        onUpdate: () => {
          this.renderRotation(initElement,false);
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }


  renderRotation(textElement,addStrokeText = false){
    this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
    this.ctx.globalAlpha = textElement.opacity;
    this.ctx.beginPath();
    this.ctx.translate(300,400);
    this.ctx.rotate((-45 * Math.PI) / 180);

    if (addStrokeText===true) {
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#000000'
      this.ctx.strokeText(this.str,textElement.x,textElement.y);
    }
  }

}

/****************************************************************
* じゃんけんボタン(自分の手の候補)を表示
*****************************************************************/
async function renderRPSButton(cvs){
	let onloadRPSButton = new renderSpriteImage({
		imageSource : RPS_IMAGE_PATH,
		cvs : cvs,
		renderPos : { x : 100, y : 280},
		size : { width : 100, height : 100},
		trimmingInfo : RPS_IMAGE_POS,
	});

	await onloadRPSButton.onload();

	for(let i = 0; i < 3; i++){
		onloadRPSButton.num = i;
		onloadRPSButton.renderPos.x = 100 + i * 150;
		onloadRPSButton.render();
	}
}

/****************************************************************
* じゃんけん画像(自分の手)を表示
*****************************************************************/
function renderPlayerHand(i){

	if(i === null){
    ctx.get('opponentHand').clearRect(0,0,cvs.get('opponentHand').width,cvs.get('opponentHand').height)
    return;
	}

	let onloadRPSButton = new renderSpriteImage({
		imageSource : RPS_IMAGE_PATH,
		cvs : cvs.get('opponentHand'),
		renderPos : { x : 40 , y: 30},
		size : { width : 100, height : 100},
		trimmingInfo : RPS_IMAGE_POS,
	});
	onloadRPSButton.num = i;
	onloadRPSButton.render();
}

/****************************************************************
* 相手の手を表示(xミリ秒ごとに切り替え)
*****************************************************************/
function renderOpponentHand(){
	let onloadRPSButton = new renderSpriteImage({
    imageSource : RPS_IMAGE_PATH,
    cvs : cvs.get('opponentHand'),
    renderPos : { x : 465, y : 30},
    size : { width : 100, height : 100},
    trimmingInfo : RPS_IMAGE_POS,
});

	let i = 3;

	let opponentHandTimer = setInterval(() => {
		onloadRPSButton.num = i;
		onloadRPSButton.render();

		// 相手の手が決まったら中断(グローバル変数で判断)
		if (opponentHandResult === i - 3 || winOrLoseFlag === 'timeout'){
			clearInterval(opponentHandTimer);
		}
		i ++;
		if(i > 5){
			i = 3;
		}
	}, 100);
}

/****************************************************************
* じゃんけんの合図を出力～結果表示まで
*****************************************************************/
async function RPSMain(cvs){
  //音声データ配列化
  let rpsSE= new Array(2);
  for(let i = 0; i < 2; i++) {
    rpsSE[i] = new Array(2).fill(0);
  }

  for(let i = 0; i <3; i++){
    rpsSE[0][i] = new Audio(`./audio/SE/RPSstart_0${i + 1}.wav`);
    rpsSE[1][i] = new Audio(`	./audio/SE/RPSdraw_0${i + 1}.wav`);
  }

  //フライング検出用
  let falseStartDetect = () => {
		if(winOrLoseFlag === 'falseStart'){
    renderPlayerHand(null);
		resultOutput(cvs,winOrLoseFlag);
		return true;
		}
		return false;
	}

  let initElement = [];
  let finalElement = [];
  //始点と終点等定義
  initElement[0] = new element({x:150,y:50,opacity:0});
  initElement[1] = new element({x:450,y:350,opacity:0});
  initElement[2] = new element({x:300,y:200,opacity:0});
  finalElement[0] = new element({x:250,y:200,opacity:1,duration:0.7});
  finalElement[1] = new element({x:330,y:200,opacity:1,duration:0.7});
  finalElement[2] = new element({x:300,y:200,opacity:1,duration:0});

  let RPSRand = () => Math.trunc(Math.random() * (RPS_START_RAND_RANGE.end - RPS_START_RAND_RANGE.start))
  +  RPS_START_RAND_RANGE.start;

  //初期化
	renderChar.player.idleStop();
	renderChar.opponent.idleStop();
	await sleep(100);
	initVariables();

  let signNumber = 0;
  let renderScrollText = new scrollText({cvs : cvs});
  renderScrollText.renderFontChange({fontSize : 40});

  await sleep(1000);

  do{
    if(drawFlag === true){
      await resultDraw();
      opponentHandResult = null;
      signNumber = 1;
      await sleep(500);
    }

    for(let i = 0; i < 3; i++){
      if (falseStartDetect() == true) return;
      rpsSE[signNumber][i].play();
      renderScrollText.renderFontChange({fontSize : 40});
      await renderScrollText.renderTextAnimation({
        initElement:Object.assign({},initElement[i]),
        finalElement:finalElement[i],
        str:RPS_SIGN[signNumber][i]
      });
      if(i === 1){
        await sleep(RPSRand());
      }else{
        await sleep(100);
      }
      if (falseStartDetect() == true) return;
    }
    drawFlag = null;
    renderPlayerHand(null);
    renderOpponentHand();
    countTimerStart = performance.now();
    await renderElapsedTime(cvs);
  } while(drawFlag === true)

	resultOutput(cvs,winOrLoseFlag);

}

/****************************************************************
* 経過時間を計算して表示
*****************************************************************/
function renderElapsedTime(cvs){

  let ctx =  cvs.getContext("2d");

  ctx.font = ctx.font.replace(match, 34);
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';

  return new Promise(resolve => {
    let elapsedTimer = () =>{
      ctx.clearRect(200,0,300,150);
      calculateTime();
      ctx.fillText(elapsedTime,340,30)
      ctx.strokeText(elapsedTime,340,30)
      if(performance.now() - countTimerStart >  RPS_LOSE_TIME || opponentHandResult !== null){
        if(performance.now() - countTimerStart > RPS_LOSE_TIME) winOrLoseFlag = 'timeout';

        return resolve();
      }
      requestAnimationFrame(elapsedTimer);
    }
    elapsedTimer();
	});
}

function calculateTime(){
  elapsedTime = performance.now() - countTimerStart;
  elapsedTime = elapsedTime / 10;
  elapsedTime = Math.trunc(elapsedTime);
  elapsedTime = elapsedTime / 100;
  elapsedTime = elapsedTime.toFixed(2);
}

	/****************************************************************
	* ボタンがクリックされたか確認。
	*****************************************************************/
	function buttonFlagCheck(posX, posY){
	// ボタンが押された情報を格納
	let btnHit = [];

	// 四角型の場合
	// for(let i = 0; i < 3; i++){
	//   btnPos = {
	//     x: 100 + 150*(i), y: 280,  // 座標
	//     w: 100, h: 100   // サイズ
	//   };

	// 円形の場合
	for(let i = 0; i < 3; i++){
		let btnPos = {
		x: 100 + 150*(i) + 50, y: 280 + 50,  // 座標
		r: 50  // 半径
		};

		// クリックした座標が画像の上にあるか判定
		// 四角型の場合
		// btnHit [i] =
		//     (btnPos.x <= point.x && point.x <= btnPos.x + btnPos.w)
		// && (btnPos.y <= point.y && point.y <= btnPos.y + btnPos.h)

		// 円形の場合（ピラゴラスの定理をつかってユークリッド距離と半径で判定する。）
		btnHit [i] =
		Math.pow(btnPos.x - posX, 2) + Math.pow(btnPos.y - posY, 2) <= Math.pow(btnPos.r, 2);

		if (btnHit[i]) {
		return i;
		}
	}
	return null;
}

/****************************************************************
* クリックされたときの挙動
*****************************************************************/
canvas[CANVAS_NUM].addEventListener("click", e => {
	//クリックされた場所の座標をcanvas内座標に変換
	const rect = canvas[CANVAS_NUM].getBoundingClientRect();
	const point = {
	x: e.clientX - rect.left,
	y: e.clientY - rect.top
	};

	let buttonFlag = buttonFlagCheck(point.x,point.y);

	if(screenFlag === 'run1'){
		if(winOrLoseFlag !== null){

		}else{
			if((countTimerStart === null || drawFlag === true) && buttonFlag !== null){
				winOrLoseFlag = 'falseStart';
			}else if(buttonFlag !== null){
				RPSJudge(buttonFlag);
			}
		}
	}
});

/****************************************************************
* 勝負の判定結果を乱数で決定(CPU有利にするため、結果から判定)
*****************************************************************/
function RPSJudge(myHand){
	let wodJudge;
	let wodRand = Math.trunc(Math.random() * (RPS_JUDGE_RANGE.all - 1))
	let wod = {
		win:RPS_JUDGE_RANGE.win,
		lose:RPS_JUDGE_RANGE.lose,
		draw:RPS_JUDGE_RANGE.draw,
		all:RPS_JUDGE_RANGE.all
	};

	let elapsedTime = performance.now() - countTimerStart;

	// 勝率は時間で増減
	if(elapsedTime < 100) {
		wod.win = wod.all;
	}else if(elapsedTime < 150) {
		wod.win = Math.trunc(wod.all * 0.9);
		wod.lose = Math.trunc(wod.all * 0.05);
	}else if(elapsedTime < 200) {
		wod.win = Math.trunc(wod.all * 0.6);
		wod.lose = Math.trunc(wod.all * 0.2);
	}else if(elapsedTime < 1500){
		;
	}else if(elapsedTime < 3000){
		wod.lose = Math.trunc(wod.lose + wod.win * 0.6)
		wod.win = Math.trunc(wod.win * 0.5);
	}else if(elapsedTime < 5000){
		wod.lose = Math.trunc(wod.lose + wod.win * 0.9)
		wod.win = Math.trunc(wod.win * 0.3);
	}else{
		wod.lose = Math.trunc(wod.lose + wod.win)
		wod.win = Math.trunc(wod.win * 0.1);
	}

	if(wodRand < wod.win){
		wodJudge = 'win';
	}else if(wodRand < wod.win + wod.lose){
		wodJudge = 'lose';
	}else{
		wodJudge = 'draw';
	}

  //以下で結果を処理
	opponentHandResult = opponentHandCalc(wodJudge,myHand); //グローバル変数に相手の手を格納
  renderPlayerHand(myHand); //自分の手を描画

if(wodJudge === 'draw'){
    drawFlag = true; //グローバル変数にドローフラグを設定
} else  {
    winOrLoseFlag = wodJudge; //グローバル変数に勝敗を格納
}

}

/****************************************************************
* 勝敗に応じて相手の手を決定
*****************************************************************/
function opponentHandCalc(wodJudge,myHand){
	//0パー1チョキ2グー
	let opponentHand;

	// 相手の手を計算
	if(wodJudge === "win"){
		opponentHand = myHand + 2;
	}else if(wodJudge === "draw"){
		opponentHand = myHand;
	}else{
		opponentHand = myHand + 1;
	}

	if(opponentHand > 2){
		opponentHand -= 3
	}

	// 相手の手を返す
	return opponentHand;
	}

	/****************************************************************
	* 結果を処理する関数
	*****************************************************************/
	async function resultOutput(cvs,result){
	let textContent  = null;
	let ctx = cvs.getContext("2d");
  let renderText = new scrollText({cvs : cvs});
  let cvsFill = new cvsFillRect({cvs : canvas[4]});
  let initElement = new element({x:300,y:150,opacity:0});
  let finalElement = new element({x:300,y:150,opacity:1,duration:0.5});
  let resultSubtext = RESULT_SUBTEXT[result];

  if (result ==="win" || result === 'lose') resultSubtext = `${RESULT_SUBTEXT[result]}${elapsedTime}`;

  // 初期化
	ctx.clearRect(0,100,cvs.width,200);
	eraseRPSButton();

	// 勝利したときのアニメーションを表示
	await sleep(200);
	await resultAnimation(result);
	await sleep(200);

  cvsFill.backgroundChange();
  screenFlag = 'wait';

  renderText.renderFontChange({fontSize : 45});

  await renderText.renderTextAnimation({
    initElement : initElement,
    finalElement : finalElement,
    str : RESULT_TEXT[result]
  });

	if(screenFlag !=='wait') return;
	
  renderText.renderFontChange({fontSize : 30});
  console.log(elapsedTime)
  ctx.fillText(resultSubtext,300,200);
  ctx.strokeText(resultSubtext,300,200);
  renderText.renderBlinkClickButton('CLICK to REPLAY');

}

/****************************************************************
* 勝敗のアニメーションを表示
*****************************************************************/
async function resultAnimation(result,voicelessFlag = false){

	let i = 'player', j = 'opponent';

	if (result !== 'win'){
		[i , j] =[j , i];
	}

	renderChar.player.idleStop();
	renderChar.opponent.idleStop();
	await sleep(100);
	await renderChar[i].renderAttack();
	await renderChar[j].renderDead();
	if(voicelessFlag === false) await wolSE();
}

async function resultDraw(){
  renderChar.player.renderDraw();
  await renderChar.opponent.renderDraw();
}

function eraseRPSButton(){
	ctx.get('button').clearRect(0,0,cvs.get('button').width,cvs.get('button').height);
}

/****************************************************************
* 勝敗のSEを流す
*****************************************************************/
async function wolSE(){
let wolSE1 = new Audio;
let wolSE2 = new Audio;

	return new Promise(resolve => {
    if(winOrLoseFlag === 'win'){
		wolSE1.src = './audio/SE/win_01.mp3';
		wolSE2.src = './audio/SE/win_02.mp3';
    } else {
		wolSE1.src = "./audio/SE/lose_01.mp3";
		wolSE2.src = "./audio/SE/lose_02.mp3";
    }

    battleBGM.pause();
    wolSE1.play();
    // wolSE1.onended = () => wolSE2.play();
    resolve();
	});
}


/****************************************************************
* 乱数描画等の初期化
*****************************************************************/
function initVariables(){
	//変数初期化
	countTimerStart = null;
	opponentHandResult = null;
	winOrLoseFlag = null;
	drawFlag = null;

	//canvas描画リセット
	for(let value of cvs.values()){
		value.getContext("2d").globalAlpha = 1;
		value.getContext("2d").clearRect(0,0,value.width,value.height);
	}

	randomDecideCharacter();

	battleBGM.currentTime = 0;
	battleBGM.play();
  // じゃんけんボタン表示
	renderRPSButton(cvs.get('button'));
  // 背景再描画
	renderBackground(cvs.get('background'));
  // キャラ再描画
	idleRestart();
}

function idleRestart(){
	renderChar.player.idleStart();
	renderChar.opponent.idleStart();
	renderChar.player.renderIdle();
	renderChar.opponent.renderIdle();
}