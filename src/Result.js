import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";


import { useState, useEffect } from "react";
const ResultP = () => { 
  

  
  const [datas, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage] = useState(5);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/allStuNames`)
      .then((res) => {
        console.log(res);
        setData(res.data);
           setOriginData(res.data);
           setFilter(res.data);
      })

      .catch((err) => {
        console.log("failed toffetch");
      });
  }, []);

//   const indexofLastPage = currentPage * postPerPage;
//   const indexofFirstPage = indexofLastPage - postPerPage;
//   const currentPostst = datas.slice(indexofFirstPage, indexofLastPage);

//   const paginate = (pageN) => setCurrentPage(pageN);
  const [filter, setFilter] = useState([]);
  
  const [originlData, setOriginData] = useState([]);


 const rows = datas;

     const [page, setPage] = React.useState(0);
     const [rowsPerPage, setRowsPerPage] = React.useState(5);

     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
const [filters, setFilters] = useState({
  name: "",
});

const search = (key, event) => {
  setFilters({ ...filters, [key]: event.target.value });
};
useEffect(() => {
  if (!search) {
    setData(originlData);
  } else {
    console.log(originlData[0], filters);
    setData(
      originlData.filter(
        (i) =>i["name"]?.toLowerCase().includes(filters.name.toLowerCase()) 
      )
    );
  }
}, [filters]);
 
     const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(+event.target.value);
       setPage(0);
     };

  return (
    <div className="con">
      Search With Name
      <input
        className="form-control w-25"
        type="text"
        onChange={(event) => search("name", event)}
        name=""
        id=""
      />
      
      <TableContainer
        style={{ background: "snow", color: "White" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ fontSize: 50 }}>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Degree</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow sx={{ border: 0 }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.Degree}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ResultP;
