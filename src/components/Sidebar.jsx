import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>QuranDash</h2>
      <div className="sidebar-links">
        <Link to="/">📖 Dashboard</Link>
        <p>🔎 Explore</p>
        <p>🕌 Surahs</p>
      </div>
    </aside>
  );
}

export default Sidebar;