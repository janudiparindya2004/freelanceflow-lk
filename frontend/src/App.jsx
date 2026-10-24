import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="brand">FreelanceFlow <span>LK</span></h2>

        <p className="menu-label">MENU</p>
        <nav>
          <a href="#dashboard" className="nav-link active">▦ Dashboard</a>
          <a href="#clients" className="nav-link">♙ Clients</a>
          <a href="#projects" className="nav-link">▣ Projects</a>
          <a href="#transactions" className="nav-link">↕ Transactions</a>
          <a href="#invoices" className="nav-link">▤ Invoices</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">FF</div>
          <div>
            <strong>My Workspace</strong>
            <small>Freelancer Account</small>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="welcome">WELCOME BACK!</p>
            <h1>Dashboard</h1>
            <p className="subtitle">Here's what's happening with your business.</p>
          </div>
          <button className="primary-btn">+ New Project</button>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <p>Total Income</p>
            <h2>Rs. 0.00</h2>
            <span className="card-note">Your total earnings</span>
            <div className="card-icon income">↗</div>
          </div>

          <div className="summary-card">
            <p>Total Expenses</p>
            <h2>Rs. 0.00</h2>
            <span className="card-note">Your business costs</span>
            <div className="card-icon expense">↘</div>
          </div>

          <div className="summary-card">
            <p>Net Profit</p>
            <h2>Rs. 0.00</h2>
            <span className="card-note">Income minus expenses</span>
            <div className="card-icon profit">₨</div>
          </div>

          <div className="summary-card">
            <p>Pending Invoices</p>
            <h2>0</h2>
            <span className="card-note">Awaiting payment</span>
            <div className="card-icon pending">◷</div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>Recent Transactions</h3>
                <p>Your latest income and expenses</p>
              </div>
              <a href="#transactions">View all</a>
            </div>

            <div className="empty-state">
              <div className="empty-icon">↕</div>
              <h4>No transactions yet</h4>
              <p>Your income and expenses will appear here.</p>
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>Project Overview</h3>
                <p>Track your active work</p>
              </div>
              <a href="#projects">View all</a>
            </div>

            <div className="project-stats">
              <div><span className="dot blue"></span> Active Projects <strong>0</strong></div>
              <div><span className="dot green"></span> Completed Projects <strong>0</strong></div>
              <div><span className="dot orange"></span> Pending Projects <strong>0</strong></div>
            </div>

            <div className="project-message">
              Your projects will appear here once you add them.
            </div>
          </div>
        </section>

        <footer>
          <p>© 2026 FreelanceFlow LK · Manage your business smarter.</p>
        </footer>
      </main>
    </div>
  )
}

export default App