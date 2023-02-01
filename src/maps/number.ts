import { MapFunction } from '@/services/Mapper'

export const mapStringToNumber: MapFunction<string, number> = function(source) {
  return parseFloat(source)
}

export const mapNumberToString: MapFunction<number, string> = function(source) {
  return source.toLocaleString()
}