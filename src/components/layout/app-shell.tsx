"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useNotifications } from "@/components/notifications/notification-context";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const primaryNavigation = [
  { label: "Overview", href: "#overview", icon: "grid" },
  { label: "Properties", href: "#properties", icon: "building" },
  { label: "Payments", href: "#payments", icon: "wallet" },
  { label: "Maintenance", href: "#maintenance", icon: "wrench" },
];

const futureNavigation = [
  "Units",
  "Tenants",
  "Tenancies",
  "Arrears & credit",
  "Expenses",
  "Documents",
  "Reports",
  "Settings",
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
  const pathname = usePathname();
  const router = useRouter();
  const isTenant = pathname.startsWith("/tenant");
  const { notices } = useNotifications();
  const unreadCount = notices.filter((notice) => notice.status === "sent" && notice.recipients.includes("tenant-1") && !notice.readBy.includes("tenant-1")).length;
  const [activeHref, setActiveHref] = useState("#overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncActiveLink = () => setActiveHref(window.location.hash || "#overview");
    syncActiveLink();
    window.addEventListener("hashchange", syncActiveLink);
    return () => window.removeEventListener("hashchange", syncActiveLink);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const sidebar = document.querySelector<HTMLElement>(".sidebar.sidebar-open");
    const focusable = sidebar?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && first && last) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileNavOpen]);

  const closeMobileNavigation = () => {
    setMobileNavOpen(false);
    menuButtonRef.current?.focus();
  };
  const activeLabel = primaryNavigation.find((item) => item.href === activeHref)?.label ?? "Overview";

  return (
    <div className="app-frame">
      <a className="skip-link" href="#overview">Skip to main content</a>
      <button
        className="mobile-nav-backdrop"
        type="button"
        aria-label="Close navigation"
        hidden={!mobileNavOpen}
        onClick={closeMobileNavigation}
      />

      <aside className={mobileNavOpen ? "sidebar sidebar-open" : "sidebar"} role={mobileNavOpen ? "dialog" : undefined} aria-modal={mobileNavOpen ? true : undefined} aria-label="EstateHub navigation">
        <Link className="brand" href="#overview" aria-label="EstateHub home" onClick={() => { if (mobileNavOpen) closeMobileNavigation(); }}>
          <BrandMark />
          <span><strong>estatehub</strong><small>PROPERTY MANAGEMENT</small></span>
        </Link>

        <div className="workspace-label">WORKSPACE</div>
        {isTenant ? <nav id="primary-navigation" aria-label="Tenant navigation" className="nav-group">
          <Link className="nav-link" href="/tenant"><NavIcon name="grid" /><span>Overview</span></Link>
          
        </nav> : <nav id="primary-navigation" aria-label="Primary navigation" className="nav-group">
          {primaryNavigation.map((item) => <Link key={item.label} href={item.href} aria-label={item.label} aria-current={activeHref === item.href ? "location" : undefined} title={item.label} className={activeHref === item.href ? "nav-link active" : "nav-link"} onClick={() => { setActiveHref(item.href); if (mobileNavOpen) closeMobileNavigation(); }}>
            <NavIcon name={item.icon} /><span>{item.label}</span>{item.label === "Maintenance" && <span className="nav-count">3</span>}
          </Link>)}
        </nav>}

        <div className="workspace-label secondary-label">COMMUNICATIONS</div>
        <nav aria-label="Notifications" className="nav-group">
          <Link className="nav-link" href={isTenant ? "/tenant/notifications" : "/notifications"} onClick={() => setMobileNavOpen(false)}><NavIcon name="grid" /><span>Notifications</span>{isTenant && unreadCount > 0 && <span className="nav-count">{unreadCount}</span>}</Link>
        </nav>
        {!isTenant && <><div className="workspace-label secondary-label">MANAGE</div>
        <nav aria-label="Planned modules" className="nav-group secondary-nav">
          {futureNavigation.map((label) => (
            <span key={label} className="nav-link nav-disabled" aria-disabled="true" title={`${label} is planned for a future release`}>
              <span className="nav-dot" aria-hidden="true" />
              <span>{label}</span>
              <span className="soon-label">Planned</span>
            </span>
          ))}
        </nav></>}

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon" aria-hidden="true">?</div>
            <strong>Need a hand?</strong>
            <p>Help and guidance will be available as the workspace grows.</p>
          </div>
          <div className="profile-row">
            <div className="avatar avatar-owner" role="img" aria-label={isTenant ? "Tenant demo profile" : "Landlord demo profile"}>{isTenant ? "WN" : "BO"}</div>
            <div className="profile-copy"><strong>{isTenant ? "Wanjiku Njeri" : "Property Owner"}</strong><span>{isTenant ? "Tenant demo account" : "Landlord demo account"}</span></div>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-leading">
            <button
              ref={menuButtonRef}
              className="mobile-menu-toggle"
              type="button"
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="primary-navigation"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {mobileNavOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
            <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>{activeLabel}</strong></div>
          </div>
          <div className="topbar-actions">
            <span className="demo-indicator"><span aria-hidden="true" /> Demo environment</span>
            <label className="account-switch-label"><span className="sr-only">Preview account</span><select aria-label="Switch demo account" value={isTenant ? "tenant" : "landlord"} onChange={(event) => router.push(event.target.value === "tenant" ? "/tenant" : "/")}><option value="landlord">Landlord preview</option><option value="tenant">Tenant preview</option></select></label>
            <Link className="icon-button" href={isTenant ? "/tenant/notifications" : "/notifications"} aria-label={isTenant ? "Open tenant notifications" : "Open notification centre"} title="Open notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
            </Link>
            <div className="avatar avatar-top" role="img" aria-label={isTenant ? "Tenant demo profile" : "Landlord demo profile"}>{isTenant ? "WN" : "BO"}</div>
          </div>
        </header>
        <main id="overview" className="main-content" tabIndex={-1}>{isTenant && pathname === "/" ? <div className="sr-only">Tenant preview</div> : children}</main>
        <footer className="app-footer"><span>EstateHub <span className="footer-dot">·</span> Foundation release</span><span>Sample data only <span className="footer-dot">·</span> KSh</span></footer>
      </div>
    </div>
  );
}
