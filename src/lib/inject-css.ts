export function injectCss(styleString: string) {
  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
}

export function css(str: TemplateStringsArray) {
  return str.toString();
}
