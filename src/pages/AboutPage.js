import React from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'

function AboutPage() {
    return (
        <BasicLayout>
            <div className ={'text-3xl'}>About Page</div>
            <Link to="/">Go to Main Page</Link>
        </BasicLayout>
    )
}

export default AboutPage