import { NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/", label: "首页", exact: true },
  { to: "/atlas", label: "总览", exact: true },
  { to: "/atlas/early-tang", label: "图鉴", prefix: "/atlas/" },
  { to: "/work/early-tang-329-lotus-feitian", label: "详情", prefix: "/work/" },
];

export function SiteShell({ children }: SiteShellProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="site-shell">
      <header className="site-header" aria-label="主导航">
        <NavLink className="brand-link" to="/">
          <img
            src="https://i.ibb.co/B5Xcw4st/logo-1.png"
            alt="藻井集"
            referrerPolicy="no-referrer"
            style={{
              height: "38.4px",
              width: "auto",
              display: "block",
            }}
          />
        </NavLink>
        <nav className="site-nav">
          {navItems.map((item) => {
            let isActive = false;
            if (item.exact) {
              isActive = currentPath === item.to;
            } else if (item.prefix) {
              isActive = currentPath.startsWith(item.prefix);
            }

            return (
              <NavLink
                className={() =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}
