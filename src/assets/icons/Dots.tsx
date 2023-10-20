import React from "react";

function Dots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <g clipPath="url(#dots_svg__a)">
        <path
          fill="currentColor"
          d="M12 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
      </g>
      <defs>
        <clipPath id="dots_svg__a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { Dots };
