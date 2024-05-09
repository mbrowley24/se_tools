import React from "react";
import { Link } from "react-router-dom";
import "../../css/header/header.css";
import "../../css/header/drop_down.css";



function Header() {
  return (
    <header>
            <div className="">
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li className="dropdown">
                            <a href="#">Education</a>
                            <div className="dropdown-content">
                                <Link to={""}>DDoS</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a>Discovery Questions</a>
                            <div className="dropdown-content">
                                <Link to='/discoveryquestions'>Questions</Link>
                                <Link to='/discoveryquestions/templates'>Templates</Link>
                            </div>
                        </li>
                        {/* <li className="dropdown">
                            <a href="#">Other Resources</a>
                            <div className="dropdown-content">
                                <a href="{% url "apps.other_resources:ddos" %}">DDoS</a>
                                <a href="mailto:yeoman@yeomanswork.net?subject=Report Bug Average SE!">Report Bug</a>
                                <a href="{% url "apps.user:privacy_policy" %}">Privacy</a>
                                <a href="{% url "apps.user:about_us" %}">About Us</a>
                            </div>
                        </li> */}
                        <li className="dropdown">
                            <a href="#">Help</a>
                            <div className="dropdown-content">
                            
                                    <a href="mailto:yeoman@yeomanswork.net?subject=Feature Request Average SE!">Request Feature</a>
                                    <a href="mailto:yeoman@yeomanswork.net?subject=Report Bug Average SE!">Report Bug</a>
                                
                                <Link to=''>Privacy</Link>
                                <Link to='/about'>About Us</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#">Account</a>
                            <div className="dropdown-content">
                                
                                <Link to="">Logout</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
  );
}

export default Header;