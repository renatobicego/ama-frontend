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
        item: 'Inscripciones',
        href: '/admin/torneos/inscripciones'
      },
      {
        item: 'Gestionar Torneos',
        href: '/admin/torneos/editar'
      },
      {
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
        item: 'Escribir Noticia',
        href: '/admin/noticias/publicar'
      },
      {
        item: 'Editar Noticia',
        href: '/admin/noticias'

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
      {
        item: 'Crear Club',
        href: '/admin/clubes/publicar'
      },
      {
        item: 'Editar Club',
        href: '/admin/clubes'
      },
    ]
  },
  {
    header: {
      title: 'Campeones',
      icon: <TrophyIcon className="h-5 w-5" />
    },
    open: 4,
    body: [
      {
        item: 'Publicar Campeón',
        href: '/admin/campeones/publicar'
      },
      {
        item: 'Editar Campeón',
        href: '/admin/campeones'
      },
    ]
  },
]

const PanelAdmin = () => {
    const [open, setOpen] = useState(0)
 
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    return (
        <Card className=" w-full max-w-[24rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" className="text-title font-title">
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