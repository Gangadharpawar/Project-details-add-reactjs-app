import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import "../assets/ProjectList.css";
const ProjectList = () => {
  const [data, SetData] = useState([]);
  const [search, setSearch] = useState("");
  // const [filterdata, SetFilterdata] = useState([]);

  const [projectStatus, SetProjectStatus] = useState();

  const HandelStatus = async (id, value) => {
    try {
      let newstatus = "";
      value === "Start"
        ? (newstatus = "Running")
        : value === "Close"
        ? (newstatus = "Closed")
        : (newstatus = "Cancelled");

      await fetch(`http://localhost:5500/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newstatus }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            getproject();
            alert("Status Updated Successfully");
          }
        });
      console.log("id=", id, "newstatus=", newstatus);
    } catch (error) {
      console.log("failed to send status ", error);
    }
  };

  const getproject = async () => {
    await fetch("http://localhost:5500/projects")
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        SetData(data);
        // SetFilterdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      name: " Project Name",
      selector: (row) => row.projectname,
      sortable: true,
    },
    {
      name: " Resone",
      selector: (row) => row.resone,
      sortable: true,
    },
    {
      name: " Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Division",
      selector: (row) => row.division,
      sortable: true,
    },
    {
      name: " Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: " Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: " Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: " Start Date",
      selector: (row) => row.pstartdate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.penddate,
      sortable: true,
    },
    {
      name: " Location",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Start",
      cell: (row) => (
        <button
          className="btn btn-info btn-sm"
          value={projectStatus}
          onChange={(e) => {
            SetProjectStatus(e.target.value);
          }}
          onClick={(e) => HandelStatus(row._id, (e.target.value = "Start"))}
        >
          Start
        </button>
      ),
    },
    {
      name: "Close",
      cell: (row) => (
        <button
          className="btn btn-success btn-sm"
          onClick={(e) => HandelStatus(row._id, (e.target.value = "Close"))}
        >
          Close
        </button>
      ),
    },
    {
      name: "Cancel",
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={(e) => HandelStatus(row._id, (e.target.value = "Cancel"))}
        >
          Cancel
        </button>
      ),
    },
  ];
  useEffect(() => {
    getproject();
  }, []);
  // useEffect(() => {
  //   const result = data.filter((item) => {
  //     return item.projectname.toLowerCase().match(search.toLowerCase());
  //   });
  //   SetFilterdata(result);
  // }, [search]);

  const filteredItems = data.filter(
    (item) =>
      (item.projectname &&
        item.projectname.toLowerCase().includes(search.toLowerCase())) ||
      (item.resone &&
        item.resone.toLowerCase().includes(search.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(search.toLowerCase())) ||
      (item.division &&
        item.division.toLowerCase().includes(search.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(search.toLowerCase())) ||
      (item.priority &&
        item.priority.toLowerCase().includes(search.toLowerCase())) ||
      (item.department &&
        item.department.toLowerCase().includes(search.toLowerCase())) ||
      (item.pstartdate &&
        item.pstartdate.toLowerCase().includes(search.toLowerCase())) ||
      (item.penddate &&
        item.penddate.toLowerCase().includes(search.toLowerCase())) ||
      (item.Location &&
        item.Location.toLowerCase().includes(search.toLowerCase())) ||
      (item.Status && item.Status.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="containerlist">
        <div style={{ display: "flow-root", marginTop: "8px" }}>
          <DataTable
            title="Project list"
            columns={columns}
            data={filteredItems}
            pagination
            fixedHeader
            // fixedHeaderScrollHeight="400px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions={<button className="btn btn-sm btn-info">Export</button>}
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search "
                className="w-25 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="right"
          ></DataTable>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
