"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface WeatherAnimationProps {
  weatherCondition: string;
}

export default function WeatherAnimation({
  weatherCondition,
}: WeatherAnimationProps) {
  const condition = weatherCondition.toLowerCase();

  if (condition.includes("clear") || condition.includes("sun")) {
    return <SunnyAnimation />;
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    return <RainAnimation />;
  } else if (condition.includes("snow")) {
    return <SnowAnimation />;
  } else if (condition.includes("cloud")) {
    return <CloudyAnimation />;
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    return <ThunderAnimation />;
  } else {
    return <CloudyAnimation />;
  }
}

function SunnyAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-4 right-1/4 w-20 h-20 bg-yellow-400 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 70px rgba(255, 204, 0, 0.8)",
        }}
      />
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-200 rounded-full opacity-30"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function RainAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-4 left-1/4 w-16 h-8 bg-custom-gray rounded-full"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-8 right-1/3 w-24 h-10 bg-custom-gray rounded-full"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-4 bg-custom-blue rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: -10,
          }}
          animate={{
            y: [0, 100, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function SnowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-4 left-1/4 w-16 h-8 bg-custom-gray rounded-full"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-8 right-1/3 w-24 h-10 bg-custom-gray rounded-full"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: -10,
          }}
          animate={{
            y: [0, 100, 200],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function CloudyAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-4 left-1/4 w-16 h-8 bg-custom-gray rounded-full"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-8 right-1/3 w-24 h-10 bg-custom-gray rounded-full"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-12 left-1/3 w-20 h-9 bg-custom-gray rounded-full"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

function ThunderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      const startY = 0;

      ctx.strokeStyle = "#496989";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#fff";

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      let x = startX;
      let y = startY;

      while (y < canvas.height) {
        const newX = x + (Math.random() - 0.5) * 50;
        const newY = y + Math.random() * 20 + 10;

        ctx.lineTo(newX, newY);

        x = newX;
        y = newY;
      }

      ctx.stroke();

      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 100);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createLightning();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-4 left-1/4 w-16 h-8 bg-custom-dark-blue rounded-full"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-8 right-1/3 w-24 h-10 bg-custom-dark-blue rounded-full"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
