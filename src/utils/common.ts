const simpleStringify = (params: Record<string, string | number>) => {
  const result = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return result;
};

export const addUrlParams = (url: string, params: Record<string, string | number>) => {
  const result = `${url}${url.includes('?') ? '&' : '?'}${simpleStringify(params)}`;
  return result;
};
