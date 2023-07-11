export type JsonSafeStringify = {
  success: boolean,
  value: unknown,
}

export function jsonSafeStringify(value: unknown): JsonSafeStringify {
  try {
    const stringified = JSON.stringify(value)

    return {
      success: true,
      value: stringified,
    }
  } catch {
    // silence is golden
  }

  return {
    success: false,
    value,
  }
}