import { MockFunction } from '@/services/Mocker'

export const randomImage: MockFunction<string> = function(size?: number | { width: number, height: number }) {
  let width = 100
  let height = 100

  if (size) {
    width = typeof size === 'number' ? size : size.width
    height = typeof size === 'number' ? size : size.height
  }

  return `https://picsum.photos/${width}/${height}`
}