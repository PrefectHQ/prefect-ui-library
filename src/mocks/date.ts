import { MockFunction } from '@/services/Mocker'

export const randomDate: MockFunction<Date, [Date?, Date?]> = function(start, end) {
  if (!start) {
    start = new Date(0)
  }

  if (!end) {
    end = new Date()
  }

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}