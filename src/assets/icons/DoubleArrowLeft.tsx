import React from "react";

function DoubleArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.138 5.14a.667.667 0 0 0-.943-.943l-5.333 5.334a.667.667 0 0 0 0 .942l5.333 5.334a.667.667 0 0 0 .943-.943l-4.862-4.862 4.862-4.862Zm-8 0a.667.667 0 0 0-.943-.943L2.862 9.531a.667.667 0 0 0 0 .942l5.333 5.334a.667.667 0 0 0 .943-.943l-4.862-4.862L9.138 5.14Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export { DoubleArrowLeft };
