'use client'
import { useState } from 'react'
import validUrl from 'valid-url'

export const UrlInput = ({text, setText}) => {
    const [url, setUrl] = useState("")
    return (
        <div className="[&>*]:mb-2">
            <label className="block">Enter URL</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none"
                type="text" 
                placeholder="" 
                value={url} 
                onChange={e => handleUrlUpdate(e)} 
            />
            <p className="text-xs text-gray-500">Link to open when scanned, e.g. https://example.com</p>
        </div>
    )
}

export const TextInput = ({text, setText}) => {
    return (
        <div className="[&>*]:mb-2">
            <label className="block">Enter text to share here</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none" 
                type="text" 
                placeholder="" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
            <p className="text-xs text-gray-500">Link to open when scanned, e.g. https://example.com</p>
        </div>
    )
}

export const EmailInput = ({text, setText}) => {
    return (
        <div className="[&>*]:mb-2">
            <h1 className="text-xs">Open a new email compose draft when scanned</h1>
            <label className="block">Email address</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none" 
                type="text" 
                placeholder="" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
            <label className="block">Email subject</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none" 
                type="text" 
                placeholder="" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
            <label className="block">Message</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none" 
                type="text" 
                placeholder="" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
        </div>
    )
}

export const PhoneInput = ({text, setText}) => {
    return (
        <div className="[&>*]:mb-2">
            <label className="block">Enter Phone Number</label>
            <input 
                className="block w-100 border-b-2 border-indigo-400 focus:outline-none" 
                type="text" 
                placeholder="" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
        </div>
    )
}
