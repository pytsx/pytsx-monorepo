"use client"
import { EditorWrapper } from "@/components/editor";
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
