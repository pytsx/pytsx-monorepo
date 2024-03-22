import React from "react"
import { PlaceholderElement } from "."
import { size } from "../../../ui/utils"

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
    color: 'rgba(226, 232, 240, 0.7)',
    userSelect: "none",
    fontSize: "14px"
  }
}


const PlaceholderItem = ({ component, label }: { component: React.ReactNode, label: string }) => {
  return (
    <div style={styles.childContainer}>
      {component}
      <span style={styles.childLabel}>{label}</span>
    </div>
  )
}

export const PlaceholderList = ({ elements, title }: { elements: PlaceholderElement[], title: string }) => {
  return (
    <div style={styles.div1}>
      <p style={styles.title}>{title}</p>
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
