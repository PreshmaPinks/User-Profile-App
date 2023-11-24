import React from "react";
import { Avatar, Card, Popover } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const ShowMoreUserInfo = ({ userData }) => {
  return (
    <div>
      <p> Gender: {userData?.gender}</p>
      <p> Email: {userData?.email}</p>
      <p> City: {userData?.location?.city}</p>
      <p> Age: {userData?.dob?.age}</p>
      <p> Phone.No: {userData?.phone}</p>
    </div>
  );
};

const UserProfile = ({ userData, deleteProfile }) => {
  return (
    <Card
      cover={<img alt="example" src={userData?.picture?.large} />}
      actions={[
        <Popover title="Delete Profile" trigger="hover">
          <DeleteOutlined
            key="deleteProfile"
            onClick={() => deleteProfile(userData.id)}
          />
        </Popover>,
        <Popover
          content={<ShowMoreUserInfo userData={userData} />}
          title={`More info on ${userData?.name?.first}`}
          trigger="click"
        >
          More Details
        </Popover>,
      ]}
    >
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
