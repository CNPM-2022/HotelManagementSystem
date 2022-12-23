import { useEffect, useState } from 'react';
import '../RoomScreen/RoomScreen.scss';
import { searchRooms, getAllRoomTypes } from '../../services/apiServices';
import { useParams } from 'react-router';
import SearchContent from './SearchContent';
import { useDispatch, useSelector } from 'react-redux';
import searchSlice from '../../store/searchSlice';
import DateRange from '../../components/DateRange/DateRange';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Search = () => {
    const searchInfor = useSelector((state) => state.search);
    let dateStart = null;
    let dateEnd = null;
    if (searchInfor.dateStart !== '' && searchInfor.dateEnd !== '') {
        dateStart = new Date(searchInfor.dateStart);
        dateEnd = new Date(searchInfor.dateEnd);
    }
    const initalDateRange = [
        {
            startDate: dateStart,
            endDate: dateEnd,
            key: 'selection',
        },
    ];
    const dispatch = useDispatch();
    const params = useParams();
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(parseInt(params.page));
    const [roomType, setRoomType] = useState([]);
    const [dateRange, setDateRange] = useState(initalDateRange);
    const [isShowDateRange, setIsShowDateRange] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleChangeDateRange = (item) => {
        setDateRange([item.selection]);
    };

    const handleSearchButton = () => {
        if (dateRange[0].startDate === null && dateRange[0].endDate === null) {
            toast.error('Vui lòng chọn ngày nhận/trả phòng');
            return;
        }
        dispatch(
            searchSlice.actions.setSearchContent({
                dateStart: dateRange[0].startDate.toString(),
                dateEnd: dateRange[0].endDate.toString(),
                type: document.getElementById('type-room').value,
                price: document.getElementById('price-room').value,
            }),
        );
        setIsChange(!isChange);
    };

    useEffect(() => {
        setLoading(true);
        const infor = {
            type: searchInfor.type,
            price: searchInfor.price,
            rentperDate: searchInfor.dateStart,
            checkOutDate: searchInfor.dateEnd,
        };
        getRoomsBySearch(infor);
        getAllTypeRoom();
        setLoading(false);
        document.documentElement.scrollTop = 500;
    }, [isChange, page]);

    const getRoomsBySearch = async (infor) => {
        try {
            const res = await searchRooms(infor);

            const data = res.data;

            if (res.status !== 200) {
                throw new Error(data.message);
            }

            setRooms(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTypeRoom = async () => {
        const res = await getAllRoomTypes();
        setRoomType(res.data.data);
    };

    const handleChangePage = (page) => {
        setPage(page);
    };

    for (let i = 0; i < document.querySelectorAll('.types').length; i++) {
        if (document.querySelectorAll('.types')[i].value === searchInfor.type) {
            document.querySelectorAll('.types')[i].setAttribute('selected', 'selected');
        }
    }

    const checkAvailable = () => {
        if (searchInfor.dateStart === '' && searchInfor.dateEnd === '') {
            return false;
        } else if (searchInfor.dateStart !== '' && searchInfor.dateEnd !== '') {
            return true;
        }
    };
    return (
        <>
            <div className="breadcrumb-area bg-img bg-overlay jarallax">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content text-center">
                                <h2 className="page-title">Tìm kiếm</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Trang chủ</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="/rooms/1">Phòng</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Tìm kiếm
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
                            <form>
                                <div className="row justify-content-between align-items-end abc">
                                    <div className="col-12 col-md-4 col-lg-4 ">
                                        <div className="form-group ">
                                            <label className="form-label">
                                                <b>Chọn ngày nhận/trả phòng:</b>
                                            </label>
                                            <DateRange
                                                handleChangeDateRange={handleChangeDateRange}
                                                dateRange={dateRange}
                                                isShowDateRange={isShowDateRange}
                                                setIsShowDateRange={setIsShowDateRange}
                                            />
                                        </div>
                                        {/* <label htmlFor="checkIn">Ngày nhận phòng</label>
                                        <input type="date" className="form-control" id="checkIn" name="checkin-date" /> */}
                                    </div>
                                    {/* <div className="col-6 col-md-2 col-lg-3">
                                        <label htmlFor="checkOut">Ngày trả phòng</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="checkOut"
                                            name="checkout-date"
                                        />
                                    </div> */}
                                    <div className="col-4 col-md-1" style={{ width: '150px' }}>
                                        <label htmlFor="type-room">Loại:</label>
                                        <select name="type-room" id="type-room" className="form-control form-select">
                                            <option className="types" value="all">
                                                Tất cả
                                            </option>
                                            {roomType.map((item) => (
                                                <option className="types" key={item._id} value={item.typeOfRooms}>
                                                    {item.typeOfRooms}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-1" style={{ width: '200px' }}>
                                        <label htmlFor="price-room">Giá:</label>

                                        <select
                                            defaultValue={searchInfor.price}
                                            name="price-room"
                                            id="price-room"
                                            className="form-control form-select"
                                        >
                                            <option value="1">Dưới 500k</option>
                                            <option value="2">Từ 500k - 1 triệu</option>
                                            <option value="3">Trên 1 triệu</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <button
                                            type="button"
                                            className="form-control btn roberto-btn w-100"
                                            onClick={handleSearchButton}
                                        >
                                            Tìm kiếm
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
            ) : rooms.results.results.length === 0 || !checkAvailable() ? (
                <div className="text-center my-4">
                    <h4>Không có kết quả nào phù hợp</h4>
                </div>
            ) : (
                <SearchContent roomData={rooms} curPage={page} handleChangePage={handleChangePage} />
            )}
        </>
    );
};

export default Search;
