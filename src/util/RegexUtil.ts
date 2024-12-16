/**
 * Array에 포함되는 값이 있는지 검사
 * @param array Array<any>
 * @returns string(regex)
 */
export const arrayToRegExp = (array: Array<any>): RegExp => {
  return new RegExp(array.map((value) => `^${value}$`).join('|'))
}
