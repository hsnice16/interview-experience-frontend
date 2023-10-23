export function isValidHttpUrl(url: string) {
  let _url;

  try {
    _url = new URL(url);
  } catch (_) {
    return false;
  }

  return ["http:", "https:"].includes(_url.protocol);
}
