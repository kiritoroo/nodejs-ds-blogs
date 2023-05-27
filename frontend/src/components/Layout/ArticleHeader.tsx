import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const ArticleHeader = (props: Props) => {
  const { children } = props;

  return (
    <header className={ sContainer }>
      <div className={ sContent }>
        { children }
      </div>
    </header>
  )
}

const sContainer = css`
  padding: 3.8rem 0 4rem;
  line-height: 1.4;
  text-align: center;
`

const sContent = css`
  max-width: 1200px;
  padding: 0 40px;
  margin: 0 auto;
`