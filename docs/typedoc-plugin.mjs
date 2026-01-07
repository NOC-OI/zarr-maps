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
