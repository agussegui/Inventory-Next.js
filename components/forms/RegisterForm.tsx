"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import PatientForm, { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOpstions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import { FileUploader } from "../FileUploader"
 


const RegisterForm = ({user}: {user: User}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    })
    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);

        let formData
        if(values.identificationDocument && values.identificationDocument.length > 0){
            const blobFile = new Blob([values.identificationDocument[0]],{
                type: values.identificationDocument[0].type,
            }) 

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            //@ts-ignore
            const patient = await registerPatient(patientData);
            if(patient) router.push(`/patients/${user.$id}/new-appointment`)
        
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Bienvenido 👋!!</h1>
                    <p className="text-dark-700">Cuentanos mas sobre ti.</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Información Personal.</h2>
                    </div>
                </section>
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Nombre Completo"
                    placeholder="Agustin Gonzalez"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="agusting@curagmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Numero de Telefono"
                        placeholder="+2212354789"
                        iconSrc="/assets/icons/phone.svg"
                        iconAlt="phone"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Fecha de Nacimiento"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Genero"
                        renderSkeleton={(field) =>(
                            <FormControl>
                                <RadioGroup 
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOpstions.map((option)=>
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Domicilio"
                        placeholder="520 N°223"
                        
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Ocupación"
                        placeholder="Ingeniero Industrial"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Nombre de Contacto de Emergencia"
                        placeholder="Nombre del Tutor"
                        
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Numero de Contacto de Emergencia"
                        placeholder="+2212354789"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Información Clinica.</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Medico de Cabecera"
                        placeholder="Seleccione un Medico"
                    >
                        
                        {Doctors.map((doctor) => (
                            <SelectItem key={doctor.name} value={doctor.name}>
                                <div className="flex cursor-pointer items-center gap-2 ">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}    
                    </CustomFormField>        
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">         
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Seguros de Salud"
                        placeholder="Swiss Medical - Galeno"
                        
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Numero de Afiliado"
                        placeholder="800006-000000-10-000"
                    />
                </div>    

                <div className="flex flex-col gap-6 xl:flex-row">         
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Alergias (Si tenes.)"
                        placeholder="Penicilina,pollen,etc"
                        
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Medicacion actual (Si tenes.)"
                        placeholder="Paracetamol 500mg,Loratadina,ibuprofen 400mg"
                    />
                </div>     

                <div className="flex flex-col gap-6 xl:flex-row">         
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Historial medico familiar"
                        placeholder="El Padre tenia diabetes.La madre tenia problemas cardiacos."
                        
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Historial medico pasado"
                        placeholder="Cirugías: Amigdalectomía,Apendicectomía"
                    />
                </div> 

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Autenticación y Verificación.</h2>
                    </div>
                </section>

                <CustomFormField 
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Tipo de Identificación"
                    placeholder="Seleccione un tipo de identificación"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}    
                </CustomFormField>   

                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Numero de Identificación"
                    placeholder="12345678"
                    
                />     

                <CustomFormField 
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Copia escaneada del número de identificación"
                    renderSkeleton={(field) =>(
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange}/>
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consentimiento y Privacidad.</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="Doy mi consentimiento para recibir tratamiento para mi condición de salud"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="Doy mi consentimiento para el uso y divulgación de mi información médica "
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="Reconozco que he revisado y acepto la política de privacidad"
                />

                <SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm;