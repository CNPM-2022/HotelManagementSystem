import { Fragment, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import '../RoomScreen/RoomScreen.scss';

function SearchContent(props) {
    const params = useParams();
    const navigate = useNavigate();
    const pageRef = useRef();

    useEffect(() => {
        document.querySelectorAll('.page').forEach((page) => {
            if (parseInt(page.childNodes[0].innerText) === props.curPage) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        if (props.curPage === numberOfPage) {
            document.getElementById('next-btn').classList.add('disabled');
        } else {
            document.getElementById('next-btn').classList.remove('disabled');
        }
        if (props.curPage === 1) {
            document.getElementById('pre-btn').classList.add('disabled');
        } else {
            document.getElementById('pre-btn').classList.remove('disabled');
        }
        //document.documentElement.scrollTop = 500
    }, [props.curPage]);

    const numberOfPage = Math.ceil(props.roomData.lenghtOfPage / 5);
    let listPage = [];
    for (let i = 1; i <= numberOfPage; i++) {
        listPage.push(i);
    }
    const page = params.page;
    const handleChangePage = (e) => {
        props.handleChangePage(parseInt(e.target.innerText));
        document.documentElement.scrollTop = 500;
    };

    const handleNextPage = (e) => {
        if (props.curPage < numberOfPage) {
            props.handleChangePage(props.curPage + 1);
            navigate(`/rooms/${props.curPage + 1}`);
        }
        document.documentElement.scrollTop = 500;
    };

    const handlePrePage = (e) => {
        if (props.curPage > 1) {
            props.handleChangePage(props.curPage - 1);
            navigate(`/rooms/${props.curPage - 1}`);
        }
        document.documentElement.scrollTop = 500;
    };

    let start = 0;
    for (let i = 1; i < props.curPage; i++) {
        start += 5;
    }
    return (
        <div className="roberto-rooms-area mt-4" id="cc">
            <div className="container">
                <div className="row ">
                    <div className="col-12">
                        {props.roomData.results.results.slice(start, start + 5).map((room) => (
                            <Fragment key={room._id}>
                                <div
                                    className="single-room-area d-flex align-items-center mb-5 justify-content-center "
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="center-bottom"
                                >
                                    <div className="room-thumbnail">
                                        <img src={`http://localhost:5000/${room.imageUrls[0].filePath}`} alt="" />
                                    </div>

                                    <div className="room-content">
                                        <h2>Phòng #{room.roomNumber}</h2>
                                        <h4>
                                            {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ{' '}
                                            <span>/ Ngày</span>
                                        </h4>
                                        <div className="room-feature">
                                            <h6>
                                                Loại: <span>{room.type}</span>
                                            </h6>
                                            <h6>
                                                Sức chứa: <span>Tối đa {room.maxCount} người</span>
                                            </h6>
                                            <h6>
                                                Dịch vụ: <span>{room.note}</span>
                                            </h6>
                                        </div>
                                        <Link to={`/room/${room._id}`} className="btn view-detail-btn">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                                        </Link>
                                    </div>
                                </div>
                                <hr className="mt-0 mb-4" />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <nav
                className="roberto-pagination d-flex justify-content-center"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
                <ul className="pagination pagination-allroom" ref={pageRef}>
                    <li className="page-item" id="pre-btn">
                        <div className="page-link" onClick={handlePrePage}>
                            <i className="fa fa-angle-left"></i>Trước{' '}
                        </div>
                    </li>
                    {listPage.map((page) => (
                        <li className="page-item page" key={page}>
                            <NavLink to={`/search/${page}`} className="page-link" onClick={handleChangePage}>
                                {page}
                            </NavLink>
                        </li>
                    ))}
                    <li className="page-item" id="next-btn">
                        <div className="page-link" onClick={handleNextPage}>
                            Sau <i className="fa fa-angle-right"></i>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SearchContent;
