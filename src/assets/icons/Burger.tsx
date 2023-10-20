import React from "react";

function Burger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <g clipPath="url(#burger_svg__a)">
        <path
          fill="currentColor"
          d="M16.667 15a.833.833 0 0 1 .097 1.66l-.097.006H3.333a.833.833 0 0 1-.097-1.66L3.333 15h13.334Zm0-5.834a.833.833 0 0 1 0 1.667H3.333a.833.833 0 0 1 0-1.667h13.334Zm0-5.833a.833.833 0 0 1 0 1.667H3.333a.833.833 0 0 1 0-1.667h13.334Z"
        />
      </g>
      <defs>
        <clipPath id="burger_svg__a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { Burger };
