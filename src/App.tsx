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
    // メインコンテナ：画面全体中央寄せ、背景グラデーション設定
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
      color: 'white',
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* タイトル表示 */}
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)', fontWeight: 900 }}>
        じゃんけんゲーム
      </h1>

      {/* ゲーム未プレイ時（ユーザーの手が未決定）は選択ボタンを表示 */}
      {!userHand ? (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* HANDS配列をマップして各手のボタンを生成 */}
          {HANDS.map(hand => (
            <button
              key={hand}
              onClick={() => playGame(hand)}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                color: 'white'
              }}
              // ホバー時のアニメーション
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem' }}>{getIcon(hand)}</div>
              <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>{getLabel(hand)}</div>
            </button>
          ))}
        </div>
      ) : (
        // ゲーム終了後（結果表示画面）
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          {/* 対戦結果表示エリア */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            {/* ユーザー側の表示 */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}>あなた</p>
              <div style={{ fontSize: '4rem' }}>{getIcon(userHand)}</div>
              <p>{getLabel(userHand)}</p>
            </div>
            {/* VSの文字 */}
            <div style={{ fontSize: '2rem', opacity: 0.5 }}>VS</div>
            {/* コンピューター側の表示 */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}>コンピューター</p>
              <div style={{ fontSize: '4rem' }}>{computerHand ? getIcon(computerHand) : '?'}</div>
              <p>{computerHand ? getLabel(computerHand) : ''}</p>
            </div>
          </div>

          {/* 勝敗メッセージ表示（結果に応じて色を変更） */}
          <div style={{
            fontSize: '3rem', fontWeight: 'bold',
            color: result === 'win' ? '#ffd700' : result === 'lose' ? '#ff6b6b' : '#fff'
          }}>
            {result === 'win' ? 'あなたの勝ち！' : result === 'lose' ? 'あなたの負け...' : 'あいこ'}
          </div>

          {/* リセットボタン */}
          <button
            onClick={resetGame}
            style={{
              padding: '1rem 3rem',
              borderRadius: '9999px',
              border: 'none',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              fontSize: '1rem'
            }}
          >
            もう一度遊ぶ
          </button>
        </div>
      )}
    </div>
  );
}
