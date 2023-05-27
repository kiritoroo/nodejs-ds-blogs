import React from "react";
import { css } from "@emotion/css";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosCalendar } from "react-icons/io";
import { HiOutlineDocument } from "react-icons/hi";

interface Props {
  author: string;
  publish: string;
  letterCount: number;
}

export const SidebarInfo = (props: Props) => {
  const { author, publish, letterCount } = props;

  return (
    <div className={sContainer}>
      <div className={sListContainer}>
        <div className={sListItem}>
          <div className={sItemTerm}>
            <span className={sItemTermIcon}><AiOutlineUser/></span>
            <span className={sItemTermTitle}>Author</span>
          </div>
          <div className={sItemDesc}>
            <span className={sItemDescAvatar}>{ author.split(" ")[1].substring(0, 2) }</span>
            <span className={sItemDescName}>{ author }</span>
          </div>
        </div>
        <div className={ css([sListItem, sLine]) }>
          <div className={sItemTerm}>
            <span className={sItemTermIcon}><IoIosCalendar/></span>
            <span className={sItemTermTitle}>Publish</span>
          </div>
          <div className={ sItemDesc }>
            <time className={sItemDescTime}>{ publish }</time>
          </div>
        </div>
        <div className={ css([sListItem, sLine]) }>
          <div className={ sItemTerm }>
            <span className={ sItemTermIcon }><HiOutlineDocument/></span>
            <span className={ sItemTermTitle }>Letter count</span>
          </div>
          <div className={ sItemDesc }>
            <time className={ sItemDescLetterCount }>{ letterCount.toLocaleString() } letters</time>
          </div>
        </div>
      </div>
    </div>
  )
}

const sContainer = css`
  padding: 2px 20px;
  background-color: #FFF;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 #4385bb12;
`

const sListContainer = css`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const sListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 46px;
  font-size: 13.5px;
`

const sItemTerm = css`
  display: flex;
  align-items: center;
`

const sItemTermIcon = css`
  width: 22px;
  margin-right: 2px;
  color: #acbcc7;
  text-align: center;
`

const sItemTermTitle = css`
  flex: 1;
  color: #6e7b85;
  white-space: nowrap;
`

const sItemDesc = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  text-align: center;
`

const sItemDescAvatar = css`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  margin-right: 5px;
  border-radius: 99rem;
  background-color: #B0D3F9;
  color: #FFF;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`

const sItemDescName = css`
  font-size: 13px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const sItemDescTime = css`
  font-family: Arial,Helvetica,sans-serif;
  letter-spacing: .07em;
  text-align: right;
  font-size: 13.5px;
`

const sItemDescLetterCount = css`
  letter-spacing: .05em;
  text-align: right;
  font-size: 13.5px;
`

const sLine = css`
  border-top: 1px solid #5c93bb2b;
`
