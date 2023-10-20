import React from "react";

function Plus(props: React.SVGProps<SVGSVGElement>) {
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
        d="M21 12a.727.727 0 0 0-.727-.727h-7.546V3.727a.727.727 0 0 0-1.454 0v7.546H3.727a.727.727 0 0 0 0 1.454h7.546v7.546a.727.727 0 1 0 1.454 0v-7.546h7.546A.727.727 0 0 0 21 12Z"
      />
    </svg>
  );
}

export { Plus };
