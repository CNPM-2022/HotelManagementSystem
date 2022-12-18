import FavoriteRoom from '../models/FavoriteRoom';

const getFavoriteRoomsByUserId = async (req, res) => {
    try {
        const favoriteRooms = await FavoriteRoom.find({
            user: req.userId,
        })
            .populate('rooms', ['roomNumber'])
            .populate('user', ['Name']);
        res.status(200).json({
            success: true,
            message: 'Get favorite rooms successfully',
            data: favoriteRooms,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const addFavoriteRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const favoriteRoom = await FavoriteRoom.findOne({
            user: req.userId,
        });
        if (favoriteRoom) {
            const isExist = favoriteRoom.rooms.find((room) => room.toString() === roomId);
            if (isExist) {
                res.status(400).json({
                    success: false,
                    message: 'Room is already in your favorite list',
                });
            } else {
                favoriteRoom.rooms.push(roomId);
                await favoriteRoom.save();
                res.status(200).json({
                    success: true,
                    message: 'Add favorite room successfully',
                    data: favoriteRoom,
                });
            }
        } else {
            const newFavoriteRoom = new FavoriteRoom({
                user: req.userId,
                rooms: [roomId],
            });
            await newFavoriteRoom.save();
            res.status(200).json({
                success: true,
                message: 'Add favorite room successfully',
                data: newFavoriteRoom,
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export { getFavoriteRoomsByUserId, addFavoriteRoom };
