import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock: number;
  category?: string;
}

export function ProductCard({ id, name, price, image_url, stock, category }: ProductCardProps) {
  const inStock = stock > 0;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        {category && (
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
        )}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {!inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!inStock} asChild={inStock}>
          <Link to={`/product/${id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {inStock ? 'View Details' : 'Out of Stock'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
