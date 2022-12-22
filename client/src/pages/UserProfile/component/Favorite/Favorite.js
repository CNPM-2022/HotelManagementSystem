import { getFavoriteRooms } from '../../../../services/apiServices';
import { useEffect, useState } from 'react';
import { FavoriteRoomsTable } from './FavoriteRoomsTable';

function Favorite() {
    const [favoriteRooms, setFavoriteRooms] = useState([]);
    const [change, setChange] = useState(false);

    const getData = async () => {
        const res = await getFavoriteRooms();
        return res.data;
    };

    useEffect(() => {
        getData().then((res) => {
            setFavoriteRooms(res.data[0]);
        });
        setChange(false);
    }, [change]);

    return (
        <div className="container-xl px-4">
            <nav className="nav nav-borders nav-borders-handle">
                <h2 className="fs-bolder text-danger">
                    Danh sách yêu thích<i className="fa-solid fa-heart ms-2"></i>
                </h2>
            </nav>
            <hr className="mt-0 mb-4 " />
            <FavoriteRoomsTable listFavoriteRooms={favoriteRooms?.rooms} change={setChange} />
        </div>
    );
}

export default Favorite;
