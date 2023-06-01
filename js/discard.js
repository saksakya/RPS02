/*
canvasに画像や図形を描画する要素を定義
let ctx = new Map;
for(let [key,value] of canvas){
  ctx.set(key,value.getContext("2d"))
};

読み込み画像データを定義
const bgImg = new Image(); //背景
const personImg = new Image(); //人物
const RPSImg = new Image(); //じゃんけんの手
// キャラクターをランダム読み込み
personImg.src = CHARACTER_IMAGE_PATH;

RPSImg.src = RPS_IMAGE_PATH;

背景画像をランダムに読み込む関数
  let rand = Math.floor(Math.random() * MAX_STAGE_COUNT) + 1
  bgImg.src = BG_IMAGE_PATH[rand];



// 画像が3枚読み込まれたか確認する関数
let Loader = function(expectedCnt, callback){
  let cnt = 0;
  return function(){
    cnt++;
    if(cnt == expectedCnt){
      callback();
    }
  }
}

// 全ての画像のロードが終わったら読み込み
let loader = Loader(1, function(){
  console.log("load complete");
  renderBgImage(canvas.get('background'),bgImg);
  // renderPersonImage();
  // renderRPSImage();
  // 仮の関数
  // // renderRPSOpponentImage()
  // RPSStart();

});

// 画像の読み込みフラグ
// bgImg.onload = loader;
// personImg.onload = loader;
// RPSImg.onload = loader;


function renderCharacter(cvs,images,reverse=0){
  let ctx = cvs.getContext("2d");

  if(reverse == 1){
    ctx.scale(-1,1);
    ctx.translate(-cvs.width, 0);

  }
  ctx.drawImage(images[0].image,36,55,55,80,50,150,82,120);
}

// /****************************************************************
// *  ランダムなステージを読込み
// *****************************************************************/
// function renderBackground(cvs,images){
//   let rand = Math.trunc(Math.random() * MAX_STAGE_COUNT)
//   cvs.getContext("2d").drawImage(images[rand].image,0,0,cvs.width,cvs.height);
// }

/****************************************************************
* じゃんけん画像(自分の手)の候補を表示
*****************************************************************/
// function renderRPSButton(cvs,images){
//   // 自分の手
//   for(let i = 0; i < 3; i++){
//     //トリミング開始位置x,y,トリミング幅x,y,キャンバス内の画像posX,y,画像の表示幅x,y
//     cvs.getContext("2d").drawImage(images[0].image,RPS_IMAGE_POS[i].startX,RPS_IMAGE_POS[i].startY,RPS_IMAGE_POS[i].width,RPS_IMAGE_POS[i].height,100 + 150*(i),280,100,100);
//   }
// }

/****************************************************************
* 表示確認テスト用
*****************************************************************/
// // function renderTest(cvs,img,maxFlame,reverse = false){
//   let ctx = cvs.getContext("2d");
//   let i = 0;

//   ctx.restore();
//   ctx.save();
//   if(reverse === true){
//       ctx.scale(-1,1);
//       ctx.translate(-cvs.width, 0);
//   }

//     // ctx.clearRect(0,0,cvs.width,cvs.height);
//     ctx.drawImage(img[1].image,671,55,60,80,50,150,90,120)
//     // ctx.drawImage(img[3].image,5,18,30,15,140,174,50,15)
//     // ctx.drawImage(img[3].image,68,18,30,15,180,174,50,15)
// }

// //テスト表示用
//   // onloadImage(VAMPIRE_IMAGE_PATH,(img) => renderTest(canvas.get('playerChar'),img,6));
//   // onloadImage(VAMPIRE_IMAGE_PATH,(img) => renderAttackEffect(canvas.get('playerChar'),img[3],VAMPIRE_IMAGE_POS_SPA));


/****************************************************************
*  画像の読み込み(ロード)を確認し、読み込み用オブジェクトを生成
*****************************************************************/
// const onloadImage = (imageSources,callBack) => {
// 	const stat = { wait:"wait", ok :"ok" , error :"error" };
// 	let cnt = 0;
// 	const im = imageSources.map( e => ( { image : new Image() , stat : stat.wait } ) );

