// 'use client';

// import { motion, useReducedMotion } from 'framer-motion';
// import clsx from 'clsx';

// type Props = {
//   className?: string;
//   children: React.ReactNode;
// };

// export default function HeroIntro({ className, children }: Props) {
//   const reduce = useReducedMotion();

//   const container = {
//     hidden: {},
//     show: {
//       transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: reduce ? 0 : 14, scale: 0.995 },
//     show: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.6 },
//     },
//   };

//   return (
//     <motion.div
//       className={clsx('relative z-10', className)}
//       variants={container}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.6 }}
//     >
//       {/* You can pass any markup as children; we’ll target direct children with variants */}
//       {/*
//         Tip: apply `variants={item}` on child elements you want animated.
//       */}
//       {children}
//     </motion.div>
//   );
// }

// // Helper for animating individual lines/spans
// export function AnimatedLine({ children, className }: { children: React.ReactNode; className?: string }) {
//   return (
//     <motion.span className={className} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} />
//       && <motion.span className={className} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
//         {children}
//       </motion.span>
//   );
// }