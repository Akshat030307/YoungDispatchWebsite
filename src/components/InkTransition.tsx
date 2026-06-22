import { useEffect, useRef, useCallback } from "react";

interface InkTransitionHandle {
  trigger: (label: string, targetId: string) => void;
}

let globalTrigger: ((label: string, targetId: string) => void) | null = null;

export function triggerInkTransition(label: string, targetId: string) {
  globalTrigger?.(label, targetId);
}

export function InkTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const trigger = useCallback((label: string, targetId: string) => {
    const overlay = overlayRef.current;
    const labelEl = labelRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !labelEl || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cancel any running animation
    cancelAnimationFrame(animRef.current);

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Show overlay
    overlay.style.pointerEvents = "all";

    // Phase timing (ms)
    const STAMP_DURATION = 420;   // ink bleeds in
    const HOLD_DURATION = 320;    // full black hold
    const PEEL_DURATION = 380;    // ink peels back

    let start: number | null = null;
    let phase: "stamp" | "hold" | "peel" = "stamp";
    let holdStart = 0;
    let peelStart = 0;
    let scrolled = false;

    // Ink blobs — radial circles expanding from center
    const BLOB_COUNT = 9;
    const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => {
      const angle = (i / BLOB_COUNT) * Math.PI * 2;
      const dist = Math.random() * 0.18 * Math.min(W, H);
      return {
        cx: W / 2 + Math.cos(angle) * dist,
        cy: H / 2 + Math.sin(angle) * dist,
        maxR: Math.sqrt(W * W + H * H) * (0.55 + Math.random() * 0.15),
        delay: Math.random() * 0.15, // staggered start 0–15% into stamp phase
      };
    });
    // Always include dead-center blob
    blobs.push({ cx: W / 2, cy: H / 2, maxR: Math.sqrt(W * W + H * H) * 0.65, delay: 0 });

    function easeInQuad(t: number) { return t * t; }
    function easeOutQuad(t: number) { return 1 - (1 - t) * (1 - t); }
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function drawFrame(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;

      ctx.clearRect(0, 0, W, H);

      if (phase === "stamp") {
        const progress = Math.min(elapsed / STAMP_DURATION, 1);

        blobs.forEach((blob) => {
          const blobProgress = Math.max(0, (progress - blob.delay) / (1 - blob.delay));
          const r = blob.maxR * easeInQuad(Math.min(blobProgress, 1));
          if (r <= 0) return;

          const grad = ctx.createRadialGradient(blob.cx, blob.cy, 0, blob.cx, blob.cy, r);
          grad.addColorStop(0, "rgba(10,10,10,0.98)");
          grad.addColorStop(0.75, "rgba(10,10,10,0.95)");
          grad.addColorStop(1, "rgba(10,10,10,0)");
          ctx.beginPath();
          ctx.arc(blob.cx, blob.cy, r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Transition to hold
        if (progress >= 1) {
          phase = "hold";
          holdStart = ts;

          // Show label
          const textEl = document.getElementById("ink-label-text");
          if (textEl) textEl.textContent = label;
          labelEl.style.opacity = "1";
          labelEl.style.transform = "translateY(0px) scale(1)";

          // Scroll to section NOW (while screen is black)
          if (!scrolled) {
            scrolled = true;
            const target = document.getElementById(targetId);
            if (target) {
              const top = target.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top, behavior: "instant" });
            }
          }
        }
      }

      if (phase === "hold") {
        // Solid black fill
        ctx.fillStyle = "rgba(10,10,10,1)";
        ctx.fillRect(0, 0, W, H);

        if (ts - holdStart >= HOLD_DURATION) {
          phase = "peel";
          peelStart = ts;
          // Fade label out
          labelEl.style.opacity = "0";
          labelEl.style.transform = "translateY(-8px) scale(0.97)";
        }
      }

      if (phase === "peel") {
        const progress = Math.min((ts - peelStart) / PEEL_DURATION, 1);
        const eased = easeOutQuad(progress);

        // Reverse — shrink blobs back
        blobs.forEach((blob) => {
          const blobProgress = Math.max(0, (1 - eased - blob.delay * 0.5) / (1 - blob.delay * 0.5));
          const r = blob.maxR * Math.min(blobProgress, 1);
          if (r <= 0) return;

          const grad = ctx.createRadialGradient(blob.cx, blob.cy, 0, blob.cx, blob.cy, r);
          grad.addColorStop(0, "rgba(10,10,10,0.98)");
          grad.addColorStop(0.7, "rgba(10,10,10,0.95)");
          grad.addColorStop(1, "rgba(10,10,10,0)");
          ctx.beginPath();
          ctx.arc(blob.cx, blob.cy, r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        if (progress >= 1) {
          // Done — hide overlay
          overlay.style.pointerEvents = "none";
          ctx.clearRect(0, 0, W, H);
          return;
        }
      }

      animRef.current = requestAnimationFrame(drawFrame);
    }

    animRef.current = requestAnimationFrame(drawFrame);
  }, []);

  useEffect(() => {
    globalTrigger = trigger;
    return () => { globalTrigger = null; };
  }, [trigger]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        pointerEvents: "none",
      }}
    >
      {/* Canvas for ink animation */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Section label shown during hold phase */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          ref={labelRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            opacity: 0,
            transform: "translateY(12px) scale(0.96)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Red rule above */}
          <div style={{ width: "48px", height: "3px", background: "#c8102e" }} />
          {/* Section name — text set via JS */}
          <div
            id="ink-label-text"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              textAlign: "center",
              padding: "0 1rem",
            }}
          />
          {/* Red rule below */}
          <div style={{ width: "48px", height: "3px", background: "#c8102e" }} />
        </div>
      </div>
    </div>
  );
}