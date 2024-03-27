"use client"

import React from "react"
import { createAvatar } from "../avatar"

type Props = {
  seed?: string
}

export function Avatar({ seed }: Props) {
  const [avatar, setAvatar] = React.useState<string>()
  React.useEffect(() => {
    function init() {

      if (document) {
        const av = createAvatar(document, seed)
        if (av) {
          setAvatar(av)
        }
      }
    }
    init()
  }, [])


  return (
    <span
      dangerouslySetInnerHTML={{ __html: avatar || "" }}
      style={{
        height: "100%",
        width: "fit-content",
      }}
    />
  )
}