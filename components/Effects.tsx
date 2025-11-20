
import React, { useState } from 'react';

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const NeonGlow: React.FC<{
  children?: React.ReactNode,
  intensity?: "sm" | "md" | "lg" | "xl",
  color?: "neon-surge" | "blood" | "purple",
  glow?: boolean,
  animate?: boolean,
  className?: string
}> = ({
  children,
  intensity = "md",
  color = "neon-surge",
  glow = true,
  animate = true,
  className,
}) => {
  const glowMap = {
    "neon-surge": "shadow-[0_0_20px_#00FFC0,0_0_60px_#00FFC066]",
    "blood": "shadow-[0_0_30px_#ff0066cc,0_0_60px_#ff006633]",
    "purple": "shadow-[0_0_30px_#a855f7bb,0_0_60px_#a855f744]",
  };
  const intensityMap = {
    sm: "shadow-[0_0_6px_currentColor]",
    md: glowMap[color as keyof typeof glowMap],
    lg: `${glowMap[color as keyof typeof glowMap]} scale-105`,
    xl: `${glowMap[color as keyof typeof glowMap]} scale-110 ${animate ? "animate-pulse" : ""}`,
  };
  return (
    <div
      className={cn(
        "relative inline-block transition-all duration-700",
        glow ? intensityMap[intensity] : "",
        "will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FrostedGlass: React.FC<{
  children?: React.ReactNode,
  blur?: "sm" | "md" | "lg" | "xl",
  opacity?: number,
  borderColor?: string,
  corners?: "md" | "lg" | "xl",
  className?: string
}> = ({
  children,
  blur = "xl",
  opacity = 70,
  borderColor = "white/5",
  corners = "xl",
  className
}) => {
  const blurMap = { sm: "backdrop-blur-sm", md: "backdrop-blur-md", lg: "backdrop-blur-lg", xl: "backdrop-blur-2xl" };
  const radiusMap = { md: "rounded-lg", lg: "rounded-xl", xl: "rounded-2xl" };
  return (
    <div
      className={cn(
        "relative border overflow-hidden transition-all duration-500 bg-black",
        `bg-black/${opacity}`,
        blurMap[blur],
        radiusMap[corners],
        `border-${borderColor}`,
        "shadow-[0_0_35px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none -z-10 rounded-inherit bg-gradient-to-br from-neon-surge/5 via-purple-500/5 to-transparent opacity-20" />
      {children}
    </div>
  );
};

export const TacticalIcon: React.FC<{
  children: React.ReactNode;
  pulse?: boolean;
  ping?: boolean;
  spinOnHover?: boolean;
  className?: string;
}> = ({ children, pulse, ping, spinOnHover, className }) => {
  return (
    <div className={cn("relative inline-flex items-center justify-center group/icon", className)}>
      {ping && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-20 animate-ping duration-1000"></span>
      )}
      <div className={cn(
        "relative z-10 transition-transform duration-500 ease-out",
        pulse && "animate-pulse",
        spinOnHover && "group-hover/icon:rotate-[360deg] group-hover/icon:scale-110"
      )}>
        {children}
      </div>
    </div>
  );
};

export const ProgressGlow: React.FC<{ progress: number, color?: "neon-surge" | "yellow" | "purple", className?: string }> = ({ progress, color = "neon-surge", className }) => {
   const colorMap = {
    "neon-surge": "bg-[#00FFC0] shadow-[0_0_10px_#00FFC0]",
    "yellow": "bg-yellow-500 shadow-[0_0_10px_#EAB308]",
    "purple": "bg-purple-500 shadow-[0_0_10px_#A855F7]"
   };

   return (
     <div className={cn("w-full bg-[#222] rounded-full overflow-hidden", className)}>
       <div
         className={cn("h-full transition-all duration-1000 ease-out", colorMap[color])}
         style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
       />
     </div>
   )
}

export const AnimatedGradient: React.FC<{ dark?: boolean }> = ({ dark = true }) => (
    <div className={cn(
        "absolute inset-0 pointer-events-none -z-10",
        dark ? "bg-black" : "bg-[#050505]"
    )}>
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[spin_60s_linear_infinite] opacity-[0.03] bg-[conic-gradient(from_0deg,transparent_0deg,#00FFC0_180deg,transparent_360deg)] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150"></div>
    </div>
)

export const ParallaxTilt: React.FC<{ children?: React.ReactNode, className?: string, intensity?: number }> = ({ children, className, intensity = 15 }) => {
    const [transform, setTransform] = useState("");

    const handleMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setTransform(`rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg)`);
    }

    return (
        <div
            className={cn("perspective-[1000px]", className)}
            onMouseMove={handleMove}
            onMouseLeave={() => setTransform("rotateY(0deg) rotateX(0deg)")}
        >
            <div
                style={{ transform, transition: "transform 0.1s ease-out" }}
                className="will-change-transform"
            >
                {children}
            </div>
        </div>
    )
}
    