import mongoose, { SchemaTypes } from 'mongoose';

const favoriteRoomSchema = mongoose.Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'users',
        },
        rooms: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'rooms',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const FavoriteRoom = mongoose.model('favoriteRoom', favoriteRoomSchema);

export default FavoriteRoom;
