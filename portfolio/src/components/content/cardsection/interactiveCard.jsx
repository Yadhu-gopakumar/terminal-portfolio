
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";

const InteractiveIDCard = () => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Smooth motion
  const smoothX = useSpring(cardX, { stiffness: 60, damping: 12 });
  const smoothY = useSpring(cardY, { stiffness: 60, damping: 12 });

  const rotateX = useTransform(smoothY, [-200, 200], [15, -15]);
  const rotateY = useTransform(smoothX, [-200, 200], [-15, 15]);

  const handleDragEnd = () => {
    animate(cardX, 0, { type: "spring", stiffness: 40, damping: 10 });
    animate(cardY, 0, { type: "spring", stiffness: 40, damping: 10 });
  };

  return (
<div className="h-full w-full flex items-start justify-center pt-12 relative bg-gradient-to-br from-stone-700 to-black">
      

      {/* Draggable Card */}
      <motion.div
        drag
        dragElastic={0.2}
        dragMomentum={false}
        style={{
          x: cardX,
          y: cardY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onDragEnd={handleDragEnd}
        className="relative z-10 -mt-1"
      >
        <motion.div
          className="bg-gray-800 rounded-xl shadow-xl p-6 w-60 h-80 cursor-grab"
          style={{ rotateX, rotateY }}
        >
          <div className="flex flex-col items-center">
            <img
              src="https://avatars.githubusercontent.com/u/75099053?v=4"
              alt="Yadhu Gopakumar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
            />
            <h2 className="mt-4 text-xl font-bold text-white">
              Yadhu Gopakumar
            </h2>
            <p className="text-blue-400 text-sm">Fullstack Developer</p>
          </div>
          <div className="mt-6 text-sm text-gray-300 text-center">
            Passionate about web & mobile apps, building intelligent interfaces
            and systems.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveIDCard;
