import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { PluginEvent,  PluginDomEvent } from 'roosterjs-editor-types';

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const KEY_0 = 0x30;
const KEY_9 = 0x39;

const PluginEventType = {
  /**
   * HTML KeyDown event
   */
  KeyDown : 0,
      /**
       * HTML KeyPress event
       */
      KeyPress : 1,
      /**
       * HTML KeyUp event
       */
      KeyUp : 2,
      /**
       * HTML CompositionEnd event
       */
      CompositionEnd : 3,
      /**
       * HTML MouseDown event
       */
      MouseDown : 4,
      /**
       * HTML MouseUp event
       */
      MouseUp : 5,
      /**
       * Content changed event
       */
      ContentChanged : 6,
      /**
       * @deprecated Use ExtractContentWithDom instead.
       * Extract Content event
       * This event is triggered when getContent() is called with triggerExtractContentEvent = true
       * Plugin can handle this event to remove the UI only markups to return clean HTML
       */
      ExtractContent : 7,
      /**
       * Extract Content with a DOM tree event
       * This event is triggered when getContent() is called with triggerExtractContentEvent = true
       * Plugin can handle this event to remove the UI only markups to return clean HTML
       * by operating on a cloned DOM tree
       */
      ExtractContentWithDom : 8,
      /**
       * Before Paste event, provide a chance to change paste content
       */
      BeforePaste : 9,
      /**
       * Let plugin know editor is ready now
       */
      EditorReady : 10,
      /**
       * Let plugin know editor is about to dispose
       */
      BeforeDispose : 11,
      /**
       * HTML Input / TextInput event
       */
      Input : 12,
      /**
       * Pending format state (bold, italic, underline, ... with collapsed selection) is changed
       */
      PendingFormatStateChanged : 13,
      /**
       * Dark mode state is changed
       */
      DarkModeChanged : 14,
      /**
       * Scroll event triggered by scroll container
       */
      Scroll : 15,
      /**
       * Operating on an entity. See enum EntityOperation for more details about each operation
       */
      EntityOperation : 16
}

export class HelloPlugin implements EditorPlugin {
  private editor: Editor | null = null;

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
        this.editor?.insertContent(text);
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
