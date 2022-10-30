import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const auth = useSelector((state) => state.auth);
  const { user, createAt } = auth;
  return (
    <div className="d-flex justify-content-start rounded">
      <Card>
        <Meta
          avatar={<Avatar>{user}</Avatar>}
          title={user}
          description={`Joined ${moment(createAt).fromNow()}`}
        />
      </Card>
    </div>
  );
};

export default ConnectNav;
