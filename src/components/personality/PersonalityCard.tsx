'use client'

type Props = {
  psychopathy_score: number
  strategist_score: number
  narcissism_score: number
  empathy_score: number
  vocabulary_score: number
  writer_type: string
  analysis_text: string
}

type BarProps = { label: string; value: number; color: string; emoji: string }

function ScoreBar({ label, value, color, emoji }: BarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-gray-700">{emoji} {label}</span>
        <span className="font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function PersonalityCard({
  psychopathy_score,
  strategist_score,
  narcissism_score,
  empathy_score,
  vocabulary_score,
  writer_type,
  analysis_text,
}: Props) {
  const dominantColor = getDominantColor(psychopathy_score, strategist_score, narcissism_score, empathy_score, vocabulary_score)

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      {/* ヘッダー */}
      <div
        className="p-6 text-white text-center"
        style={{ background: dominantColor.gradient }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-2">あなたの執筆人格</p>
        <h2 className="text-2xl font-black">{writer_type}</h2>
      </div>

      {/* スコアバー */}
      <div className="bg-white p-6 space-y-4">
        <ScoreBar label="サイコパス度" value={psychopathy_score} color="#ef4444" emoji="🧊" />
        <ScoreBar label="策士度"       value={strategist_score}  color="#f97316" emoji="♟️" />
        <ScoreBar label="自己愛度"     value={narcissism_score}  color="#eab308" emoji="👑" />
        <ScoreBar label="共感力"       value={empathy_score}     color="#ec4899" emoji="💗" />
        <ScoreBar label="語彙知性"     value={vocabulary_score}  color="#8b5cf6" emoji="📖" />
      </div>

      {/* 分析テキスト */}
      <div className="bg-gray-50 border-t border-gray-100 px-6 py-5">
        <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{analysis_text}&rdquo;</p>
      </div>
    </div>
  )
}

function getDominantColor(p: number, s: number, n: number, e: number, v: number) {
  const max = Math.max(p, s, n, e, v)
  if (max === p) return { gradient: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)' }
  if (max === s) return { gradient: 'linear-gradient(135deg, #f97316 0%, #9a3412 100%)' }
  if (max === n) return { gradient: 'linear-gradient(135deg, #eab308 0%, #92400e 100%)' }
  if (max === e) return { gradient: 'linear-gradient(135deg, #ec4899 0%, #9d174d 100%)' }
  return { gradient: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)' }
}
