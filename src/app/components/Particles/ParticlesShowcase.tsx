// 'use client';

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import Particles, { initParticlesEngine } from '@tsparticles/react';
// import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';
// import { loadSlim } from '@tsparticles/slim';
// import { loadEmittersPlugin } from '@tsparticles/plugin-emitters';

// type ClickEvent = { t: number; xPct: number; yPct: number; style?: 'burst' };
// type Props = {
//   /** Provide a server-loaded pattern here if you want (MongoDB, etc). */
//   initialRecording?: ClickEvent[];
//   /** autoplays either initialRecording or localStorage recording */
//   autoPlayOnInit?: boolean;
//   /** localStorage key to persist/reuse recordings */
//   storageKey?: string;
//   /** height of the canvas wrapper */
//   height?: number; // px
// };

// export default function ParticlesShowcase({
//   initialRecording,
//   autoPlayOnInit = true,
//   storageKey = 'particle-recording',
//   height = 420,
// }: Props) {
//   const [ready, setReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [startTs, setStartTs] = useState<number | null>(null);
//   const [recording, setRecording] = useState<ClickEvent[]>(() => initialRecording ?? []);
//   const containerRef = useRef<Container | null>(null);
//   const wrapperRef = useRef<HTMLDivElement | null>(null);

//   // init engine with slim + emitters
//   useEffect(() => {
//     initParticlesEngine(async (engine: Engine) => {
//       await loadSlim(engine);
//       await loadEmittersPlugin(engine);
//     }).then(() => setReady(true));
//   }, []);

//   // basic look; tune to taste
//   const options: ISourceOptions = useMemo(
//     () => ({
//       background: { color: { value: 'transparent' } },
//       fpsLimit: 60,
//       detectRetina: true,
//       interactivity: {
//         events: { onHover: { enable: true, mode: 'repulse' } },
//         modes: { repulse: { distance: 120, duration: 0.35 } },
//       },
//       particles: {
//         color: { value: '#ffffff' },
//         links: { enable: true, distance: 160, opacity: 0.25, width: 1 },
//         move: { enable: true, speed: 0.45 },
//         number: { value: 24, density: { enable: true } },
//         opacity: { value: 0.25 },
//         shape: { type: 'circle' },
//         size: { value: { min: 1, max: 4 } },
//       },
//     }),
//     []
//   );

//   const loaded = useCallback((c?: Container) => {
//     if (c) containerRef.current = c;
//   }, []);

//   // Emit a short burst at % canvas coords
//   const spawnBurst = useCallback((xPct: number, yPct: number) => {
//     const c = containerRef.current;
//     if (!c) return;
//     c.addEmitter(
//       {
//         life: { duration: 0.4, count: 1 },
//         rate: { delay: 0.05, quantity: 10 },
//         particles: {
//           move: { speed: { min: 1, max: 2 } },
//           size: { value: { min: 1, max: 3 } },
//           opacity: { value: 0.6 },
//           color: { value: '#66ccff' },
//         },
//       },
//       { x: xPct * 100, y: yPct * 100 }
//     );
//   }, []);

//   // Click to emit AND record
//   const handleClick = useCallback((e: React.MouseEvent) => {
//     if (!wrapperRef.current) return;
//     const rect = wrapperRef.current.getBoundingClientRect();
//     const xPct = (e.clientX - rect.left) / rect.width;
//     const yPct = (e.clientY - rect.top) / rect.height;

//     spawnBurst(xPct, yPct);

//     if (isRecording) {
//       const now = performance.now();
//       const t0 = startTs ?? now;
//       if (startTs == null) setStartTs(t0);
//       setRecording(prev => [...prev, { t: now - t0, xPct, yPct, style: 'burst' }]);
//     }
//   }, [isRecording, startTs, spawnBurst]);

//   // Controls
//   const startRec = () => { setRecording([]); setStartTs(null); setIsRecording(true); };
//   const stopRec = () => setIsRecording(false);
//   const clearRec = () => { setRecording([]); setStartTs(null); localStorage.removeItem(storageKey); };

//   const saveRec = () => {
//     if (!recording.length) return;
//     localStorage.setItem(storageKey, JSON.stringify({ version: 1, events: recording }));
//   };

//   // Replay helper
//   const replay = (events: ClickEvent[]) => {
//     if (!events?.length) return;
//     events.forEach(({ t, xPct, yPct, style }) => {
//       window.setTimeout(() => {
//         if (style === 'burst') spawnBurst(xPct, yPct);
//       }, t);
//     });
//   };

//   // Auto-play on init
//   useEffect(() => {
//     if (!ready || !autoPlayOnInit) return;
//     // prefer prop if provided, else localStorage
//     let evts = recording;
//     if (!evts?.length) {
//       try {
//         const saved = localStorage.getItem(storageKey);
//         const parsed = saved ? JSON.parse(saved) : null;
//         evts = Array.isArray(parsed?.events) ? parsed.events : [];
//         if (evts.length) setRecording(evts);
//       } catch {}
//     }
//     if (evts?.length) {
//       // give tsparticles a tick to mount before replay
//       const id = window.setTimeout(() => replay(evts!), 200);
//       return () => window.clearTimeout(id);
//     }
//   }, [ready, autoPlayOnInit]); // eslint-disable-line react-hooks/exhaustive-deps

//   if (!ready) return null;

//   return (
//     <div className="relative w-full" style={{ height }} ref={wrapperRef}>
//       <Particles
//         id="showcase"
//         options={options}
//         loaded={loaded}
//         style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
//       />
//       {/* Click-capture layer */}
//       <div
//         onClick={handleClick}
//         className="absolute inset-0 z-10"
//         style={{ cursor: 'crosshair' }}
//       />

//       {/* Minimal UI */}
//       <div className="absolute bottom-3 left-3 z-20 flex gap-2 bg-black/40 text-white rounded-xl px-3 py-2">
//         {!isRecording ? (
//           <button onClick={startRec}>Start</button>
//         ) : (
//           <button onClick={stopRec}>Stop</button>
//         )}
//         <button onClick={() => replay(recording)} disabled={!recording.length}>Replay</button>
//         <button onClick={saveRec} disabled={!recording.length}>Save</button>
//         <button onClick={clearRec} disabled={!recording.length}>Clear</button>
//       </div>
//     </div>
//   );
// }