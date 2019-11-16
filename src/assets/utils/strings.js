export function truncateWithEllipses(text, max) {
  if (typeof text === "number") {
    text = text.toString();
  }
  return text.substr(0, max - 1) + (text.length > max ? "..." : "");
}
