import { LogLevel } from '@/models'

export function logLevelLabel(level: LogLevel): string {
  const [first] = level.toString()

  switch (first) {
    case '5':
      return 'Critical'
    case '4':
      return 'Error'
    case '3':
      return 'Warning'
    case '2':
      return 'Info'
    case '1':
      return 'Debug'
    default:
      return 'Custom'
  }
}

export const ansiToTailwind: Record<string, string> = {
// Regular colors
  '30': 'text-black',
  '31': 'text-red-600',
  '32': 'text-green-600',
  '33': 'text-yellow-600',
  '34': 'text-blue-600',
  '35': 'text-purple-600',
  '36': 'text-cyan-600',
  '37': 'text-gray-200',

  // Bright colors
  '90': 'text-gray-500',
  '91': 'text-red-500',
  '92': 'text-green-500',
  '93': 'text-yellow-500',
  '94': 'text-blue-500',
  '95': 'text-purple-500',
  '96': 'text-cyan-500',
  '97': 'text-white',

  // Background colors
  '40': 'bg-black',
  '41': 'bg-red-600',
  '42': 'bg-green-600',
  '43': 'bg-yellow-600',
  '44': 'bg-blue-600',
  '45': 'bg-purple-600',
  '46': 'bg-cyan-600',
  '47': 'bg-gray-200',

  // Bright background colors
  '100': 'bg-gray-500',
  '101': 'bg-red-500',
  '102': 'bg-green-500',
  '103': 'bg-yellow-500',
  '104': 'bg-blue-500',
  '105': 'bg-purple-500',
  '106': 'bg-cyan-500',
  '107': 'bg-white',

  // Text styling
  '1': 'font-bold',
  '2': 'opacity-75',
  '3': 'italic',
  '4': 'underline',
  '9': 'line-through',

  // Reset
  '0': '',
}

// eslint-disable-next-line no-control-regex
export const ansiiColorRegex = /\u001b\[(\d+)m/g