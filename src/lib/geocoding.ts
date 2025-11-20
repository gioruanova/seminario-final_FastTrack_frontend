export interface Coordinates {
  lat: number;
  lng: number;
}

export async function geocodeAddress(
  address: string,
  apiKey?: string
): Promise<Coordinates | null> {
  const key = apiKey || 
              (typeof window !== 'undefined' ? (window as Window & { LOCATIONIQ_API_KEY?: string }).LOCATIONIQ_API_KEY : undefined) || 
              process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY ||
              "pk.b1e48c5ddfd07b479d1f4732c2765605";
  
  if (!key || !address || !address.trim()) {
    return null;
  }

  try {
    const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=ar`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data && Array.isArray(data) && data.length > 0 && data[0].lat && data[0].lon) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }

    return null;
  } catch {
    return null;
  }
}

