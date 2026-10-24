
import { useState } from "react";
import "./App.css";

const initialClients = [
  { id: 1, name: "Acme Solutions", email: "hello@acme.com", phone: "0771234567" },
  { id: 2, name: "Bright Studio", email: "info@bright.lk", phone: "0712345678" },
  { id: 3, name: "Nova Digital", email: "contact@nova.lk", phone: "0761234567" },
];

const initialProjects = [
  { id: 1, name: "Business Website", client: "Acme Solutions", budget: 85000, status: "In Progress", dueDate: "2026-11-15" },
  { id: 2, name: "Portfolio Design", client: "Bright Studio", budget: 45000, status: "Completed", dueDate: "2026-10-20" },
  { id: 3, name: "Online Store", client: "Nova Digital", budget: 120000, status: "Pending", dueDate: "2026-12-10" },
];

const initialTransactions = [
  { id: 1, title: "Website development", type: "Income", category: "Project payment", amount: 45000, date: "2026-10-20" },
  { id: 2, title: "Domain and hosting", type: "Expense", category: "Software", amount: 8500, date: "2026-10-18" },
  { id: 3, title: "UI design payment", type: "Income", category: "Project payment", amount: 25000, date: "2026-10-15" },
];

const initialInvoices = [
  { id: 1, number: "INV-001", client: "Acme Solutions", amount: 40000, dueDate: "2026-11-05", status: "Pending" },
  { id: 2, number: "INV-002", client: "Bright Studio", amount: 25000, dueDate: "2026-10-25", status: "Paid" },
  { id: 3, number: "INV-003", client: "Nova Digital", amount: 30000, dueDate: "2026-11-12", status: "Overdue" },
];

const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "Clients", icon: "♙" },
  { name: "Projects", icon: "▣" },
  { name: "Transactions", icon: "↕" },
  { name: "Invoices", icon: "▤" },
];

function money(amount) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PageHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && (
        <button className="primary-button" onClick={onAction}>
          + {action}
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge ${className}`}>{status}</span>;
}

function StatCard({ label, value, icon, note, color }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${color}`}>{icon}</span>
        <span className="stat-note">{note}</span>
      </div>
      <p className="stat-label">{label}</p>
      <h2>{value}</h2>
    </article>
  );
}

function EmptyState({ message }) {
  return <div className="empty-state">{message}</div>;
}

