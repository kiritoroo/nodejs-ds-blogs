import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const AppHeader = (props: Props) => {
  const { children } = props;
  
  return (
    <header className={sContainer}>
      <div className={sWide}>
        <div className={sFlexHoz}>
          <a className={sHomeLink} href="/">
            <img className={sLogo} src="./ico_nodejs.png"/>
            { children }
          </a>
        </div>
      </div>
    </header>
  )
}

const sContainer = css`
    background: #FFF;
`

const sWide = css`
  max-width: 1200px;
  padding: 0 40px;
  margin: 0 auto;
`

const sFlexHoz = css`
  justify-content: center;
  height: 62px;
  display: flex;
  align-items: center;
`

const sHomeLink = css`
  position: relative;
  height: 62px;
  padding: 3px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25em;
  font-weight: 600;
`

const sLogo = css`
  width: 35px;
  height: 35px;
  object-fit: cover;
`