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

const PanelItem = ({item, handleOpen, open}) => {
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
                <Typography color="blue-gray" className="mr-auto font-normal">
                    {item.header.title}
                </Typography>
                </AccordionHeader>
            </ListItem>
                {item.body.length ?  
                    <AccordionBody className="py-1">
                        {item.body.map((bodyItem, k) => 
                            <PanelBodyItem key={k} bodyItem={bodyItem} />
                        )}
                    </AccordionBody>
                :   ''
                }
        </Accordion>
    )
}

export default PanelItem