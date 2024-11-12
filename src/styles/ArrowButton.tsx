import React from "react";

interface ArrowProps {
  double?: boolean; // Prop to control whether it's a single or double arrow
}

// Left Arrow SVG Component
const LeftArrowSVG: React.FC<ArrowProps> = ({ double }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {double ? (
      <>
        <path d="M17 18l-6-6 6-6" />
        <path d="M11 18l-6-6 6-6" />
      </>
    ) : (
      <path d="M15 18l-6-6 6-6" />
    )}
  </svg>
);

// Right Arrow SVG Component
const RightArrowSVG: React.FC<ArrowProps> = ({ double }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {double ? (
      <>
        <path d="M7 18l6-6-6-6" />
        <path d="M13 18l6-6-6-6" />
      </>
    ) : (
      <path d="M9 18l6-6-6-6" />
    )}
  </svg>
);

export { LeftArrowSVG, RightArrowSVG };
