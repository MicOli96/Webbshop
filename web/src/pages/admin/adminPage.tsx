import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { Product } from '../../types/product';
import { deleteProduct, getProducts } from '../../services/productService';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productPendingDelete, setProductPendingDelete] = useState<Product | null>(null);
  const navigate = useNavigate();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const handleConfirmDelete = async () => {
    if (!productPendingDelete) return;
    await deleteProduct(productPendingDelete.id);
    setProductPendingDelete(null);
    await loadProducts();
  };

  return (
    <Box component="main" sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Produkthantering
        </Typography>
        <Button
          component={Link}
          to="/admin/products/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Lägg till produkt
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bild</TableCell>
              <TableCell>Titel</TableCell>
              <TableCell align="right">Pris</TableCell>
              <TableCell align="right">Lager</TableCell>
              <TableCell align="right">Åtgärder</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Inga produkter ännu.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar variant="rounded" src={product.imageUrl} alt={product.title} />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell align="right">{product.price.toFixed(2)} kr</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label={`Redigera ${product.title}`}
                    onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={`Ta bort ${product.title}`}
                    onClick={() => setProductPendingDelete(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={productPendingDelete !== null} onClose={() => setProductPendingDelete(null)}>
        <DialogTitle>Ta bort produkt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Är du säker på att du vill ta bort "{productPendingDelete?.title}"? Detta går inte att
            ångra.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductPendingDelete(null)}>Avbryt</Button>
          <Button color="error" onClick={() => void handleConfirmDelete()}>
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>

      <Outlet context={{ onSaved: loadProducts }} />
    </Box>
  );
}
