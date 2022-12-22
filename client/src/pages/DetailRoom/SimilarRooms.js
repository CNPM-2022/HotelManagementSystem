import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRoomByType } from '../../services/apiServices';

const SimilarRooms = (props) => {
    const params = useParams();
    const [listSimilarRooom, setListSimilarRoom] = useState([])
    const getSimilarRooms = async (type) => {
        const res = await getRoomByType(type);
        setListSimilarRoom(res.data.data.filter(room => room._id !== params.id));
    }



    useEffect(() => {
        getSimilarRooms(props.type)
    }, [params.id]);
    return (
        <div>
            {
                listSimilarRooom.slice(0, 3).map(room => (
                    <Fragment key={room._id}>
                        <div className="single-similar-room-area d-flex align-items-center mb-3 justify-content-arround ">
                            <div className="similar-room-thumbnail">
                                <img src={`http://localhost:5000/${room.imageUrls[0].filePath}`} alt="" />
                            </div>

                            <div className="similar-room-content">
                                <h5><b>Phòng #{room.roomNumber}</b></h5>
                                <div>{room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ <span>/ Ngày</span></div>
                                <Link to={`/room/${room._id}`} className="btn view-detail-btn"
                                >Chi tiết
                                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i
                                    ></Link>
                            </div>
                        </div>
                        <hr className="mt-2 mb-4" />
                    </Fragment>
                ))
            }
        </div>
    )


}

export default SimilarRooms