import React from "react";
import AdsCard from "../AdsCard";
import NewJobCard from "../NewJobCard";
import style from "./index.module.scss";

const JobDetailsPage = () => {
  const jobSummaryData = [
    {
      label: "Name of Post:",
      desc: "Bank of Baroda BOB Office Assistant (Peon) Recruitment 2025 Apply Online for 500 Post",
    },
    {
      label: "Post Date / Update:",
      desc: "03 May 2025 | 01:02 AM",
    },
    {
      label: "Short Information :",
      desc: "Bank of Baroda BOB has relased Office Assistant (Peon) Recruitment 2025. Those candidates who are interested in this Office Assistant (Peon) recruitment can Apply Online from 03/05/2025 to 23/05/2025. BOB Office Assistant (Peon) Read the notification for recruitment eligibility, post information, selection procedure, age limit, pay scale and all other information.",
    },
  ];

  const jobDetails = {
    jobTitle: "Bank of Baroda BOB Office Assistant (Peon) Recruitment 2025",
    subtitle: "BOB Peon Exam 2025 :  Short Details of Notification",
    dept: "Bank of Baroda (BOB) ",
    impDates: {
      regStart: "03/05/2025",
      lastDate: "23/05/2025",
      lastPaymentDate: "23/05/2025",
      examDate: "As per Schedule",
      ageOnDate: " 01/05/2025",
      admitCardAvail: "Before Exam",
    },
    fees: [
      {
        category: "General / OBC / EWS : ",
        amt: "600",
      },
      {
        category: "SC / ST : ",
        amt: "100",
      },
      {
        category: "PH (Divyang) : ",
        amt: "100",
      },
      {
        category: "All Category Women Candidates : ",
        amt: "100",
      },
      {
        category:
          "Pay the Exam Fees Through Debit Card / Credit Card / Net Banking Only. ",
        amt: "",
      },
    ],
  };

  const importantDates = jobDetails?.impDates;
  return (
    <div className={style.detailsMainWrapp}>
      <div className="container">
        <div className={style.jobSummaryWrap}>
          <table>
            {jobSummaryData?.map((item, index) => {
              const { label, desc } = item;
              return (
                <tr key={`row${index}`}>
                  <td>
                    <h4>{label}</h4>
                  </td>
                  <td>
                    <p>{desc}</p>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <div className={style.jobBodyInfoWrap}>
          <table>
            <tr>
                <td colSpan={2}>
              <div className={style.headingWrapp}>
                <h3>{jobDetails?.dept}</h3>
                <h3>{jobDetails?.jobTitle}</h3>
                <h3>{jobDetails?.subtitle}</h3>
              </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="impWrapp">
                  <p>Important Dates</p>
                </div>
                <ul>
                  <li>
                    Application Begin : 
                    <strong>{importantDates?.regStart}</strong>
                  </li>
                  <li>
                    Last Date for Apply Online : 
                    <strong>
                      <span className="primary">
                        {importantDates?.lastDate}
                      </span>
                    </strong>
                  </li>
                  <li>
                    Last Date Pay Exam Fee : :{" "}
                    <strong>{importantDates?.lastPaymentDate}</strong>
                  </li>
                  <li>
                    Exam Date :  <strong>{importantDates?.examDate}</strong>
                  </li>
                  <li>
                    Admit Card Available :{" "}
                    <strong>{importantDates?.admitCardAvail}</strong>
                  </li>
                </ul>
              </td>
              <td>
                <div className="feesWrapp">
                  <p>Application Fee</p>
                </div>
                <ul>
                  {jobDetails?.fees?.map((item, index) => {
                    const { category, amt } = item;
                    return (
                      <li>
                        {category} {amt || ""}
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <div className={style.ageWrapp}>
                        <h3>{jobDetails?.jobTitle} <br/>
                        <span>Age Limit as on {importantDates?.ageOnDate}</span></h3>
                    </div>
                </td>
            </tr>
          </table>
        </div>

        <NewJobCard />

        <div className="ads_banner_wrapp">
          <AdsCard imgUrl={"img/add_icon2.png"} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
