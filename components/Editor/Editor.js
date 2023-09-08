import React from "react";
// etc

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

function App() {
  const [postBody, setPostBody] = React.useState("");
  // etc
  return (<div>
  {/* etc */}
    <MonacoEditor
      editorDidMount={() => {
      }}
      width="800"
      height="600"
      language="markdown"
      theme="vs-dark"
      value={postBody}
      options={{
        minimap: {
          enabled: false
        }
      }}
      onChange={setPostBody}
    />
  </div>)
}