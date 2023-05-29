import React from "react";
import { css } from "@emotion/css";
import { ArticleList } from "@comp/ArticleList";
import { designPaternsData } from "src/data";

export default function IndexPage() {
  
  return (
    <div>
      <section className={sSection} style={{ background: "#f1f5f9" }}>
        <div className={sSectionContainer}>
          <h2 className={sSectionHeader}>Creational Patterns</h2>
          <span className={sSpace}/>
          <ArticleList data={ designPaternsData.creational }/>
        </div>
      </section>
      <div className={sHozSeparator}/>
      <section className={sSection} style={{ background: "#e6f2ff" }}>
        <div className={sSectionContainer}>
          <h2 className={sSectionHeader}>Structural Patterns</h2>
          <span className={sSpace}/>
          <ArticleList data={ designPaternsData.structural }/>
        </div>
      </section>
      <div className={sHozSeparator}/>
      <section className={sSection} style={{ background: "#f3f2ff" }}>
        <div className={sSectionContainer}>
          <h2 className={sSectionHeader}>Behavioral Patterns</h2>
          <span className={sSpace}/>
          <ArticleList  data={ designPaternsData.behavioral }/>
        </div>
      </section>
      <div className={sHozSeparator}/>
    </div>
  )
}

const sSection = css`
  padding: 2.3rem 0 3.5rem;
`

const sSectionHeader = css`
  font-family: "Inter",Arial,sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
`

const sSectionContainer = css`
  max-width: 960px;
  padding: 0 40px;
  margin: 0 auto;
`

const sHozSeparator = css`
  height: 2px;
  background: #fff;
`

const sSpace = css`
  display: block;
  width: 1px;
  height: 1rem;
`