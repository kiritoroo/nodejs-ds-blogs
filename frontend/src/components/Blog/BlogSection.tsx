import React from "react";
import { css } from "@emotion/css";
import { TBlogSectionData } from "@type/types";

interface Props {
  data: TBlogSectionData
}

export const BlogSection = (props: Props) => {
  const { data } = props;

  return (
    <div id={"toc" + data.header.replace(/\s/g, "_")} className={sContainer}>
      <h2 className={ sHeader }>{ data.header }</h2>
      { data.content }
    </div>
  )
}

const sContainer = css`
  overflow: hidden;
  height: auto;
  p + p {
    margin-top: 1.5em;
  }
`

const sHeader = css`
  margin-top: 50px;
  margin-bottom: 1.1rem;
  padding-bottom: 0.2em;
  border-bottom: 1px solid #5c93bb2b;
  font-size: 1.7em;
`