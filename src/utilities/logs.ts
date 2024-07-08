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
  '30': 'text-black dark:text-black',
  '31': 'text-red-600 dark:text-red-500',
  '32': 'text-green-600 dark:text-green-500',
  '33': 'text-yellow-600 dark:text-yellow-500',
  '34': 'text-blue-600 dark:text-blue-500',
  '35': 'text-purple-600 dark:text-purple-500',
  '36': 'text-cyan-600 dark:text-cyan-500',
  '37': 'text-gray-50 dark:text-gray-100',

  // Bright colors
  '90': 'text-gray-500 dark:text-gray-300',
  '91': 'text-red-500 dark:text-red-300',
  '92': 'text-green-500 dark:text-green-300',
  '93': 'text-yellow-500 dark:text-yellow-300',
  '94': 'text-blue-500 dark:text-blue-300',
  '95': 'text-purple-500 dark:text-purple-300',
  '96': 'text-cyan-500 dark:text-cyan-300',
  '97': 'text-white',

  // Background colors
  '40': 'bg-black',
  '41': 'bg-red-500',
  '42': 'bg-green-500',
  '43': 'bg-yellow-500',
  '44': 'bg-blue-500',
  '45': 'bg-purple-500',
  '46': 'bg-cyan-500',
  '47': 'bg-gray-100',

  // Bright background colors
  '100': 'bg-gray-300',
  '101': 'bg-red-300',
  '102': 'bg-green-300',
  '103': 'bg-yellow-300',
  '104': 'bg-blue-300',
  '105': 'bg-purple-300',
  '106': 'bg-cyan-300',
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