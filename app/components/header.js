'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect} from 'react'
import { CiUser } from 'react-icons/ci'
import { HiQrCode } from 'react-icons/hi2'
import { MdQrCodeScanner } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsQrCode } from 'react-icons/bs'

export default function Header({navVisible, setNavVisible}) {
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
    return (
            <header 
                className="flex items-center justify-between gap-8 px-4 py-6 bg-indigo-400 text-white font-bold text-lg">
                <div className="flex gap-8 md:gap-0">
                        <AiOutlineMenu
                            onClick={() => setNavVisible(true)}
                            className="text-xl md:hidden"
                        />
                    <h1>
                        {headerTitle(path)}
                    </h1>
                </div>
                <BsQrCode />
            </header>
    )
}
