import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Strings } from 'roosterjs-react-common';

import BOLD_SVG from './icons/bold.svg';
import ITALIC_SVG from './icons/italic.svg';
import UNDERLINE_SVG from './icons/underline.svg';
import BULLETS_SVG from './icons/bullets.svg';
import NUMBERING_SVG from './icons/numbering.svg';
import OUTDENT_SVG from './icons/outdent.svg';
import INDENT_SVG from './icons/indent.svg';
import BLOCKQUOTE_SVG from './icons/blockquote.svg';
import ALIGNLEFT_SVG from './icons/alignleft.svg';
import ALIGNCENTER_SVG from './icons/aligncenter.svg';
import ALIGNRIGHT_SVG from './icons/alignright.svg';
import UNLINK_SVG from './icons/unlink.svg';
import SUPERSCRIPT_SVG from './icons/superscript.svg';
import SUBSCRIPT_SVG from './icons/subscript.svg';
import STRIKETHROUGH_SVG from './icons/strikethrough.svg';
import LTR_SVG from './icons/ltr.svg';
import RTL_SVG from './icons/rtl.svg';
import UNDO_SVG from './icons/undo.svg';
import REDO_SVG from './icons/redo.svg';
import REMOVEFORMAT_SVG from './icons/removeformat.svg';
import DROPDOWN_SVG from './icons/dropdown.svg';
import BACKCOLOR_SVG from './icons/backcolor.svg';
import TEXTCOLOR_SVG from './icons/textcolor.svg';
import CREATELINK_SVG from './icons/createlink.svg';
import IMAGE_ALT_TEXT_SVG from './icons/imagealttext.svg';
import FONTSIZE_SVG from './icons/fontsize.svg';
import FONTNAME_SVG from './icons/fontname.svg';
import EMOJI_SVG from './icons/emoji.svg';

const buttonImages = {
  emoji: EMOJI_SVG,
  bold: BOLD_SVG,
  italic: ITALIC_SVG,
  underline: UNDERLINE_SVG,
  font: FONTNAME_SVG,
  size: FONTSIZE_SVG,
  bkcolor: BACKCOLOR_SVG,
  color: TEXTCOLOR_SVG,
  bullet: BULLETS_SVG,
  number: NUMBERING_SVG,
  indent: INDENT_SVG,
  outdent: OUTDENT_SVG,
  quote: BLOCKQUOTE_SVG,
  left: ALIGNLEFT_SVG,
  center: ALIGNCENTER_SVG,
  right: ALIGNRIGHT_SVG,
  link: CREATELINK_SVG,
  unlink: UNLINK_SVG,
  sub: SUBSCRIPT_SVG,
  super: SUPERSCRIPT_SVG,
  strike: STRIKETHROUGH_SVG,
  alttext: IMAGE_ALT_TEXT_SVG,
  ltr: LTR_SVG,
  rtl: RTL_SVG,
  undo: UNDO_SVG,
  redo: REDO_SVG,
  unformat: REMOVEFORMAT_SVG,
  more: DROPDOWN_SVG,
};

export const ribbonButtonRenderer = (buttonName: string, isRtl: boolean) => {
  let image = buttonImages[buttonName];
  return <Image style={{ width: '32px' }} shouldFadeIn={false} src={image} />;
};
