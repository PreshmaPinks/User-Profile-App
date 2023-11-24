import React from "react";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const UserProfile = ({ userData }) => {
  return (
    <Card cover={<img alt="example" src={userData?.picture?.large} />}>
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={`${userData?.name?.title} ${userData?.name?.first} ${userData?.name?.last}`}
      />
    </Card>
  );
};

export default UserProfile;
