import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = () => {
  const editorDidMount = (editor, monaco) => {
    // Enable autocompletion
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
    });

    // Configure syntax highlighting for various languages
    monaco.languages.register({
      id: 'mySpecialLanguage',
    });

    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', {
      tokenizer: {
        root: [
          [/\{\{/, 'custom-class'], // Add more patterns as needed
        ],
      },
    });

    editor.onDidChangeModelContent(() => {
      // You can perform actions whenever the content changes
    });
  };

  const editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
  };

  const code = '// Your code here';

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={editorOptions}
      editorDidMount={editorDidMount}
    />
  );
};

export default MonacoEditorComponent;
