import { EditorBubble, EditorContent, EditorRoot } from "novel";
import { useMemo, useState } from "react";
import { defaultExtensions } from "@/components/ui/editor/novel-extensions";
import { Separator } from "@/components/ui/separator";
import { LinkSelector } from "@/components/ui/editor/link-selector";
import { generateJSON } from "@tiptap/html";
import { marked } from "marked";
import xss from "xss";
import { NodeSelector } from "@/components/ui/editor/node-selector";
import { TextButtons } from "@/components/ui/editor/text-buttonts";

type Dialog = "node" | "link" | "color";

export const Editor = ({
  initialContent,
  onValueChange,
}: {
  initialContent: string;
  onValueChange?: (value: string) => void;
}) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const initialJSON = useMemo(
    () =>
      generateJSON(
        xss(
          // marked didn't get the type definition right, it still returns Promise<string> instead of string at type level.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          marked(initialContent, {
            async: false,
          }),
        ),
        defaultExtensions,
      ),
    [initialContent],
  );

  return (
    <EditorRoot>
      <EditorContent
        extensions={defaultExtensions}
        initialContent={initialJSON}
        onUpdate={({ editor }) => {
          if (!onValueChange) return;

          // The type `storage` is Record<string, any>, have to ignore eslint rules for unsafe access.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          onValueChange(editor.storage.markdown.getMarkdown());
        }}
        editorProps={{
          attributes: {
            class:
              "prose md:prose-lg dark:prose-invert min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 placeholder:text-muted-foreground",
          },
        }}
      >
        <EditorBubble
          pluginKey="bubble"
          className="flex bg-background border rounded-md shadow"
          tippyOptions={{
            maxWidth: "unset",
          }}
        >
          <Separator orientation="vertical" />
          <NodeSelector
            open={dialog === "node"}
            onOpenChange={(value) => setDialog(value ? "node" : null)}
          />
          <Separator orientation="vertical" />
          <LinkSelector
            open={dialog === "link"}
            onOpenChange={(value) => setDialog(value ? "link" : null)}
          />
          <Separator orientation="vertical" />
          <TextButtons />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};
