export const parseDynamicTitle = (htmlString) => {
  if (!htmlString) return [];

  const spans = htmlString.match(/<span className='(.*?)'>(.*?)<\/span>/g);
  if (!spans) return [];

  return spans.map((span) => {
    const cls = span.match(/className='(.*?)'/)?.[1];
    const txt = span.match(/>(.*?)</)?.[1];
    return { text: txt, className: cls };
  });
};
