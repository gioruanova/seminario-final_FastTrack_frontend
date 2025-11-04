"use client";

import { useEffect, useState, useRef } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogTitle } from './dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { MapPin, Maximize2, X } from 'lucide-react';

declare global {
    interface Window {
        L: typeof import('leaflet');
    }
}

interface MapViewerProps {
    address: string;
    height?: string;
    showExpandButton?: boolean;
}

export function MapViewer({ 
    address, 
    height = "200px", 
    showExpandButton = true 
}: MapViewerProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        const loadMap = () => {
            if (!mapRef.current || !window.L) return;

            try {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                }

                if (mapRef.current) {
                    mapRef.current.innerHTML = '';
                }

                geocodeAddress(address).then((coords) => {
                    if (coords) {
                        setPosition(coords);

                        if (mapRef.current) {
                            const map = window.L.map(mapRef.current).setView(coords, 15);
                            mapInstanceRef.current = map;

                            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '© OpenStreetMap contributors',
                                maxZoom: 19,
                            }).addTo(map);

                            window.L.marker(coords).addTo(map);

                            setIsLoading(false);
                        }
                    } else {
                        setError('No se pudo encontrar la ubicación');
                        setIsLoading(false);
                    }
                });
            } catch (err) {
                console.error('Error loading map:', err);
                setError('Error al cargar el mapa');
                setIsLoading(false);
            }
        };

        const loadLeaflet = () => {
            if (window.L) {
                setTimeout(() => {
                    if (window.L && typeof window.L.map === 'function') {
                        loadMap();
                    } else {
                        setError('Error: Leaflet no está completamente cargado');
                        setIsLoading(false);
                    }
                }, 100);
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => {
                setTimeout(() => {
                    if (window.L && typeof window.L.map === 'function') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        delete (window.L.Icon.Default.prototype as any)._getIconUrl;
                        window.L.Icon.Default.mergeOptions({
                            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        });
                        loadMap();
                    } else {
                        setError('Error: Leaflet no se cargó correctamente');
                        setIsLoading(false);
                    }
                }, 200);
            };
            script.onerror = () => {
                setError('Error al cargar el mapa');
                setIsLoading(false);
            };
            document.head.appendChild(script);
        };

        loadLeaflet();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [address]);

    const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return [parseFloat(lat), parseFloat(lon)];
            }
            return null;
        } catch (err) {
            console.error('Error geocoding:', err);
            return null;
        }
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCloseExpanded = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <div className="relative w-full" style={{ height }}>
                {isLoading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-sm text-muted-foreground">Cargando mapa...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                        <div className="text-center">
                            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">{error}</p>
                        </div>
                    </div>
                )}

                <div className="relative w-full h-full">
                    <div ref={mapRef} className="w-full h-full rounded-lg border" />
                    
                    {showExpandButton && !isLoading && !error && (
                        <div className="absolute top-2 right-2 z-[1000]">
                            <Button
                                onClick={handleExpand}
                                variant="default"
                                size="sm"
                                className="bg-primary/90 backdrop-blur-sm shadow-md"
                            >
                                <Maximize2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
                <DialogContent className="max-w-6xl h-[90vh] p-4">
                    <VisuallyHidden>
                        <DialogTitle>Mapa de ubicación: {address}</DialogTitle>
                    </VisuallyHidden>
                    <div className="relative h-full">
                        <div className="absolute top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-medium">{address}</span>
                                </div>
                                <Button
                                    onClick={handleCloseExpanded}
                                    variant="outline"
                                    size="sm"
                                    className="bg-background/90"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        
                        <div className="h-full pt-16">
                            <MapViewer 
                                address={address} 
                                height="100%" 
                                showExpandButton={false}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
