import { EditorWrapper } from "@/components/editor";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { IPage } from "@pytsx/editor";

export default function Home() {
  const defaultPage: IPage = {
    id: "teste",
    title: "",
    description: "",
    content: ""
  }
  return (
    <main>
      <EditorWrapper pageDetails={defaultPage} pageId={defaultPage.id} />
    </main>
  );
}
