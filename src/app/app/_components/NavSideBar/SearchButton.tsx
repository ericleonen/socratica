import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { Search } from "@icon-park/react";

export default function SearchButton() {
    const handleClick = () => {}

    return (
        <SecondaryButton
            onClick={handleClick}
            className="font-bold w-full px-3 py-2 mt-2"
        >
            <Icon type={Search} className="mr-3"/>
            Search
        </SecondaryButton>
    )
}