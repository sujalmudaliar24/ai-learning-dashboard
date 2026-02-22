import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../ThemeContext';

/**
 * Animated constellation/particle background using GSAP.
 * Re-renders whenever the theme changes so colors are always correct.
 */
export default function AnimatedBackground() {
    const canvasRef = useRef(null);
    const animRef = useRef([]);
    const rafRef = useRef(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // ── Theme-aware colours ──────────────────────────────
        // Dark: amber nodes + faint amber/indigo lines
        // Light: rich indigo nodes + visible slate-blue lines
        const DOT_COLOR_A = isDarkMode ? 'rgba(245,158,11,0.85)' : 'rgba(99,102,241,0.55)';   // main dot
        const DOT_COLOR_B = isDarkMode ? 'rgba(251,191,36,0.50)' : 'rgba(245,158,11,0.45)';   // accent dot
        const LINE_COLOR = isDarkMode ? 'rgba(245,158,11,0.18)' : 'rgba(99,102,241,0.22)';   // connecting line
        const GLOW_COLOR = isDarkMode ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)';   // soft halo fill

        const NUM_NODES = 32;
        const MAX_DIST = 190;

        // Kill any previous tweens / RAF before restarting
        animRef.current.forEach(t => t.kill());
        animRef.current = [];
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        // Build nodes with size and colour variant
        const nodes = Array.from({ length: NUM_NODES }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2.8 + 1.5,
            accent: Math.random() > 0.75,   // ~25% use accent colour
        }));

        // GSAP drift each node
        nodes.forEach(node => {
            const tw = gsap.to(node, {
                x: `+=${(Math.random() - 0.5) * 220}`,
                y: `+=${(Math.random() - 0.5) * 220}`,
                duration: 7 + Math.random() * 9,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
            animRef.current.push(tw);
        });

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // ── Lines ───────────────────────────────────────────
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        // Fade the line based on distance
                        const alpha = 1 - dist / MAX_DIST;
                        const base = isDarkMode
                            ? `rgba(245,158,11,${(0.22 * alpha).toFixed(3)})`
                            : `rgba(99,102,241,${(0.30 * alpha).toFixed(3)})`;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = base;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
            }

            // ── Nodes ───────────────────────────────────────────
            nodes.forEach(node => {
                const dotColor = node.accent ? DOT_COLOR_B : DOT_COLOR_A;

                // Soft glow halo
                const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 4);
                halo.addColorStop(0, dotColor.replace(/[\d.]+\)$/, '0.25)'));
                halo.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();

                // Solid dot
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = dotColor;
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            animRef.current.forEach(t => t.kill());
            animRef.current = [];
            window.removeEventListener('resize', handleResize);
        };
    }, [isDarkMode]); // ← re-run whenever theme changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
