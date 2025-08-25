import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";

const NewJobCard = () => {
  const cardList = [
    {
      jobTitle: 'Railway Group D Recruitment 2025',
      dept: 'Indian Railways',
      location: 'All India',
      jobs: 35000,
      lastDate: '30 Jun 2025',
      url: '#'
    },
    {
      jobTitle: "SSC CGL 2025",
      dept: 'Staff Selection Commission',
      location: 'Multiple Locations',
      jobs: 12000,
      lastDate: ' 15 Jul 2025',
      url: '#'
    },
    {
      jobTitle: "UPSC Civil Services 2025",
      dept: 'Union Public Service Commission',
      location: 'All India',
      jobs: 1100,
      lastDate: '15 Sep 2025',
      url: '#'
    }
  ];

  const sliderSetting = {
    slidesToShow: 3,
    infinite: true,
    arrows: false
  
  }
  return (
    <div className={style.newJobMainWrap}>
      <h3 className={style.heading}>Government Jobs </h3>
        <CustomSlider customSettings={sliderSetting} className="newJobCardSlide">
          {cardList?.map((item, index) => {
            return (
              <div className={style.jobCardWrap} key={item.jobTitle + index}>
                <h4>{item.jobTitle }</h4>
                <ul>
                  <li title={item.dept}><strong>Department:</strong> {item.dept}</li>
                  <li><strong>Location:</strong> {item.location}</li>
                  <li><strong>Posts:</strong> {item.jobs}</li>
                  <li><strong>Last Date:</strong> {item.lastDate}</li>
                </ul>
                <div className={style.viewBtn}>
                <a href={item.url}>{'View Details'}</a>
                </div>
              </div>
            );
          })}
        </CustomSlider>
    </div>
  );
};

export default NewJobCard;
