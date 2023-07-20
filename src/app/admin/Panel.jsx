"use client"

import { 
    Accordion, 
    AccordionBody, 
    AccordionHeader, 
    Card, 
    Chip, 
    List, 
    ListItem, 
    ListItemPrefix, 
    ListItemSuffix, 
    Typography } from "@/app/utils/materialTailwind";
import { 
    ChevronDownIcon, 
    ChevronRightIcon, 
    Cog6ToothIcon, 
    InboxIcon, 
    NewspaperIcon, 
    PowerIcon, 
    PresentationChartBarIcon, 
    ShoppingBagIcon, 
    TrophyIcon, 
    UserCircleIcon, 
    UsersIcon} from "@heroicons/react/24/outline";
import { useState } from "react";

const listItems = [
  {
    header: {
      title: 'Torneos',
      icon: <PresentationChartBarIcon className="h-5 w-5" />
    },
    open: 1,
    body: [
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Inscripciones'
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Gestionar Torneos'
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Crear Torneo'
      },
    ]
  },
  {
    header: {
      title: 'Noticias',
      icon: <NewspaperIcon className="h-5 w-5" />
    },
    open: 2,
    body: [
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Escribir Noticia'
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Editar Noticia'
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Crear Torneo'
      },
    ]
  },
  {
    header: {
      title: 'Clubes',
      icon: <UsersIcon className="h-5 w-5" />
    },
    open: 3,
    body: [
      
    ]
  },
  {
    header: {
      title: 'Campeones',
      icon: <TrophyIcon className="h-5 w-5" />
    },
    open: 4,
    body: [
      
    ]
  },
]

const PanelAdmin = () => {
    const [open, setOpen] = useState(0)
 
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    return (
        <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Panel de Administrador
            </Typography>
          </div>
          <List>
            {listItems.map((item, i) => 
              <Accordion
              open={open === item.open}
              key={i}
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
                        
                          <List key={k} className="p-0">
                            <ListItem>
                              <ListItemPrefix>
                                {bodyItem.icon}
                              </ListItemPrefix>
                              {bodyItem.item}
                            </ListItem>
                          </List>
                      )}
                    </AccordionBody>
                    : ''
                  }
              </Accordion>
            )}
          </List>
        </Card>
      );
}

export default PanelAdmin