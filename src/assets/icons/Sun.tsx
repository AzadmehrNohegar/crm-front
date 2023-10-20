import React from "react";

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <g clipPath="url(#sun_svg__a)">
        <path fill="#2BD4CE" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path
          stroke="#2BD4CE"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          opacity={0.5}
        />
      </g>
      <defs>
        <clipPath id="sun_svg__a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export { Sun };
