'use client'
import { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import QRCode from 'qrcode'
import { AiOutlineLink, AiOutlineFileText, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { BsFillPaletteFill } from 'react-icons/bs'
import { MdFileDownload } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { UrlInput, TextInput, EmailInput, PhoneInput } from './Input'
import  Modal  from '../components/modal'

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
    const [confirmDiscard, setConfirmDiscard] = useState(null)
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
        text.length > 0 && generateQR(text)
    }, [text])

    const handleQRDownload = (event) => {
        alert("download")
        const link = event.currentTarget
        link.setAttribute('download', 'canvas.png')
        const image = canvasRef.current.toDataURL('image/png')
        link.setAttribute('href', image)
    }

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

    const changeInputType = (d, i) => {
        if (text.length > 0 && i != content) setConfirmDiscard({icon: d.icon, content: i})
        else {
            setIcon(d.icon)
            setContent(i)
        }
    }

    const discard = () => {
        setIcon(confirmDiscard.icon)
        setContent(confirmDiscard.content)
        setText("")
        setConfirmDiscard(null)
    }

    return (
        <>
            {confirmDiscard && <DiscardConfirm setConfirmDiscard={setConfirmDiscard} discard={discard}/>}
            <div className="flex flex-col gap-4 flex-grow overflow-scroll [&>div]:px-4">
                <div className="flex gap-1 justify-around my-4 [&>*]:w-16 [&>*]:border-2 [&>*]:shadow text-xl">
                    {options.map((d, i) => {
                        return (
                            <div 
                                key={i}
                                onClick={() => changeInputType(d, i)}
                                className={`flex flex-col justify-center items-center py-6 px-12 border border-indigo-400 rounded ${i == content ? "bg-indigo-400 text-white font-semibold " : "text-gray-500 cursor-pointer"}`}>
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

                <div className="flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4 [&>*]:text-2xl">
                        <a
                            onClick={handleQRDownload}
                            className="border-2 border-indigo-400 shadow rounded p-4 text-gray-500 active:bg-indigo-400 active:text-white"
                        >
                            <MdFileDownload 
                                className="cursor-pointer"
                            />
                        </a>
                        <button
                            className="border-2 border-indigo-400 shadow rounded p-4 text-gray-500 active:bg-indigo-400 active:text-white"
                        >
                            <BsFillPaletteFill 
                            />
                        </button>
                    </div>

                    <div className="flex-grow flex justify-center items-center">
                        <canvas ref={canvasRef} className="w-72 h-72 border border-black" />
                    </div>
                </div>
            </div>
            <NewBtn />
        </>
    )
}

function DiscardConfirm({discard, setConfirmDiscard}) {
    return (
        <Modal>
            <div 
                className="flex flex-col justify-center align-center absolute inset-0 bg-black/60 h-screen w-screen p-8"
                onClick={() => setConfirmDiscard(false)}
            >
                <div
                    className="flex flex-col py-2 px-6 bg-white rounded [&>*]:mb-5"
                >
                    <h1 className="text-xl font-semibold" >Discard code's content?</h1>
                    <p className="text-gray-500"> 
                        Changing the QR Code type will discard the current content you have entered. Do you really want to do that?
                    </p>
                    <div
                        className="flex gap-4 justify-end"
                    >
                        <button 
                            className="text-gray-500 font-semibold text-sm"
                            onClick={() => setConfirmDiscard(false)}
                        >
                            CANCEL
                        </button>
                        <button 
                            className="text-indigo-500 font-semibold text-sm"
                            onClick={discard}
                        >
                            YES, DISCARD CONTENT
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )


}

function NewBtn() {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        //setTimeout(() => setOpen(true), 1000)
    }, [])

    return (
        <div className="absolute bottom-2 right-2 flex flex-col items-end">
            {open && <button className="mb-4 bg-white shadow text-gray-500">New QR Code</button>}
            <div className="flex justify-center items-center w-20 h-20 rounded-full text-4xl font-semibold text-white bg-indigo-400">
                <AiOutlinePlus 
                    className={clsx("transition-all duration-300", open ? "rotate-90" : "rotate-0")}
                    onClick={() => setOpen(prev => !prev)}
                />
            </div>
        </div>
    )
}
