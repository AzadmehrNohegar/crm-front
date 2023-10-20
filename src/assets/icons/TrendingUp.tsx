import React from "react";

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.687 3.646a.5.5 0 0 1 0 .708l-6.333 6.333a.5.5 0 0 1-.708 0l-2.98-2.98-4.646 4.647a.5.5 0 0 1-.707-.708l5-5a.5.5 0 0 1 .707 0L9 9.626l5.98-5.98a.5.5 0 0 1 .707 0Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.833 4a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0V4.5h-3.5a.5.5 0 0 1-.5-.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export { TrendingUp };
