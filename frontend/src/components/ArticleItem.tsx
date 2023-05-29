import React from "react";
import { css } from "@emotion/css";
import { TDesignPatternData } from "@type/types";

interface Props {
  data: TDesignPatternData
}

export const ArticleItem = (props: Props) => {
  const { data } = props;
  
  return (
    <div className={sContainer}>
      <article className={sArticle}>
        <a className={sEmoji} href={ data.url }>{ data.emoji }</a>
        <div className={sContent}>
          <a className={sLink} href={ data.url }>
            <h2 className={sTitle}>{ data.name }</h2>
          </a>
          <div className={sAuthor}>
            <div className={sAvatar}>{ data.author.split(" ")[1].substring(0, 2) }</div>
            <div className={sInfo}>
              <div className={sName}>{ data.author }</div>
              <div className={sDate}>{ data.publish.getDate() } thg { data.publish.getMonth()+1 }</div>
            </div>
          </div>
        </div>
      </article>    
    </div>
  )
}

const sContainer = css`
  width: 47%;
`

const sArticle = css`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`

const sEmoji = css`
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 92px;
  font-size: 42px;
  background: #FFF;
  border-radius: 14px;
`

const sContent = css`
  width: calc(100% - 108px);
`

const sLink = css`
  
`

const sTitle = css`
  font-size: 1.05rem;
  font-weight: 600;
  display: -webkit-box!important;
  max-height: 4.55em;
  overflow: hidden;
  line-height: 1.5;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`

const sAuthor = css`
  display: flex;
  align-items: center;
  max-width: 100%;
  margin-top: 0.4rem;
`

const sAvatar = css`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  margin-right: 5px;
  border-radius: 25%;
  background-color: #B0D3F9;
  color: #FFF;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`

const sInfo = css`
  flex-wrap: wrap;
  margin-left: 11px;
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  line-height: 1.5;
`

const sName = css`
  width: 100%;
  font-size: 12px;
  color: #000000d1;
`

const sDate = css`
  margin-right: 6px;
  font-family: Arial,Helvetica,sans-serif;
  letter-spacing: .07em;
  font-size: 11.5px;
  color: #6e7b85;
`