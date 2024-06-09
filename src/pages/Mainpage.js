import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Link } from "react-router-dom";

function Mainpage(props) {
    return (
        <BasicLayout>
            <div className ={'text-3xl'}>Main Page</div>
            <Link to="/about">Go to About Page</Link>
        </BasicLayout>
    )
}

export default Mainpage;