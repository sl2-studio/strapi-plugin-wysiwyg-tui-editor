import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default forwardRef(function TuiEditor(
  { name, value, onChange, disabled, onFlyout, height = '600px', ...props },
  editorRef
) {
  const isFlyout = !onFlyout;

  useEffect(() => {
    if (isFlyout) {
      editorRef.current?.getInstance().focus();
    }
  }, [isFlyout]);

  function handleDocChange() {
    const instance = editorRef?.current?.getInstance();
    if (!instance) {
      console.error('editor instance not found');
      return;
    }
    const md = instance.getMarkdown();
    onChange({ target: { name, value: md } });
  }

  return !disabled ? (
    <EditorWrapper>
      <Editor
        ref={editorRef}
        usageStatistics={false}
        initialEditType='wysiwyg'
        previewStyle='vertical'
        hideModeSwitch={true}
        initialValue={value}
        height={height}
        onChange={handleDocChange}
        {...props}
      />
    </EditorWrapper>
  ) : (
    <Viewer initialValue={value} />
  );
});

const EditorWrapper = styled.div`
  .tui-md-code-block.CodeMirror-linebackground {
    left: 0;
    right: 0;
  }
`;
