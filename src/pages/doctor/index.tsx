import React, {useEffect} from "react";
import {useRouter} from "next/router";
import PageBase from "../../components/pageBase";

export const Index: React.FC = () => {
  const router = useRouter()
  useEffect(() => {

  })
  return (
    <PageBase allScreen={true}>
      <div>检测登录状态...</div>
    </PageBase>
  )
}

export default Index
