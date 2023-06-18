'use client'
import { AiOutlineLink, AiOutlineFileText, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { BsFillPaletteFill } from 'react-icons/bs'
import { MdFileDownload } from 'react-icons/md'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { UrlInput, TextInput, EmailInput, PhoneInput } from './Input'

const options = [
    {
        text: "URL",
        icon: <AiOutlineLink />
    }, {
        text: "Text",
        icon: <AiOutlineFileText />
    }, {
        text: "Email",
        icon: <AiOutlineMail />
    }, {
        text: "Phone",
        icon: <AiOutlinePhone />
    }
]

export default function Generate() {
    const [content, setContent] = useState(0)
    const [icon, setIcon] = useState(options[content].icon)
    const [text, setText] = useState("")
    const canvasRef = useRef()


    const generateQR = async text => {
        try {
            await QRCode.toCanvas(
                canvasRef.current,
                text,
                {errorCorrectionLevel: 'H'}
            )
        } catch (err) {
            alert(err)
        }

    }

    useEffect(() => {
        generateQR("my name is jeff")
    }, [])

    const renderInput = () => {
        switch(content){
            case 0:
                return <UrlInput text={text} setText={setText}/>
                break
            case 1:
                return <TextInput text={text} setText={setText}/>
                break
            case 2:
                return <EmailInput text={text} setText={setText}/>
                break
            case 3:
                return <PhoneInput text={text} setText={setText}/>
                break
        }
    }


    return (
        <div className="flex flex-col gap-4 flex-grow overflow-scroll [&>div]:px-4">
            <div className="flex gap-4 justify-center my-4 [&>*]:w-16">
                {options.map((d, i) => {
                    return (
                        <div 
                            key={i}
                            onClick={() => {
                                setIcon(d.icon)
                                setContent(i)
                            }}
                            className={`flex flex-col justify-center items-center py-2 px-4 border border-indigo-400 rounded ${i == content ? "bg-indigo-400 text-white font-semibold " : "text-gray-500 cursor-pointer"}`}>
                            {d.icon}
                            <p>{d.text}</p>
                        </div>
                    )})}



            </div>

            <hr />

            {renderInput()}

            <hr />

            <div>
                <div className="flex gap-2 items-center [&>*]:text-2xl">
                    <h2>Static QR Code</h2>
                    {icon}
                </div>
                <p className="text-xs text-gray-500">Content is directly encoded in the image.</p>
            </div>

            <div className="flex flex-col justify-center flex-grow bg-red-200">
                <div className="flex gap-4 mt-4 bg-red-400 [&>*]:text-2xl">
                    <MdFileDownload />
                    <BsFillPaletteFill />
                </div>

                <canvas ref={canvasRef} className="m-auto border border-black" />
            </div>


        </div>
    )
}
