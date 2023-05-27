import React from "react";
import { css } from "@emotion/css";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { MdOutlinePlayCircleOutline } from "react-icons/md";

interface Props {
  lang: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onRun: () => void;
  output: string[];
}

export const BlogCodeEditor = (props: Props) => {
  const { code, setCode, onRun, output } = props;
  
  return (
    <div className={ sEditorContainer }>
      <CodeEditor
        value={code}
        onChange={(e) => setCode(e.target.value)}
        language="js"
        placeholder="Please enter JS code."
        padding={15}
        data-color-mode="dark"
        style={{
          borderRadius: "0.7em",
          boxShadow: "0 4px 6px -1px #000e1e26",
          fontSize: 14.4,
          backgroundColor: "#343F4F",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <div className={sOutputContainer}>
        <button className={sButton} type="button" onClick={ onRun }><MdOutlinePlayCircleOutline/> Run</button>
        {
          output.length > 0 &&
          <div className={sOutput}>
            Output:
            { output.map((item, i) => (
              <div key={i}>{ item }</div>
            )) }
          </div>
        }
      </div>
    </div>
  )
}

const sEditorContainer = css`
  position: relative;
  margin: 1.3rem 0;
`

const sOutputContainer = css`
  position: relative;
  margin: 1.3rem 0;
`

const sButton = css`
  box-shadow: 0 3px 5px -2px #21253840;
  padding: 0.4em 1.2em;
  font-size: 1rem;
  color: #fff;
  background-color: #3ea8ff !important;
  border-color: #5c93bb26;
  align-items: center;
  justify-content: center;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #0000;
  border-radius: 0.45em;
  outline-offset: 2px;
  transition: .25s;
  appearance: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #0f83fd !important;
  }

  &:focus {
    box-shadow: 0 0 0 3px #bfdcff;
  }
`

const sOutput = css`
  margin: 0.5em 1.2em;
  font-size: 15;
  font-family: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace';
`