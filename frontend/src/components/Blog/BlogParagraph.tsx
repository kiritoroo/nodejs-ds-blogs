import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const BlogParagraph = (props: Props) => {
  const { children } = props;

  return (
    <p className={ sParagraph }>{ children }</p>
  )
}

const sParagraph = css`
  margin-top: 0.3em;
`