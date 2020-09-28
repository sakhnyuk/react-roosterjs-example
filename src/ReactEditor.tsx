import * as React from 'react';
import {Editor, EditorOptions, EditorPlugin, UndoService} from 'roosterjs-editor-core';
import {HtmlSanitizer} from 'roosterjs-editor-dom';
import {ContentEdit, HyperLink, Paste} from 'roosterjs-editor-plugins';
import {DefaultFormat} from 'roosterjs-editor-types';
import {EditorViewState} from 'roosterjs-react';

import {HelloPlugin} from './hello-plugin';

export interface ReactEditorProps {
  viewState: EditorViewState;
  className?: string;
  plugins?: EditorPlugin[];
  updateViewState?: (viewState: EditorViewState, content: string, isInitializing: boolean) => void;
  undo?: UndoService;
  isRtl?: boolean;
  hyperlinkToolTipCallback?: (href: string) => string;
  defaultFormat?: DefaultFormat;
  onBlur?: (ev: React.FocusEvent<HTMLDivElement>) => void;
}

export default class ReactEditor extends React.Component<ReactEditorProps, {}> {
  private readonly contentDiv: React.RefObject<HTMLDivElement>;
  private editor: Editor | null = null;
  private updateViewStateWhenUnmount: boolean = false;

  constructor(props) {
    super(props);
    this.contentDiv = React.createRef<HTMLDivElement>();
  }

  render() {
    let { className, isRtl } = this.props;
    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={className}
        onBlur={this.onBlur}
        ref={this.contentDiv}
      />
    );
  }

  componentDidMount() {
    if (!this.contentDiv.current) return;
    this.editor = new Editor(this.contentDiv.current, this.getEditorOptions());
    this.updateViewStateWhenUnmount = true;
    this.updateContentToViewState(true /*isInitializing*/);
  }

  componentWillUnmount() {
    if (this.updateViewStateWhenUnmount) {
      this.updateContentToViewState();
      this.updateViewStateWhenUnmount = false;
    }
    this.editor && this.editor.dispose();
    this.editor = null;
  }

  updateContentToViewState(isInitializing?: boolean) {
    if (this.editor) {
      let updateViewState = this.props.updateViewState || ReactEditor.updateViewState;
      updateViewState(this.props.viewState, this.editor.getContent(), !!isInitializing);
    }
  }

  setUpdateViewStateWhenUnmount(updateViewStateWhenUnmount: boolean) {
    this.updateViewStateWhenUnmount = updateViewStateWhenUnmount;
  }

  private getEditorOptions(): EditorOptions {
    let { plugins, viewState, undo, hyperlinkToolTipCallback, defaultFormat } = this.props;

    let allPlugins: EditorPlugin[] = [
      new ContentEdit(),
      new HyperLink(hyperlinkToolTipCallback),
      new Paste(true /*useDirectPaste*/),
      new HelloPlugin(),
    ];

    if (plugins) {
      allPlugins = allPlugins.concat(plugins);
    }

    let initialContent = HtmlSanitizer.convertInlineCss(viewState.content);

    return {
      plugins: allPlugins,
      defaultFormat: defaultFormat,
      undo: undo,
      initialContent: initialContent,
    };
  }

  private static updateViewState(viewState: EditorViewState, content: string, isInitializing: boolean) {
    if (viewState.content != content) {
      viewState.content = content;
      if (!isInitializing) {
        viewState.isDirty = true;
      }
    }
  }

  private onBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
    this.updateContentToViewState();
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };
}
