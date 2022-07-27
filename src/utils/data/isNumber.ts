/**
 * 在刨除前后空格之后, 该字符串是否完全是数字
 * @param x 待检测的字符串
 */
export const isNumber = (x: string): boolean => {
  return !isNaN(Number(x))
}
