// [CHANGE: upgrade to Umbraco 17] Related: en.ts, cs.ts - ported from wwwroot/Lang/da-DK.xml
import type { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';

export default {
  limboTextBox: {
    info1: (remaining: number) => `Du har ${remaining} tegn tilbage.`,
    info2: (remaining: number) => `Du har ${remaining} tegn tilbage.`,
    info3: (limit: number) => `Du kan ikke angive mere end ${limit} tegn!`,
  },
} as UmbLocalizationDictionary;