// 	im.forEach( ( e , i ) => {
// 		e.image.onload = () => {
// 			e.image.onload = e.image.onerror = null;
// 			if( e.stat === stat.wait) {
// 				e.stat = stat.ok;
// 				cnt ++;
// 				// console.log(im);
// 				if(cnt >= imageSources.length){
// 				callBack(im);
// 				}
// 			}
// 		};
// 		e.image.onerror = function(){ e.stat = stat.error;};
// 		e.image.src = imageSources[i]
// 	} );
// };

/****************************************************************
* 所定の位置から所定の位置まで文字をスクロールする(表示文字列,キャンバス要素,初期位置x,y,移動距離x,y,秒数,描写範囲)
*****************************************************************/
// function clearCanvas(cvs,clearRange){
// 	let startPosX = 0,startPosY = 0,width = cvs.width,height = cvs.height;
// 	if(clearRange === 'left'){
// 		width = cvs.width / 2;
// 	}else if(clearRange === 'right'){
// 		startPosX = cvs.width / 2;
// 	}

// 	cvs.getContext("2d").clearRect(startPosX,startPosY,width,height);

// }

/****************************************************************
* じゃんけんの合図を出力～結果表示まで
*****************************************************************/
// async function RPSMain(cvs) {

// 	const RPSstart01 = new Audio('./audio/SE/RPSstart_01.wav');
// 	const RPSstart02 = new Audio('./audio/SE/RPSstart_02.wav');
// 	const RPSstart03 = new Audio('./audio/SE/RPSstart_03.wav');
// 	const RPSdraw01 = new Audio('./audio/SE/RPSdraw_01.wav');
// 	const RPSdraw02 = new Audio('./audio/SE/RPSdraw_02.wav');
// 	const RPSdraw03 = new Audio('./audio/SE/RPSdraw_03.wav');

// 	let falseStartDetect = () => {
// 		if(winOrLoseFlag === 'falseStart'){
//     renderPlayerHand(null);
// 		resultOutput(cvs,winOrLoseFlag);
// 		return true;
// 		}
// 		return false;
// 	}

//   //初期化
// 	renderChar.player.idleStop();
// 	renderChar.opponent.idleStop();
// 	await sleep(100);
// 	initVariables();

// 	let RPSRand = Math.trunc(Math.random() * (RPS_START_RAND_RANGE.end - RPS_START_RAND_RANGE.start)) +  RPS_START_RAND_RANGE.start
// 	await sleep(1500);
// 	RPSstart01.play();
// 	await charScroll("じゃん",cvs,40,200,200,0,300);
// 	await sleep(500);
// 	RPSstart02.play();
// 	await charScroll("けん",cvs,560,200,-200,0,300);
// 	await sleep(RPSRand); //PON!が表示される時間は、ランダムで決定される。
// 	cvs.getContext("2d").clearRect(0,0,cvs.width,cvs.height);
// 	if (falseStartDetect() == true) return;
// 	await charScroll("PON!",cvs,300,200,0,0,0);
// 	RPSstart03.play();
// 	renderOpponentHand();
// 	countTimerStart = performance.now();
// 	await renderElapsedTime(cvs);

// 	while (drawFlag === true){
// 		resultDraw();
// 		await sleep(2000);
// 		RPSRand = Math.trunc(Math.random() * (RPS_START_RAND_RANGE.end - RPS_START_RAND_RANGE.start)) +  RPS_START_RAND_RANGE.start
// 		await sleep(1000);
// 		opponentHandResult = null;
// 		RPSdraw01.play();
// 		await charScroll("あい",cvs,40,200,200,0,300);
// 		await sleep(500);
// 		RPSdraw02.play();
// 		await charScroll("こで",cvs,560,200,-200,0,300);
// 		await sleep(RPSRand); //PON!が表示される時間は、ランダムで決定される。
// 		cvs.getContext("2d").clearRect(0,0,cvs.width,cvs.height);
// 		if (falseStartDetect() == true) return;
// 		await charScroll("SYO!",cvs,300,200,0,0,0);
// 		RPSdraw03.play();
//     renderPlayerHand(null);
// 		drawFlag = null;
// 		renderOpponentHand();
// 		countTimerStart = performance.now();
// 		await renderElapsedTime(cvs);
// 	}

