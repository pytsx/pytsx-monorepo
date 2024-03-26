import { hexToRgb, hslToRgb, isValidColor, rgbToHsl } from "./converter"


export function createGradientColors(
  baseColor: string,
  steps: number = 10
): Record<number, string> {
  // Validar cor base
  if (!isValidColor(baseColor)) {
    throw new Error(`Invalid base color provided: ${baseColor}`);
  }

  // Gerar array de posições
  const positions = Array.from({ length: steps }, (_, i) => i / (steps - 1));

  // Função para converter posição em cor
  const colorAtPos = (pos: number): string => {
    const hsl = rgbToHsl(hexToRgb(baseColor));
    const lightness = hsl.l - pos * (1 - hsl.l);
    return hslToRgb({ ...hsl, l: lightness });
  };

  // Gerar array de cores
  const colors = positions.map(colorAtPos)

  const colorsWithIndex: Record<number, string> = {}

  colors.forEach((color, index) => {
    colorsWithIndex[(index + 1) * 100] = color
  })

  return colorsWithIndex
}
