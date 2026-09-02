import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { ProductInput } from '../../types/product';
import { addProduct, getProduct, updateProduct } from '../../services/productService';

type OutletContext = { onSaved: () => void | Promise<void> };

const emptyForm: ProductInput = {
  title: '',
  description: '',
  price: 0,
  imageUrl: '',
  stock: 0,
};

type FormErrors = Partial<Record<keyof ProductInput, string>>;

function validate(form: ProductInput): FormErrors {
  const errors: FormErrors = {};

  if (!form.title.trim()) {
    errors.title = 'Titel är obligatoriskt.';
  } else if (form.title.trim().length < 2) {
    errors.title = 'Titel måste vara minst 2 tecken.';
  }

  if (!form.description.trim()) {
    errors.description = 'Beskrivning är obligatoriskt.';
  } else if (form.description.trim().length < 5) {
    errors.description = 'Beskrivning måste vara minst 5 tecken.';
  }

  if (!Number.isFinite(form.price) || form.price <= 0) {
    errors.price = 'Pris måste vara ett tal större än 0.';
  }

  if (!/^https?:\/\/.+/i.test(form.imageUrl.trim())) {
    errors.imageUrl = 'Ange en giltig URL som börjar med http:// eller https://.';
  }

  if (!Number.isInteger(form.stock) || form.stock < 0) {
    errors.stock = 'Lagerantal måste vara ett heltal som är 0 eller mer.';
  }

  return errors;
}

export default function ProductFormDialog() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { onSaved } = useOutletContext<OutletContext>();

  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    void getProduct(id).then((product) => {
      if (cancelled) return;
      if (product) {
        const { id: _productId, ...rest } = product;
        setForm(rest);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleClose = () => navigate('/admin');

  const handleChange =
    (field: keyof ProductInput) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = field === 'price' || field === 'stock'
        ? Number(event.target.value)
        : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    if (isEditMode && id) {
      await updateProduct(id, form);
    } else {
      await addProduct(form);
    }
    setSubmitting(false);
    await onSaved();
    navigate('/admin');
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Redigera produkt' : 'Lägg till produkt'}</DialogTitle>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Titel"
              value={form.title}
              onChange={handleChange('title')}
              error={Boolean(errors.title)}
              helperText={errors.title}
              disabled={loading}
              fullWidth
            />
            <TextField
              label="Beskrivning"
              value={form.description}
              onChange={handleChange('description')}
              error={Boolean(errors.description)}
              helperText={errors.description}
              disabled={loading}
              multiline
              minRows={2}
              fullWidth
            />
            <TextField
              label="Pris (kr)"
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              error={Boolean(errors.price)}
              helperText={errors.price}
              disabled={loading}
              slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
              fullWidth
            />
            <TextField
              label="Bild-URL"
              value={form.imageUrl}
              onChange={handleChange('imageUrl')}
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl}
              disabled={loading}
              fullWidth
            />
            <TextField
              label="Lagerantal"
              type="number"
              value={form.stock}
              onChange={handleChange('stock')}
              error={Boolean(errors.stock)}
              helperText={errors.stock}
              disabled={loading}
              slotProps={{ htmlInput: { min: 0, step: '1' } }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Avbryt
          </Button>
          <Button type="submit" variant="contained" disabled={loading || submitting}>
            Spara
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
