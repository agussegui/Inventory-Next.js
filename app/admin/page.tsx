import StartCart from '@/components/StartCart'
import {columns, Payment} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'


const AdminPage = async () => {
    const appointments = await getRecentAppointmentsList();

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href="/" className='cursor-pointer'>
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={32}
                        width={162}
                        alt='Logo'
                        className='h-8 w-fit' 
                    />
                </Link>
                <p className='text-16-semibold'>Panel de Admin </p>
            </header>
            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Bienvenido👋</h1>
                    <p className='text-dark-700'>Empieza el dia manejando tus citas.</p>
                </section>
                <section className='admin-stat'>
                    <StartCart
                        type="appointments"
                        count={appointments.scheduledCount}
                        label="Cita Confirmada"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StartCart
                        type="pending"
                        count={appointments.pendingCount}
                        label="Cita Pendiente"
                        icon="/assets/icons/pending.svg"
                    />
                    <StartCart
                        type="cancelled"
                        count={appointments.cancelledCount}
                        label="Cita Cancelada"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents}/>
            </main>
        </div>
    )
}

export default AdminPage