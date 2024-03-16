/**
 * input -> {
    metadata: {
      createAt: "....", 
      info: "...."
    }} 
 * output -> {
      "metadata.createdAt": "....",
      "metadata.info": "....",
    }
 */
export function flattenObject(obj: Record<string, any>, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}
