'use client'
import React from "react";
import { useTheme } from "../../provider";

type TypographyVariantType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h2' | 'p' | 'span'

const defaultVariantMapping: Record<TypographyVariantType, ({ }: TypographyRootProps) => React.ReactNode> = {
  h1: ({ children, ...props }: TypographyRootProps) => <h1 {...props}>{children} </h1>,
  h2: ({ children, ...props }: TypographyRootProps) => <h2 {...props}>{children} </h2>,
  h3: ({ children, ...props }: TypographyRootProps) => <h3 {...props}>{children} </h3>,
  h4: ({ children, ...props }: TypographyRootProps) => <h4 {...props}>{children} </h4>,
  h5: ({ children, ...props }: TypographyRootProps) => <h5 {...props}>{children} </h5>,
  h6: ({ children, ...props }: TypographyRootProps) => <h6 {...props}>{children} </h6>,
  p: ({ children, ...props }: TypographyRootProps) => <p {...props}>{children} </p>,
  span: ({ children, ...props }: TypographyRootProps) => <span {...props}>{children} </span>,
}

type TypographyRootProps = React.HTMLAttributes<HTMLParagraphElement>
export interface TypographyProps extends TypographyRootProps {
  variant?: TypographyVariantType
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(({ variant = "p", ...props }, ref) => {
  const { children } = props
  const Component = defaultVariantMapping[variant]
  const { theme } = useTheme()

  const style = {
    ...props.style,
    color: props.style?.color ? props.style.color : theme.colors["text-primary"]
  } as React.CSSProperties

  return (
    <Component
      {...props}
      style={style}
    >
      {children}
    </Component>
  )
})


export default Typography