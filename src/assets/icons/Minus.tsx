import React from "react";

function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.727 11.273h16.546a.727.727 0 1 1 0 1.454H3.727a.727.727 0 0 1 0-1.454Z"
      />
    </svg>
  );
}

export { Minus };
