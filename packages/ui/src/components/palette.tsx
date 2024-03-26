"use client"

import React from "react"
import { useTheme } from "../provider"
import { v4 } from "uuid"
import { BaseColors, IPaletteColor } from "../provider/interface";

export type GradientPalette = Record<number, string[]>;


export function convertPaletteToGradients(palette: IPaletteColor): GradientPalette {
  const gradients: GradientPalette = {};

  for (const [baseColor, colorShades] of Object.entries(palette)) {
    for (const [shade, hex] of Object.entries(colorShades)) {
      const gradient = parseInt(shade, 10);
      gradients[gradient] = gradients[gradient] || [];
      gradients[gradient].push(hex);
    }
  }

  return gradients;
}

export function Palette() {
  const { theme } = useTheme()

  const colors = Object.keys(theme.palette)

  const gradient = convertPaletteToGradients(theme.palette)
  const gradientKeys = Object.keys(gradient)



  return (
    <table>
      <tbody>
        <tr>
          <th scope="col"></th>
          {
            colors.map((color, index) => (
              <th scope="col" key={color + index + v4()}>
                {color}
              </th>
            ))
          }
        </tr>
        {
          gradientKeys.map(gradientKey => (
            <tr key={gradientKey + v4()}>
              <th scope="row">{gradientKey}</th>
              {
                gradient[gradientKey as any].map(color => (
                  <td
                    key={gradientKey + color + v4()}
                    style={{
                      width: theme.sizes.md,
                      height: theme.sizes.md,
                      background: color,
                      border: theme.borders.muted
                    }}
                  >{color}</td>

                ))
              }

            </tr>
          ))
        }
      </tbody>

    </table>
  )
}