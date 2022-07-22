import React from "react";
import {Result} from "antd";

interface Props {
  subTitle?: string
}

const NotFound404: React.FC<Props> = ({subTitle}) => {
  return (
    <div>
      <Result
        status={`404`}
        title={`404`}
        subTitle={subTitle ?? `Sorry, the page you visited does not exist.`}
      />
    </div>
  )
}

export default NotFound404
