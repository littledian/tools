import { createContext, useCallback, useContext } from 'react';

export type Lang = 'zh_CN';

export interface LangCtxType {
  lang: Lang;
  data?: { [P in Lang]: object };
}

const LangContext = createContext<LangCtxType>({ lang: 'zh_CN' });

export const LangProvider = LangContext.Provider;

export function useLang() {
  const ctx = useContext(LangContext);
  const { lang, data } = ctx;

  return useCallback(
    (key: string): string => {
      if (!data) return key;
      const a = key.split('.');
      let o = data[lang] as any;
      let index = 0;
      if (!data[lang]) return key;

      while (o !== undefined && index < a.length) {
        o = o[a[index]];
        index++;
      }

      return o || key;
    },
    [lang, data]
  );
}
