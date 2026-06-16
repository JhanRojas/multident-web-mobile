import { createLocation } from "../models/location.model";

export const districtCoordinates = {
    Bellavista: {
        latitude: -12.0568,
        longitude: -77.1185,
    },

    Callao: {
        latitude: -12.0611,
        longitude: -77.1143,
    },

    Ate: {
        latitude: -12.0250,
        longitude: -76.9220,
    },

    Barranco: {
        latitude: -12.1465,
        longitude: -77.0209,
    },

    Carabayllo: {
        latitude: -11.8852,
        longitude: -77.0348,
    },

    Chorrillos: {
        latitude: -12.1786,
        longitude: -77.0161,
    },

    Comas: {
        latitude: -11.9329,
        longitude: -77.0409,
    },

    Independencia: {
        latitude: -11.9977,
        longitude: -77.0549,
    },

    "Jesús María": {
        latitude: -12.0755,
        longitude: -77.0452,
    },

    "La Molina": {
        latitude: -12.0830,
        longitude: -76.9289,
    },

    Lince: {
        latitude: -12.0838,
        longitude: -77.0316,
    },

    "Los Olivos": {
        latitude: -11.9760,
        longitude: -77.0753,
    },

    Magdalena: {
        latitude: -12.0917,
        longitude: -77.0675,
    },

    Miraflores: {
        latitude: -12.1211,
        longitude: -77.0297,
    },

    "Pueblo Libre": {
        latitude: -12.0768,
        longitude: -77.0670,
    },

    "San Borja": {
        latitude: -12.1088,
        longitude: -76.9987,
    },

    "San Isidro": {
        latitude: -12.0977,
        longitude: -77.0365,
    },

    "San Juan de Lurigancho": {
        latitude: -12.0014,
        longitude: -76.9982,
    },

    "San Luis": {
        latitude: -12.0761,
        longitude: -76.9962,
    },

    "San Martín de Porres": {
        latitude: -12.0043,
        longitude: -77.0841,
    },

    "Santa Anita": {
        latitude: -12.0432,
        longitude: -76.9712,
    },

    "Santa Beatriz": {
        latitude: -12.0708,
        longitude: -77.0354,
    },

    "Santa Clara": {
        latitude: -12.0168,
        longitude: -76.8184,
    },

    "Santiago de Surco": {
        latitude: -12.1456,
        longitude: -76.9917,
    },

    Surquillo: {
        latitude: -12.1177,
        longitude: -77.0119,
    },

    "Villa El Salvador": {
        latitude: -12.2138,
        longitude: -76.9373,
    },

    Ica: {
        latitude: -14.0678,
        longitude: -75.7286,
    },

    Trujillo: {
        latitude: -8.1116,
        longitude: -79.0287,
    },
};

