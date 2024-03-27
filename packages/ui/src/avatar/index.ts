import svgize from "svgize"

const SIZE = 32
const _2_32 = Math.pow(2, 32)

function _cloneEntry(entry: string) {
  return entry; // No additional cloning needed for strings
}

export const createAvatar = (doc: Document, seed?: string, opts?: { style: any }) => {
  if (!doc) return null
  seed = seed || String(Math.random())
  const entry = (() => {
    const canvas = doc.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = "64px";
    canvas.style.height = "64px";
    canvas.style.imageRendering = 'pixelated';
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("ctx not defined in createAvatar")

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return svgize.imageDataToSvg(imageData, {
      style: opts ? opts.style : undefined,
    });
  })()


  return _cloneEntry(entry)

}