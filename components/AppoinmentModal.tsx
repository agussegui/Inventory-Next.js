import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import AppointmentForm from './forms/AppointmentForm'
import { Appointment } from '@/types/appwrite.types'

const AppoinmentModal = ({
  type, 
  patientId,
  userId, 
  appointment
}: {
  type: 'programar' | 'cancelar',
  patientId: string,
  userId: string , 
  appointment?: Appointment

}) => {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className={`capitalize ${type === 'programar' && 'text-green-500'}`}>
                {type}
            </Button>
          </DialogTrigger>
          <DialogContent className='shad-dialog sm:max-w-md'>
            <DialogHeader className='mb-4 space-y-3'>
              <DialogTitle className='capitalize'> {type} Cita </DialogTitle>
              <DialogDescription>
                Por Favor, rellene los siguientes datos para {type} la Cita
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm
              userId={userId}
              patientId={patientId}
              type={type}
              appointment={appointment}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>

    )
}

export default AppoinmentModal