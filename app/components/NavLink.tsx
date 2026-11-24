import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

// Nav Link component for each tab in the Nav Bar
const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} className="hover:text-gray-300">
      {children}
    </Link>
  )
}

export default NavLink
