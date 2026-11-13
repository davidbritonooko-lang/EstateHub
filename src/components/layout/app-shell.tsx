import Link from "next/link";
import type { ReactNode } from "react";

const primaryNavigation = [
  { label: "Overview", href: "#overview", icon: "grid" },
  { label: "Properties", href: "#properties", icon: "building" },
  { label: "Payments", href: "#payments", icon: "wallet" },
  { label: "Maintenance", href: "#maintenance", icon: "wrench" },
];

const futureNavigation = [
  "Tenants",
  "Tenancies",
  "Expenses",
  "Documents",
  "Reports",
];

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 14.5 16 5l12 9.5v12a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 4 26.5v-12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 28V17h10v11M9 13l7-5.5 7 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h2m3 0h2M9 11h2m3 0h2M9 15h2m3 0h2M9 21v-3h6v3" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 14h2" /></>,
    wrench: <><path d="M14.5 6.5a5 5 0 0 0-6.9 6.9L3 18l3 3 4.6-4.6a5 5 0 0 0 6.9-6.9L14 12l-3-3 3.5-2.5Z" /></>,
  };
  return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link className="brand" href="#overview" aria-label="EstateHub home">
          <BrandMark />
          <span><strong>estatehub</strong><small>PROPERTY MANAGEMENT</small></span>
        </Link>

        <div className="workspace-label">WORKSPACE</div>
        <nav aria-label="Main navigation" className="nav-group">
          {primaryNavigation.map((item, index) => (
            <Link key={item.label} href={item.href} className={index === 0 ? "nav-link active" : "nav-link"}>
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
              {item.label === "Maintenance" && <span className="nav-count">3</span>}
            </Link>
          ))}
        </nav>

        <div className="workspace-label secondary-label">MANAGE</div>
        <nav aria-label="Additional modules" className="nav-group">
          {futureNavigation.map((label) => (
            <span key={label} className="nav-link nav-disabled" aria-disabled="true" title="Planned for a future release">
              <span className="nav-dot" aria-hidden="true" />
              <span>{label}</span>
              <span className="soon-label">Soon</span>
            </span>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <strong>Need a hand?</strong>
            <p>Help and guidance will be available as the workspace grows.</p>
          </div>
          <div className="profile-row">
            <div className="avatar avatar-owner">BO</div>
            <div className="profile-copy"><strong>Property Owner</strong><span>Demo workspace</span></div>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <span className="demo-indicator"><span /> Demo environment</span>
            <button className="icon-button" type="button" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
              <i />
            </button>
            <div className="avatar avatar-top" aria-label="Demo profile">BO</div>
          </div>
        </header>
        <main id="overview" className="main-content">{children}</main>
        <footer className="app-footer"><span>EstateHub <span className="footer-dot">·</span> Foundation release</span><span>Sample data only <span className="footer-dot">·</span> KSh</span></footer>
      </div>
    </div>
  );
}
