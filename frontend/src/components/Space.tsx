import React from "react";
import { css } from "@emotion/css";
interface Props {}

export const Space = (props: Props) => {

  return (
    <span className={sContainer}/>
  )
}

const sContainer = css`
  display: block;
  width: 1px;
  height: 25px;
`