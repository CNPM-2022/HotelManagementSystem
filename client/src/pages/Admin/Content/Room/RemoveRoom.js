import Select from 'react-select';

function RemoveRoom({ listUsers, listRooms }) {
    return (
        <div className="assign-room-container">
            <div className="row">
                <div className="col col-6">
                    <span>Choose User:</span>
                    <Select options={listUsers} />
                </div>
                <div className="col col-6">
                    <span>Choose Room:</span>
                    <Select options={listRooms} />
                </div>
                <div className="mt-3">
                    <button className="btn btn-primary">Remove</button>
                </div>
            </div>
        </div>
    );
}

export default RemoveRoom;
