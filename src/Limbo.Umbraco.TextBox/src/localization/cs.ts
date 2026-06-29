// [CHANGE: upgrade to Umbraco 17] Related: en.ts, da.ts - ported from wwwroot/Lang/cs-CZ.xml
import type { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';

export default {
  limboTextBox: {
    info1: (remaining: number) => `Zbývá ${remaining} znaků.`,
    info2: (remaining: number) => `Zbývá ${remaining} znaků.`,
    info3: (limit: number) => `Nemůžete napsat více než ${limit} znaků!`,
  },
} as UmbLocalizationDictionary;
