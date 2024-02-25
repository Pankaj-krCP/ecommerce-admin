import colorName from "color-name";

const useChangeColor = (codeOrName) => {
  let ans = codeOrName;
  const input = codeOrName.toLowerCase();
  if (input.startsWith("#")) {
    const hex = input.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    let minDistance = Number.MAX_SAFE_INTEGER;
    for (const name in colorName) {
      const [r2, g2, b2] = colorName[name];
      const distance = Math.sqrt((r2 - r) ** 2 + (g2 - g) ** 2 + (b2 - b) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        ans = name;
      }
    }
  } else {
    if (colorName[input]) {
      const [r, g, b] = colorName[input];
      ans = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }
  }
  return ans;
};

export default useChangeColor;
