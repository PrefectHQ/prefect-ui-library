import { MockFunction } from '@/services/Mocker'
type RandomImageSize = number | { width: number, height: number }

export const randomImage: MockFunction<string, [RandomImageSize?]> = function(size) {
  let width = 100
  let height = 100

  if (size) {
    width = typeof size === 'number' ? size : size.width
    height = typeof size === 'number' ? size : size.height
  }

  return `https://picsum.photos/${width}/${height}`
}