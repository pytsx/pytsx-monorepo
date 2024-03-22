import { Trash } from "lucide-react";
import React from "react";
import { colors, useTheme } from "@pytsx/ui";

export function DeleteComponent({ handleDelete }: { handleDelete: () => void }) {
  const { theme } = useTheme()
  const { sm, "2xl": _2xl, lg } = theme.sizes
  return (
    <div
      style={{
        cursor: "pointer",
        background: colors("dangerous"),
        padding: sm,
        borderRadius: `${sm} ${sm} 0 0`,
        width: "fit-content",
        position: "absolute",
        top: `calc(-${_2xl} - 1px)`,
        right: "-1px",
        maxHeight: `${_2xl}`,
        height: _2xl,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={handleDelete}
    >
      <Trash
        style={{
          color: "#0f0000",
          width: lg,
          height: lg
        }}
      />
    </div>
  )
}