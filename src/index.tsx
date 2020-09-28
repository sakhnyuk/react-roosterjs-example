import React from 'react';
import ReactDom from 'react-dom';
import { createEditorViewState, EmojiPlugin } from 'roosterjs-react';
import { Ribbon, RibbonPlugin } from 'roosterjs-react-ribbon';

import ReactEditor from './ReactEditor';
import { ribbonButtonRenderer } from './ribbonButtonRenderer';

const container = document.getElementById('root');
const viewState = createEditorViewState('Hello ReactEditor!');
const ribbonPlugin = new RibbonPlugin();
const emojiPlugin = new EmojiPlugin();
const emojiButton = {
  name: 'btnEmoji',
  onClick: (editor) => emojiPlugin.startEmoji(),
};

const ribbonButtons = [
  'emoji',
  'bold',
  'italic',
  'underline',
  'font',
  'size',
  'bkcolor',
  'color',
  'bullet',
  'number',
  'indent',
  'outdent',
  'quote',
  'left',
  'center',
  'right',
  'link',
  'unlink',
  'sub',
  'super',
  'strike',
  'alttext',
  'ltr',
  'rtl',
  'undo',
  'redo',
  'unformat',
];

const Editor = () => (
    <div>
      <Ribbon
          ribbonPlugin={ribbonPlugin}
          className={'myRibbon'}
          buttonRenderer={ribbonButtonRenderer}
          buttonNames={ribbonButtons}
          additionalButtons={{ emoji: emojiButton }}
      />
      <ReactEditor className={'editor'} viewState={viewState} plugins={[ribbonPlugin, emojiPlugin]} />
    </div>
);
window.addEventListener('resize', () => ribbonPlugin.resize());
ReactDom.render(<Editor />, container);
