const NavItem = ({ title, href }) => (
    <li className="nav-item active">
        <LinkPrevented className="nav-link" onClick={() => Events.call("onNavbarLinkClicked", href)}>{title}</LinkPrevented>
    </li>
)