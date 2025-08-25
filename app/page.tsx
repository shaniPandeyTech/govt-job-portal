"use client";
import Link from "next/link";
import MainBanner from "@/src/components/LandingPage/Banner";
import dynamic from "next/dynamic";
import AdsCard from "@/src/components/AdsCard";
import JobsChip from "@/src/components/JobsChip";
import { jobChipList } from "@/src/utils/constants";
import JobTypeCard from "@/src/components/JobTypeCard";
import NewJobCard from "@/src/components/NewJobCard";
import JobListCard from "@/src/components/JobListCard";

const RecentJobCard = dynamic(
  () => import("@/src/components/RecentJobCard"),
  { ssr: false }
);


export default function Home() {

  return (
    <>
      <div className="container">
        <div className="main_heagin_wrapp">
          <h2>
            <span>Welcome to No. 1</span> <br />
            Education Portal Sarkari Result 2025
          </h2>
        </div>

        <div className="chipMainWrapp">
          {jobChipList?.map((item, index) => {
            return <JobsChip title={item.title} url={item.url} />;
          })}
        </div>

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <RecentJobCard  />

        <JobTypeCard />

        <JobListCard />

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <NewJobCard />

        <div className="ads_banner_wrapp">
          <AdsCard imgUrl={'img/add_icon2.png'} />
        </div>

      </div>
    </>
  );
}
