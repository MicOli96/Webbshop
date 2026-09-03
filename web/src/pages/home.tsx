import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { alpha } from '@mui/material/styles';
import type { Product } from '../types/product';
import { getProducts } from '../services/productService';
import HillDivider from '../components/hillDivider';
import { moomin } from '../theme';

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
    <Box component="main">
      <Box sx={{ bgcolor: moomin.sage, color: moomin.cream }}>
        <Container maxWidth="md" sx={{ pt: { xs: 6, sm: 8 }, pb: { xs: 4, sm: 5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: { xs: 2, sm: 3 } }}>
            <Button
              component={Link}
              to="/admin"
              variant="outlined"
              size="small"
              sx={{
                color: moomin.cream,
                borderColor: alpha(moomin.cream, 0.5),
                '&:hover': { borderColor: moomin.cream, bgcolor: alpha(moomin.cream, 0.08) },
              }}
            >
              Adminvy
            </Button>
          </Box>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.4rem', sm: '3.2rem' }, maxWidth: '14ch' }}
          >
            Skatter från Mumindalen
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: '48ch', fontSize: '1.05rem', color: alpha(moomin.cream, 0.9) }}>
            Handplockade fynd ur dalens gömmor — från Mymlans muggar till Muminpappas gamla
            reseminnen. Allt du ser här finns i ett enda exemplar av verkligheten, i vårt lager.
          </Typography>
        </Container>
        <HillDivider fill={moomin.cream} />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          I hyllan just nu
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Klicka på en vara för att öppna den i adminvyn — den riktiga produktsidan är på gång.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 4,
          }}
        >
          {!loading && products.length === 0 && (
            <Typography sx={{ gridColumn: '1 / -1' }}>Hyllorna är tomma just nu.</Typography>
          )}
          {products.map((product) => (
            <Card key={product.id}>
              <CardActionArea
                component={Link}
                to={`/admin/products/${product.id}/edit`}
                sx={{
                  '&:hover .product-image-tint': { opacity: 0.16 },
                  '&:hover .product-title::after': { width: '100%' },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{ height: 240, objectFit: 'cover' }}
                  />
                  <Box
                    className="product-image-tint"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: moomin.sage,
                      opacity: 0,
                      transition: 'opacity 200ms ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 14,
                      bottom: -12,
                      bgcolor: moomin.mustard,
                      color: moomin.ink,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      px: 1.25,
                      py: 0.5,
                      transform: 'rotate(-3deg)',
                      border: `1px solid ${alpha(moomin.ink, 0.15)}`,
                      boxShadow: `0 2px 6px ${alpha(moomin.ink, 0.18)}`,
                    }}
                  >
                    {product.price.toFixed(2)} kr
                  </Box>
                </Box>
                <CardContent sx={{ pt: 2.5 }}>
                  <Typography
                    className="product-title"
                    variant="subtitle1"
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      maxWidth: '100%',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: -2,
                        height: '2px',
                        width: 0,
                        bgcolor: moomin.sage,
                        transition: 'width 220ms ease',
                      },
                    }}
                  >
                    {product.title}
                  </Typography>
                  {product.imageCredit && (
                    <Typography
                      variant="caption"
                      sx={{ display: 'block', mt: 1, color: 'text.secondary', fontStyle: 'italic' }}
                    >
                      {product.imageCredit}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
