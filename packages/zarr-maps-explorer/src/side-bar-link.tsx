import { createElement, type ElementType, type JSX, type MouseEvent } from 'react';

interface SideBarLinkProps {
  active?: boolean;
  icon: ElementType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  title?: string;
  id?: string;
  iconOnly?: boolean;
}

export function SideBarLink({
  active = false,
  icon,
  onClick,
  href,
  title = '',
  id = '',
  iconOnly = false
}: SideBarLinkProps): JSX.Element {
  const className = iconOnly
    ? `sidebar-icon-link flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/8 ${active ? 'bg-white/8 text-[#d49511]!' : ''}`
    : `sidebar-link ${active ? 'sidebar-link--active' : ''}`;
  const content = (
    <>
      {createElement(icon, { fontSize: 'small' })}
      {!iconOnly && <span>{title}</span>}
    </>
  );
  if (href)
    return (
      <a
        className={className}
        title={title}
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  return (
    <button type="button" className={className} title={title} id={id} onClick={onClick}>
      {content}
    </button>
  );
}