function Dashboard({ clients, projects, transactions, invoices, setPage }) {
  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const pending = invoices
    .filter((item) => item.status !== "Paid")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your freelance business."
      />

      <section className="stats-grid">
        <StatCard label="Total Income" value={money(income)} icon="↗" note="Recorded income" color="green" />
        <StatCard label="Total Expenses" value={money(expenses)} icon="↘" note="Recorded expenses" color="red" />
        <StatCard label="Net Profit" value={money(income - expenses)} icon="◈" note="Income minus expenses" color="purple" />
        <StatCard label="Outstanding Invoices" value={money(pending)} icon="▤" note="Not yet paid" color="orange" />
      </section>

      <section className="overview-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h3>Recent Transactions</h3>
              <p>Your latest recorded financial activities</p>
            </div>
            <button className="text-button" onClick={() => setPage("Transactions")}>View all →</button>
          </div>

          {recent.length === 0 ? <EmptyState message="No transactions yet. Add your first transaction." /> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Description</th><th>Date</th><th>Type</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {recent.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.title}</strong><small>{item.category}</small></td>
                      <td>{item.date}</td>
                      <td><StatusBadge status={item.type} /></td>
                      <td className={item.type === "Income" ? "income-text" : "expense-text"}>
                        {item.type === "Income" ? "+" : "-"}{money(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <h3>Project Overview</h3>
              <p>Current project progress</p>
            </div>
            <button className="text-button" onClick={() => setPage("Projects")}>View all →</button>
          </div>
          {projects.length === 0 ? <EmptyState message="No projects added yet." /> : (
            <div className="project-list">
              {projects.slice(0, 4).map((project) => (
                <div className="project-item" key={project.id}>
                  <div className="project-symbol">▣</div>
                  <div className="project-info">
                    <strong>{project.name}</strong>
                    <small>{project.client}</small>
                    <div className="progress-track">
                      <div className={`progress-fill ${project.status === "Completed" ? "complete" : ""}`}
                        style={{ width: project.status === "Completed" ? "100%" : project.status === "In Progress" ? "60%" : "20%" }} />
                    </div>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-action-grid">
          <button onClick={() => setPage("Clients")}><span>♙</span><strong>Manage Clients</strong><small>View and add clients</small></button>
          <button onClick={() => setPage("Projects")}><span>▣</span><strong>Manage Projects</strong><small>Track your work</small></button>
          <button onClick={() => setPage("Transactions")}><span>↕</span><strong>Record Transaction</strong><small>Track income and costs</small></button>
          <button onClick={() => setPage("Invoices")}><span>▤</span><strong>Manage Invoices</strong><small>Check payment status</small></button>
        </div>
      </section>
    </>
  );
}

function Clients({ clients, setClients }) {
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filtered = clients.filter((client) =>
    `${client.name} ${client.email}`.toLowerCase().includes(search.toLowerCase())
  );

  function addClient(event) {
    event.preventDefault();
    setClients((previous) => [
      ...previous,
      { id: Date.now(), name: name.trim(), email: email.trim(), phone: phone.trim() },
    ]);
    setName("");
    setEmail("");
    setPhone("");
    setFormOpen(false);
  }

  return (
    <>
      <PageHeader title="Clients" subtitle="Manage your freelance clients and their contact details."
        action="Add Client" onAction={() => setFormOpen(!formOpen)} />

      {formOpen && (
        <form className="panel form-panel" onSubmit={addClient}>
          <h3>Add New Client</h3>
          <div className="form-grid">
            <label>Client name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter client name" /></label>
            <label>Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.com" /></label>
            <label>Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" /></label>
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button>
            <button className="primary-button" type="submit">Save Client</button>
          </div>
        </form>
      )}

      <section className="panel">
        <div className="list-toolbar">
          <h3>All Clients <span className="count-pill">{clients.length}</span></h3>
          <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." />
        </div>
        {filtered.length === 0 ? <EmptyState message="No clients found." /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Client</th><th>Email</th><th>Phone</th><th>Action</th></tr></thead>
              <tbody>{filtered.map((client) => (
                <tr key={client.id}>
                  <td><div className="client-name"><span className="avatar">{client.name.charAt(0).toUpperCase()}</span><strong>{client.name}</strong></div></td>
                  <td>{client.email}</td><td>{client.phone || "—"}</td>
                  <td><button className="delete-button" onClick={() => {
                    if (window.confirm(`Delete ${client.name}?`)) setClients((old) => old.filter((item) => item.id !== client.id));
                  }}>Delete</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function Projects({ projects, setProjects, clients }) {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [budget, setBudget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  function addProject(event) {
    event.preventDefault();
    setProjects((old) => [...old, {
      id: Date.now(), name: name.trim(), client, budget: Number(budget), dueDate, status,
    }]);
    setName(""); setClient(""); setBudget(""); setDueDate(""); setStatus("Pending");
    setFormOpen(false);
  }

  return (
    <>
      <PageHeader title="Projects" subtitle="Organise projects, budgets, deadlines and progress."
        action="Add Project" onAction={() => setFormOpen(!formOpen)} />

      {formOpen && (
        <form className="panel form-panel" onSubmit={addProject}>
          <h3>Create Project</h3>
          <div className="form-grid">
            <label>Project name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Company Website" /></label>
            <label>Client
              <select required value={client} onChange={(e) => setClient(e.target.value)}>
                <option value="">Select client</option>
                {clients.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
              </select>
            </label>
            <label>Budget (LKR)<input required type="number" min="1" value={budget} onChange={(e) => setBudget(e.target.value)} /></label>
            <label>Due date<input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></label>
            <label>Status<select value={status} onChange={(e) => setStatus(e.target.value)}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label>
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className="primary-button">Save Project</button>
          </div>
        </form>
      )}

      <section className="panel">
        <div className="list-toolbar"><h3>All Projects <span className="count-pill">{projects.length}</span></h3></div>
        {projects.length === 0 ? <EmptyState message="No projects yet. Add your first project." /> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Project</th><th>Client</th><th>Budget</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{projects.map((project) => (
              <tr key={project.id}>
                <td><strong>{project.name}</strong></td><td>{project.client}</td><td>{money(project.budget)}</td><td>{project.dueDate}</td><td>
                  <select className="status-select" aria-label={`Status for ${project.name}`} value={project.status} onChange={(e) => setProjects((old) => old.map((item) => item.id === project.id ? { ...item, status: e.target.value } : item))}>
                    <option>Pending</option><option>In Progress</option><option>Completed</option>
                  </select>
                </td>
                <td><button className="delete-button" onClick={() => {
                  if (window.confirm(`Delete ${project.name}?`)) setProjects((old) => old.filter((item) => item.id !== project.id));
                }}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </>
  );
}

function Transactions({ transactions, setTransactions }) {
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("Project payment");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function addTransaction(event) {
    event.preventDefault();
    setTransactions((old) => [...old, {
      id: Date.now(), title: title.trim(), type, category, amount: Number(amount), date,
    }]);
    setTitle(""); setAmount(""); setFormOpen(false);
  }

  return (
    <>
      <PageHeader title="Transactions" subtitle="Track all your business income and expenses."
        action="Add Transaction" onAction={() => setFormOpen(!formOpen)} />

      {formOpen && (
        <form className="panel form-panel" onSubmit={addTransaction}>
          <h3>Record Transaction</h3>
          <div className="form-grid">
            <label>Description<input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Website payment" /></label>
            <label>Type<select value={type} onChange={(e) => setType(e.target.value)}><option>Income</option><option>Expense</option></select></label>
            <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Project payment</option><option>Software</option><option>Equipment</option><option>Transport</option><option>Other</option></select></label>
            <label>Amount (LKR)<input required type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
            <label>Date<input required type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className="primary-button">Save Transaction</button>
          </div>
        </form>
      )}

      <section className="panel">
        <div className="list-toolbar"><h3>All Transactions <span className="count-pill">{transactions.length}</span></h3></div>
        {transactions.length === 0 ? <EmptyState message="No transactions recorded yet." /> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Type</th><th>Amount</th><th>Action</th></tr></thead>
            <tbody>{[...transactions].sort((a, b) => b.date.localeCompare(a.date)).map((item) => (
              <tr key={item.id}><td><strong>{item.title}</strong></td><td>{item.category}</td><td>{item.date}</td><td><StatusBadge status={item.type} /></td>
                <td className={item.type === "Income" ? "income-text" : "expense-text"}>{item.type === "Income" ? "+" : "-"}{money(item.amount)}</td>
                <td><button className="delete-button" onClick={() => {
                  if (window.confirm("Delete this transaction?")) setTransactions((old) => old.filter((row) => row.id !== item.id));
                }}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </>
  );
}

function Invoices({ invoices, setInvoices }) {
  const [formOpen, setFormOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  function addInvoice(event) {
    event.preventDefault();
    setInvoices((old) => [...old, {
      id: Date.now(), number: number.trim(), client, amount: Number(amount), dueDate, status: "Pending",
    }]);
    setNumber(""); setClient(""); setAmount(""); setDueDate("");
    setFormOpen(false);
  }

  return (
    <>
      <PageHeader title="Invoices" subtitle="Manage client invoices and monitor payment status."
        action="Create Invoice" onAction={() => setFormOpen(!formOpen)} />

      {formOpen && (
        <form className="panel form-panel" onSubmit={addInvoice}>
          <h3>Create Invoice</h3>
          <div className="form-grid">
            <label>Invoice number<input required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="INV-004" /></label>
            <label>Client name<input required value={client} onChange={(e) => setClient(e.target.value)} placeholder="Enter client name" /></label>
            <label>Amount (LKR)<input required type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
            <label>Due date<input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></label>
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className="primary-button">Save Invoice</button>
          </div>
        </form>
      )}

      <section className="panel">
        <div className="list-toolbar"><h3>All Invoices <span className="count-pill">{invoices.length}</span></h3></div>
        {invoices.length === 0 ? <EmptyState message="No invoices created yet." /> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{invoices.map((invoice) => (
              <tr key={invoice.id}><td><strong>{invoice.number}</strong></td><td>{invoice.client}</td><td>{money(invoice.amount)}</td><td>{invoice.dueDate}</td>
                <td><select className="status-select" aria-label={`Status for ${invoice.number}`} value={invoice.status} onChange={(e) => setInvoices((old) => old.map((item) => item.id === invoice.id ? { ...item, status: e.target.value } : item))}>
                  <option>Pending</option><option>Paid</option><option>Overdue</option>
                </select></td>
                <td><button className="delete-button" onClick={() => {
                  if (window.confirm(`Delete ${invoice.number}?`)) setInvoices((old) => old.filter((item) => item.id !== invoice.id));
                }}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [clients, setClients] = useState(initialClients);
  const [projects, setProjects] = useState(initialProjects);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [invoices, setInvoices] = useState(initialInvoices);

  const pageContent = {
    Dashboard: <Dashboard clients={clients} projects={projects} transactions={transactions} invoices={invoices} setPage={setPage} />,
    Clients: <Clients clients={clients} setClients={setClients} />,
    Projects: <Projects projects={projects} setProjects={setProjects} clients={clients} />,
    Transactions: <Transactions transactions={transactions} setTransactions={setTransactions} />,
    Invoices: <Invoices invoices={invoices} setInvoices={setInvoices} />,
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">F</div>
          <div><strong>FreelanceFlow</strong><span>LK · WORKSPACE</span></div>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-menu">
          {navigation.map((item) => (
            <button key={item.name} className={`nav-item ${page === item.name ? "active" : ""}`} onClick={() => setPage(item.name)}>
              <span className="nav-icon">{item.icon}</span>{item.name}
              {item.name === "Invoices" && <span className="nav-count">{invoices.filter((invoice) => invoice.status !== "Paid").length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card"><span>✦</span><strong>Keep your work flowing</strong><p>Manage your clients, projects and finances in one place.</p></div>
          <div className="profile">
            <div className="profile-avatar">F</div>
            <div><strong>Freelancer</strong><small>Personal workspace</small></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{page}</strong></div>
          <div className="topbar-right"><span className="online-dot" /> All changes are local <div className="top-avatar">F</div></div>
        </header>

        <div className="page-content">
          {pageContent[page]}
          <footer className="app-footer">FreelanceFlow LK <span>·</span> Personal freelance management workspace</footer>
        </div>
      </main>
    </div>
  );
}
