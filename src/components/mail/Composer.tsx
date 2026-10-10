import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PaperclipIcon,
  QuoteIcon,
  SendIcon,
  StrikethroughIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ComposerProps = {
  open: boolean;
  onClose: () => void;
  onSend: (recipient: string, subject: string) => void;
};

type EditorButtonProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function EditorButton({ label, active, onClick, children }: EditorButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn("text-muted-foreground", active && "bg-accent text-accent-foreground")}
    >
      {children}
    </Button>
  );
}

export default function Composer({ open, onClose, onSend }: ComposerProps) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [, forceEditorUpdate] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap min-h-full focus:outline-none",
      },
    },
    onSelectionUpdate: () => forceEditorUpdate((value) => value + 1),
    onTransaction: () => forceEditorUpdate((value) => value + 1),
  });

  useEffect(() => {
    if (!open) setError("");
  }, [open]);

  if (!open) return null;

  const closeAndReset = () => {
    setRecipient("");
    setSubject("");
    setError("");
    editor?.commands.clearContent();
    onClose();
  };

  const sendMessage = () => {
    if (!recipient.trim()) {
      setError("Add a recipient before sending.");
      return;
    }

    onSend(recipient.trim(), subject.trim() || "No subject");
    closeAndReset();
  };

  return (
    <div className="bg-foreground/25 fixed inset-0 z-50 flex items-end justify-center backdrop-blur-[2px] sm:items-center sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="composer-title"
        className="bg-card text-card-foreground flex h-[94svh] w-full max-w-3xl flex-col border shadow-2xl sm:h-[min(76svh,700px)]"
      >
        <header className="flex h-14 shrink-0 items-center border-b px-3 sm:px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeAndReset}
            aria-label="Close composer"
          >
            <XIcon />
          </Button>
          <h2 id="composer-title" className="ml-2 text-sm font-semibold">
            New message
          </h2>
          <Button type="button" onClick={sendMessage} className="ml-auto px-4">
            <SendIcon data-icon="inline-start" />
            Send
          </Button>
        </header>

        <div className="divide-y border-b">
          <label className="flex min-h-12 items-center gap-3 px-4 text-sm">
            <span className="text-muted-foreground w-14 shrink-0 text-xs font-medium">To</span>
            <input
              value={recipient}
              onChange={(event) => {
                setRecipient(event.target.value);
                setError("");
              }}
              autoFocus
              inputMode="email"
              placeholder="name@example.com"
              className="placeholder:text-muted-foreground/60 min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
          <label className="flex min-h-12 items-center gap-3 px-4 text-sm">
            <span className="text-muted-foreground w-14 shrink-0 text-xs font-medium">Subject</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What’s this about?"
              className="placeholder:text-muted-foreground/60 min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
        </div>

        <div className="bg-muted/45 flex h-11 shrink-0 items-center gap-0.5 border-b px-3">
          <EditorButton
            label="Bold"
            active={editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <BoldIcon />
          </EditorButton>
          <EditorButton
            label="Italic"
            active={editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon />
          </EditorButton>
          <EditorButton
            label="Strikethrough"
            active={editor?.isActive("strike")}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon />
          </EditorButton>
          <span className="bg-border mx-1.5 h-5 w-px" />
          <EditorButton
            label="Bullet list"
            active={editor?.isActive("bulletList")}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <ListIcon />
          </EditorButton>
          <EditorButton
            label="Numbered list"
            active={editor?.isActive("orderedList")}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrderedIcon />
          </EditorButton>
          <EditorButton
            label="Quote"
            active={editor?.isActive("blockquote")}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <QuoteIcon />
          </EditorButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-7">
          <EditorContent editor={editor} className="h-full text-sm leading-7" />
        </div>

        <footer className="flex h-14 shrink-0 items-center border-t px-3 sm:px-4">
          <Button type="button" variant="ghost" size="icon" aria-label="Attach a file">
            <PaperclipIcon />
          </Button>
          {error ? (
            <p role="alert" className="text-destructive ml-2 text-xs">
              {error}
            </p>
          ) : (
            <p className="text-muted-foreground ml-2 hidden text-xs sm:block">
              Draft saved automatically
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground ml-auto"
            onClick={closeAndReset}
            aria-label="Discard draft"
          >
            <Trash2Icon />
          </Button>
        </footer>
      </section>
    </div>
  );
}
