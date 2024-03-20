import React from "react";
import { EditorElement } from "../../../provider";
import { Container } from "./container";
import { Text } from "./text";

type Props = {
  element: EditorElement
}

export function Recursive({ element }: Props) {
  switch (element.type) {
    case "container":
    case "__body":
      return <Container element={element} />
    case "text":
      return <Text element={element} />
    default:
      null;
  }
}