import Link from "next/link";
import { DEMO_DATA_NOTICE } from "@/data/demo/appointments";

const navigation = [{ href: "/", label: "Resumen ejecutivo" }, { href: "/radar", label: "Radar de oportunidades" }];

export function AppShell({ children, active }: { children: React.ReactNode; active: string }) {
  return <div className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand"><span className="brand-mark">D</span><span>DIME <b>INTELLIGENCE</b></span></Link>
      <p className="brand-subtitle">De datos operativos<br />a decisiones gerenciales</p>
      <nav>{navigation.map((item) => <Link key={item.href} href={item.href} className={active === item.href ? "nav-link active" : "nav-link"}>{item.label}</Link>)}</nav>
      <div className="sidebar-footer"><span className="dot" /> Prototipo de aprendizaje</div>
    </aside>
    <main className="main-content"><div className="demo-banner">{DEMO_DATA_NOTICE}</div>{children}</main>
  </div>;
}
