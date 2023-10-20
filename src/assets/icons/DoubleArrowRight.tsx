import React from "react";

function DoubleArrowRight(props: React.SVGProps<SVGSVGElement>) {
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
        d="M2.862 14.862a.667.667 0 0 0 .943.943l5.333-5.334a.667.667 0 0 0 0-.942L3.805 4.195a.667.667 0 1 0-.943.943L7.724 10l-4.862 4.862Zm8 0a.667.667 0 1 0 .943.943l5.333-5.334a.667.667 0 0 0 0-.942l-5.333-5.334a.667.667 0 1 0-.943.943L15.724 10l-4.862 4.862Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export { DoubleArrowRight };
