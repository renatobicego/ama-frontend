"use client";

import { Card, List, Spinner, Typography } from "@/app/utils/materialTailwind";
import {
  ArrowLeftOnRectangleIcon,
  KeyIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import PanelItem from "../components/panel/PanelItem";
import { useSession } from "next-auth/react";
import InscripcionesList from "./panelComponents/InscripcionesList";

const listItems = [
  {
    header: {
      title: "Mis Inscripciones",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    open: 1,
    body: [],
  },
  {
    header: {
      title: "Editar Perfil",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    open: 2,
    href: "/perfil/editar",
  },
  // {
  //   header: {
  //     title: "Cambiar Contraseña",
  //     icon: <KeyIcon className="h-5 w-5" />,
  //   },
  //   open: 3,
  //   body: [],
  // },
  {
    header: {
      title: "Cerrar Sesión",
      icon: <ArrowLeftOnRectangleIcon className="h-5 w-5" />,
    },
    href: "/perfil/logout",
  },
];

const PanelPerfil = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  if (!session) {
    return (
      <div className="mt-6">
        <Spinner color="amber" />
      </div>
    );
  }

  return (
    <>
      <Card className="w-full max-w-[30rem] p-4 shadow-xl shadow-blue-gray-900/5 mb-6">
        <div className="mb-2 p-4">
          <Typography className="font-title text-title" variant="h5">
            Panel Mi Perfil
          </Typography>
        </div>
        <List>
          {listItems.map((item, i) => (
            <PanelItem
              key={i}
              item={item}
              open={open}
              handleOpen={handleOpen}
            />
          ))}
        </List>
      </Card>
      {open === 1 && <InscripcionesList user={session.user} />}
      {/* {(open === 3) && <FormPassword user={session.user} />} */}
    </>
  );
};

export default PanelPerfil;
