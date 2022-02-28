import React from "react";
import style from "./Progress.module.scss";

type Props = {
  progress: number;
  total: number;
};
export default function ProgressBar({ progress, total }: Props) {
  return (
    <div className={style.container}>
      <div
        className={style.progress}
        style={{ width: `${(progress / total) * 100}%` }}
      >
        <h3>{((progress / total) * 100).toFixed(1)}%</h3>
      </div>
    </div>
  );
}
