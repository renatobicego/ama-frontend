"use client"

import { 
    Card, 
    List, 
    Typography } from "@/app/utils/materialTailwind";
import {  
    PresentationChartBarIcon,  
    UsersIcon
  } from "@heroicons/react/24/outline";
import { useState } from "react";
import PanelItem from "../components/panel/PanelItem";

const listItems = [
  {
    header: {
      title: 'Inscripciones de Atletas',
      icon: <PresentationChartBarIcon className="h-5 w-5" />
    },
    open: 1,
    body: [
      {
        item: 'Inscribir Atleta',
        href: '/admin/entrenadores/inscribirAtleta'
      },
      {
        item: 'Gestionar Inscripciones del Club',
        href: '/admin/torneos/editar'
      }
    ]
  },
  {
    header: {
      title: 'Editar Información de Club',
      icon: <UsersIcon className="h-5 w-5" />
    },
    open: 2,
  }
]

const PanelEntrenador = () => {
    const [open, setOpen] = useState(0)
 
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    return (
        <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" className="text-title font-title">
              Panel de Entrenador
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

export default PanelEntrenador