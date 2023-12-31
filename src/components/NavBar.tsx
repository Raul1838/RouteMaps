import { Link } from "react-router-dom";
import {UserDropDown} from "../auth/components/UserDropDown.tsx";

export const NavBar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: '#800080', zIndex: 2}}>
                <div className="container-fluid justify-content-between">
                    <a className="navbar-brand d-flex align-items-center" href="">
                        <img
                            src="https://www.creativefabrica.com/wp-content/uploads/2022/11/28/Map-Logo-Location-Vector-Graphics-49058452-1-580x363.jpg"
                            width="45"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo Route Maps"
                            style={{marginRight: '10px'}}
                        />
                        Route Maps
                    </a>
                    <Link to={'/places/getPlaces'}>Places</Link>
                    <UserDropDown />
                </div>
            </nav>
        </>
    )
}
