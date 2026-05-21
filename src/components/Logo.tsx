import React from 'react';

interface LogoProps {
  className?: string;
  size?: number; // width in pixels, height will scale proportionally (square-ish design)
}

export const Logo = ({ className = '', size = 50 }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform hover:scale-105 duration-300`}
    >
      <g id="LCC-Logo">
        {/* Rays from the Flame */}
        <g id="rays" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <line x1="250" y1="110" x2="250" y2="85" />
          <line x1="220" y1="115" x2="205" y2="95" />
          <line x1="280" y1="115" x2="295" y2="95" />
          <line x1="195" y1="125" x2="173" y2="108" />
          <line x1="305" y1="125" x2="327" y2="108" />
          <line x1="175" y1="145" x2="148" y2="135" />
          <line x1="325" y1="145" x2="352" y2="135" />
          <line x1="165" y1="170" x2="135" y2="168" />
          <line x1="335" y1="170" x2="365" y2="168" />
        </g>

        {/* The Flame */}
        <g id="flame">
          {/* Outer Orange Flame */}
          <path
            d="M250 145C265 145 275 130 270 112C265 95 250 78 250 78C250 78 235 95 230 112C225 130 235 145 250 145Z"
            fill="#EF4444"
          />
          {/* Inner Yellow Core */}
          <path
            d="M250 140C258 140 263 130 260 118C257 107 250 95 250 95C250 95 243 107 240 118C237 130 242 140 250 140Z"
            fill="#FBBF24"
          />
        </g>

        {/* Shield Outer Borders (Red Accent Backdrops/Ears) */}
        <path
          d="M175 190C175 190 145 230 145 315C145 345 152 385 175 410"
          stroke="#E11D48"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M325 190C325 190 355 230 355 315C355 345 348 385 325 410"
          stroke="#E11D48"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* Shield Body */}
        {/* Background / White fill of the Shield */}
        <path
          d="M165 150 C210 170, 290 170, 335 150 C345 260, 345 350, 250 395 C155 350, 155 260, 165 150 Z"
          fill="#FFFFFF"
          stroke="#E11D48"
          strokeWidth="14"
          strokeLinejoin="round"
        />

        {/* Divider inside Shield (vertical) */}
        <line
          x1="250"
          y1="290"
          x2="250"
          y2="390"
          stroke="#E11D48"
          strokeWidth="6"
        />

        {/* Horizontal Divider line of middle shield */}
        <path
          d="M160 290 C210 295, 290 295, 340 290"
          stroke="#E11D48"
          strokeWidth="6"
          fill="none"
        />

        {/* OPEN BOOK (Centered Top Compartment) */}
        <g id="open-book">
          {/* Book Pages Base shadow */}
          <path
            d="M 185 272 C 210 260, 240 260, 250 272 C 260 260, 290 260, 315 272"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lefthand page outlines */}
          <path
            d="M250 272 C238 258, 205 258, 185 270 C185 270, 182 205, 182 195 C182 195, 215 185, 250 198 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Righthand page outlines */}
          <path
            d="M250 272 C262 258, 295 258, 315 270 C315 270, 318 205, 318 195 C318 195, 285 185, 250 198 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* LCC Text overlay inside the Book */}
          <text
            x="250"
            y="242"
            fill="#E11D48"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="38"
            textAnchor="middle"
            letterSpacing="-1"
          >
            LCC
          </text>
        </g>

        {/* GRADUATION CAP (Bottom-Left Compartment) */}
        <g id="hat" transform="translate(170, 305) scale(0.65)">
          {/* Base structure skullcap under the hat */}
          <path
            d="M25 58 C 25 75, 75 75, 75 58"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="4"
          />
          {/* Rhombus Diamond on top */}
          <polygon
            points="50,22 95,42 50,62 5,42"
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="3"
          />
          {/* Tassel */}
          <path
            d="M50 42 L80 54 L80 72"
            stroke="#E11D48"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="80" cy="72" r="3" fill="#E11D48" />
        </g>

        {/* INKWELL AND QUILL (Bottom-Right Compartment) */}
        <g id="quill-and-pot" transform="translate(265, 305) scale(0.65)">
          {/* Inkwell base container */}
          <path
            d="M15 62 L15 52 L25 46 L55 46 L65 52 L65 62 Z"
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Inkwell neck */}
          <rect x="25" y="38" width="30" height="8" rx="2" fill="#334155" />
          {/* Writing quill feather */}
          <path
            d="M40 40 Q55 10, 68 -2 Q46 15, 43 38"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Quill details */}
          <path
            d="M45 28 L53 30 M48 20 L58 22 M52 12 L62 14"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* BOTTOM RIBBON BANNER */}
        <g id="ribbon">
          {/* Ribbon Ends/Folds */}
          {/* Left Wing fold */}
          <path
            d="M 90 315 L 140 365 L 140 410 L 98 368 Z"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="3"
          />
          <path
            d="M 90 315 Q 115 350, 105 385 L 135 363 Z"
            fill="#E11D48"
          />
          {/* Right Wing fold */}
          <path
            d="M 410 315 L 360 365 L 360 410 L 402 368 Z"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="3"
          />
          <path
            d="M 410 315 Q 385 350, 395 385 L 365 363 Z"
            fill="#E11D48"
          />

          {/* Broad Curved Banner Scroll itself */}
          <path
            id="textPathCurve"
            d="M 95 350 Q 250 470, 405 350 L 390 410 Q 250 518, 110 410 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Hidden Path for curved Text layout */}
          <path
            id="textCurve"
            d="M 105 392 Q 250 488, 395 392"
            fill="none"
          />

          {/* Text Along Path: LABORATORY COACHING CENTRE */}
          <text fontSize="22" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" fill="#E11D48">
            <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
              LABORATORY COACHING CENTRE
            </textPath>
          </text>
        </g>

        {/* SINCE 1995 LABEL */}
        <g id="since-label">
          <text
            x="250"
            y="480"
            fill="#1E293B"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="bold"
            fontSize="18"
            letterSpacing="5"
            textAnchor="middle"
          >
            SINCE 1995
          </text>
        </g>
      </g>
    </svg>
  );
};
