"use client"

import { 
    Card, 
    List, 
    Typography } from "@/app/utils/materialTailwind";
import { 
    ArrowLeftOnRectangleIcon, 
    PresentationChartBarIcon,  
    UserCircleIcon, 
  } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import PanelItem from "../components/panel/PanelItem";
import FormEditPerfil from "./FormEditPerfil";

const listItems = [
  {
    header: {
      title: 'Mis Inscripciones',
      icon: <PresentationChartBarIcon className="h-5 w-5" />
    },
    open: 1,
    body: []
  },
  {
    header: {
      title: 'Editar Perfil',
      icon: <UserCircleIcon className="h-5 w-5" />
    },
    open: 2,
    body: []
  },
  {
    header: {
      title: 'Cerrar Sesión',
      icon: <ArrowLeftOnRectangleIcon className="h-5 w-5" />
    },
    href: '/perfil/logout'
  },
]

const PanelPerfil = () => {
    const [open, setOpen] = useState(0)

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    return (
        <>
            <Card className="w-full max-w-[30rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography className="font-title text-title" variant="h5">
                Panel Mi Perfil
                </Typography>
            </div>
            <List >
                {listItems.map((item, i) => 
                <PanelItem key={i} item={item} open={open} handleOpen={handleOpen} />
                )}
            </List>
            </Card>
            {open === 2 && <FormEditPerfil />}
        </>
      )
}

export default PanelPerfil