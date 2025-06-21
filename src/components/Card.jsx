import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import { deepOrange, green } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import "./card.css";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { deleteLoader } = useSelector((state) => state.users);
  const [load, setLoad] = useState(false);

  const handleDelete = (item) => {
    dispatch(deleteUser(item?.id));
  };

  return (
    <div className="card">
      {item?.image ? (
        <img src={item?.image} alt="Card Image" className="card-image" />
      ) : (
        <div className="card-image">
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: "100%", height: "100%" }}
            variant="square"
          >
            {item?.title?.slice(0, 1)}
          </Avatar>
        </div>
      )}

      <div className="card-content">
        <h3 className="card-title">{item?.title}</h3>
        <p className="card-description">
          {item?.description?.length > 30
            ? item?.description?.slice(0, 32)
            : item?.description}
        </p>
      </div>

      <div className="icon-container">
        <IconButton
          onClick={() => {
            handleDelete(item);
          }}
          loading={load}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;
