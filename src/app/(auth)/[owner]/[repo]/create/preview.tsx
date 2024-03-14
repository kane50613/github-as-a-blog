import { useCreatePostStore } from "@/app/(auth)/[owner]/[repo]/create/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dynamic from "next/dynamic";

const MDX = dynamic(() => import("@/components/mdx").then((mod) => mod.MDX));

export const Preview = () => {
  const { body, title, preview } = useCreatePostStore();

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
          {preview && (
            <div className="prose dark:prose-invert lg:prose-xl break-words">
              <MDX>{`# ${title}\n${body}`}</MDX>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
