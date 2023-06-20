'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect} from 'react'
import { CiUser } from 'react-icons/ci'
import { HiQrCode } from 'react-icons/hi2'
import { MdQrCodeScanner } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsQrCode } from 'react-icons/bs'

export default function Navbar() {
    const [navVisible, setNavVisible] = useState(false)
    const [hidden, setHidden] = useState(true)
    const path = usePathname()

    const headerTitle = (path) => {
        switch(path){
            case '/':
                return 'QR Code Scanner'
                break
            case '/generate':
                return 'QR Code Generator'
                break
            case '/whatsaqrcode':
                return 'What is a QR Code?'
                break
            case '/privacy':
                return 'Privacy Policy'
                break
            case '/signin':
                return 'Sign-in'
                break
            default :
                return 'This route needs a title'
                break
        }
    }

    useEffect(() => {
        navVisible == false && setTimeout(() => setHidden(true), 300)
        navVisible == true && setHidden(false)
    }, [navVisible])

    return (
        <>
            <header className="flex items-center justify-around gap-8 px-8 py-6 bg-indigo-400 text-white font-bold text-lg">
                <button 
                    className=""
                    onClick={() => setNavVisible(true)}
                >
                    <AiOutlineMenu
                        className="text-xl"
                    />
                </button>
                <h1>
                    {headerTitle(path)}
                </h1>
                <BsQrCode />
            </header>
            {!hidden && <Nav setNavVisible={setNavVisible} navVisible={navVisible}/> }
        </>
    )
}

function Nav({setNavVisible, navVisible}) {
    const [open, setOpen] = useState(false)
    const handleAnimation = () => {
        setNavVisible(false)
        setOpen(false)
    }

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <nav 
            className={`none absolute z-50 flex w-screen h-screen
                    transition-all ${open ? "bg-black/20" : "bg-black/0"}`}
            onClick={() => handleAnimation()}
        >
            <div 

                className={
                    `
                    flex flex-col w-64 bg-white
                    ${open ? "-translate-x-0" : "-translate-x-full"}
                    transition-all duration-500
                `}
            >
                <Link 
                    href="/signin"
                    className="pl-4 py-4 flex items-center hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200">
                    <div className="p-1 mr-6 bg-gray-500 rounded-full text-white">
                        <CiUser className="text-lg"/>
                    </div>
                    <div>
                        <h2>Sign-In</h2>
                        <p className="text-gray-500 text-sm">To create Dynamic QR Codes</p>
                    </div>
                </Link>

                <hr />
                <h2 className="pl-4 ml-1 py-2 text-gray-500">QR Code</h2>

                <Link
                    href="/generate"
                    className="pl-4 py-4 flex items-center hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200">
                    <div className="p-1 mr-6 bg-gray-500 rounded-full text-white">
                        <HiQrCode className="text-lg"/>
                    </div>
                    <div>
                        <h2 className="py-2">Generate</h2>
                        <p className="text-gray-500 text-sm">Static QR Code</p>
                    </div>
                </Link>

                <Link
                    href="/"
                    className="pl-4 py-4 flex items-center hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200">
                    <div className="p-1 mr-6 bg-gray-500 rounded-full text-white">
                        <MdQrCodeScanner className="text-lg"/>
                    </div>
                    <div>
                        <h2 className="py-2">Scan</h2>
                        <p className="text-gray-500 text-sm">Using your camera</p>
                    </div>
                </Link>
                <hr />
                <h2 className="pl-4 ml-1 py-2 text-gray-500">About</h2>
                <Link className="pl-4 py-2 hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200" href="/whatsaqrcode">What's a QR Code?</Link>
                <Link className="pl-4 py-2 hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200" href="/privacy">Privacy</Link>
                <Link className="pl-4 py-2 hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200" href="#">Terms of use</Link>
            </div>
        </nav>
    )
}
