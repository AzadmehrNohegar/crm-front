import { CSSProperties } from "react";

interface IRadialProgress {
  progress: number;
  max: number;
}

function RadialProgress({ progress, max }: IRadialProgress) {
  return (
    <div
      className="radial-progress text-success"
      style={
        {
          "--size": "5rem",
          "--thickness": "4px",
          "--value": (progress / max) * 100,
        } as CSSProperties
      }
    >
      <span className="flex items-center text-sm gap-x-1">
        <span>{progress}</span>
        <span>ثانیه</span>
      </span>
    </div>
  );
}

export { RadialProgress };
