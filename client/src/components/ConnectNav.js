import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <div className="d-flex justify-content-start rounded">
      <Card>
        <Meta
          avatar={<Avatar>{user.username}</Avatar>}
          title={user.username}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
    </div>
  );
};

export default ConnectNav;
