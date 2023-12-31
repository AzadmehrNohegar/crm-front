import React from "react";

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="none"
      {...props}
    >
      <path
        fill="#4D3DDB"
        d="m17.625 39.898 7.305-3.434c.793-.372.782-1.523-.017-1.88l-7.217-3.228c-.963-.43-1.855.731-1.21 1.577l1.49 1.955c.278.365.284.873.015 1.244l-1.608 2.217c-.623.86.29 1.997 1.242 1.55Z"
      />
      <path
        fill="#D7D4F7"
        d="m23.28.1-7.304 3.43c-.794.372-.783 1.52.017 1.878l7.216 3.222c.964.43 1.855-.73 1.21-1.574l-1.49-1.952a1.043 1.043 0 0 1-.014-1.243l1.608-2.214c.622-.857-.29-1.994-1.243-1.546Z"
      />
      <path
        fill="#6153DF"
        d="m32.406 36.8 2.777-7.672c.302-.833-.505-1.638-1.32-1.316l-7.346 2.904c-.98.388-.803 1.849.24 1.983l2.413.31c.45.058.808.413.876.87l.405 2.72c.156 1.054 1.593 1.202 1.955.202Z"
      />
      <path
        fill="#D7D4F7"
        d="M8.507 3.195 5.73 10.868c-.302.833.505 1.638 1.32 1.316l7.346-2.904c.98-.388.803-1.849-.24-1.983l-2.413-.31a1.022 1.022 0 0 1-.876-.869l-.405-2.72c-.156-1.055-1.593-1.203-1.955-.203Z"
      />
      <path
        fill="#2BD4CE"
        d="m3.957 31.321 6.576 4.712c.714.511 1.688-.072 1.593-.955l-.86-7.96c-.115-1.063-1.55-1.268-1.948-.278l-.92 2.287a1.013 1.013 0 0 1-1.052.635l-2.691-.307c-1.043-.12-1.556 1.252-.698 1.866Z"
      />
      <path
        fill="#B0A9EF"
        d="M36.956 8.673 30.38 3.96c-.714-.511-1.688.073-1.593.955l.86 7.96c.115 1.064 1.55 1.268 1.948.278l.92-2.287a1.013 1.013 0 0 1 1.052-.635l2.691.307c1.043.12 1.556-1.252.698-1.866Z"
      />
      <path
        fill="#887EE7"
        d="m39.901 23.894-3.375-7.42a1.007 1.007 0 0 0-1.849.017l-3.171 7.331c-.424.98.718 1.885 1.55 1.23l1.92-1.514a1.001 1.001 0 0 1 1.224-.015l2.179 1.634c.844.632 1.962-.295 1.522-1.263Z"
      />
      <path
        fill="#27BEB9"
        d="m.1 18.033 3.374 7.421a1.007 1.007 0 0 0 1.85-.017l3.17-7.332c.424-.979-.718-1.884-1.549-1.23L5.024 18.39a1.001 1.001 0 0 1-1.223.015L1.62 16.77C.779 16.138-.34 17.065.1 18.033Z"
      />
    </svg>
  );
}

export { Logo };
