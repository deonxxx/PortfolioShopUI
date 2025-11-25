import { Link } from 'react-router-dom';
import { ShoppingCart, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { user, signOut } = useAuth();

  const { data: cartCount } = useQuery({
    queryKey: ['cart-count', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id);
      if (error) throw error;
      return data.reduce((sum, item) => sum + item.quantity, 0);
    },
    enabled: !!user,
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" id = "nav-homepage"/>
          <span className="text-xl font-bold">TestShop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors" id ="nav-products">
            Products
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="relative" id ="nav-cart">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount ? (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              ) : null}
            </Link>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild id ="nav-account">
                <Link to="/account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button size="sm" asChild id = "nav-signin">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
