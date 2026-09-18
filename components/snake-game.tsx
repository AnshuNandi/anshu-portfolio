"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Gamepad2, X } from 'lucide-react'

type Point = { x: number; y: number }

export function SnakeGame({ weeks }: { weeks?: any[] }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [snake, setSnake] = useState<Point[]>([])
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 })
  const [food, setFood] = useState<Record<string, number>>({})
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  
  // Ref for the game loop interval
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  
  // Track direction ref to prevent rapid double-turns killing the snake
  const dirRef = useRef(direction)
  dirRef.current = direction

  // If no weeks are provided (e.g. local dev without env vars), generate deterministic fake data
  const effectiveWeeks = weeks && weeks.length > 0 ? weeks : Array.from({ length: 52 }, (_, w) => ({
    contributionDays: Array.from({ length: 7 }, (_, d) => {
      const seed = (w * 7 + d) * 12.9898;
      const s = Math.sin(seed) * 43758.5453;
      const val = Math.floor((s - Math.floor(s)) * 10);
      return {
        contributionCount: val > 6 ? val * 2 : (val > 4 ? 2 : 0),
        date: 'Fallback'
      };
    })
  }));

  // GitHub logic: calculate percentiles of non-zero days for coloring
  const nonZeroCounts = effectiveWeeks
    .flatMap((w: any) => w.contributionDays.map((d: any) => d.contributionCount))
    .filter((count: number) => count > 0)
    .sort((a: number, b: number) => a - b);

  let p25 = 1, p50 = 2, p75 = 3;
  if (nonZeroCounts.length > 0) {
    p25 = nonZeroCounts[Math.floor(nonZeroCounts.length * 0.25)];
    p50 = nonZeroCounts[Math.floor(nonZeroCounts.length * 0.50)];
    p75 = nonZeroCounts[Math.floor(nonZeroCounts.length * 0.75)];
  }

  const getTone = (count: number) => {
    if (count === 0) return 'bg-zinc-200/50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700/50';
    if (count > p75) return 'bg-emerald-700 dark:bg-emerald-400 border-emerald-800 dark:border-emerald-300';
    if (count > p50) return 'bg-emerald-500 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-500';
    if (count > p25) return 'bg-emerald-300 dark:bg-emerald-800 border-emerald-400 dark:border-emerald-700';
    return 'bg-emerald-200 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-900';
  }

  const startGame = () => {
    if (!effectiveWeeks) return;
    
    // Setup initial food board
    const initialFood: Record<string, number> = {};
    effectiveWeeks.forEach((w: any, x: number) => {
      w.contributionDays.forEach((d: any, y: number) => {
        if (d.contributionCount > 0) {
          initialFood[`${x},${y}`] = d.contributionCount;
        }
      });
    });

    setFood(initialFood)
    setSnake([{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }]) // Start with size 3
    setDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
    setWon(false)
    setIsPlaying(true)
  }

  const quitGame = () => {
    setIsPlaying(false)
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
  }

  const cols = effectiveWeeks?.length || 52;
  const rows = 7;

  // Keydown listener
  useEffect(() => {
    if (!isPlaying || gameOver || won) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
      }

      if (e.key === 'Escape') quitGame();

      const { x, y } = dirRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, won]);

  // Touch Swipe listener
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPlaying || gameOver || won) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isPlaying || gameOver || won || !touchStartRef.current) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) {
        if (dx > 0 && dirRef.current.x === 0) setDirection({ x: 1, y: 0 });
        else if (dx < 0 && dirRef.current.x === 0) setDirection({ x: -1, y: 0 });
      }
    } else {
      if (Math.abs(dy) > 30) {
        if (dy > 0 && dirRef.current.y === 0) setDirection({ x: 0, y: 1 });
        else if (dy < 0 && dirRef.current.y === 0) setDirection({ x: 0, y: -1 });
      }
    }
    touchStartRef.current = null;
  };

  const snakeRef = useRef(snake)
  useEffect(() => { snakeRef.current = snake }, [snake])
  
  const foodRef = useRef(food)
  useEffect(() => { foodRef.current = food }, [food])
  
  const scoreRef = useRef(score)
  useEffect(() => { scoreRef.current = score }, [score])

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver || won) return;

    // Speed calculation based on score (Leveling)
    const baseSpeed = 150;
    const speedBoost = Math.floor(score / 50) * 10;
    const currentSpeed = Math.max(80, baseSpeed - speedBoost);

    gameLoopRef.current = setInterval(() => {
      const currentSnake = snakeRef.current;
      const currentFood = foodRef.current;
      const currentDir = dirRef.current;
      
      if (currentSnake.length === 0) return;

      const head = currentSnake[0];
      const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

      // Wall Collision
      if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
        setGameOver(true);
        return;
      }

      // Self Collision
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...currentSnake];
      const foodKey = `${newHead.x},${newHead.y}`;
      
      if (foodKey in currentFood) {
        // Ate food!
        setScore(s => s + currentFood[foodKey]);
        const newFood = { ...currentFood };
        delete newFood[foodKey];
        setFood(newFood);
        
        if (Object.keys(newFood).length === 0) {
          setWon(true);
        }
      } else {
        // Didn't eat, pop tail
        newSnake.pop();
      }
      
      setSnake(newSnake);

    }, currentSpeed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, won, score, cols]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header / Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase text-muted-foreground tracking-widest">
          {!isPlaying ? "Contribution History" : (gameOver || won) ? "" : `Score: ${score}`}
        </h3>
        {!isPlaying ? (
          <button 
            onClick={startGame}
            className="brut-sm brut-hover flex items-center gap-2 bg-goog-blue px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground"
          >
            <Gamepad2 className="size-4" />
            Play Snake
          </button>
        ) : !(gameOver || won) && (
          <button 
            onClick={quitGame}
            className="brut-sm brut-hover flex items-center gap-1 bg-goog-red px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground"
          >
            <X className="size-4" strokeWidth={3} />
            Quit
          </button>
        )}
      </div>

      {/* Grid Area — or Game Result Panel */}
      <div
        className={cn("relative w-full", isPlaying ? "touch-none" : "")}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Game Over / Win — compact, styled */}
        {isPlaying && (gameOver || won) ? (
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 py-4 px-3 bg-muted/40 border border-border">
            <div className="flex items-center gap-4">
              {/* Coloured accent bar */}
              <div className={cn("w-1 self-stretch shrink-0 rounded-full", won ? "bg-goog-green" : "bg-goog-red")} />

              {/* Text stack */}
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
                  {won ? '— session complete —' : '— session ended —'}
                </span>
                <p className={cn(
                  "font-display text-xl uppercase tracking-widest leading-none",
                  won ? "text-goog-green" : "text-goog-red"
                )}>
                  {won ? 'Perfect!' : 'Game Over'}
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Score</span>
                  <span className="font-display text-2xl text-goog-yellow leading-none">{score}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end mt-1 sm:mt-0">
              <button
                onClick={quitGame}
                className="brut-sm brut-hover flex items-center gap-1.5 px-3 py-2 font-display text-xs uppercase tracking-widest bg-muted text-muted-foreground"
              >
                Quit
              </button>
              <button
                onClick={startGame}
                className={cn(
                  "brut-sm brut-hover flex items-center gap-1.5 px-4 py-2 font-display text-xs uppercase tracking-widest",
                  won ? "bg-goog-green text-ink-static" : "bg-goog-yellow text-ink-static"
                )}
              >
                <Gamepad2 size={11} strokeWidth={2.5} />
                Play Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-col grid-rows-7 gap-[1px] sm:gap-[2px]">
            {effectiveWeeks.map((week: any, x: number) => (
              week.contributionDays.map((day: any, y: number) => {
                const isSnakeHead = isPlaying && snake.length > 0 && snake[0].x === x && snake[0].y === y;
                const isSnakeBody = isPlaying && snake.some((s, idx) => idx !== 0 && s.x === x && s.y === y);
                
                let cellColor = getTone(day.contributionCount);
                
                if (isPlaying) {
                  if (`${x},${y}` in food) {
                    cellColor = getTone(food[`${x},${y}`]);
                  } else {
                    cellColor = getTone(0);
                  }
                  if (isSnakeHead) cellColor = 'bg-goog-yellow border-ink/80 z-10 scale-110 shadow-sm';
                  else if (isSnakeBody) cellColor = 'bg-goog-yellow/80 border-ink/50';
                }

                return (
                  <span
                    key={`${x}-${y}`}
                    title={!isPlaying ? `${day.contributionCount} contributions on ${day.date}` : undefined}
                    className={cn(
                      'rounded-[2px] transition-all duration-75 border aspect-square',
                      cellColor
                    )}
                  />
                )
              })
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
