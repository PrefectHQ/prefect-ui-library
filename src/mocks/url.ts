import { MockFunction } from '@/services/Mocker'

const endings = ['com', 'net', 'io', 'org']

export const randomUrl: MockFunction<string, [boolean?]> = function(ssl) {
  const secure = ssl ?? this.create('boolean')

  const protocol = secure ? 'https' : 'http'
  const subdomain = this.create('noun')
  const domain = this.create('noun')
  const ending = endings[this.create('number', [0, endings.length - 1])]

  return `${protocol}://${subdomain}.${domain}.${ending}`
}