"use client"

import { 
    Card, 
    List, 
    Typography } from "@/app/utils/materialTailwind";
import { 
    ChevronRightIcon, 
    NewspaperIcon,  
    PresentationChartBarIcon,  
    TrophyIcon, 
    UsersIcon
  } from "@heroicons/react/24/outline";
import { useState } from "react";
import PanelItem from "../components/panel/PanelItem";

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
        item: 'Inscripciones',
        href: '/admin/torneos/inscripciones'
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Gestionar Torneos',
        href: ''
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Crear Torneo',
        href: '/admin/torneos/crear'
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
        item: 'Escribir Noticia',
        href: ''
      },
      {
        icon: <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />,
        item: 'Editar Noticia',
        href: ''

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
              <PanelItem key={i} item={item} open={open} handleOpen={handleOpen} />
            )}
          </List>
        </Card>
      );
}

export default PanelAdmin