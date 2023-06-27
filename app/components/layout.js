'use client'
import {useState, useEffect} from 'react'
import Header from './header'
import Navbar from './navbar'

export default function Layout({children}){
    const [navVisible, setNavVisible] = useState(false)


    return (
            <div className="flex">
                <Navbar setNavVisible={setNavVisible} navVisible={navVisible}/>
                <div className="w-screen">
                    <Header navVisible={navVisible} setNavVisible={setNavVisible}/>
                    {children}
                </div>
            </div>
    )
}
