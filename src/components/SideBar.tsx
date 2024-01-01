import {NavLink, useLocation} from 'react-router-dom';

export const SideBar = () => {
    const location = useLocation();
    return (
        <div className="card" style={{
            position: 'fixed',
            top: '55px',
            left: '0px',
            height: 'calc(100% - 60px)',
            width: '50px',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
        }}>
            <NavLink to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} style={{ padding: '20px', textAlign: 'center', color: location.pathname === "/" ? "#0000FF" : "#000000" }}><i className="fas fa-route"></i></NavLink>
            <NavLink to="/places" className={`nav-link ${location.pathname.startsWith("/places") ? "active" : ""}`} style={{ padding: '20px', textAlign: 'center', color: location.pathname.startsWith("/places") ? "#ffa600" : "#000000" }}><i className="fas fa-map-marker-alt"></i></NavLink>
            <NavLink to="/vehicles" className={`nav-link ${location.pathname.startsWith("/vehicles") ? "active" : ""}`} style={{ padding: '20px', textAlign: 'center', color: location.pathname.startsWith("/vehicles") ? "#ff0090" : "#000000" }}><i className="fas fa-car-side"></i></NavLink>
        </div>
    );
};
