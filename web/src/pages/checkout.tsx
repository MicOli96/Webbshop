import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useAtomValue, useSetAtom } from "jotai";
import {
  cartItemsAtom,
  cartTotalAtom,
  removeItemAtom,
  updateQuantityAtom,
} from "../context/cart-provider";
import { moomin } from "../theme";

export default function Cart() {
  const items = useAtomValue(cartItemsAtom);
  const total = useAtomValue(cartTotalAtom);
  const updateQuantity = useSetAtom(updateQuantityAtom);
  const removeItem = useSetAtom(removeItemAtom);

  return (
    <Box component="main">
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" }, mb: { xs: 3, sm: 4 } }}
        >
          Din kundvagn
        </Typography>

        {items.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 6, sm: 8 },
              px: 3,
              border: `1px dashed ${alpha(moomin.ink, 0.25)}`,
              bgcolor: moomin.paper,
            }}
          >
            <RemoveShoppingCartOutlinedIcon
              sx={{ fontSize: 40, color: moomin.inkSoft, mb: 1.5 }}
            />
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Kundvagnen är tom
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Utforska hyllorna och hitta något fint från dalen.
            </Typography>
          </Box>
        ) : (
          <>
            <Stack
              divider={<Divider sx={{ borderColor: alpha(moomin.ink, 0.1) }} />}
              sx={{
                border: `1px solid ${alpha(moomin.ink, 0.14)}`,
                bgcolor: moomin.paper,
              }}
            >
              {items.map((item) => (
                <Box
                  key={item.productId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2.5 },
                    p: { xs: 1.5, sm: 2.5 },
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: { xs: 64, sm: 88 },
                      height: { xs: 64, sm: 88 },
                      objectFit: "cover",
                      flexShrink: 0,
                      border: `1px solid ${alpha(moomin.ink, 0.14)}`,
                    }}
                  />

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: '"Fraunces", Georgia, serif',
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 0.25 }}
                    >
                      {item.price.toFixed(2)} kr / st
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: `1px solid ${alpha(moomin.ink, 0.2)}`,
                      flexShrink: 0,
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label={`minska antal av ${item.title}`}
                      sx={{ borderRadius: 0, color: moomin.ink }}
                      onClick={() =>
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        })
                      }
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{ width: 28, textAlign: "center", fontWeight: 700 }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label={`öka antal av ${item.title}`}
                      sx={{ borderRadius: 0, color: moomin.ink }}
                      onClick={() =>
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography
                    sx={{
                      width: { xs: 64, sm: 90 },
                      textAlign: "right",
                      fontWeight: 700,
                      color: moomin.sageDark,
                      flexShrink: 0,
                    }}
                  >
                    {(item.price * item.quantity).toFixed(2)} kr
                  </Typography>

                  <IconButton
                    aria-label={`ta bort ${item.title} från kundvagnen`}
                    onClick={() => removeItem(item.productId)}
                    sx={{ color: moomin.berry, flexShrink: 0 }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
                gap: 1.5,
                mt: 3,
                pt: 3,
                borderTop: `1px solid ${alpha(moomin.ink, 0.14)}`,
              }}
            >
              <Typography sx={{ color: "text.secondary" }}>
                Totalt
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: '"Fraunces", Georgia, serif', color: moomin.sageDark }}
              >
                {total.toFixed(2)} kr
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
