import ProductService from "@/services/product-service";


export default async function ProductsTable(){

    const response = await ProductService.getProducts(1, '', '', '');
    const products = response.success
    ? response.data.products
    : [];

    return(
        <div>
        {products.map((product) =>  (
            <div key={product.id}>
                      
            <h2>
                {product.title}
            </h2></div>
                ))}  
        
        </div>
    )
}