export interface Service {
    id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
}

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
}

export interface SiteContent {
    services: Service[];
    gallery: GalleryImage[];
}
