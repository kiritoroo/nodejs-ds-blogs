import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const ViewSidebar = (props: Props) => {
  const { children } = props;
  
  return (
    <div className={ sContainer }>
      { children }
    </div>
  )
}

const sContainer = css`
  width: 300px;
`