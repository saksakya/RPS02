/****************************************************************
*  スタート画面を描画するファイル
*****************************************************************/

'use strict';


const bgm = new Audio('./audio/bgm/opening.mp3');
bgm.loop = true;
bgm.volume = 0.2 * Master_BGM;

//フォントサイズ置き換え用
const match = /(?<value>\d+\.?\d*)/;

//オープニング画面の文字
const TEXT_LIST = [
  'SAKURA CREATES PRESENTS',
  '～本格じゃんけんバトル～',
]

// 上記の文字サイズをpxで指定
const TEXT_FONT_SIZE = [
  '23',
  '25'
]

/****************************************************************
*  GSAP用の属性
*****************************************************************/
class element{
  constructor({x,y,opacity,duration = 1}){
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.duration = duration;
  }
}

/****************************************************************
*  テキストアニメーション描画用のクラス
*****************************************************************/
class textAnimation {
  constructor ({cvs}) {
    this.cvs = cvs
    this.ctx = this.cvs.getContext("2d");
    this.ctx.font = '40px "M PLUS 1p", sans-serif';
    this.i = 0;
    this.timeLine = gsap.timeline();
  }

  renderTextAnimation(){
    let textElement = new element({x:300,y:200,opacity:0})
    return new Promise(resolve => {
      this.timeLine.to(textElement,{
        y:200,
        opacity : 1,
        duration : 1.5,
        yoyo: true,
        repeat: 1,
        repeatDelay:2,
        onUpdate: () => {
          this.reRenderText(textElement);
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  reRenderText(textElement,addStrokeText = false){
    this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
    this.ctx.globalAlpha = textElement.opacity;
    this.ctx.fillText(this.str,textElement.x,textElement.y);
    if (addStrokeText===true) {
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#000000'
      this.ctx.strokeText(this.str,textElement.x,textElement.y);
    }
  }

  renderFontChange({
      fontSize,
      fontColor ='#FFFFFF',
      baseLine = 'middle',
      align = 'center'
    }){
    this.ctx.font = this.ctx.font.replace(match, fontSize);
    this.ctx.fillStyle = fontColor;
    this.ctx.textBaseline = baseLine;
    this.ctx.textAlign = align;
  }

  async renderTitleText(){

    let renderIcon = new renderImage({cvs:this.cvs,size : {width : 40, height : 40}});
    let str = 'RPS';
    let strArray = str.split('');

    this.renderFontChange({fontSize : 48});
    this.ctx.globalAlpha = 1;

    for(let i = 0; i < 3; i++){
      renderIcon.image.src = ICON_PATH[i]
      renderIcon.renderPos = {x : 225 + i * 75, y : 80};
      await renderIcon.render();
      this.ctx.fillText(strArray[i],205 + i *80,100);
      this.ctx.strokeText(strArray[i],205 + i *80,100);

    }

    str = 'BATTLE';
    strArray = str.split('');

    for(let i = 0; i < strArray.length; i++){
      this.ctx.fillText(strArray[i],205 + i * 38,160);
      this.ctx.strokeText(strArray[i],205 + i * 38,160);
    }

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.moveTo(190,125);
    this.ctx.lineTo(410,125);
    this.ctx.moveTo(190,185);
    this.ctx.lineTo(410,185);
    this.ctx.stroke();

    this.renderBlinkClickButton('CLICK BUTTON');

  }

  renderBlinkClickButton(str){
    let clickStart = new element({opacity:0})
      const clickTimer = gsap.to(clickStart,{
        opacity : 1,
        duration : 1,
        repeat: -1,
        yoyo:true,
        ease: "linear",
        repeatDelay:1,
        onUpdate: () => {
          this.renderClickButton(clickStart, str);
          if(!(screenFlag === 'title' || screenFlag === 'wait')) {
            this.ctx.clearRect(0,270,this.cvs.width,120);
            clickTimer.kill();
          }
        },
        onComplete: () => {
        }
    });
  }

  renderClickButton(clickElement,str){
    this.ctx.clearRect(0,270,this.cvs.width,120);
    this.ctx.globalAlpha = clickElement.opacity;
    this.renderFontChange({fontSize : 22});
    this.ctx.fillText(str,300,300);
    //this.ctx.strokeText(str,300,300);
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.beginPath();
    this.ctx.moveTo(210,280);
    this.ctx.lineTo(390,280);
    this.ctx.moveTo(210,320);
    this.ctx.lineTo(390,320);
    this.ctx.stroke();
  }

}

/****************************************************************
*  黒背景描写用のクラス
*****************************************************************/
class cvsFillRect {
  constructor ({cvs}) {
    this.cvs = cvs
    this.ctx = this.cvs.getContext("2d");
    this.i = 0;
    this.timeLine = gsap.timeline();
  }

  backgroundAnimation({colorCode,startElement,endElement}){
    this.ctx.fillStyle = colorCode;

    return new Promise(resolve => {
      this.timeLine.to(startElement,{
        opacity : endElement.opacity,
        duration : endElement.duration,
        onUpdate: () => {
          this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
          this.ctx.globalAlpha = startElement.opacity;
          this.ctx.fillRect(0,0, this.cvs.width, this.cvs.height);
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  backgroundChange(){
    this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0,0,this.cvs.width,this.cvs.height);
  }
}

/****************************************************************
*  背景画像をランダム読み込み
*****************************************************************/
function renderBackground(cvs){
	let rand = Math.trunc(Math.random() * MAX_STAGE_COUNT)
	let onloadBackground = new renderImage({imageSource:BG_IMAGE_PATH[rand],cvs:cvs})
	onloadBackground.render();
}

/****************************************************************
*  スタート画面を描画
*****************************************************************/
async function main(){
  let textAnime = new textAnimation({cvs : cvs.get('letter')});
  let cvsFill = new cvsFillRect({cvs : cvs.get('button')})

  //Logo表示
  await cvsFill.backgroundAnimation({
    colorCode : '#000000',
    startElement : {opacity:0},
    endElement : {opacity : 1, duration:1}
  });

  // for(let i = 0; i < 2; i++){
  //   if(i !== 0) await sleep(1000);
  //   textAnime.renderFontChange({fontSize : TEXT_FONT_SIZE[i]});
  //   textAnime.str = TEXT_LIST[i];
  //   await textAnime.renderTextAnimation();
  // }

  //オープニング開始
  renderBackground(cvs.get('background'));
  //await sleep(1000);
  cvsFill.backgroundAnimation({
    colorCode : '#000000',
    startElement : {opacity:1},
    endElement : {opacity : 0.2, duration:1}
  });

  sleep(500);
  if(bgm.paused) bgm.play();

  //タイトル画面描写
  textAnime.renderTitleText();

  //ここまできたら、画面遷移情報を更新して、クリックボタンを有効にする。
  screenFlag = 'title';
  //オートアニメーション
  while(screenFlag === 'title'){
    randomDecideCharacter();
    idleRestart();

    await sleep(4000);
    if(screenFlag !== 'title') return;

    resultDraw();
    await sleep(5000);
    if(screenFlag !== 'title') return;

    resultDraw();
    await sleep(5000);
    if(screenFlag !== 'title') return;

    if(Math.trunc(Math.random() * 2)===0){
      resultAnimation('win',true);
    }else{
      resultAnimation('lose',true);
    }
    await sleep(5000);
    renderBackground(cvs.get('background'));
  }
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

	if(screenFlag === 'title' || screenFlag === 'wait'){
    bgm.pause();
    let startSE = new Audio("./audio/SE/start.mp3")
    startSE.play();
		RPSMain(canvas[CANVAS_NUM]);
		screenFlag = 'run1';
	}
});

main();

// 動作確認用
// initVariables();
// screenFlag = 'run1'
// RPSMain(cvs.get('letter'));