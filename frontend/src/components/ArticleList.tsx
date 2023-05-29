import React from "react";
import { css } from "@emotion/css";
import { ArticleItem } from "./ArticleItem";
import { TDesignPatternData } from "@type/types";

interface Props {
  data: TDesignPatternData[]
}

export const ArticleList = (props: Props) => {
  const { data } = props;

  return (
    <div className={sContainer}>
      { data.map((item) => (
        <ArticleItem data={ item }/>
      )) }
    </div>
  )
}

const sContainer = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`