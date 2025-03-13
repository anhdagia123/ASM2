
import { Link, Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/admin">
          Admin Dashboard
        </Link>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-light p-3" style={{ width: "250px" }}>
          <h5 className="text-center">Quản lý</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/product">
                Sản phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/product/add">
                Thêm sản phẩm
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-2">
        &copy; 2025 Admin Dashboard
      </footer>
    </div>
  );
}

export default LayoutAdmin;
