import { 
    List, 
    ListItem, 
    ListItemPrefix, 
} from "@/app/utils/materialTailwind"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const PanelBodyItem = ({bodyItem}) => {
    return (          
        <List className="p-0 font-title text-text">
            <Link href={bodyItem.href}>
                <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    {bodyItem.item}
                </ListItem>
            </Link>
        </List>
    )
}

export default PanelBodyItem