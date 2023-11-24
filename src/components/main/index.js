import React, { useState, useCallback, useEffect } from "react";
import { Row, Col } from "antd";
import { getUser } from "../../services/userServices";
import UserProfile from "../userProfile";
import { INITIAL_RESULT_COUNT } from "../constants";

const Main = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [addtionalProfileCount, setAddtionalProfileCount] = useState(0);

  const getUserData = useCallback(async (count) => {
    try {
      const data = await getUser(count);
      setUsers((users) =>
        users ? [...users, ...data.results] : [...data.results]
      );
      setError(null);
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    if (addtionalProfileCount > 0) {
      const debounceTimer = setTimeout(() => {
        getUserData(addtionalProfileCount);
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [getUserData, addtionalProfileCount]);

  useEffect(() => {
    if (!users) {
      getUserData(INITIAL_RESULT_COUNT);
    }
  }, [users]);

  return (
    <div>
      <Row className="profileHeader">
        <h1>UserApp</h1>
      </Row>
      <Row>
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
