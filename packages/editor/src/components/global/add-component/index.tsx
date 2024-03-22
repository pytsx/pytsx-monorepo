"use client"

import React from "react";
import { Plus } from "lucide-react";
import { IconButton } from "../../ui/icon-button";
import ComponentsPlaceholders from "./components-placeholders";
import { border, colors, size } from "../../ui/utils";

export function AddComponents() {
  const [active, setActive] = React.useState<boolean>(false)

  return (
    <>
      <IconButton onClick={() => setActive(prev => !prev)} >
        <Plus />
      </IconButton>

      {
        active && <div style={{
          position: 'absolute',
          width: "fit-content",
          boxSizing: "border-box",
          top: "106%",
          border: border("muted"),
          left: size("sm"),
          background: colors("card"),
          borderRadius: size("xs"),
          zIndex: 400,
          display: "flex",
        }}>
          <ComponentsPlaceholders />
        </div>
      }
    </>
  )
}