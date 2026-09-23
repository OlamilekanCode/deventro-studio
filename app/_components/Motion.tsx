"use client";

import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const tags = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
};

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate on mount instead of when scrolled into view (above the fold). */
  immediate?: boolean;
};

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  immediate = false,
}: RevealProps) {
  const Tag = tags[as];
  const visible = { opacity: 1, y: 0 };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Tag>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

const milestones = [
  { label: "Scope & strategy", state: "complete", mark: "✓" },
  { label: "Design & prototype", state: "complete", mark: "✓" },
  { label: "Build & integrate", state: "current", mark: "→" },
  { label: "Test & launch", state: "", mark: "○" },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const float = (distance: number, duration: number) =>
    reduce
      ? {}
      : {
          y: [0, -distance, 0],
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <motion.div
      aria-hidden="true"
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <div className="visual-topline">
        <span>PRODUCT DELIVERY</span>
        <span className="visual-status">
          <motion.span
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ●
          </motion.span>{" "}
          ACTIVE
        </span>
      </div>
      <div className="visual-window">
        <div className="visual-title">
          <span className="window-icon">D</span>
          <div>
            <strong>Your next product</strong>
            <small>Designed, built and shipped</small>
          </div>
        </div>
        <div className="progress-track">
          <motion.span
            initial={{ width: "0%" }}
            animate={{ width: "67%" }}
            transition={{ duration: 1.6, delay: 0.7, ease }}
          />
        </div>
        <div className="milestones">
          {milestones.map((milestone, index) => (
            <motion.div
              className={milestone.state}
              key={milestone.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.15, ease }}
            >
              <b>0{index + 1}</b>
              <span>{milestone.label}</span>
              <i>{milestone.mark}</i>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="code-chip chip-one"
        style={{ rotate: -5 }}
        animate={float(8, 4)}
      >
        API <b>200 OK</b>
      </motion.div>
      <motion.div
        className="code-chip chip-two"
        style={{ rotate: 4 }}
        animate={float(10, 5)}
      >
        BUILD <b>✓ PASSED</b>
      </motion.div>
    </motion.div>
  );
}
