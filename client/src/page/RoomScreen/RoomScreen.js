import React, { useEffect, useCallback } from "react";
import "../RoomScreen/RoomScreen.css";
import { roomActions } from "../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";

const RoomsScreen = () => {
  const dispatch = useDispatch();
  const { loading, rooms, error } = useSelector((state) => state.rooms);

  const getRooms = useCallback(async () => {
    try {
      dispatch(roomActions.allRoomsRequest());
      const res = await fetch("http://localhost:5000/api/rooms/allrooms");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(roomActions.allRoomsSuccess(data));
    } catch (error) {
      dispatch(roomActions.allRoomsFail(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          {loading ? (
            <h1>loading....</h1>
          ) : error ? (
            <h1>Error...</h1>
          ) : (
            <div className="col-md-9 mt-2">
              {rooms.map((room, index) => (
                <div className="row bs" key={index}>
                  <div className="col-md-4">
                    <img
                      src={room.imageurls[0]}
                      className="smallimg"
                      alt="room-img"
                    ></img>
                  </div>
                  <div className="col-md-7">
                    <h1>{room.name}</h1>
                    <b>
                      <p>Max Count: {room.maxcount}</p>
                      <p>Phone Number: {room.phonenumber}</p>
                      <p>Type: {room.type}</p>
                    </b>

                    <div style={{ float: "right" }}>
                      <button className="btn btn-outline-warning">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomsScreen;
