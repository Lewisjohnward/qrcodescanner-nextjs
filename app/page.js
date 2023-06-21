'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { QrReader } from 'react-qr-reader'

export default function Home() {
    const [navVisible, setNavVisible] = useState(false)
    const [data, setData] = useState()
    const videoRef = useRef()


    const handleResult = (result, error) => {
        if (!!result) { setData(result?.text); }
        if (!!error) { console.info(error); } 
    }

    return (
        <section className="flex flex-col flex-grow items-center">
            {
                data ?                         
                    <div className="flex flex-col items-center gap-4 mt-40">
                        <p>Type: URL</p>
                        <Link className="underline" href={data}>{data}</Link>
                        <button
                            className="border text-white font-semibold bg-indigo-500 rounded px-4 py-2"
                            onClick={() => setData()}
                        >Scan again</button>
                    </div>
                    :                    
                    <QrReader
                        constraints={{facingMode: 'environment'}}
                        onResult={(result, error) => handleResult(result, error)}
                        style={{ width: '100%' }}
                        ViewFinder={ViewFinder}
                        videoContainerStyle={{paddingTop: "0%"}}
                        videoStyle={{position: "relative", width: "100vw", height: "100vh", objectFit: "cover"}}
                    />
            }
        </section>
    )
}

function ViewFinder() {
    return (
        <div className="absolute z-50 h-screen w-screen">
            <div className="absolute z-50 bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 border-2 border-red-500 w-56 h-56" 
            />

        </div>
    )
}
