import NextLink, { LinkProps } from 'next/link';
import { HTMLProps } from 'react';

type CustomLinkProps = {
 href: string;
} & LinkProps &
 HTMLProps<HTMLAnchorElement>;

const Link: React.FC<CustomLinkProps> = ({ children, as, href, replace, scroll, shallow, passHref, ...props }) => {
 if (href.includes('http') || href.includes('https') || href.includes('png')) {
  return (
   <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
   </a>
  );
 }
 if (href.includes('mailto:')) {
  return <a href={href}>{children}</a>;
 }

 return (
  <NextLink as={as} href={href} passHref={passHref} replace={replace} scroll={scroll} shallow={shallow}>
   <a {...props}>{children}</a>
  </NextLink>
 );
};

export default Link;
