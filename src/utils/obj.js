function isEmpty(string) {
  return string === undefined || string === null || string.length === 0;
}

function isNotEmpty(string) {
  return !isEmpty(string);
}
export { isEmpty, isNotEmpty };
