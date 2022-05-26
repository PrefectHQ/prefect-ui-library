import { MockFunction } from '@/services/Mocker'

declare global {
  interface Crypto {
    randomUUID: () => string,
  }
}

// typescript says crypto will be defined but it might not be
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (crypto && !('randomUUID' in crypto)) {
  crypto.randomUUID = () => (+[1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .toString()
    .replace(/[018]/g,
      substring => (+substring ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +substring / 4).toString(16),
    )
}

export const randomId: MockFunction<string> = function() {
  return crypto.randomUUID()
}