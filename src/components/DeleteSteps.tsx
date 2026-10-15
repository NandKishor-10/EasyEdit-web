"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  CheckCircle,
  DeviceMobile,
  PencilSimpleLine,
  SignIn,
  Trash,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import { DELETE_STEPS } from "@/lib/delete-steps";

const ICONS = [DeviceMobile, SignIn, UserCircle, PencilSimpleLine, Trash, CheckCircle] as const;

/** A progress line fills down the timeline as the reader moves through the steps. */
export function DeleteSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 bg-line" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute bottom-6 left-6 top-6 w-0.5 origin-top -translate-x-1/2 bg-accent"
      />
      {DELETE_STEPS.map(({ title, body }, i) => {
        const Icon = ICONS[i];
        return (
        <motion.li
          key={title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-[3rem_1fr] gap-5 pb-12 last:pb-0 md:gap-7"
        >
          <span className="relative z-10 grid size-12 place-items-center rounded-full bg-accent text-accent-fg">
            <Icon aria-hidden size={22} weight="regular" />
          </span>
          <div className="pt-1.5">
            <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] md:text-3xl">
              {title}
            </h3>
            <p className="mt-2 max-w-lg text-base leading-relaxed text-muted">{body}</p>
          </div>
          <span className="sr-only">{`(${i + 1} of ${DELETE_STEPS.length})`}</span>
        </motion.li>
        );
      })}
    </ol>
  );
}
