# 課題　 じゃんけん リッチver

# DEMO
https://saksakya.github.io/RPS02/

注意!!直前に気づきましたが、ディスプレイのリフレッシュレートが60fpsでしか動きません。(それより早いと描画が不自然になります。)
1時間ほどあれば修正できると思いますが、あえてこのままにしておきます。

## ①課題内容
- じゃんけんアプリのリッチver

## ②工夫した点・こだわった点
- ルールは前回と同じで、じゃんけんが始まり「ポン!」の合図が出てからすぐ自分の手を出すと勝率が高くなるようになっています。具体的には0.2秒以内に反応できれば100%勝てます。逆に遅いとほぼ負けで、5秒経つと強制的に負けます。また、フライングしても負けになります。また、「ポン!」が出るまでの時間は0.5～5秒のランダムです。
- 前回の課題の時点で、かなりリッチには作ったつもりでしたが、チューターさんのアドバイスを元に、機能の追加とブラッシュアップを行いました。
 ①intevalTimerから、requestAnimationFrameに置き換えたことでかなり動作が安定するようになりました。（一部時間がなくて置き換えられていません。)
 ②classのコンストラクターへの引数の引き渡しを連想配列に置き換えることで、可読性がかなり上がりました。
 ③上記教えていただいて、勉強になりました。
- OPを追加して、更にゲームっぽくしました。ランダムでアニメーションが流れます。
- キャラを追加して、4キャラにしました。自分と相手のキャラはランダムですが、被らないようになっています。素材さえあれば1キャラを2-3時間で追加できると思います。(当然ですが、フリー素材のフォーマットが統一されていないので、苦労します。。。)
- 前回まではバニラJSでコーディングしていましたが、今回からGSAPを導入しました。
- 課題提出後に、requestAnimationFrameが自分の画面のリフレッシュレートに依存していることに気づいて、タイマを急いで直しました。突貫で直したのでバグ残ってるかもしれません。constantsの一番最初の行にリフレッシュレート設定を入れました。(60fps = 1)

## ③難しかった点・次回トライしたいこと(又は機能)
- GSAPとcanvasの相性があまり良くなくて、思ったようにアニメーションを追加できませんでした。HTML動的要素を取り入れるのには最適との印象を受けましたが、canvasへの導入は時期尚早でした。
- GSAPを使用して、文字に回転等の演出をつけようと思いましたが、難易度が高すぎました。おそらく使いこなすには後10時間は必要な気がするので、一旦諦めます。
- GSAPのcanvasへの適用方法を模索するのにだいぶ時間を使ってしまって、キャラ選択とHOW TO PLAYの追加ができませんでした。説明がないので、相変わらず謎のゲームになっています。。。
- 非同期処理について、大分理解したつもりでしたが、まだまだ分かっていませんでした。今回で更に理解が進みましたが、まだまだ苦労する予感しかしません。

## ④質問・疑問・感想、シェアしたいこと等なんでも
- [質問]　ざっと見て、今後プログラミングを行っていく上で、改善したほうが良い事項があれば教えていただきたいです。(@paramについては、今回対応できませんでした。)
