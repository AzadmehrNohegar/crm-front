import React from "react";

function Duplicate(props: React.SVGProps<SVGSVGElement>) {
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
        d="M17 5.138h-2.137v-1.75a2.137 2.137 0 0 0-2.138-2.138H3.388A2.137 2.137 0 0 0 1.25 3.388v9.337a2.144 2.144 0 0 0 2.138 2.138h1.75V17a1.756 1.756 0 0 0 1.737 1.75H17A1.756 1.756 0 0 0 18.75 17V6.875A1.756 1.756 0 0 0 17 5.138ZM3.387 13.694a.97.97 0 0 1-.968-.969V3.388a.962.962 0 0 1 .969-.97h9.337a.969.969 0 0 1 .969.97v1.75H6.875a1.756 1.756 0 0 0-1.737 1.737v6.819h-1.75ZM17.581 17a.581.581 0 0 1-.581.581H6.875A.581.581 0 0 1 6.294 17V6.875a.581.581 0 0 1 .581-.581H17a.581.581 0 0 1 .581.581V17Z"
      />
    </svg>
  );
}
export { Duplicate };
