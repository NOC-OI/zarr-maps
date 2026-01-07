import { ReflectionKind } from 'typedoc';

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.converter.on('resolveEnd', ctx => {
    const project = ctx.project;
    project.getReflectionsByKind(ReflectionKind.Variable).forEach(r => project.removeReflection(r));
  });

  app.renderer.on('endPage', page => {
    if (!page?.contents || typeof page.contents !== 'string') return;

    const src = page.contents;

    const parts = src.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g);

    const escaped = parts
      .map(part => {
        const isFence = part.startsWith('```') || part.startsWith('~~~');
        if (isFence) return part;

        return part.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
      })
      .join('');

    page.contents = escaped;
  });
}
No routes matched location "/zarr-maps/"
overrideMethod @ hook.js:608
Tr @ index-Bblj1aLS.js:10
Dx @ index-Bblj1aLS.js:12
QC @ index-Bblj1aLS.js:10
fR @ index-Bblj1aLS.js:12
H5 @ index-Bblj1aLS.js:9
f7 @ index-Bblj1aLS.js:9
Bp @ index-Bblj1aLS.js:9
pg @ index-Bblj1aLS.js:9
dT @ index-Bblj1aLS.js:9
z7 @ index-Bblj1aLS.js:9
ug @ index-Bblj1aLS.js:9
Rg @ index-Bblj1aLS.js:9
a0 @ index-Bblj1aLS.js:2Understand this warning
