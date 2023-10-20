import React from "react";

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
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
        d="M6.641 16.275a.625.625 0 0 1-.06-.814l.06-.07L12.033 10 6.64 4.608a.625.625 0 0 1-.06-.813l.06-.07a.625.625 0 0 1 .814-.061l.07.06 5.834 5.834c.222.222.242.569.06.813l-.06.07-5.834 5.834a.625.625 0 0 1-.884 0Z"
      />
    </svg>
  );
}

export { ArrowRight };
