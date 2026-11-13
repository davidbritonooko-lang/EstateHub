"use client";

import { maintenanceRequests, monthlyCollection, payments, properties } from "@/data/demo-data";

const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

function MetricIcon({ kind }: { kind: "building" | "users" | "wallet" | "trend" }) {
  const content = {
    building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h2m3 0h2M9 11h2m3 0h2M9 15h2m3 0h2M9 21v-3h6v3" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8a4 4 0 0 1-3 3.87M20 21v-2a4 4 0 0 0-3-3.87" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 14h2" /></>,
    trend: <><path d="m3 16 6-6 4 4 8-9M15 5h6v6" /></>,
  }[kind];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{content}</svg>;
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
      {action && <a className="text-link" href="#properties">{action}<span aria-hidden="true"> ↗</span></a>}
    </div>
  );
}

export function Dashboard() {
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
  const occupiedUnits = properties.reduce((sum, property) => sum + property.occupiedUnits, 0);
  const monthlyRent = properties.reduce((sum, property) => sum + property.monthlyRent, 0);

  const metrics = [
    { label: "Total properties", value: String(properties.length).padStart(2, "0"), note: "Across your portfolio", kind: "building" as const, tone: "blue" },
    { label: "Occupied units", value: `${occupiedUnits} / ${totalUnits}`, note: "89% occupancy rate", kind: "users" as const, tone: "violet" },
    { label: "Monthly rent roll", value: currency.format(monthlyRent), note: "Expected this month", kind: "wallet" as const, tone: "green" },
    { label: "Rent outstanding", value: currency.format(86500), note: "Across 7 tenant accounts", kind: "trend" as const, tone: "amber" },
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">SATURDAY, 14 NOVEMBER 2026</div>
          <h1>Good morning, <span>there.</span></h1>
          <p>Here&apos;s what&apos;s happening across your properties today.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-secondary" type="button" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" /></svg>
            Export overview
          </button>
          <a className="button button-primary" href="#properties"><span aria-hidden="true">＋</span> View properties</a>
        </div>
      </div>

      <section className="metric-grid" aria-label="Portfolio summary">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <div className="metric-top"><span>{metric.label}</span><span className={`metric-icon ${metric.tone}`}><MetricIcon kind={metric.kind} /></span></div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-note"><span className="note-dot" />{metric.note}</div>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel collection-panel">
          <SectionHeading title="Rent collection" subtitle="Collection performance over the last 6 months" />
          <div className="collection-summary">
            <div><span className="summary-label">Collected this month</span><strong>{currency.format(714000)}</strong></div>
            <div className="collection-rate"><strong>82%</strong><span>of expected rent</span></div>
          </div>
          <div className="chart" role="img" aria-label="Monthly rent collection: June 72 percent, July 84 percent, August 78 percent, September 91 percent, October 86 percent, November 68 percent.">
            <div className="chart-grid-lines"><span /><span /><span /><span /></div>
            <div className="chart-bars">
              {monthlyCollection.map((item) => (
                <div className="chart-column" key={item.month}>
                  <div className={item.month === "Nov" ? "chart-bar current" : "chart-bar"} style={{ height: `${item.collected}%` }}><span>{item.collected}%</span></div>
                  <span className="chart-month">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend"><span><i className="legend-current" /> Current month</span><span><i className="legend-history" /> Previous months</span></div>
        </article>

        <article className="panel attention-panel">
          <SectionHeading title="Needs attention" subtitle="Items that may need your review" />
          <div className="attention-list">
            <div className="attention-item"><span className="attention-icon overdue">!</span><div><strong>7 rent balances overdue</strong><p>Tenants with outstanding rent balances</p></div><span className="attention-arrow">›</span></div>
            <div className="attention-item"><span className="attention-icon pending">↻</span><div><strong>1 payment to confirm</strong><p>Review before recording as received</p></div><span className="attention-arrow">›</span></div>
            <div className="attention-item"><span className="attention-icon maintenance">⌂</span><div><strong>3 maintenance requests</strong><p>Open or scheduled work orders</p></div><span className="attention-arrow">›</span></div>
          </div>
          <div className="attention-foot">Demo figures are illustrative, not live account data.</div>
        </article>
      </section>

      <section className="panel properties-panel" id="properties">
        <SectionHeading title="Your properties" subtitle="A quick look at your property portfolio" action="All properties" />
        <div className="property-grid">
          {properties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className={`property-art art-${property.accent}`}>
                <div className="building-illustration" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
                <span className="property-initials">{property.initials}</span>
              </div>
              <div className="property-details">
                <div className="property-title-row"><h3>{property.name}</h3><span className={property.status === "Occupied" ? "status-pill status-good" : "status-pill status-warn"}>{property.status}</span></div>
                <p className="property-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{property.location}</p>
                <div className="occupancy-row"><span>Occupancy</span><strong>{property.occupiedUnits}/{property.units} units</strong></div>
                <div className="occupancy-track"><span style={{ width: `${(property.occupiedUnits / property.units) * 100}%` }} /></div>
                <div className="property-rent"><span>Monthly rent roll</span><strong>{currency.format(property.monthlyRent)}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-grid">
        <article className="panel payments-panel" id="payments">
          <SectionHeading title="Recent payments" subtitle="Latest payment activity across your units" action="View all" />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Tenant</th><th>Property / Unit</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <td><div className="tenant-cell"><span className={`avatar tenant-avatar tenant-${index}`}>{payment.tenant.split(" ").map((part) => part[0]).join("")}</span><span><strong>{payment.tenant}</strong><small>{payment.id}</small></span></div></td>
                    <td><strong className="table-primary">{payment.property}</strong><small className="table-secondary">Unit {payment.unit}</small></td>
                    <td className="amount-cell">{currency.format(payment.amount)}</td>
                    <td className="date-cell">{payment.date}</td>
                    <td><span className={payment.status === "Confirmed" ? "status-pill status-good" : "status-pill status-pending"}>{payment.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel maintenance-panel" id="maintenance">
          <SectionHeading title="Maintenance" subtitle="Recent maintenance activity" action="View all" />
          <div className="maintenance-list">
            {maintenanceRequests.map((request) => (
              <div className="maintenance-item" key={request.id}>
                <div className="maintenance-symbol">⌂</div>
                <div className="maintenance-copy"><strong>{request.title}</strong><span>{request.property} · {request.unit}</span><div className="maintenance-meta"><span className={`priority priority-${request.priority.toLowerCase()}`}>{request.priority} priority</span><span>{request.status}</span></div></div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <p className="demo-disclaimer"><span aria-hidden="true">ⓘ</span> You&apos;re viewing a sample workspace. All properties, tenant names, payment entries and financial figures are fictional demonstration data.</p>
    </>
  );
}
