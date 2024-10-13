import React, { useEffect, useState } from "react";
import "../assets/dashboard.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Dashboard = () => {
  const [projectcounts, SetProjectCounts] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/projects/departmentcount").then((respnse) => {
      return respnse.json().then((chartData) => {
        setChartData(chartData);
      });
    });
  }, []);

  // console.log(chartData);

  const getprojectcount = async () => {
    try {
      fetch("http://localhost:5500/projects/counts").then((response) => {
        return response.json().then((projectcounts) => {
          SetProjectCounts(projectcounts);
        });
      });
    } catch (error) {}
  };
  useEffect(() => {
    getprojectcount();
  }, []);

  const strpercent = Math.round(
    (chartData.totalstrclose / chartData.totalstrcount) * 100
  );
  const finpercent = Math.round(
    (chartData.totalfinclose / chartData.totalfincount) * 100
  );
  const qulitypercent = Math.round(
    (chartData.totalqulityclose / chartData.totalqulitycount) * 100
  );
  const maintanpercent = Math.round(
    (chartData.totalmaintanclose / chartData.totalmaintancount) * 100
  );
  const hrpercent = Math.round(
    (chartData.totalHRclose / chartData.totalHRcount) * 100
  );

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Department Wise Total Vs Closed",
    },
    xAxis: {
      categories: [
        `${strpercent} %  <br> STR`,
        `${finpercent}  % <br> FIN`,
        `${qulitypercent}  % <br> QLT`,
        `${maintanpercent} % <br> MAN`,
        `${hrpercent} % <br> HR`,
      ],
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      categories: 0,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    series: [
      {
        name: "Total",
        data: [
          chartData.totalstrcount,
          chartData.totalfincount,
          chartData.totalqulitycount,
          chartData.totalmaintancount,
          chartData.totalHRcount,
        ],
      },
      {
        name: "Closed",
        data: [
          chartData.totalstrclose,
          chartData.totalfinclose,
          chartData.totalqulityclose,
          chartData.totalmaintanclose,
          chartData.totalHRclose,
        ],
      },
    ],
  };
  return (
    <div>
      <div className="containerdash">
        <div
          className="d-flex p-3 bg-secondary text-white"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div className="card" style={{ width: "18rm" }}>
            <div className="card-body">
              <h6>Total Project</h6>
              <h3>{projectcounts.totalCount}</h3>
            </div>
          </div>
          <div className="card" style={{ width: "18rm" }}>
            <div className="card-body">
              <h6>Closed</h6>
              <h3>{projectcounts.closedCount}</h3>
            </div>
          </div>
          <div className="card" style={{ width: "18rm" }}>
            <div className="card-body">
              <h6>Running</h6>
              <h3>{projectcounts.runningCount}</h3>
            </div>
          </div>
          <div className="card" style={{ width: "18rm" }}>
            <div className="card-body">
              <h6>Closuer Dealy</h6>
              <h3>{projectcounts.runningAndEndDateCount}</h3>
            </div>
          </div>
          <div className="card" style={{ width: "18rm" }}>
            <div className="card-body">
              <h6>Cancelled</h6>
              <h3>{projectcounts.cancelledCount}</h3>
            </div>
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
