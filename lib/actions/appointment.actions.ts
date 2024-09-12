"use server"

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging,  } from "../appwrite.config";
import { formatDateTime,parseStringify } from "../utlis";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )

        return parseStringify(newAppointment)
        
    } catch (error) {
        console.log(error);
    }
}

export const getAppointment = async(appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        )

        return parseStringify(appointment)
    } catch (error) {
        console.log(error);
    }
}

export const getRecentAppointmentsList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount:0,
            cancelledCount: 0,
        } 

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) =>{
            if(appointment.status === 'scheduled'){
                acc.scheduledCount += 1;
            } else if(appointment.status === 'pending'){
                acc.pendingCount += 1;
            } else if(appointment.status === 'cancelled'){
                acc.cancelledCount += 1;
            }

            return acc;
        },initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }
        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateAppointment = async ({appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if(!updatedAppointment){
            throw new Error('Appointment not found ');
        }

        //sms notification
        const smsMessage = `Hola es CitaSalud.
            ${type === 'programada' ? `Su cita ha sido programada para ${formatDateTime(appointment.date.schedule!).dateTime}`: `Lamentamos informarle que su cita ha sido cancelada por los siguientes motivos.Razon: ${appointment.cancellationReason}`
        }        
        `        

        await sendSMSNotification(userId, smsMessage)
        revalidatePath('/admin');
        return parseStringify(updatedAppointment)

    } catch (error) {
        console.log(error)
    }
}

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
      // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
      const message = await messaging.createSms(
        ID.unique(),
        content,
        [],
        [userId]
      );
      return parseStringify(message);
    } catch (error) {
      console.error("An error occurred while sending sms:", error);
    }
  };