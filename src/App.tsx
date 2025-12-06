import { useState } from 'react';

// 手の型定義（グー、チョキ、パー）
type Hand = 'rock' | 'scissors' | 'paper';
// 結果の型定義（勝ち、負け、あいこ、未定）
type Result = 'win' | 'lose' | 'draw' | null;

// 手の選択肢
const HANDS = ['rock', 'scissors', 'paper'] as const;

export default function App() {
  // ユーザーの手の状態を保持
  const [userHand, setUserHand] = useState<Hand | null>(null);
  // コンピューターの手の状態を保持
  const [computerHand, setComputerHand] = useState<Hand | null>(null);
  // 勝敗結果の状態を保持
  const [result, setResult] = useState<Result>(null);

  // ゲームを実行する関数
  const playGame = (selectedHand: Hand) => {
    // ユーザーが選んだ手をセット
    setUserHand(selectedHand);

    // コンピューターの手をランダムに決定
    const randomHand = HANDS[Math.floor(Math.random() * HANDS.length)];
    setComputerHand(randomHand);

    // 勝敗判定ロジック
    if (selectedHand === randomHand) {
      // あいこの場合
      setResult('draw');
    } else if (
      (selectedHand === 'rock' && randomHand === 'scissors') ||
      (selectedHand === 'scissors' && randomHand === 'paper') ||
      (selectedHand === 'paper' && randomHand === 'rock')
    ) {
      // ユーザーが勝ちの場合（グーvsチョキ、チョキvsパー、パーvsグー）
      setResult('win');
    } else {
      // それ以外は負け
      setResult('lose');
    }
  };

  // ゲームを初期状態にリセットする関数
  const resetGame = () => {
    setUserHand(null);
    setComputerHand(null);
    setResult(null);
  };

  // 手に対応する絵文字を取得するヘルパー関数
  const getIcon = (h: Hand) => {
    const icons = {
      rock: '✊',
      paper: '✋',
      scissors: '✌️',
    };
    return icons[h];
  };

  // 手に対応する日本語ラベルを取得するヘルパー関数
  const getLabel = (h: Hand) => {
    const labels = {
      rock: 'グー',
      paper: 'パー',
      scissors: 'チョキ',
    };
    return labels[h];
  };

  return (
    // メインコンテナ
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#1e1e2e] to-[#2d2d44] text-white font-sans relative overflow-hidden">
      {/* タイトル表示 */}
      <h1 className="text-5xl font-black mb-8 drop-shadow-lg">
        じゃんけんゲーム
      </h1>

      {/* ゲーム未プレイ時（ユーザーの手が未決定）は選択ボタンを表示 */}
      {!userHand ? (
        <div className="flex gap-8">
          {/* HANDS配列をマップして各手のボタンを生成 */}
          {HANDS.map(hand => (
            <button
              key={hand}
              onClick={() => playGame(hand)}
              className="w-24 h-24 rounded-full border-none bg-white/10 backdrop-blur-sm cursor-pointer flex flex-col items-center justify-center text-white transition-transform hover:scale-110"
            >
              <div className="text-4xl">{getIcon(hand)}</div>
              <div className="text-sm mt-1">{getLabel(hand)}</div>
            </button>
          ))}
        </div>
      ) : (
        // ゲーム終了後（結果表示画面）
        <div className="flex flex-col items-center gap-8">
          {/* 対戦結果表示エリア */}
          <div className="flex items-center gap-12">
            {/* ユーザー側の表示 */}
            <div className="text-center">
              <p className="text-gray-400 text-xs tracking-widest">あなた</p>
              <div className="text-6xl">{getIcon(userHand)}</div>
              <p>{getLabel(userHand)}</p>
            </div>
            {/* VSの文字 */}
            <div className="text-3xl opacity-50">VS</div>
            {/* コンピューター側の表示 */}
            <div className="text-center">
              <p className="text-gray-400 text-xs tracking-widest">コンピューター</p>
              <div className="text-6xl">{computerHand ? getIcon(computerHand) : '?'}</div>
              <p>{computerHand ? getLabel(computerHand) : ''}</p>
            </div>
          </div>

          {/* 勝敗メッセージ表示（結果に応じて色を変更） */}
          <div className={`text-5xl font-bold ${result === 'win' ? 'text-[#ffd700]' :
              result === 'lose' ? 'text-[#ff6b6b]' :
                'text-white'
            }`}>
            {result === 'win' ? 'あなたの勝ち！' : result === 'lose' ? 'あなたの負け...' : 'あいこ'}
          </div>

          {/* リセットボタン */}
          <button
            onClick={resetGame}
            className="px-12 py-4 rounded-full border-none bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold cursor-pointer shadow-lg text-base hover:opacity-90 transition-opacity"
          >
            もう一度遊ぶ
          </button>
        </div>
      )}
    </div>
  );
}
