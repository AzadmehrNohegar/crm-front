import React from "react";

function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
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
        d="M13.359 3.725c.222.221.242.569.06.813l-.06.07L7.968 10l5.39 5.391c.223.222.243.57.061.814l-.06.07a.625.625 0 0 1-.814.06l-.07-.06-5.834-5.833a.625.625 0 0 1-.06-.814l.06-.07 5.834-5.833a.625.625 0 0 1 .884 0Z"
      />
    </svg>
  );
}

export { ArrowLeft };
