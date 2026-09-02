import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import type { Product } from '../types/product';
import { getProducts } from '../services/productService';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <Box component="main" sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" component="h1">
          Mumin-butiken
        </Typography>
        <Button component={Link} to="/admin" variant="contained">
          Admin
        </Button>
      </Box>
      <Typography sx={{ mb: 3 }} color="text.secondary">
        Klicka på en produkt för att redigera den i admin.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 8,
        }}
      >
        {!loading && products.length === 0 && (
          <Typography>Inga produkter ännu.</Typography>
        )}
        {products.map((product) => (
          <Card key={product.id}>
            <CardActionArea component={Link} to={`/admin/products/${product.id}/edit`}>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.title}
                sx={{ height: 320, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" component="h2" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price.toFixed(2)} kr
                </Typography>
                {product.imageCredit && (
                  <Typography variant="caption" color="text.disabled" component="p" sx={{ mt: 0.5 }}>
                    {product.imageCredit}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
