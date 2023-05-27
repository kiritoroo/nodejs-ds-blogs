import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const BlogInlineCode = (props: Props) => {
  const { children } = props;

  return (
    <code className={ sContainer }>
      { children }
    </code>
  )
}

const sContainer = css`    
  padding: 0.2em 0.4em;
  background: #215aa012;
  font-size: .85em;
  border-radius: 4px;
  vertical-align: 0.08em;
`