"use client"
import React, { useRef, useState } from "react";
import Link from "next/link";
import { getPlatformInfo, getPlatformColor } from '@/utils/platformIcons';

export default function ProfileWithRobot({ item }) {
  // Show profile image or fallback avatar
  const hasImage = item.image || item.pic;

  // Mouse tracking for planet animation
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate planet offset based on mouse position
  let planetOffset = { x: 0, y: 0 };
  if (windowSize.width && windowSize.height) {
    // Center of viewport
    const cx = windowSize.width - 80; // SVG is at right edge, 80px from right
    const cy = windowSize.height / 2;
    // Vector from center to mouse
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    // Limit movement
    const maxDist = 30;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist) {
      const ratio = maxDist / dist;
      planetOffset = { x: dx * ratio, y: dy * ratio };
    } else {
      planetOffset = { x: dx, y: dy };
    }
    // Make it more subtle
    planetOffset.x *= 0.2;
    planetOffset.y *= 0.2;
  }

  return (
    <>
      {/* Tech SVG fixed at rightmost corner, vertically centered, with mouse-following animation */}
      <div className="hidden md:flex fixed top-1/2 right-8 -translate-y-1/2 z-20" style={{ width: 200, height: 200, pointerEvents: 'none' }}>
        {/* Robot face SVG (no eyes, just mouth and outline) */}
        <div style={{ width: 200, height: 200, position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            {/* Robot head */}
            <rect x="40" y="55" width="120" height="100" rx="26" fill="#d1d5db" stroke="#6b7280" strokeWidth="8" />
            {/* Antenna */}
            <rect x="95" y="28" width="18" height="32" rx="9" fill="#6b7280" />
            <circle cx="104" cy="28" r="10" fill="#60a5fa" stroke="#2563eb" strokeWidth="4" />
            {/* Mouth */}
            <rect x="80" y="140" width="40" height="16" rx="8" fill="#6b7280" />
            {/* Cheeks */}
            <ellipse cx="60" cy="120" rx="10" ry="5" fill="#fca5a5" />
            <ellipse cx="148" cy="120" rx="10" ry="5" fill="#fca5a5" />
          </svg>
          {/* Pupils overlay */}
          {(() => {
            // Eye base positions (relative to robot head in px)
            const leftEye = { x: 75, y: 95 };
            const rightEye = { x: 133, y: 95 };
            const pupilRadius = 16;
            const maxOffset = 16; // max px pupil can move from center
            let dx = 0, dy = 0;
            if (windowSize.width && windowSize.height) {
              // The robot is fixed at right edge, vertically centered, with 32px margin (right-8)
              const robotScreenX = windowSize.width - 32 - 100; // 32px from right, robot is 200px wide, so center is 100px from left of robot box
              const robotScreenY = windowSize.height / 2 - 100; // center vertically, robot is 200px tall
              // Mouse relative to robot center
              const mx = mouse.x - (robotScreenX + 100);
              const my = mouse.y - (robotScreenY + 95); // eyes are a bit higher
              // Normalize and clamp
              const dist = Math.sqrt(mx * mx + my * my);
              if (dist > 0) {
                dx = (mx / dist) * maxOffset;
                dy = (my / dist) * maxOffset;
              }
            }
            return (
              <svg
                width={200}
                height={200}
                style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
              >
                <circle cx={leftEye.x + dx} cy={leftEye.y + dy} r={pupilRadius} fill="#0e7490" />
                <circle cx={rightEye.x + dx} cy={rightEye.y + dy} r={pupilRadius} fill="#0e7490" />
              </svg>
            );
          })()}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 max-w-md w-full">
        {/* Profile Image and Info */}
        <div className="mb-2 select-none relative" style={{ width: 120, height: 120 }}>
          {hasImage ? (
            <img
              src={item.image || item.pic}
              alt="Profile"
              className="w-30 h-30 min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full border-4 border-cyan-400 bg-[#151b26] object-cover shadow-md"
            />
          ) : (
            <>
              {/* Emoji face */}
              <span
                style={{
                  fontSize: 110,
                  lineHeight: '120px',
                  display: 'block',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
                role="img"
                aria-label="emoji face"
              >
                😀
              </span>
              {/* Pupils overlay */}
              {(() => {
                // Eye base positions (relative to emoji in px)
                const leftEye = { x: 44, y: 52 };
                const rightEye = { x: 76, y: 52 };
                const pupilRadius = 6;
                const maxOffset = 6; // max px pupil can move from center
                // Calculate direction from face center to mouse
                let dx = 0, dy = 0;
                if (windowSize.width && windowSize.height) {
                  // Get bounding rect of the avatar on the screen
                  // We'll estimate the avatar is centered horizontally, 120px from top + pt-12 (48px)
                  const avatarScreenX = windowSize.width / 2 - 60; // left edge
                  const avatarScreenY = 120 + 48; // top edge
                  // Mouse relative to avatar
                  const mx = mouse.x - (avatarScreenX + 60); // center x
                  const my = mouse.y - (avatarScreenY + 60); // center y
                  // Normalize and clamp
                  const dist = Math.sqrt(mx * mx + my * my);
                  if (dist > 0) {
                    dx = (mx / dist) * maxOffset;
                    dy = (my / dist) * maxOffset;
                  }
                }
                return (
                  <svg
                    width={120}
                    height={120}
                    style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
                  >
                    {/* Pupils that follow mouse */}
                    <circle cx={leftEye.x + dx} cy={leftEye.y + dy} r={pupilRadius} fill="#0e7490" />
                    <circle cx={rightEye.x + dx} cy={rightEye.y + dy} r={pupilRadius} fill="#0e7490" />
                  </svg>
                );
              })()}
            </>
          )}
        </div>
        <div className="text-center">
          <span className="font-bold text-2xl text-cyan-300">@{item.handle}</span>
          {item.desc && <p className="text-cyan-100 mt-2 text-sm leading-relaxed">{item.desc}</p>}
        </div>
        {/* Links Row */}
        <div className="w-full flex flex-col gap-3 relative">
          {(Array.isArray(item.links) ? item.links : []).map((item, index) => {
            const platformInfo = getPlatformInfo(item.link, item.linktext);
            const platformColor = getPlatformColor(platformInfo.platform);
            return (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-white bg-[#151b26] border border-cyan-700/30 hover:bg-cyan-600/20 transition-all duration-150`}
              >
                <span className="text-2xl text-cyan-400">{platformInfo.icon}</span>
                <span className="text-base text-cyan-100">{item.linktext}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
} 