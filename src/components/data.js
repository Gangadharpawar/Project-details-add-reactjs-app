import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, SetData] = useState([]);
  const itemPerpage = 3;
  useEffect(() => {
    fetch("http://localhost:5500/projects")
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        SetData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const TotalPages = Math.ceil(data.length / itemPerpage);
  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemPerpage;
  const currentData = data.slice(startIndex, startIndex + itemPerpage);
  const gotoNextpage = () => {
    setCurrentPage((page) => Math.min(page + 1, TotalPages));
  };
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Project Name</th>
              <th>Resone</th>
              <th>Type</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td> {item._id} </td>
                <td>{item.projectname}</td>
                <td>{item.resone}</td>
                <td>{item.type}</td>
                <td>{item.division}</td>
                <td>{item.category}</td>
                <td>{item.priority}</td>
                <td>{item.department}</td>
                <td>{item.pstartdate}</td>
                <td>{item.penddate}</td>
                <td>{item.Location}</td>
                <td>{item.Status}</td>
                <td>{"Start"}</td>
                <td>{"Close"}</td>
                <td>{"Cancel"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <div className="pagination justify-content-center">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: TotalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={gotoNextpage} disabled={currentPage === TotalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
