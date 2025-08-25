import React from "react";
import style from "./index.module.scss";

type JobsChipType = {
  title: string;
  url: string;
};
const JobsChip = ({ title, url }: JobsChipType) => {
  return (
    <div className={style.chipWrapp}>
      <a href={url || "#"}>
        <p>{title || "UKPSC Pre Online Form 2025"}</p>
      </a>
    </div>
  );
};

export default JobsChip;
