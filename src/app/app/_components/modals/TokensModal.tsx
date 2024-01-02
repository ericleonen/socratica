import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { modalContexts } from "./ModalProviders";
import axios from "axios";
import Stripe from "stripe";

function useProduct() {
    const [product, setProduct] = useState<Stripe.Price>();

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/getProducts");
            const data = await res.json();

            setProduct(data[0])
        })();
    }, []);

    return product;
}

export default function TokensModal() {
    const [quantity, setQuantity] = useState("");
    const product = useProduct();
    const PPT = product ? (product.unit_amount || 0) / 100 : 0;

    const { close } = useContext(modalContexts["tokens"]);

    const handleChange = (e: ChangeEvent) => {
        const newQuantity = (e.target as HTMLInputElement).value;

        if (
            newQuantity.length === 0 || 
            newQuantity.match("^[1-9][0-9]*$")
        ) {
            setQuantity(newQuantity);
        }
    }

    const handlePay = async (e: FormEvent) => {
        e.preventDefault();
        
        const { data } = await axios.post("/api/payment", {
            priceID: product?.id,
            quantity
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        window.location.assign(data);
    }

    return (
        <Modal 
            {...{close}}
            className="pb-3 !w-[26rem] text-slate-700 dark:text-slate-300"
        >
            <p className="w-full p-3 font-bold text-center border-b-2 border-slate-200 dark:border-slate-700">Buy tokens</p>
            <div className="flex flex-col px-7 py-3">
                <input
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="How many tokens do you want?"
                    className="rounded-md focus:outline-none focus:border-amber-300 focus:shadow-focus px-3 py-2 placeholder:text-slate-400 placeholder:dark:text-slate-500 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                />
                <button 
                    onClick={handlePay}
                    disabled={!quantity}
                    className="disabled:hover:cursor-not-allowed focus:outline-none disabled:bg-gray-200 disabled:text-slate-500 disabled:dark:bg-white/5 mt-3 px-3 py-2 bg-slate-700 hover:bg-slate-600 focus-visible:bg-slate-600 dark:bg-slate-300/20 hover:dark:bg-slate-300/30 focus-visible:dark:bg-slate-300/30 text-white dark:text-slate-300 font-bold w-full text-center rounded-md"
                >
                    Pay {quantity && PPT > 0 && (parseInt(quantity) * PPT).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                </button>
            </div>
        </Modal>
    )
}