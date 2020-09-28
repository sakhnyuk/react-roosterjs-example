import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { PluginEvent, PluginEventType, PluginDomEvent } from 'roosterjs-editor-types';

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const KEY_0 = 0x30;
const KEY_9 = 0x39;

export class HelloPlugin implements EditorPlugin {
  private editor: Editor;

  initialize(editor: Editor) {
    this.editor = editor;
  }

  dispose() {
    this.editor = null;
  }

  getName() {
    return 'Hello Plugin';
  }

  willHandleEventExclusively() {
    return true;
  }

  onPluginEvent(event: PluginEvent) {
    if (event.eventType === PluginEventType.KeyPress) {
      let domEvent = <PluginDomEvent>event;
      let keyboardEvent = <KeyboardEvent>domEvent.rawEvent;
      if (keyboardEvent.which >= KEY_0 && keyboardEvent.which <= KEY_9) {
        let text = NUMBERS[keyboardEvent.which - KEY_0] + ' ';
        this.editor.insertContent(text);
        keyboardEvent.preventDefault();
      }
    }

    if (event.eventType === PluginEventType.KeyDown) {
      let domEvent = <PluginDomEvent>event;
      let keyboardEvent = <KeyboardEvent>domEvent.rawEvent;

      if (keyboardEvent.key === 'Backspace') {
        keyboardEvent.preventDefault();
        console.log(keyboardEvent.code);
        console.log(keyboardEvent.key == 'Backspace');
      }
    }
  }
}
