import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/", label: "首页" },
  { to: "/atlas", label: "总览" },
  { to: "/atlas/early-tang", label: "初唐图鉴" },
  { to: "/work/early-tang-329-lotus-feitian", label: "作品详情" },
];

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <header className="site-header" aria-label="主导航">
        <NavLink className="brand-link" to="/">
          藻井集
        </NavLink>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
              end={item.to === "/"}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}
