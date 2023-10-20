import React from "react";

function Mobile(props: React.SVGProps<SVGSVGElement>) {
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
        d="M14 2.25h-4A4.756 4.756 0 0 0 5.25 7v10A4.756 4.756 0 0 0 10 21.75h4A4.756 4.756 0 0 0 18.75 17V7A4.756 4.756 0 0 0 14 2.25ZM17.25 17A3.254 3.254 0 0 1 14 20.25h-4A3.254 3.254 0 0 1 6.75 17V7A3.254 3.254 0 0 1 10 3.75h4A3.254 3.254 0 0 1 17.25 7v10Zm-3.5 1a.75.75 0 0 1-.75.75h-2a.75.75 0 1 1 0-1.5h2a.75.75 0 0 1 .75.75Z"
      />
    </svg>
  );
}

export { Mobile };
