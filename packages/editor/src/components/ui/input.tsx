import * as React from "react"
import { border, colors, size } from "./utils"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // className={(
        //   "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        //   className
        // )}

        style={{
          display: "flex",
          height: size("2xl"),
          width: "100%",
          borderRadius: size("sm"),
          border: border("input"),
          background: colors("input"),
          color: "white",
          padding: size({
            x: "lg",
            y: "md"
          }),
          ...style
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
