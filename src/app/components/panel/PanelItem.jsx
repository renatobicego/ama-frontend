import { 
    Accordion, 
    AccordionBody, 
    AccordionHeader,  
    ListItem, 
    ListItemPrefix, 
    Typography 
} from "@/app/utils/materialTailwind"

import { 
    ChevronDownIcon
} from "@heroicons/react/24/outline"
import PanelBodyItem from "./PanelBodyItem"
import Link from "next/link"

const PanelItem = ({item, handleOpen, open}) => {
    if(item.body){
        return (
            <Accordion
                open={open === item.open}
                icon={
                    <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === item.open ? "rotate-180" : ""}`}
                    />
                }
                >
                <ListItem className="p-0" selected={open === item.open}>
                    <AccordionHeader onClick={() => handleOpen(item.open)} className="border-b-0 p-3">
                        <ListItemPrefix>
                            {item.header.icon}
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal font-title text-text">
                            {item.header.title}
                        </Typography>
                    </AccordionHeader>
                </ListItem> 
                <AccordionBody className="py-1">
                    {item.body.map((bodyItem, k) => 
                        <PanelBodyItem key={k} bodyItem={bodyItem} />
                    )}
                </AccordionBody>
            </Accordion>
        )

    }else {
        return (
            <Link href={item.href}>
                <ListItem className="p-3 flex">
                        <ListItemPrefix>
                            {item.header.icon}
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal font-title text-text">
                            {item.header.title}
                        </Typography>
            </ListItem>
            </Link>
        )
    }
}

export default PanelItem