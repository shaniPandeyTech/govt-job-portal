import React from 'react';
import style from './index.module.scss'

const AdsCard = ({imgUrl}: any) => {
  return (
    <div className={style.adsBannerWrapp}>
        <img src={imgUrl || "img/add_icon.png"} alt="" />
    </div>
  )
}

export default AdsCard