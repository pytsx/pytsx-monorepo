import { ITheme, SizeExtraLargeType, SizeType } from "../provider/interface"

type OrientationType = "x" | "y" | "xy"

const sizefactor = .25


function createExtrasizes(maxLength: number) {
  const extraSizesArr: SizeExtraLargeType[] = []
  const firstExtraSize = 2
  for (let i = firstExtraSize; i <= maxLength; i++) {
    extraSizesArr.push(i.toString().concat('xl') as SizeExtraLargeType);
  }
  return extraSizesArr
}

const basesizes = (factor: number = sizefactor): Record<SizeType, number> => {
  const sizesExtralage = createExtrasizes(28)


  const sizeKeys: SizeType[] = ["xs", "sm", "md", "lg", "xl", ...sizesExtralage]

  const finalSizes: Record<SizeType, number> = {} as Record<SizeType, number>

  for (let i = 1; i < sizeKeys.length; i++) {
    finalSizes[sizeKeys[i - 1]] = factor * i
  }

  return finalSizes
}

export const obtainSize = (size: SizeType, factor: number = sizefactor) => {
  return basesizes(factor)[size]
}

type SizeProps = Partial<Record<OrientationType, SizeType>>

export const size = (option?: SizeProps | SizeType, factor?: number): string => {
  if (typeof option == "object") {
    const { x, xy, y } = option
    if (x && y) {
      return `${obtainSize(y, factor)}rem ${obtainSize(x, factor)}rem`
    }
    return `${obtainSize(x || y || xy || "md", factor)}rem`
  }
  return `${obtainSize(option || "md", factor)}rem`
}


export const createSizes = (factor: number = sizefactor): Record<SizeType, string> => {
  const values: SizeType[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]
  const response: Record<SizeType, string> = {} as Record<SizeType, string>
  for (let size of values) {
    response[size] = obtainSize(size, factor).toString().concat("rem")
  }
  return response
}


export const createSimpleSizes = (factor: number = sizefactor / 2, maxSize: number = 128): ITheme["spacing"] => {
  const arr = Array(maxSize)
  const simpleSizes: Record<number, string> = {}
  for (let i of arr) {
    simpleSizes[i] = `${factor * i + 1}rem`
  }
  return simpleSizes
}