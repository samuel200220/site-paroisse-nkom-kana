'use client';

import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useTranslations} from 'next-intl';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function Map() {
    const t = useTranslations('Map');
    const position: [number, number] = [3.8667, 11.5167];

    return (
        <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{height: '100%', width: '100%', zIndex: 0}}
            className="rounded-3xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    <div className="text-center font-sans">
                        <strong className="block text-amber-600">{t('popup_title')}</strong>
                        <span>{t('popup_subtitle')}</span>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
