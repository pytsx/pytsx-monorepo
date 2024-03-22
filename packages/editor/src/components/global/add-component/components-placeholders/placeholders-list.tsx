import React from "react"
import { PlaceholderElement } from "."
import { Typography, size } from "@pytsx/ui"

const styles: Record<string, React.CSSProperties> = {
  title: {
    userSelect: "none",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "bold",
    opacity: "80%"
  },
  div1: {
    display: "flex",
    flexDirection: "column",
    gap: size("md"),
    padding: size({
      x: "sm",
      y: "xs"
    }),
  },
  div2: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: size("sm"),
  },
  childContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  childLabel: {
    userSelect: "none",
    fontSize: "14px"
  }
}


const PlaceholderItem = ({ component, label }: { component: React.ReactNode, label: string }) => {
  return (
    <div style={styles.childContainer}>
      {component}
      <Typography style={styles.childLabel}>{label}</Typography>
    </div>
  )
}

export const PlaceholderList = ({ elements, title }: { elements: PlaceholderElement[], title: string }) => {
  return (
    <div style={styles.div1}>
      <Typography style={styles.title}>{title}</Typography>
      <div style={styles.div2}>
        {elements.map((element) => (
          <PlaceholderItem
            component={element.Component}
            label={element.label}
            key={element.id + element.label}
          />
        ))}
      </div>
    </div>
  )
}