export const locations = {
    lima: [
        createLocation({
            id: "bellavista",
            name: "Bellavista",
            clinicName: "Callao / Bellavista",
            address: "Av. Elmer Faucett 1651",
            latitude: -12.0568,
            longitude: -77.1185,
            phone: "970568317 / 934416859",
            region: "lima",
        }),

        createLocation({
            id: "callao",
            name: "Callao",
            clinicName: "Callao / Canta Callao",
            address: "Av. Alejandro Bertello Bollati 1500",
            phone: "972332224 / 963591300",
            region: "lima",
        }),

        createLocation({
            id: "ate",
            name: "Ate",
            clinicName: "Lima / Ate",
            address: "Av. Nicolás Ayllón 4316 – 3er Piso",
            phone: "980573041",
            region: "lima",
        }),

        createLocation({
            id: "barranco",
            name: "Barranco",
            clinicName: "Lima / Barranco – Infinity Dental",
            address: "Calle Medrano Silva 401",
            phone: "(01) 209 9700",
            region: "lima",
        }),

        createLocation({
            id: "carabayllo",
            name: "Carabayllo",
            clinicName: "Lima / Carabayllo",
            address: "Av. Túpac Amaru 1664",
            phone: "(01) 6574873",
            region: "lima",
        }),

        createLocation({
            id: "chorrillos-huaylas",
            name: "Chorrillos",
            clinicName: "Lima / Chorrillos",
            address: "Av. Huaylas 714 – Of. 208",
            phone: "(01) 4675119",
            region: "lima",
        }),

        createLocation({
            id: "chorrillos-matellini",
            name: "Chorrillos",
            clinicName: "Lima / Chorrillos",
            address: "Ariosto Matellini 104",
            phone: "(01) 6011269",
            region: "lima",
        }),

        createLocation({
            id: "chorrillos-alameda",
            name: "Chorrillos",
            clinicName: "Lima / Chorrillos",
            address: "Av. Alameda Sur, esquina con Alameda San Lorenzo",
            phone: "977356014",
            region: "lima",
        }),

        createLocation({
            id: "comas",
            name: "Comas",
            clinicName: "Lima / Comas",
            address: "Av. Universitaria 6832",
            phone: "(01) 4939930",
            region: "lima",
        }),

        createLocation({
            id: "independencia",
            name: "Independencia",
            clinicName: "Lima / Independencia",
            address: "Av. Industrial N° 3650",
            phone: "(01) 5211935",
            region: "lima",
        }),

        createLocation({
            id: "jesus-maria-cuba",
            name: "Jesús María",
            clinicName: "Lima / Jesús María",
            address: "Av. Cuba 999 Of. 701",
            phone: "(01) 4249047",
            region: "lima",
        }),

        createLocation({
            id: "jesus-maria-escobedo",
            name: "Jesús María",
            clinicName: "Lima / Jesús María",
            address: "Gregorio Escobedo 762",
            phone: "(01) 6275602",
            region: "lima",
        }),

        createLocation({
            id: "la-molina-camacho",
            name: "La Molina",
            clinicName: "Lima / La Molina",
            address: "Av. Javier Prado Este 5245 Of. 203 Urb. Camacho",
            phone: "(01) 7719589",
            region: "lima",
        }),

        createLocation({
            id: "lince",
            name: "Lince",
            clinicName: "Lima / Lince",
            address: "Av. César Vallejo 1560",
            phone: "985585266",
            region: "lima",
        }),

        createLocation({
            id: "los-olivos-mayolo",
            name: "Los Olivos",
            clinicName: "Lima / Los Olivos",
            address: "Av. Antúnez de Mayolo 1011",
            phone: "(01) 5239763",
            region: "lima",
        }),

        createLocation({
            id: "los-olivos-proceres",
            name: "Los Olivos",
            clinicName: "Lima / Los Olivos",
            address: "Av. Próceres de Huandoy 4958",
            phone: "989402162",
            region: "lima",
        }),

        createLocation({
            id: "magdalena",
            name: "Magdalena",
            clinicName: "Lima / Magdalena",
            address: "Av. Javier Prado Oeste 617",
            phone: "(01) 4126363",
            region: "lima",
        }),

        createLocation({
            id: "miraflores-angamos",
            name: "Miraflores",
            clinicName: "Lima / Miraflores",
            address: "Av. Angamos Oeste 526",
            phone: "(01) 2222599",
            region: "lima",
        }),

        createLocation({
            id: "miraflores-olaya",
            name: "Miraflores",
            clinicName: "Lima / Miraflores",
            address: "Ca. Mártir José Olaya 129",
            phone: "945278892",
            region: "lima",
        }),

        createLocation({
            id: "miraflores-surco",
            name: "Miraflores",
            clinicName: "Lima / Miraflores-Surco",
            address: "Av. La Merced 227",
            phone: "(01) 3978082",
            region: "lima",
        }),

        createLocation({
            id: "pueblo-libre",
            name: "Pueblo Libre",
            clinicName: "Lima / Pueblo Libre",
            address: "Av. Sucre 195 – 2do Piso",
            phone: "(01) 4602424",
            region: "lima",
        }),

        createLocation({
            id: "san-borja",
            name: "San Borja",
            clinicName: "Lima / San Borja",
            address: "Av. San Borja Sur 840",
            phone: "948577542",
            region: "lima",
        }),

        createLocation({
            id: "san-isidro",
            name: "San Isidro",
            clinicName: "Lima / San Isidro",
            address: "Javier Prado Este 1570 Of. 201",
            phone: "955459637",
            region: "lima",
        }),

        createLocation({
            id: "sjl-independencia",
            name: "San Juan de Lurigancho",
            clinicName: "Lima / San Juan de Lurigancho",
            address: "Av. Próceres de la Independencia 1927",
            phone: "(01) 3339266",
            region: "lima",
        }),

        createLocation({
            id: "sjl-wiesse",
            name: "San Juan de Lurigancho",
            clinicName: "Lima / San Juan de Lurigancho",
            address: "Av. Wiesse 3840",
            phone: "(01) 6554194",
            region: "lima",
        }),

        createLocation({
            id: "sjl-canto-grande",
            name: "San Juan de Lurigancho",
            clinicName: "Lima / San Juan de Lurigancho",
            address: "Av. Canto Grande 3636",
            phone: "(01) 7763560",
            region: "lima",
        }),

        createLocation({
            id: "sjl-gran-chimu",
            name: "San Juan de Lurigancho",
            clinicName: "Lima / San Juan de Lurigancho",
            address: "Av. Gran Chimú 298",
            phone: "902855812",
            region: "lima",
        }),

        createLocation({
            id: "san-luis",
            name: "San Luis",
            clinicName: "Lima / San Luis",
            address: "Av. Canadá 3527",
            phone: "(01) 3552421",
            region: "lima",
        }),

        createLocation({
            id: "smp",
            name: "San Martín de Porres",
            clinicName: "Lima / San Martín de Porres",
            address: "Av. Eduardo de Habich 420",
            phone: "(01) 2449662",
            region: "lima",
        }),

        createLocation({
            id: "santa-anita-476",
            name: "Santa Anita",
            clinicName: "Lima / Santa Anita",
            address: "Av. Ruiseñores 476",
            phone: "(01) 3626200",
            region: "lima",
        }),

        createLocation({
            id: "santa-anita-866",
            name: "Santa Anita",
            clinicName: "Lima / Santa Anita",
            address: "Av. Ruiseñores 866",
            phone: "(01) 7763371",
            region: "lima",
        }),

        createLocation({
            id: "santa-beatriz",
            name: "Santa Beatriz",
            clinicName: "Lima / Santa Beatriz",
            address: "Manuel del Pino 295",
            phone: "(01) 3605957",
            region: "lima",
        }),

        createLocation({
            id: "santa-clara",
            name: "Santa Clara",
            clinicName: "Lima / Santa Clara",
            address: "Calle Parque Cívico 141",
            phone: "(01) 3279927",
            region: "lima",
        }),

        createLocation({
            id: "surco-primavera",
            name: "Santiago de Surco",
            clinicName: "Lima / Santiago de Surco",
            address: "Av. Primavera 1965",
            phone: "(01) 2701895",
            region: "lima",
        }),

        createLocation({
            id: "surco-proceres",
            name: "Santiago de Surco",
            clinicName: "Lima / Santiago de Surco",
            address: "Av. Los Próceres 1041",
            phone: "(01) 4048494",
            region: "lima",
        }),

        createLocation({
            id: "surco-marsano",
            name: "Santiago de Surco",
            clinicName: "Lima / Santiago de Surco",
            address: "Av. Tomás Marsano 3634",
            phone: "(01) 9034966",
            region: "lima",
        }),

        createLocation({
            id: "surco-monterrey",
            name: "Santiago de Surco",
            clinicName: "Lima / Santiago de Surco",
            address: "Jr. Monterrey 341",
            phone: "(01) 2573279",
            region: "lima",
        }),

        createLocation({
            id: "surco-benavides",
            name: "Santiago de Surco",
            clinicName: "Lima / Santiago de Surco",
            address: "Av. Benavides 4867",
            phone: "946130840",
            region: "lima",
        }),

        createLocation({
            id: "surquillo",
            name: "Surquillo",
            clinicName: "Lima / Surquillo",
            address: "Av. Angamos 2510",
            phone: "(01) 4894620",
            region: "lima",
        }),

        createLocation({
            id: "ves-central",
            name: "Villa El Salvador",
            clinicName: "Lima / Villa El Salvador",
            address: "Av. Central 1642 Sector 02",
            phone: "974365578",
            region: "lima",
        }),

        createLocation({
            id: "ves-cocharcas",
            name: "Villa El Salvador",
            clinicName: "Lima / Villa El Salvador",
            address: "Cooperativa Virgen de Cocharcas Mz. C",
            phone: "923776390",
            region: "lima",
        }),
    ],

    province: [
        createLocation({
            id: "ica",
            name: "Ica",
            clinicName: "Provincia / Ica",
            address: "Las Palmeras Mz. B Lt. 16 Urb. San José",
            phone: "974344143",
            region: "province",
        }),

        createLocation({
            id: "trujillo",
            name: "Trujillo",
            clinicName: "Provincia / Trujillo",
            address: "Av. Juan Pablo II - 693 Dpto 101 - Urb. San Andrés III Etapa",
            phone: "943193698",
            region: "province",
        }),
    ],
};