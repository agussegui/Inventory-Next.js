export const GenderOpstions = ['Male', 'Female', "Other"]

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "DNI(Dodumento Nacional de Identidad",
  "Pasaporte",
  "Cedula de Identidad",
  "Licencia de Conducir",
  "CUIL/CUIT",
  "Partida de Nacimiento",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Juan Ignacio Cifuentes",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Laura Ramírez Solís",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "duardo Martín Mendoza",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Ricardo Torres Paredes",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Mariana Herrera González",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alejandro Vega Lozano",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Sofía Peña Alvarado",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Valeria Gutiérrez Rivas",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Francisco Medina Carrasco",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};