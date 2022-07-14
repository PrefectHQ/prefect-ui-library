import { en } from '@/localization/locale/en'

function getLocalizationModule(locale: string): typeof en {
  switch (locale) {
    default:
      return en
  }
}

export const localization = getLocalizationModule('en')