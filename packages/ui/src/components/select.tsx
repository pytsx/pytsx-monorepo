"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { useTheme } from "../provider"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ style, children, ...props }, ref) => {
  const { theme } = useTheme()

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      style={{
        display: 'flex',
        height: theme.spacing[8],
        width: ' 100%',
        minWidth: "240px",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: theme.sizes.xs,
        background: theme.colors.input,
        border: theme.borders.input,
        padding: theme.sizes.sm,
        color: theme.colors["text-primary"],
        ...style
      }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown style={{
          opacity: '50%',
          height: theme.spacing[4],
          width: theme.spacing[4]
        }} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ style, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      style={{
        display: "flex",
        cursor: "default",
        alignItems: "center",
        justifyContent: "center",
        padding: `${theme.spacing[1]} 0`,
        ...style
      }}
      {...props}
    >
      <ChevronUp style={{
        height: theme.spacing[4],
        width: theme.spacing[4]
      }} />
    </SelectPrimitive.ScrollUpButton>
  )
})
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ style, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      style={{
        display: "flex",
        cursor: "default",
        alignItems: "center",
        justifyContent: "center",
        padding: `${theme.spacing[1]} 0`,
        ...style
      }}
      {...props}
    >
      <ChevronDown style={{
        height: theme.spacing[4],
        width: theme.spacing[4]
      }} />
    </SelectPrimitive.ScrollDownButton>
  )
})

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ style, children, position = "popper", ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.Portal >
      <SelectPrimitive.Content
        ref={ref}
        style={{
          position: "relative",
          zIndex: 500,
          maxHeight: "320px",
          minWidth: "240px",
          width: "100%",
          borderRadius: theme.sizes.xs,
          background: theme.colors.card,
          color: theme.colors["text-primary"],
          boxShadow: "0px 0px 10px -5px #1d1d1d50",
          padding: theme.sizes.xs,
          margin: theme.sizes.xs,
          border: theme.borders.muted,
          outline: "none",
          ...style
        }}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          style={{
            padding: theme.spacing[1],
            height: theme.spacing[30],
            width: "100%",
            minWidth: theme.spacing[30]
          }}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ style, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.Label
      ref={ref}
      style={{
        padding: `${theme.spacing[8]} ${theme.spacing[2]} ${theme.spacing[2]} ${theme.spacing[2]}`,
        fontWeight: "bold",
        fontSize: "smaller",
        ...style
      }}
      {...props}
    />
  )
})

SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ style, children, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.Item
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        cursor: "default",
        userSelect: "none",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.sizes.sm,
        borderRadius: theme.sizes.xs,
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          left: theme.spacing[2],
          height: theme.spacing[8],
          width: "100%",
        }}
      >
        <SelectPrimitive.ItemIndicator>
          <Check
            style={{
              height: theme.spacing[3],
              width: theme.spacing[3]
            }}
          />
        </SelectPrimitive.ItemIndicator>
      </div>

      <SelectPrimitive.ItemText style={{
        padding: theme.sizes.sm,
        paddingLeft: theme.sizes.md
      }}>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <SelectPrimitive.Separator
      ref={ref}
      style={{
        background: theme.colors.muted,
        height: theme.spacing[10]
      }}
      {...props}
    />
  )
})
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
