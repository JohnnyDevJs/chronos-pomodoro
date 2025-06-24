import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

type RouterLinkProps = {
  children: ReactNode
  href: string
} & ComponentProps<'a'>

export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}
