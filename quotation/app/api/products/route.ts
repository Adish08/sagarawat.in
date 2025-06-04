import { NextResponse } from "next/server"
import { promises as fs } from 'fs';
import path from 'path';

// Define types for our data structure
interface InventoryData {
  items: {
    [itemName: string]: {
      [familyName: string]: number;
    };
  };
  families: {
    [familyName: string]: string;
  };
}

export async function GET() {
  try {
    // Read the JSON file
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const fileContents = await fs.readFile(jsonDirectory + '/inventory.json', 'utf8');
    const data: InventoryData = JSON.parse(fileContents);

    // Transform the data to match the expected format
    const products = Object.entries(data.items).map(([name, familiesData]) => {
      // Get unique family names
      const familyNames = Object.keys(familiesData);
      
      // Create families array with name and price
      const families = familyNames.map(familyName => ({
        name: familyName,
        price: familiesData[familyName]
      }));

      // Get the first available price as default
      const defaultPrice = families.length > 0 ? families[0].price : 0;

      return {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        name,
        families,
        defaultPrice,
      };
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error reading inventory data:', error);
    return NextResponse.json(
      { error: 'Failed to load product data' },
      { status: 500 }
    );
  }
}
