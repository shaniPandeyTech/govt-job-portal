import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";

const JobListCard = () => {
  const cardList = [
    {
      jobType: "Jobs",
      jobList: [
        {
          jobTitle: "Rajasthan Police Constable Online Form 2025 Extended",
          url: "#",
        },
        {
          jobTitle: "Rajasthan Police Constable Telecommunication Online Form",
          url: "#",
        },
        {
          jobTitle: "BSSC Laboratory Assistant Online Form 2025",
          url: "#",
        },
        {
          jobTitle: "South Indian Bank SIB Junior Officer Online Form 2025",
          url: "#",
        },
        {
          jobTitle: "SSC One Time Registration OTR 2025 Aadhar Enabled",
          url: "#",
        },
        {
          jobTitle: "Territorial Army Officer Online Form 2025",
          url: "#",
        },
        {
          jobTitle: "UPSSSC PET 2025 Online Form",
          url: "#",
        },
        {
          jobTitle: "CSIR IITR Junior Stenographer Online Form 2025",
          url: "#",
        },
        {
          jobTitle: "Army 10+2 TES 54 Online Form",
          url: "#",
        },

        {
          jobTitle: "MP High Court Class IV Online Form 2025",
          url: "#",
        },
      ],
    },
    {
      jobType: "Admit Card",
      jobList: [
        {
          jobTitle: "Jute Corp JCI Various Post Admit Card 2025",
          url: "#",
        },
        {
          jobTitle: "UPSSSC Technical Assistant Group C 2024 Mains Exam Date",
          url: "#",
        },
        {
          jobTitle: "UPPSC RO / ARO 2023 Typing Test Font Notice",
          url: "#",
        },
        {
          jobTitle: "Railway RRB NTPC Graduate Level Application Status 2025",
          url: "#",
        },
        {
          jobTitle:
            "Railway RRB Junior Engineer Stage II Re Schedule Exam Notice 2025",
          url: "#",
        },
        {
          jobTitle: "Bihar Civil Court Clerk Mains Admit Card 2025",
          url: "#",
        },
      ],
    },
    {
      jobType: "Results",
      jobList: [
        {
          jobTitle: "Bihar Board BSEB Class 10th Scrutiny Result 2025",
          url: "#",
        },
        {
          jobTitle: "Coast Guard Navik CGEPT 02/2025 Stage I Result 2025",
          url: "#",
        },
        {
          jobTitle: "India Post GDS 3rd Merit List / Result 2025",
          url: "#",
        },
        {
          jobTitle:
            "UPSSSC Technical Assistant Group C 2024 Eligibility Result",
          url: "#",
        },
        {
          jobTitle:
            "UPSSSC Combined Technical Service 2016 PET PST Result 2025",
          url: "#",
        },
        {
          jobTitle: "IDBI Bank Junior Assistant Manager JAM PGDBF Result 2025",
          url: "#",
        },
      ],
    },
  ];

  const sliderSetting = {
    slidesToShow: 3,
    infinite: true,
    arrows: false,
  };
  return (
    <div className={style.jobListMainWrap}>
      <div className={style.innerWrap}>
        {cardList?.map((item, index) => {
          return (
            <div className={style.jobCardWrap} key={`item` + index}>
              <h4>{item.jobType}</h4>
              <ul>
                {item?.jobList?.map((item, index) => {
                  return (
                    <li title={item.jobTitle} key={index}>
                      <a href={item.url}>{item.jobTitle}</a>
                    </li>
                  );
                })}
              </ul>
              <div className={style.viewBtn}>
                <a href={"#"}>{"View All"}</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobListCard;
