const simpleStringify = (
  params: Partial<Record<string, string>> = {},
  encode: ((str: string) => string) | null = encodeURIComponent,
) => {
  const result = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `${key}=${encode ? encode(value as string) : value}`)
    .join('&');
  return result;
};

export const addUrlParams = (url: string, params: Record<string, string>) => {
  const result = `${url}${url.includes('?') ? '&' : '?'}${simpleStringify(params)}`;
  return result;
};
