import React from "react";
import style from "./footer.module.scss";
import { footer_list, footer_other_list } from "@/src/utils/constants";
const Footer = () => {
  return (
    <footer className={style.footerWrap}>
      <div className="container">
        <div className={style.footer_innner}>
          <div className={style.row_wrapp}>
            <div className={style.first_item_wrapp}>
              <ul>
                {footer_list?.map((item, index) => {
                  return (
                    <li key={`footr_link${index}`}>
                      <a href={item?.path}>{item?.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={style.last_item_wrapp}>
                <ul>
                {footer_other_list?.map((item, index) => {
                  return (
                    <li key={`footr_link${index}`}>
                      <a href={item?.path}>{item?.name}</a>
                    </li>
                  );
                })}
                </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={style.copy_wrapp}>
        <p>Copyright@2025 Sarkari result</p>
      </div>
    </footer>
  );
};

export default Footer;
