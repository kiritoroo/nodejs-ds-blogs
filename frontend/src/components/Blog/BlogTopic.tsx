import React from "react";
import { css } from "@emotion/css";
import { TBlogTopicData } from "@type/types";

interface Props {
  data: TBlogTopicData[];
}

export const BlogTopic = (props: Props) => {
  const { data } = props;

  return (
    <div className={sContainer}>
      {data.map((topic) => (
        <div className={sTopicContainer} key={ topic.title }>
          <div className={sTopicIcon}>{ topic.icon }</div>
          <div className={sTopicName}>{ topic.title }</div>
        </div>
      ))}
    </div>
  )
}

const sContainer = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 0.8rem;
  margin-top: -0.5rem;
  font-size: 12.5px;
  line-height: 1.4;
`

const sTopicContainer = css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 32px;
  padding: 2px;
  margin-right: 0.6em;
  margin-bottom: 0.6em;
  border: 1px solid #5c93bb2b;
  border-radius: 99rem;
`

const sTopicIcon = css`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  margin-right: 0.4rem;
  border-radius: 99rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const sTopicName = css`
  padding-right: 0.5rem;
`