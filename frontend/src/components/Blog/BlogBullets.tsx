import React from "react";
import { css } from "@emotion/css";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const BlogBullets = (props: Props) => {
  const { title, children } = props;

  return (
    <React.Fragment>
      <p className={sTitle}>{ title }</p>
      <ul className={ sListItem }>
        { children }
      </ul>
    </React.Fragment>
  )
}

const sTitle = css`
  margin-top: 0.3em;
`

const sListItem = css`
  margin: 1.4rem 0;
  padding-left: 1.8em;
  line-height: 1.7;
  list-style: none;

  li {
    margin: 0.4rem 0;
    list-style-type: disc;
  }

  li::marker {
    font-size: 1.2em;
    color: #5e6478;
  }
`