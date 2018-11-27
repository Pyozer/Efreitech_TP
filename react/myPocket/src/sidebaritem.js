const SideBarItem = ({ title, href, icon }) => (
    <li className="nav-item">
        <LinkPrevented className="nav-link text-dark" onClick={() => Events.call("onNavbarLinkClicked", href)}>
            <i className={icon + ' mr-3'}></i> {title}
        </LinkPrevented>
    </li>
)