import { useCreatePostStore } from "@/app/(auth)/create/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export const Preview = () => {
  const [preview, setPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const { body, title } = useCreatePostStore();

  useEffect(() => {
    if (!preview) return;

    const fullContent = `# ${title}\n\n${body}`;

    async function render() {
      const { marked } = await import("marked");
      const xss = await import("xss").then((x) => x.default);

      const html = await marked(fullContent, {
        async: true,
      });

      setPreviewContent(xss(html));
    }

    render().catch(console.error);
  }, [body, preview, title]);

  return (
    <Accordion
      type="single"
      collapsible
      value={preview ? "preview" : undefined}
      onValueChange={() => setPreview(!preview)}
    >
      <AccordionItem value="preview">
        <AccordionTrigger>Markdown Rendered Post Preview</AccordionTrigger>
        <AccordionContent>
          <div
            className="prose dark:prose-invert lg:prose-lg border rounded-md p-4 w-full"
            dangerouslySetInnerHTML={{
              __html: previewContent,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
