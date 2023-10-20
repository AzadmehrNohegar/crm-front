import React from "react";

function AlignRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      {...props}
    >
      <g clipPath="url(#align-right_svg__a)">
        <path
          fill="currentColor"
          d="M25 22.5a1.25 1.25 0 0 1 .146 2.492L25 25H12.5a1.25 1.25 0 0 1-.146-2.492l.146-.008H25Zm0-6.25a1.25 1.25 0 1 1 0 2.5H5a1.25 1.25 0 1 1 0-2.5h20ZM25 10a1.25 1.25 0 0 1 .146 2.492L25 12.5H12.5a1.25 1.25 0 0 1-.146-2.492L12.5 10H25Zm0-6.25a1.25 1.25 0 0 1 .146 2.492L25 6.25H5a1.25 1.25 0 0 1-.146-2.492L5 3.75h20Z"
        />
      </g>
      <defs>
        <clipPath id="align-right_svg__a">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { AlignRight };
