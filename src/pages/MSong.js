import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridToolbar,
  selectedGridRowsCountSelector,
} from "@mui/x-data-grid";
import { SongData } from "../components/SongData";
import "../styles/msong.css";
//import "./components/nsong.cshtml";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline, Edit, Delete, Cancel } from "@mui/icons-material";

const MSong = () => {
  const [data, setData] = useState(SongData);
  const rows = SongData;
  const setDate = (date) => {
    date.format("DD MM YYYY");
  };
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    //hàm xóa ở đây
    console.log(id);
    setData(data.filter((item) => item.id !== id));
    setOpen(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "songImage",
      headerName: "Ảnh bài hát",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="songListSong" style={{ verticalAlign: "center" }}>
            <img
              className="songListImg"
              src={params.row.songImage}
              alt={params.row.songName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: " songName",
      headerName: "Tên bài hát",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="songListSong" style={{ verticalAlign: "center" }}>
            {params.row.songName}
          </div>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Thời gian",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="songListSong" style={{ verticalAlign: "center" }}>
            {params.row.releaseDate}
          </div>
        );
      },
    },
    {
      field: "representation",
      headerName: "Nghệ sĩ",
      width: 200,

      renderCell: (params) => {
        return (
          <div className="songListArtist">
            {params.row.representation.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <div key={index} item={child}>
                    <Link
                      to={`/artistDetail/${child.artistName}`}
                      state={child}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {child.artistName}
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    },
    {
      field: "country",
      headerName: "Nước",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">
                {params.row.country.map((item, index) => (
                  <div key={index}>{item.countryName}</div>
                ))}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editSong/" + params.row.songName} state={params.row}>
              <button className="songListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="songListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="songList">
      <div className="button">
        <h1 className=" songName">Bài hát</h1>
        <Link to={"/newsong"}>
          <button className="songButtton">
            <span>Thêm mới</span>
          </button>
        </Link>
      </div>
      <Box m="40px 0 0 0">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          rowsPerPageOptions={[5]}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSize={8}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          selectedGridRowsCountSelector={handleDelete}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">{"Xóa bài hát"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa bài hát này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleYes} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MSong;
