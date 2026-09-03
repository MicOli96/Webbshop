import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Product } from '../types/product';
import { getProduct } from '../services/productService';
import { moomin } from '../theme';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setProduct(undefined);
    void getProduct(id).then((data) => setProduct(data ?? null));
  }, [id]);

  if (product === undefined) {
    return (
      <Box
        component="main"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}
      >
        <CircularProgress sx={{ color: moomin.sage }} />
      </Box>
    );
  }

  if (product === null) {
    return (
      <Box component="main">
        <Container maxWidth="sm" sx={{ py: { xs: 8, sm: 10 }, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Varan hittades inte
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Den här varan finns inte längre i hyllan, eller så har länken skrivits fel.
          </Typography>
          <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
            Till startsidan
          </Button>
        </Container>
      </Box>
    );
  }

  const inStock = product.stock > 0;

  return (
    <Box component="main">
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Typography component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
            Hem
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>{product.title}</Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 6 },
          }}
        >
          <Box>
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.title}
              sx={{
                width: '100%',
                height: { xs: 280, sm: 420 },
                objectFit: 'cover',
                border: `1px solid ${alpha(moomin.ink, 0.14)}`,
                bgcolor: moomin.paper,
              }}
            />
            {product.imageCredit && (
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 1, color: 'text.secondary', fontStyle: 'italic' }}
              >
                {product.imageCredit}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' }, mb: 1.5 }}>
              {product.title}
            </Typography>

            <Typography variant="h5" sx={{ color: moomin.sageDark, mb: 2 }}>
              {product.price.toFixed(2)} kr
            </Typography>

            <Chip
              label={inStock ? `${product.stock} st i lager` : 'Slut i lager'}
              size="small"
              sx={{
                mb: 3,
                bgcolor: inStock ? alpha(moomin.sage, 0.15) : alpha(moomin.berry, 0.15),
                color: inStock ? moomin.sageDark : moomin.berry,
                fontWeight: 700,
              }}
            />

            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4, whiteSpace: 'pre-line' }}>
              {product.description}
            </Typography>

            <Button variant="contained" size="large" disabled={!inStock}>
              Lägg i kundvagn
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
