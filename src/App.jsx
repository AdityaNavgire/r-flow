import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "./redux/userSlice";
import Card from "./components/Card";
import "./App.css";
import Modal from "./components/modal/Modal";
import Button from "@mui/material/Button";
import Spinner from "./components/spinner/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const { loading, data, success } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAdd = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(data, "data");
  }, [data]);
  return (
    <>
      {!loading && data?.length > 0 ? (
        <>
          <div className="button_container">
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                handleAdd();
              }}
            >
              Add Product
            </Button>
          </div>

          <div className="container">
            {data?.map((item, i) => {
              return (
                <>
                  <Card item={item} />
                </>
              );
            })}
          </div>

          {open ? <Modal open={open} setOpen={setOpen} /> : null}
        </>
      ) : loading ? (
        <Spinner />
      ) : (
        <div>
          <h3>No Data present</h3>
        </div>
      )}
    </>
  );
};

export default App;
