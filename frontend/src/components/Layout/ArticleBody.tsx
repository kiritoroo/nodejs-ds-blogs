import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const ArticleBody = (props: Props) => {
  const { children } = props;

  return (
    <div className={ sContainer }>
      <div className={ sFlexColumn }>
        { children }
      </div>
    </div>
  )
}

const sContainer = css`
  max-width: 1200px;
  padding: 0 40px;
  margin: 0 auto;
`

const sFlexColumn = css`
  display: flex;
  justify-content: space-between;
`
