import React, {useEffect} from "react";
import {isMobile} from "../../utils";
import path from "path";
import {useRouter} from "next/router";

const Index: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    if (isMobile) {
      router.push(path.join(router.pathname, 'mobile'))
    } else {
      router.push(path.join(router.pathname, 'web'))
    }
  })

  return (
    <div>loading...</div>
  )
}

export default Index
