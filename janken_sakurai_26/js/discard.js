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

