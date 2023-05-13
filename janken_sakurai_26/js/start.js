/****************************************************************
*  スタート画面を描画するファイル
*****************************************************************/

'use strict';

const bgm = new Audio('./audio/bgm/opening.mp3');
bgm.loop = true;
bgm.volume = 0.2;
bgm.muted = true; //最初はミュートにしないと再生できない。

/****************************************************************
*  背景画像をランダム読み込み
*****************************************************************/
function renderBackground(cvs){
	let rand = Math.trunc(Math.random() * MAX_STAGE_COUNT)
	let onloadBackground = new onloadImages(BG_IMAGE_PATH[rand],cvs)
	onloadBackground.draw();
}

/****************************************************************
*  スタート画面を描画
*****************************************************************/
async function startScreen (){
	// 背景画像をランダム読み込み
	renderBackground(cvs.get('background'));
	// 立ち絵を表示(プレイヤー・敵)
	renderChar(cvs.get('playerChar'),VAMPIRE_IMAGE_PATH[0],true);
	renderChar(cvs.get('opponentChar'),VAMPIRE_IMAGE_PATH[0],true);

	//スタート画面
	ctx.get('letter').fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.get('letter').fillRect(0,0,cvs.get('letter').width,cvs.get('letter').height)
	ctx.get('letter').font = '48px "M PLUS 10p", sans-serif';
	ctx.get('letter').fillStyle = 'white';
	ctx.get('letter').textBaseline = 'middle';
	ctx.get('letter').textAlign = 'center';
	ctx.get('letter').fillText('じゃんけんバトル',300,150)
	ctx.get('letter').font = '30px "M PLUS 10p", sans-serif';
	ctx.get('letter').fillText('Click to Play',300,250)
	if(bgm.paused) bgm.play();
	bgm.muted = false; //ミュート即解除
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

	if(screenFlag === 'opening' || screenFlag === 'wait'){
    bgm.pause();
    let startSE = new Audio("./audio/SE/start.mp3")
    startSE.play();
		RPSMain(canvas[CANVAS_NUM]);
		screenFlag = 'run1';
	}
});


startScreen();