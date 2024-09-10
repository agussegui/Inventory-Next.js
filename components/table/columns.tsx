"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utlis"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppoinmentModal from "../AppoinmentModal"
import { Appointment } from "@/types/appwrite.types"


export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({row}) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: "patient",
    header: 'Pacientes',
    cell: ({row}) => { return <p className="text-14-medium">{row.original.patient.name}</p> }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status}/>
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Cita",
    cell: ({row}) => (
      <p className="text-14-medium min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )  
  },
  {
    accessorKey: "primaryPhysician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return (
        <div className="flex items-center gap-3">
          <Image 
            src={doctor?.image}
            alt={doctor.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">
            Dr.{doctor?.name}
          </p>

        </div>
      )

    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Acciones</div>,
    cell: ({ row: {original: data} }) => {
      return (
        <div className="flex gap-1">
          <AppoinmentModal 
            type="programar"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            // title="Programadar Cita"
            // description="Por Favor confirme los siguientes detalles para programar la cita."
          />
          <AppoinmentModal 
            type="cancelar"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            // title="Cancelar Cita"
            // description="Estas seguro que quieres cancelar esta la cita?"
          />

        </div>
      )
    },
  },
]
