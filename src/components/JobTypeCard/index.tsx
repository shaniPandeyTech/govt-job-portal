import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";

const JobTypeCard = () => {
  const cardList = [
    {
      id: 1,
      title: "Delhi Police",
      imgUrl: "/img/ic1.png",
      url: "#",
    },
    {
      id: 2,
      title: "Railway",
      imgUrl: "/img/ic2.png",
      url: "#",
    },
    {
      id: 3,
      title: "Bank",
      imgUrl: "/img/ic3.png",
      url: "#",
    },
    {
      id: 4,
      title: "Indian Post",
      imgUrl: "/img/ic4.png",
      url: "#",
    },
    {
      id: 5,
      title: "CBI",
      imgUrl: "/img/ic5.png",
      url: "#",
    },

    {
      id: 6,
      title: "Indian Army",
      imgUrl: "/img/ic6.png",
      url: "#",
    },
    {
      id: 7,
      title: "ISRO",
      imgUrl: "/img/ic7.png",
      url: "#",
    },
    
    {
      id: 8,
      title: "AIIMS",
      imgUrl: "/img/ic8.png",
      url: "#",
    },
    
  ];

  const sliderSetting = {
    slidesToShow: 7,
    infinite: true,
    arrows: false,
  };
  return (
    <div className={style.jobMainWrap}>
      <CustomSlider customSettings={sliderSetting} className="revenueCardSlide">
        {cardList?.map((item, index) => {
          return (
            <div className={style.jobTypeCardWrap} key={item.title + index}>
              <a href={item.url}>
              <div className={style.iconWrap}>
                <img src={item.imgUrl} alt={item.title} />
              </div>
              <h4>{item.title}</h4>
              </a>
            </div>
          );
        })}
      </CustomSlider>
    </div>
  );
};

export default JobTypeCard;
