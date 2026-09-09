import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getOrder } from "../services/orderService";
import type { Order } from "../types/order";

export default function Confirmation() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  // Hämtar den sparade ordern från API:et
  useEffect(() => {
    let cancelled = false;

    setOrder(null);
    setError("");

    if (!id) {
      setError("Order-ID saknas.");
      return;
    }

    getOrder(id)
      .then((data) => {
        if (!cancelled) {
          setOrder(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Kunde inte hämta ordern.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <Box component="main">
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : !order ? (
          <CircularProgress aria-label="Hämtar order" />
        ) : (
          <Stack spacing={3}>
            <Typography variant="h4" component="h1">
              Tack för din beställning!
            </Typography>

            <Typography>
              Ordernummer: {order.orderNumber}
            </Typography>

            {/* Produkter i den sparade ordern */}
            <Typography variant="h5" component="h2">
              Orderdetaljer
            </Typography>

            {order.items.map((item) => (
              <Box key={item.id}>
                <Typography sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography>
                  {item.quantity} st × {item.price.toFixed(2)} kr
                </Typography>
                <Typography>
                  Summa: {(item.price * item.quantity).toFixed(2)} kr
                </Typography>
              </Box>
            ))}

            <Divider />

            <Typography variant="h6">
              Totalt: {order.total.toFixed(2)} kr
            </Typography>

            {/* Kundens sparade leveransuppgifter */}
            <Typography variant="h5" component="h2">
              Leveransuppgifter
            </Typography>

            <Box>
              <Typography>{order.customerName}</Typography>
              <Typography>{order.email}</Typography>
              <Typography>{order.phone}</Typography>
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {order.address}
              </Typography>
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
}