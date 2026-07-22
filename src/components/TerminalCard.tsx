'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CodeLine {
  text: string
  type: 'comment' | 'import' | 'code' | 'output' | 'blank'
}

const CODE_LINES: CodeLine[] = [
  { text: '# ML Pipeline — Movie Rec Engine', type: 'comment' },
  { text: 'import pandas as pd', type: 'import' },
  { text: 'from sklearn.cluster import KMeans', type: 'import' },
  { text: 'from sklearn.metrics import silhouette_score', type: 'import' },
  { text: '', type: 'blank' },
  { text: '# Load & engineer features', type: 'comment' },
  { text: 'df = pd.read_csv("movies_dataset.csv")', type: 'code' },
  { text: 'X = df[["rating","genre_enc","year"]]', type: 'code' },
  { text: '', type: 'blank' },
  { text: '# Fit unsupervised model', type: 'comment' },
  { text: 'model = KMeans(n_clusters=5, random_state=42)', type: 'code' },
  { text: 'model.fit(X)', type: 'code' },
  { text: '', type: 'blank' },
  { text: '# Evaluate clustering quality', type: 'comment' },
  { text: 'score = silhouette_score(X, model.labels_)', type: 'code' },
  { text: 'print(f"Score: {score:.4f}")  # → 0.7823', type: 'output' },
]

function HighlightedLine({ line }: { line: CodeLine }): ReactNode {
  if (line.type === 'blank') return <span>&nbsp;</span>
  if (line.type === 'comment') return <span style={{ color: '#475569' }}>{line.text}</span>
  if (line.type === 'output')  return <span style={{ color: '#6ee7b7' }}>{line.text}</span>

  if (line.type === 'import') {
    const parts = line.text.split(' ')
    return (
      <span>
        {parts.map((word, i) => {
          const isKw = word === 'import' || word === 'from'
          return (
            <span key={i} style={{ color: isKw ? '#a78bfa' : '#22d3ee' }}>
              {word}{i < parts.length - 1 ? ' ' : ''}
            </span>
          )
        })}
      </span>
    )
  }

  // Generic code — naive keyword colouring
  const keywords = new Set(['def', 'class', 'return', 'if', 'else', 'for', 'in', 'True', 'False', 'None'])
  const token = line.text.split(/(\s+|=|[()[\],"])/g)

  return (
    <span>
      {token.map((t, i) => {
        if (keywords.has(t)) return <span key={i} style={{ color: '#a78bfa' }}>{t}</span>
        if (/^\d+(\.\d+)?$/.test(t)) return <span key={i} style={{ color: '#fb923c' }}>{t}</span>
        if (/^"/.test(t) || /^'/.test(t)) return <span key={i} style={{ color: '#f59e0b' }}>{t}</span>
        return <span key={i} style={{ color: '#e2e8f0' }}>{t}</span>
      })}
    </span>
  )
}

export default function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAnimation = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setVisibleLines(0)
    timerRef.current = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(timerRef.current!)
          return prev
        }
        return prev + 1
      })
    }, 185)
  }

  useEffect(() => {
    startAnimation()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  const isDone = visibleLines >= CODE_LINES.length

  return (
    <div
      className="relative overflow-hidden rounded-xl h-full"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-[10px] font-mono" style={{ color: '#475569' }}>
          ml_pipeline.py — Python
        </span>
        <button
          onClick={startAnimation}
          className="text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors"
          style={{
            color: '#6ee7b7',
            border: '1px solid rgba(110,231,183,0.2)',
            background: 'rgba(110,231,183,0.05)',
          }}
          aria-label="Restart typing animation"
        >
          ↺ restart
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 font-mono text-[12px] leading-6 overflow-hidden" style={{ minHeight: '240px' }}>
        <div className="flex gap-4">
          {/* Line numbers */}
          <div
            className="flex flex-col text-right select-none"
            style={{ color: '#2d3748', minWidth: '20px' }}
          >
            {Array.from({ length: Math.max(visibleLines, 1) }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Lines */}
          <div className="flex flex-col flex-1 min-w-0">
            {CODE_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.1 }}
                className="whitespace-pre"
              >
                <HighlightedLine line={line} />
                {/* Blinking bar cursor at end of last visible line */}
                {i === visibleLines - 1 && !isDone && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '13px',
                      background: '#22d3ee',
                      marginLeft: '2px',
                      verticalAlign: 'middle',
                      opacity: cursorVisible ? 1 : 0,
                    }}
                  />
                )}
              </motion.div>
            ))}

            {/* Block cursor when done */}
            {isDone && (
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: '#6ee7b7',
                  verticalAlign: 'middle',
                  opacity: cursorVisible ? 1 : 0,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(110,231,183,0.04)' }}
      >
        <span className="text-[9px] font-mono" style={{ color: '#6ee7b7' }}>
          ● Python 3.11
        </span>
        <span className="text-[9px] font-mono" style={{ color: '#475569' }}>
          {visibleLines}/{CODE_LINES.length} lines
        </span>
      </div>
    </div>
  )
}
