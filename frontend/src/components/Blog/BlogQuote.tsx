import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const BlogQuote = (props: Props) => {
  const { children } = props;

  return (
    <blockquote className={sQuote}>
      { children }
    </blockquote>
  )
}

const sQuote = css`
  font-size: .97em;
  margin: 1.4rem 0;
  border-left: 3px solid #9dacb7;
  padding: 2px 0 2px 0.7em;
  color: #505c64;
`