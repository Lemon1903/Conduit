import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  type BaseSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useEffect } from "react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";

export function useUpdateToolbarHandler(callback: (selection: BaseSelection) => void) {
  const [editor] = useLexicalComposerContext();
  const { activeEditor } = useToolbarContext();

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (selection) {
          callback(selection);
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, callback]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      const selection = $getSelection();
      if (selection) {
        callback(selection);
      }
    });
  }, [activeEditor, callback]);
}
