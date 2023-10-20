import React from "react";

function Check(props: React.SVGProps<SVGSVGElement>) {
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
        d="M17.108 4.975a.625.625 0 0 1 0 .884l-9.166 9.167a.625.625 0 0 1-.884 0L2.89 10.859a.625.625 0 1 1 .884-.884L7.5 13.7l8.724-8.725a.625.625 0 0 1 .884 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export { Check };
