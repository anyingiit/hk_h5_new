import React from "react";
import {ErrorBlock} from "antd-mobile";

const NotFound404: React.FC = () => {
  return (
    <div>
      <ErrorBlock status={`empty`} fullPage={true}/>
    </div>
  )
}

export default NotFound404