// 	resultOutput(cvs,winOrLoseFlag);

// }


// function renderElapsedTime(cvs){
// 	return new Promise(resolve => {
// 		let ctx =  cvs.getContext("2d");
// 		let count = 0;
// 		let elapsedTime = 0;
// 		let clearFlag = 0;
// 		let countMax = RPS_LOSE_TIME * 1/ STANDARD_INTERVAL;
// 		ctx.font =   '30px "M PLUS 10p", sans-serif';
// 		ctx.fillStyle = 'white';
// 		ctx.textBaseline = 'top';
// 		ctx.textAlign = 'right';

// 		// console.log(countMax);
// 		let elapsedTimer = setInterval(() => {
// 		ctx.clearRect(200,0,300,150);
// 		// renderCharBackground(cvs,25,40,105,50);
// 		renderCharBackground(cvs,245,20,105,50);
// 		ctx.fillStyle = 'white';
// 		elapsedTime = mathTime(performance.now() - countTimerStart);
// 		// ctx.fillText(elapsedTime,120,50)
// 		if (elapsedTime > 1 && clearFlag === 0){
// 			ctx.clearRect(0,0,cvs.width,cvs.height);
// 			clearFlag = 1;
// 		}
// 		ctx.fillText(elapsedTime,340,30)
// 		count ++;
// 		if (count >= countMax || opponentHandResult !== null){
// 			if(count >= countMax) {
// 				winOrLoseFlag = 'timeout';
// 			}
// 			clearInterval(elapsedTimer);
// 			resolve();
// 		}
// 		},STANDARD_INTERVAL);
// 	});
// 	}

/****************************************************************
* 所定の位置から所定の位置まで文字をスクロールする(表示文字列,キャンバス要素,初期位置x,y,移動距離x,y,秒数)
*****************************************************************/
// function charScroll(outputChar,cvs,initPosX,initPosY,moveX,moveY,animationDuration){
// 	return new Promise(resolve => {
// 		let ctx = cvs.getContext("2d");
// 		ctx.font =   '40px "M PLUS 10p", sans-serif';
// 		ctx.fillStyle = 'white';
// 		ctx.textBaseline = 'middle';
// 		ctx.textAlign = 'center';

// 		let count = 0;
// 		let countMax = animationDuration * 1/ STANDARD_INTERVAL;
// 		// console.log(countMax);
// 		let movePerCountX = moveX / countMax;
// 		let movePerCountY = moveY / countMax;

// 		if (animationDuration === 0){
// 		renderCharBackground(cvs,0,cvs.height * 3/8,cvs.width,cvs.height / 4);
// 		ctx.fillStyle = 'white';
// 		ctx.fillText(outputChar,initPosX,initPosY)
// 		return resolve();
// 		}


// 		let charScrollTimer = setInterval(() => {

// 		ctx.clearRect(0,0,cvs.width,cvs.height);
// 		// clearCanvas(cvs,range)
// 		renderCharBackground(cvs,0,cvs.height * 3/8,cvs.width,cvs.height / 4);
// 		ctx.fillStyle = 'white';
// 		ctx.fillText(outputChar,initPosX + count * movePerCountX,initPosY + count * movePerCountY)
// 		count ++;
// 		if (count >= countMax){
// 			clearInterval(charScrollTimer);
// 			resolve();
// 		}
// 		},STANDARD_INTERVAL);
// 	});
// }

/****************************************************************
* 文字を見やすくするために、文字のバックグラウンドを黒透過で表示
*****************************************************************/
// function renderCharBackground(cvs,startX,startY,width,height){
// 	let ctx =  cvs.getContext("2d");
// 	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
// 	ctx.fillRect(startX,startY,width,height)
// }
