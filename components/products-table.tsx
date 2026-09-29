import { ProductRepository } from "@/repositories/product-repository";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";




export default async function ProductsTable(){

    const repository = new ProductRepository();
    const response = await repository.getProducts(1, '', '', '');
    const products = response.products;
    
    //function to display category not as slug
    function formatCategory(category: string) {
    return category
        .split("-")
        .map((word, index) =>
        index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word
        )
        .join(" ");
    }

    return(
        <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

        {products.map((product) =>  (
           <Link key={product.id} href={`/products/${product.slug}`}//adjust to final product detail page link
           > 
            <Card key={product.id} className="h-full w-full">
                <div className="relative aspect-square border-b border-border">
                    <Image
                    src={`/images/${product.slug}.webp`}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                </div>
                
                <CardHeader><CardTitle className="flex">
            

            
                      
            
                {product.title}<Badge variant="default" className="ml-auto">
              {formatCategory(product.category)}
              
            </Badge>
                </CardTitle>
                
          </CardHeader>

          <CardContent>
            
            
              €{product.price}
            
          </CardContent>
          
        </Card>
        </Link>
                ))}  
        


        </div>
                

</div>
    )
}