import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { getUser } from "../../services/userServices";
import UserProfile from "../userProfile";
import { INITIAL_RESULT_COUNT } from "../constants";
import { debounce } from "./utils";
import "./index.css";

const Main = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [addtionalProfileCount, setAddtionalProfileCount] = useState(0);

  const getUserData = useCallback(
    async (count) => {
      try {
        const data = await getUser(count);
        setUsers(users ? [...data.results, ...users] : [...data.results]);

        setError(null);
      } catch (e) {
        setError(e);
      }
    },
    [users]
  );

  const debouncedGetUserData = useMemo(
    () => debounce((count) => getUserData(count), 500),
    [getUserData]
  );

  useEffect(() => {
    if (!users) {
      debouncedGetUserData(INITIAL_RESULT_COUNT);
    }
  }, [users, debouncedGetUserData]);

  const renewProfiles = () => {
    setUsers(null);
    setAddtionalProfileCount(0);
  };

  const addProfiles = () => {
    setAddtionalProfileCount(addtionalProfileCount + 1);
    debouncedGetUserData(addtionalProfileCount + 1);
  };

  return (
    <div>
      <Row className="profileHeader">
        <h1>UserApp</h1>
      </Row>
      <Row className="profileContainer">
        <Col xs={24} className="profileActions">
          <Button type="primary" onClick={addProfiles}>
            Add Profile(s)
          </Button>
          <Button type="primary" onClick={renewProfiles}>
            Renew Profiles
          </Button>
        </Col>
        {error && <Col xs={24}>{error}</Col>}
        {users?.map((item, index) => {
          return (
            <Col
              xs={24}
              sm={12}
              md={6}
              className="profileItem"
              key={`${item?.id?.value}-${index}`}
            >
              <UserProfile userData={item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Main;
