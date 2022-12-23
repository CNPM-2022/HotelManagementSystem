import FormatPrice from '../../../../components/FormatPrice/FormatPrice';
import { useNavigate } from 'react-router-dom';
import { deleteFavoriteRoom } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

export const FavoriteRoomsTable = ({ listFavoriteRooms, change }) => {
    const navigate = useNavigate();
    const handleDeleteFavoriteRoom = async (id) => {
        await deleteFavoriteRoom(id).then((res) => {
            if (res.data.success) {
                change(true);
                toast.success(res.data.message);
                navigate('/user/favorite');
            } else {
                toast.error(res.data.message);
            }
        });
    };
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">STT</th>
                        <th scope="col">Phòng</th>
                        <th scope="col">Số khách tối đa</th>
                        <th scope="col">Đơn Giá</th>
                        <th scope="col">Loại Phòng</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listFavoriteRooms && listFavoriteRooms.length > 0 ? (
                        listFavoriteRooms.map((room, index) => (
                            <tr key={room._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{room.roomNumber}</td>
                                <td className="fw-bold">{room.maxCount}</td>
                                <td>
                                    <p>{room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ</p>
                                </td>
                                <td>{room.type}</td>
                                <td className="d-flex">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteFavoriteRoom(room._id)}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        className="btn btn-success ms-4"
                                        onClick={() => navigate(`/room/${room._id}`)}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Danh sách yêu thích rỗng
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};
