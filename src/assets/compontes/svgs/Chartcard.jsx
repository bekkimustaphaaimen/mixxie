function Chartcard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="41"
      fill="none"
      viewBox="0 0 85 41"
    >
      <g filter="url(#filter0_d_0_1)">
        <path
          stroke="#FF8901"
          strokeWidth="3"
          d="M5 24.315c2.012.835 7.384.774 12.77-6.148 6.735-8.653 13.004-6.376 20.434 3.416 7.43 9.791 12.539 14.573 20.202 1.138C66.068 9.287 66.996 4.732 80 2"
        ></path>
      </g>
      <circle cx="70" cy="6" r="5" fill="#FF8901"></circle>
      <defs>
        <filter
          id="filter0_d_0_1"
          width="83.883"
          height="39.968"
          x="0.426"
          y="0.532"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.141176 0 0 0 0 0.278431 0 0 0 0 0.941176 0 0 0 0.16 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default Chartcard;
