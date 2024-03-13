import { useCreatePostStore } from "@/app/(auth)/[owner]/[repo]/create/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export const Preview = () => {
  const [previewContent, setPreviewContent] = useState("");

  const { body, title, preview } = useCreatePostStore();

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
      value={preview ? "preview" : ""}
      onValueChange={() => useCreatePostStore.setState({ preview: !preview })}
    >
      <AccordionItem value="preview" className="border rounded-md px-4">
        <AccordionTrigger>Markdown Rendered Post Preview</AccordionTrigger>
        <AccordionContent>
          <div
            className="prose dark:prose-invert lg:prose-xl break-words"
            dangerouslySetInnerHTML={{
              __html: previewContent,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
