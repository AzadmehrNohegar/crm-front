import React from "react";

function Support(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <g clipPath="url(#support_svg__a)">
        <path
          fill="#005EFF"
          d="M9.75 20.001a2.749 2.749 0 0 1 5.127-1.382c2.09-.922 2.873-2.369 2.873-5.119v-3c0-3.992-2.251-6.75-5.75-6.75S6.25 6.509 6.25 10.5V14a.751.751 0 0 1-.75.75h-1a2.753 2.753 0 0 1-2.75-2.749v-1A2.754 2.754 0 0 1 4.5 8.25h.478c.757-3.571 3.348-6 7.022-6 3.674 0 6.264 2.429 7.021 6h.478a2.754 2.754 0 0 1 2.75 2.75v1a2.753 2.753 0 0 1-2.75 2.75h-.309a5.85 5.85 0 0 1-3.94 5.34 2.75 2.75 0 0 1-5.5-.089Zm1.5 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm8-6.75h.249a1.25 1.25 0 0 0 1.251-1.25v-1A1.25 1.25 0 0 0 19.5 9.75h-.25v3.501Zm-16-2.25v1A1.25 1.25 0 0 0 4.5 13.25h.25v-3.5H4.5a1.25 1.25 0 0 0-1.25 1.251Z"
        />
      </g>
      <defs>
        <clipPath id="support_svg__a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { Support };
