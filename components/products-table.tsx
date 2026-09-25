import ProductService from "@/services/product-service";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";


export default async function ProductsTable(){

    const response = await ProductService.getProducts(1, '', '', '');
    const products = response.success
    ? response.data.products
    : [];
    

    return(
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) =>  (
            <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-square">
                    <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                </div>
                <CardContent className="p-4">
            <Badge variant="secondary">
              product.category
              
            </Badge>

            <h2 className="mt-3 text-lg font-semibold">
                      
            
                {product.title}</h2>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <p className="text-lg font-medium">
              ${product.price.toFixed(2)}
            </p>
          </CardFooter>
        </Card>
                ))}  
        
        </div>
    )
}