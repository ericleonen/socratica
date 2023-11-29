type BuyTokensButtonProps = {
    tokens?: number
}

export default function BuyTokensButton({ tokens }: BuyTokensButtonProps) {
    return (
        <button
            className="border-2"
        >
            Tokens: {typeof tokens === "number" ? tokens : "Loading..."}
        </button>
    )
}