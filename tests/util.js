
export function splitByNewline(textContent) {
  return textContent.trim().split('\n').map(s => s.trim()).filter(s => !!s);
}
