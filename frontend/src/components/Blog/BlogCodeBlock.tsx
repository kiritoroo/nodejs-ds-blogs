import React from "react";
import { css } from "@emotion/css";
import CodeEditor from '@uiw/react-textarea-code-editor';

interface Props {
  lang: string;
  code: string;
}

export const BlogCodeBlock = (props: Props) => {
  const { lang, code } = props;

  return (
    <div className={sContainer}>
      <CodeEditor
        value={ code }
        language={lang }
        data-color-mode="dark"
        style={{
          padding: "1.1rem",
          pointerEvents: "none",
          whiteSpace: "pre",
          overflowWrap: "normal",
          overflowX: "auto",
          borderRadius: "0.7em",
          boxShadow: "0 4px 6px -1px #000e1e26",
          fontSize: 14.4,
          backgroundColor: "#343F4F",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  )
}

const sContainer = css`
  position: relative;
  margin: 1.3rem 0;

  textarea {
    white-space: nowrap;
    overflow-wrap: normal;
    overflow-x: auto;
  }
`
