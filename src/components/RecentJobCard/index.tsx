import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";

const RecentJobCard = () => {
  const cardList = [
    {
      id: 1,
      title: "Railway Assistant Loco Pilot (ALP) 2025",
      ctaLabel: 'Apply Now',
      desc: 'Apply Last Date : 19/05/2025',
      url: '#'
    },
    {
      id: 2,
      title: "Bihar Civil Court Clerk Mains Admit Card 2025",
      ctaLabel: 'Download',
      desc: 'Admit Card Available:  14/05/2025',
      url: '#'
    },
    {
      id: 3,
      title: "UPSSSC Combined Technical Service 2016 PET PST Result 2025",
      ctaLabel: 'View Result',
      desc: 'Exam Result: 17/05/2025',
      url: '#'
    }
  ];

  const sliderSetting = {
    slidesToShow: 3,
    infinite: true,
    arrows: false
  
  }
  return (
    <div className={style.jobMainWrap}>
      <div className={style.innerWrap}>
        <CustomSlider customSettings={sliderSetting} className="revenueCardSlide">
          {cardList?.map((item, index) => {
            return (
              <div className={style.jobCardWrap} key={item.title + index}>
                <div className={style.iconWrap}>
                  <img src={'/img/new_icon.png'} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
                <a href={item.url}>{item.ctaLabel}</a>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </CustomSlider>
      </div>
    </div>
  );
};

export default RecentJobCard;
