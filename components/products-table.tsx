import ProductService from "@/services/product-service";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";




export default async function ProductsTable(){

    const response = await ProductService.getProducts(1, '', '', '');
    const products = response.success
    ? response.data.products
    : [];
    

    return(
        <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

        {products.map((product) =>  (
           <Link key={product.id} href={`/products/${product.id}`}//adjust to final product detail page link
           > 
            <Card key={product.id} className="h-full w-full">
                <div className="relative aspect-square">
                    <Image
                    src={product.images[0]} //take first image
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                </div>
                
                <CardHeader><CardTitle className="flex">
            

            
                      
            
                {product.title}<Badge variant="default" className="ml-auto">
              {product.category?.name}
              
            </Badge>
                </CardTitle>
                
          </CardHeader>

          <CardContent>
            
            
              €{product.price}
            
          </CardContent>
          <CardFooter>Knapp?</CardFooter>
        </Card>
        </Link>
                ))}  
        


        </div>
                

</div>
    )
}