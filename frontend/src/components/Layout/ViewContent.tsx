import React from "react";
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}


export const ViewContent = React.forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const { children } = props;

  return (
    <section className={sContainer} ref={ref}>
      <div className={sContent}>
        { children }
      </div>
    </section>
  )
})

const sContainer = css`
  width: calc(100% - 330px);
  background-color: #FFF;
  border-radius: 12px;
  box-shadow: 0 2px 4px #4385bb12;
  padding: 40px 0;
  font-size: 16px;
  margin-bottom: 100vh;
`

const sContent = css`
  max-width: 960px;
  padding: 0 40px;
  margin: 0 auto;

  div:nth-child(2) h2 {
    margin-top: 0 !important;
  }
`
