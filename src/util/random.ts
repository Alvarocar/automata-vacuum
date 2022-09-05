import { isEmpty } from "lodash"

export function getRandomInt(min: number = 0, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomItemArray<T>(array: Array<T>): T | undefined {
  if (isEmpty(array)) return
  return array[getRandomInt(0, array.length - 1)]
}

export const randomEnumValue = (enumeration: any) => {
  const values = Object.keys(enumeration);
  const enumKey = values[Math.floor(Math.random() * values.length)];
  return enumeration[enumKey];
}