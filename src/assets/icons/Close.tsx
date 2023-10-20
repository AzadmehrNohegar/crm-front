import React from "react";

function Close(props: React.SVGProps<SVGSVGElement>) {
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
        d="M15.67 14.582 4.982 3.894a.775.775 0 0 0-1.097 1.097l10.689 10.688a.775.775 0 1 0 1.096-1.097Z"
      />
      <path
        fill="currentColor"
        d="M4.981 15.664 15.669 4.975a.775.775 0 1 0-1.096-1.097L3.884 14.567a.775.775 0 1 0 1.097 1.097Z"
      />
    </svg>
  );
}
export { Close };
