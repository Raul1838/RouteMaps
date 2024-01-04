import {UserDropDown} from "../auth/components/UserDropDown.tsx";
import logoRouteMapsSinFondo from "../assets/logoRouteMapsSinFondo.png";

export const NavBar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: 'rgb(107,116,124)', zIndex: 2}}>
                <div className="container-fluid justify-content-between">
                    <a className="navbar-brand d-flex align-items-center" href="">
                        <img
                            src={logoRouteMapsSinFondo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo Route Maps"
                            style={{marginRight: '10px'}}
                        />
                        Route Maps
                    </a>
                    <UserDropDown />
                </div>
            </nav>
        </>
    )
}
