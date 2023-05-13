/****************************************************************
*  じゃんけん画面のメインロジック
*****************************************************************/
'use strict';

const battleBGM = new Audio('./audio/bgm/battle_01.mp3');
battleBGM.loop = true;
battleBGM.volume = 0.4 *  Master_BGM;

/****************************************************************
* じゃんけんボタン(自分の手の候補)を表示
*****************************************************************/
async function renderRPSButton(cvs){
	let onloadRPSButton = new onloadSpriteImage(RPS_IMAGE_PATH,cvs,RPS_IMAGE_POS,100,280,100,100);
	await onloadRPSButton.onload();

	for(let i = 0; i < 3; i++){
		onloadRPSButton.num = i;
		onloadRPSButton.drawPosX = 100 + i * 150
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

	let onloadRPSButton = new onloadSpriteImage(RPS_IMAGE_PATH,cvs.get('opponentHand'),RPS_IMAGE_POS,40,30,100,100);
  onloadRPSButton.num = i;
	onloadRPSButton.render();
}

/****************************************************************
* 相手の手を表示(xミリ秒ごとに切り替え)
*****************************************************************/
function renderOpponentHand(){
	let onloadRPSButton = new onloadSpriteImage(RPS_IMAGE_PATH,cvs.get('opponentHand'),RPS_IMAGE_POS,465,30,100,100,6,3);
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
async function RPSMain(cvs) {
	let sleep = time => new Promise(resolve => setTimeout(resolve, time));
	const RPSstart01 = new Audio('./audio/SE/RPSstart_01.wav');
	const RPSstart02 = new Audio('./audio/SE/RPSstart_02.wav');
	const RPSstart03 = new Audio('./audio/SE/RPSstart_03.wav');
	const RPSdraw01 = new Audio('./audio/SE/RPSdraw_01.wav');
	const RPSdraw02 = new Audio('./audio/SE/RPSdraw_02.wav');
	const RPSdraw03 = new Audio('./audio/SE/RPSdraw_03.wav');
	// RPSstart.volume = 0.8

	let falseStartDetect = () => {
		if(winOrLoseFlag === 'falseStart'){
    renderPlayerHand(null);
		resultOutput(cvs,winOrLoseFlag);
		return true;
		}
		return false;
	}

  //初期化
	winOrLoseFlag = 9999;
	await sleep(100);
	initVariables();

	let RPSRand = Math.trunc(Math.random() * (RPS_START_RAND_RANGE.end - RPS_START_RAND_RANGE.start)) +  RPS_START_RAND_RANGE.start
	await sleep(1500);
	RPSstart01.play();
	await charScroll("じゃん",cvs,40,200,200,0,300);
	await sleep(500);
	RPSstart02.play();
	await charScroll("けん",cvs,560,200,-200,0,300);
	await sleep(RPSRand); //PON!が表示される時間は、ランダムで決定される。
	cvs.getContext("2d").clearRect(0,0,cvs.width,cvs.height);
	if (falseStartDetect() == true) return;
	await charScroll("PON!",cvs,300,200,0,0,0);
	RPSstart03.play();
	renderOpponentHand();
	countTimerStart = performance.now();
	await renderElapsedTime(cvs);

	while (drawFlag === true){
		RPSRand = Math.trunc(Math.random() * (RPS_START_RAND_RANGE.end - RPS_START_RAND_RANGE.start)) +  RPS_START_RAND_RANGE.start
		await sleep(1000);
		opponentHandResult = null;
		RPSdraw01.play();
		await charScroll("あい",cvs,40,200,200,0,300);
		await sleep(500);
		RPSdraw02.play();
		await charScroll("こで",cvs,560,200,-200,0,300);
		await sleep(RPSRand); //PON!が表示される時間は、ランダムで決定される。
		cvs.getContext("2d").clearRect(0,0,cvs.width,cvs.height);
		if (falseStartDetect() == true) return;
		await charScroll("SYO!",cvs,300,200,0,0,0);
		RPSdraw03.play();
    renderPlayerHand(null);
		drawFlag = null;
		renderOpponentHand();
		countTimerStart = performance.now();
		await renderElapsedTime(cvs);
	}

	resultOutput(cvs,winOrLoseFlag);

}

/****************************************************************
* 所定の位置から所定の位置まで文字をスクロールする(表示文字列,キャンバス要素,初期位置x,y,移動距離x,y,秒数)
*****************************************************************/
function charScroll(outputChar,cvs,initPosX,initPosY,moveX,moveY,animationDuration){
	return new Promise(resolve => {
		let ctx = cvs.getContext("2d");
		ctx.font =   '40px "M PLUS 10p", sans-serif';
		ctx.fillStyle = 'white';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';

		let count = 0;
		let countMax = animationDuration * 1/ STANDARD_INTERVAL;
		// console.log(countMax);
		let movePerCountX = moveX / countMax;
		let movePerCountY = moveY / countMax;

		if (animationDuration === 0){
		renderCharBackground(cvs,0,cvs.height * 3/8,cvs.width,cvs.height / 4);
		ctx.fillStyle = 'white';
		ctx.fillText(outputChar,initPosX,initPosY)
		return resolve();
		}


		let charScrollTimer = setInterval(() => {

		ctx.clearRect(0,0,cvs.width,cvs.height);
		// clearCanvas(cvs,range)
		renderCharBackground(cvs,0,cvs.height * 3/8,cvs.width,cvs.height / 4);
		ctx.fillStyle = 'white';
		ctx.fillText(outputChar,initPosX + count * movePerCountX,initPosY + count * movePerCountY)
		count ++;
		if (count >= countMax){
			clearInterval(charScrollTimer);
			resolve();
		}
		},STANDARD_INTERVAL);
	});
}


/****************************************************************
* 文字を見やすくするために、文字のバックグラウンドを黒透過で表示
*****************************************************************/
function renderCharBackground(cvs,startX,startY,width,height){
	let ctx =  cvs.getContext("2d");
	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.fillRect(startX,startY,width,height)
}

/****************************************************************
* 経過時間を表示
*****************************************************************/
function renderElapsedTime(cvs){
	return new Promise(resolve => {
		let ctx =  cvs.getContext("2d");
		let count = 0;
		let elapsedTime = 0;
		let clearFlag = 0;
		let countMax = RPS_LOSE_TIME * 1/ STANDARD_INTERVAL;
		ctx.font =   '30px "M PLUS 10p", sans-serif';
		ctx.fillStyle = 'white';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'right';

		// console.log(countMax);
		let elapsedTimer = setInterval(() => {
		ctx.clearRect(200,0,300,150);
		// renderCharBackground(cvs,25,40,105,50);
		renderCharBackground(cvs,245,20,105,50);
		ctx.fillStyle = 'white';
		elapsedTime = mathTime(performance.now() - countTimerStart);
		// ctx.fillText(elapsedTime,120,50)
		if (elapsedTime > 1 && clearFlag === 0){
			ctx.clearRect(0,0,cvs.width,cvs.height);
			clearFlag = 1;
		}
		ctx.fillText(elapsedTime,340,30)
		count ++;
		if (count >= countMax || opponentHandResult !== null){
			if(count >= countMax) winOrLoseFlag = 'timeout';
			clearInterval(elapsedTimer);
			resolve();
		}
		},STANDARD_INTERVAL);
	});
	}

//桁数切り捨てで、下２桁まで算出
function mathTime(time){
	time = time / 10;
	time = Math.trunc(time);
	time = time / 100;
	time = time.toFixed(2);
	return time;
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
				winOrLoseFlag = 'falseStart'
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

	// console.log(elapsedTime);
	// console.log(wod);
	// console.log(wodRand);

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
	let drawText = null;
	let ctx = cvs.getContext("2d");
	let sleep = time => new Promise(resolve => setTimeout(resolve, time));

	if(result == 'win'){
		drawText = 'YOU WIN!'
	}else if(result == 'lose'){
		drawText = 'YOU LOSE!'
	}else if(result == 'timeout'){
		drawText = 'TIME OUT'
	}else if(result == 'falseStart'){
		drawText ='FALSE START～フライング～'
	}

	ctx.clearRect(0,100,cvs.width,200);
  eraseRPSButton();

	// 勝利したときのアニメーションを表示
	await sleep(200);
	await resultAnimation(result);
	await sleep(200);

	ctx.clearRect(0,100,cvs.width,200);
	charScroll(drawText,cvs,300,200,0,0,0);

	ctx.font = '30px "M PLUS 10p", sans-serif';
	ctx.save();
	renderCharBackground(cvs,100,300,400,60);
	ctx.restore();

	ctx.fillText('Click to Replay',300,330)
	screenFlag = 'wait';

}

/****************************************************************
* 勝敗のアニメーションを表示
*****************************************************************/
async function resultAnimation(result){

	let i = 'player', j = 'opponent';

	if (result !== 'win'){
		[i , j] =[j , i];
	}

	let sleep = time => new Promise(resolve => setTimeout(resolve, time));

	await sleep(100);
	await renderChar[i].renderAttack();
	await renderChar[j].renderDead();
  await wolSE();
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
	countTimerStart = null;
	opponentHandResult = null;
	winOrLoseFlag = null;
	drawFlag = null;
	cvs.get('opponentHand').getContext("2d").clearRect(0,0,cvs.get('opponentHand').width,cvs.get('opponentHand').height);
  cvs.get('letter').getContext("2d").clearRect(0,0,cvs.get('letter').width,cvs.get('letter').height);

	battleBGM.currentTime = 0;
	battleBGM.play();
  // じゃんけんボタン表示
	renderRPSButton(cvs.get('button'));
  // 背景再描画
  renderBackground(cvs.get('background'));
  // キャラ再描画

	renderChar.player.renderIdle();
	renderChar.opponent.renderIdle();
}