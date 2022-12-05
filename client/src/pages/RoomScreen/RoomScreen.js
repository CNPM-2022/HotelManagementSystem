import { useEffect, useState, useRef } from 'react';
import './RoomScreen.scss';
import { getRoomsByPage } from '../../services/apiServices';
import AllRoom from './AllRoom';

const RoomsScreen = () => {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getRooms(page);
        setLoading(false);
    }, [page]);

    const getRooms = async (page) => {
        try {
            const res = await getRoomsByPage(page);
            const data = res.data;

            if (res.status !== 200) {
                throw new Error(data.message);
            }

            setRooms(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
    };

    return (
        <>
            <div className="breadcrumb-area bg-img bg-overlay jarallax">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content text-center">
                                <h2 className="page-title">Our Room</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Room
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="roberto-about-area section-padding-100-0">
                <div className="hotel-search-form-area" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                    <div className="container-fluid">
                        <div className="hotel-search-form">
                            <form action="#" method="post">
                                <div className="row justify-content-between align-items-end">
                                    <div className="col-6 col-md-2 col-lg-3">
                                        <label htmlFor="checkIn">Check In</label>
                                        <input type="date" className="form-control" id="checkIn" name="checkin-date" />
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-3">
                                        <label htmlFor="checkOut">Check Out</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="checkOut"
                                            name="checkout-date"
                                        />
                                    </div>
                                    <div className="col-4 col-md-1">
                                        <label htmlFor="room">Type</label>
                                        <select name="room" id="room" className="form-control form-select">
                                            <option value="all">All</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-1">
                                        <label htmlFor="number">Number</label>
                                        <input
                                            type="text"
                                            className="form-control i2"
                                            placeholder="Ex: 123"
                                            name="number"
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <button type="submit" className="form-control btn roberto-btn w-100">
                                            Check Availability
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {loading || rooms.results === undefined ? (
                <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <AllRoom roomData={rooms} curPage={page} handleChangePage={handleChangePage} />
            )}
        </>
    );
};

export default RoomsScreen;
