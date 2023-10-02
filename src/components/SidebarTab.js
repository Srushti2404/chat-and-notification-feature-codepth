export default function SidebarTab({ onClick, isActive, children }) {
  return (
    <div
      onClick={onClick}
      className={`${isActive ? 'sidebar__menu--selected' : ''}`}
    >
      {children}
    </div>
  )
}
