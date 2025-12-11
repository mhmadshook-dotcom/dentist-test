import './Header.css'

function Header({ total }) {
  return (
    <header className="dashboard-header">
      <div className="brand">
        <h2>MyDentist Clinic</h2>
        <div className="subtitle">Patients Dashboard</div>
      </div>
      <div className="total">Total patients: <span className="count">{total}</span></div>
    </header>
  );
}
export default Header;