
export function arrayEquals(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  first.sort();
  second.sort();
  return first.every((item, index) => item === second[index]);
}
