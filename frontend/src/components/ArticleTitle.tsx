import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const ArticleTitle = (props: Props) => {

  const { children } = props;

  return (
    <h1 className={ sContainer }>
      <p>
        {children}
      </p>
    </h1>
  )
}

const sContainer = css`
  display: inline-block;
  max-width: 780px;
  margin: 1.2rem auto 0;
  font-size: 33px;
  text-align: left;  
`