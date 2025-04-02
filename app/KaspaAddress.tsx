// @ts-ignore
import Copy from './assets/copy.svg?react'
// @ts-ignore
import QrCode from './assets/qr_code.svg?react'
// @ts-ignore
import CopyCheck from './assets/copycheck.svg?react'
// @ts-ignore
import Close from './assets/close.svg?react'
// @ts-ignore
import Kaspa from './assets/kaspa.svg?react'

import {type ReactNode, useState} from "react";

import {QRCodeSVG} from "qrcode.react"
import {Link} from "react-router";

const KaspaAddress = (
    {children, copyValue, copy = false, qr = false, link = false}: {
        children: string | ReactNode;
        copyValue?: string;
        copy?: boolean;
        qr?: boolean
        link?: boolean;
    }) => {


    const [clicked, setClicked] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const value = copyValue || children?.toString() || "";
    const linkHref = "/accounts/" + value;

    const handleClick = () => {
        navigator.clipboard.writeText(value)
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    }

    return <span className="fill-gray-500">
        {(link && linkHref) ? <Link className="text-link" to={linkHref}>{children}</Link> : children}
        {copy && (!clicked ? <Copy className="w-4 h-4 inline align-middle mx-1 hover:fill-primary"
                                   onClick={handleClick}
        /> : <CopyCheck className=" w-4 h-4 inline align-middle mx-1 animate-[spin_0.2s_linear_1]"/>)}

        {clicked &&
            <div
                className="inline absolute
                 -translate-y-full -translate-x-full
                 rounded-lg bg-primary text-white
                 p-2 z-10">copied</div>}


        {qr && <QrCode
            className="relative w-4 h-4 inline align-middle hover:fill-primary"
            onClick={() => setShowQr(!showQr)}/>}

        {showQr && <QrCodeModal value={value} setShowQr={setShowQr}/>}

        </span>;
};

export default KaspaAddress;


interface QrCodeModalProps {
    value: string;
    setShowQr: (show: boolean) => void;
}

const QrCodeModal = (props: QrCodeModalProps) => (
    <div className="fixed top-0 left-0 w-full z-10 h-screen flex justify-center items-center
                  bg-black/80" onClick={() => props.setShowQr(false)} id="qr-code">
        <div
            className="relative bg-white rounded-4xl opacity-100 z-200 flex flex-col justify-around items-center"
            onClick={(e) => {
                e.stopPropagation();
            }}>

            <Close className="m-3 hover:cursor-pointer self-end" onClick={() => props.setShowQr(false)}/>

            <span className="text-2xl mb-4">Scan or copy the Kaspa address</span>
            <div className="relative mx-8 mb-6">
                <QRCodeSVG className="block" value={props.value} level="M" size={180}/>
                <Kaspa className="absolute bg-white w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
            </div>

            <div
                className="mx-8 mb-8 mt-4 w-128 text-sm flex flex-row items-center justify-center bg-gray-50 p-2 hover:cursor-text rounded-lg ">
                {props.value}
            </div>
        </div>

    </div>
);