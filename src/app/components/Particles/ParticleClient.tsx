'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters'

export default function ParticlesClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadEmittersPlugin(engine);

    }).then(() => setReady(true));

  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      detectRetina: true,
      fpsLimit: 30,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: false, mode: 'repulse' },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: {
          color: '#ffffff',
          distance: 160,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: { enable: true, speed: 0.5 },
        number: { value: 20, density: { enable: true } },
        opacity: { value: 0.25 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    []
  );

  if (!ready) return null;
  return (
    <Particles
      id="about-particles"
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,      // behind your text
        pointerEvents: 'none',
      }}
    />
  );
}