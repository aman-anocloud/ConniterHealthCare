import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading2, Quote, Undo, Redo, Code } from 'lucide-react';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className={styles.editorContainer}>
            <div className={styles.toolbar}>
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${styles.toolBtn} ${editor.isActive('bold') ? styles.active : ''}`}>
                    <Bold size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${styles.toolBtn} ${editor.isActive('italic') ? styles.active : ''}`}>
                    <Italic size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`${styles.toolBtn} ${editor.isActive('strike') ? styles.active : ''}`}>
                    <Strikethrough size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`${styles.toolBtn} ${editor.isActive('code') ? styles.active : ''}`}>
                    <Code size={16} />
                </button>
                <div className={styles.divider} />
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${styles.toolBtn} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}>
                    <Heading2 size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${styles.toolBtn} ${editor.isActive('bulletList') ? styles.active : ''}`}>
                    <List size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${styles.toolBtn} ${editor.isActive('orderedList') ? styles.active : ''}`}>
                    <ListOrdered size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${styles.toolBtn} ${editor.isActive('blockquote') ? styles.active : ''}`}>
                    <Quote size={16} />
                </button>
                <div className={styles.divider} />
                <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={styles.toolBtn}>
                    <Undo size={16} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={styles.toolBtn}>
                    <Redo size={16} />
                </button>
            </div>
            <EditorContent editor={editor} className={styles.contentArea} />
        </div>
    );
}
