// [CHANGE: upgrade to Umbraco 17] Related: da.ts, cs.ts - ported from wwwroot/Lang/en-US.xml
import type { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';

export default {
  limboTextBox: {
    info1: (remaining: number) => `You have ${remaining} characters remaining.`,
    info2: (remaining: number) => `You have ${remaining} characters remaining.`,
    info3: (limit: number) => `You cannot write more than ${limit} characters!`,
  },
} as UmbLocalizationDictionary;
