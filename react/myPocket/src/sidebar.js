const SideBar = ({ items }) => (
    <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column mt-3">
                {items.map((item, index) => <SideBarItem title={item.title} href={item.href} icon={item.icon} key={index} />)}
            </ul>
        </div>
    </nav>
)