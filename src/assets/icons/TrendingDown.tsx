import React from "react";

function TrendingDown(props: React.SVGProps<SVGSVGElement>) {
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
        d="M.313 3.646a.5.5 0 0 1 .707 0l4.647 4.647 2.98-2.98a.5.5 0 0 1 .707 0l6.333 6.333a.5.5 0 0 1-.707.708L9 6.374l-2.98 2.98a.5.5 0 0 1-.707 0l-5-5a.5.5 0 0 1 0-.708Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.333 7.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 1 1 0-1h3.5V8a.5.5 0 0 1 .5-.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export { TrendingDown };
