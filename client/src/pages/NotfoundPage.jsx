import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotfoundPage() {
  const navigate = useNavigate();
  const Gohome = async () => {
    window.location.href = "/";
  };
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={Gohome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default NotfoundPage;
