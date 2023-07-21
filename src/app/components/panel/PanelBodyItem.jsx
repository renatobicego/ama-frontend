import { 
    List, 
    ListItem, 
    ListItemPrefix, 
} from "@/app/utils/materialTailwind"
import Link from "next/link"

const PanelBodyItem = ({bodyItem}) => {
    return (          
        <List className="p-0">
            <Link href={bodyItem.href}>
                <ListItem>
                    <ListItemPrefix>
                        {bodyItem.icon}
                    </ListItemPrefix>
                    {bodyItem.item}
                </ListItem>
            </Link>
        </List>
    )
}

export default PanelBodyItem