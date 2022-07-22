import React, { useCallback, useMemo, useRef } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  Text
} from 'slate'
import { withHistory } from 'slate-history'

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

// import { Button, Icon, Toolbar } from '../components'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+e': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })
    return !!match
  },
  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    })
    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  // ========== TOGGLES ==========
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}



const SlateEditor = ({ dataText, setDataText }) => {
  
  
  const editorRef = useRef()
  if (!editorRef.current) editorRef.current = withReact(createEditor())
  const editor = editorRef.current
  
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return (
          <code className='bg-textSecondary text-marsDark' {...props.attributes}>
            {props.children}
          </code>
        );
      default:
        return (
          <p {...props.attributes}>
            {props.children}
          </p>
        );
    }
  }, [])
  
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ],
    []
  )

  return (
    <Slate 
      editor={editor} 
      value={initialValue} 
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
          setDataText(content);
          //console.log(dataText);
        }
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <MarkButton editor={editor} format="bold" icon={<FormatBoldIcon />} />
        <MarkButton editor={editor} format="italic" icon={<FormatItalicIcon />} />
        <MarkButton editor={editor} format="underline" icon={<FormatUnderlinedIcon />} />
        <MarkButton editor={editor} format="code" icon={<CodeIcon />} />
        <MarkButton editor={editor} format="heading-one" icon={<LooksOneIcon />} />
        <MarkButton editor={editor} format="heading-two" icon={<LooksTwoIcon />} />
        <MarkButton editor={editor} format="block-quote" icon={<FormatQuoteIcon />} />
        <MarkButton editor={editor} format="numbered-list" icon={<FormatListNumberedIcon />} />
        <MarkButton editor={editor} format="bulleted-list" icon={<FormatListBulletedIcon />} />
        <MarkButton editor={editor} format="left" icon={<FormatAlignLeftIcon />} />
        <MarkButton editor={editor} format="center" icon={<FormatAlignCenterIcon />} />
        <MarkButton editor={editor} format="right" icon={<FormatAlignRightIcon />} />
        <MarkButton editor={editor} format="justify" icon={<FormatAlignJustifyIcon />} />
      </Stack>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }
          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case 'e': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const MarkButton = ({ editor, format, icon }) => {
  //const editor = useSlate()
  return (
    <IconButton 
      color="primary" 
      aria-label="Slate button" 
      component="label"
      //active={isMarkActive(editor, format)}
      onClick={event => {
        event.preventDefault()
        ButtonToggles(editor, format)
      }}
    >
      {icon}
    </IconButton>
  )
}

const ButtonToggles = (editor, format) => {
  switch (format) {
    case 'bold': {
      CustomEditor.toggleBoldMark(editor);
      break;
    }
    case 'italic': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'underline': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'code': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'heading-one': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'heading-two': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'block-quote': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'numbered-list': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'bulleted-list': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'left': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'center': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'right': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case 'justify': {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    default:
      return
  }
}

// format="bold"
// format="italic"
// format="underline"
// format="code"
// format="heading-one"
// format="heading-two"
// format="block-quote"
// format="numbered-list"
// format="bulleted-list"
// format="left"
// format="center"
// format="right"
// format="justify"


export default SlateEditor;