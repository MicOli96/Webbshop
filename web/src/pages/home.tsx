import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import HillDivider from "../components/hillDivider";
import { addItemAtom } from "../context/cart-provider";
import { getProducts } from "../services/productService";
import { moomin } from "../theme";
import type { Product } from "../types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const addItem = useSetAtom(addItemAtom);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    void getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const needle = query.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle),
    );
  }, [products, query]);

  return (
    <Box component="main">
      <Box sx={{ bgcolor: moomin.sage, color: moomin.cream }}>
        <Container
          maxWidth="md"
          sx={{
            pt: { xs: 6, sm: 8 },
            pb: { xs: 4, sm: 5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              size="small"
            ></Button>

            <Button
              component={Link}
              to="/admin"
              variant="outlined"
              size="small"
            ></Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { md: 4 },
            }}
          >
            <Box
              component="img"
              src="/images/little-my.png"
              alt="Lilla My"
              sx={{
                display: { xs: "none", md: "block" },
                width: { md: 220, lg: 260 },
                height: "auto",
                flexShrink: 0,
              }}
            />
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.4rem", sm: "3.2rem" },
                  maxWidth: "14ch",
                  mx: "auto",
                }}
              >
                Skatter från Mumindalen
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  maxWidth: "48ch",
                  fontSize: "1.05rem",
                  color: alpha(moomin.cream, 0.9),
                  mx: "auto",
                }}
              >
                Handplockade fynd ur dalens gömmor — från Mymlans muggar till
                Muminpappas gamla reseminnen. Allt du ser här finns i ett enda
                exemplar av verkligheten, i vårt lager.
              </Typography>
            </Box>
          </Box>
        </Container>
        <HillDivider fill={moomin.cream} />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {query ? `Sökresultat för "${query}"` : "I hyllan just nu"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Klicka på en vara för att läsa mer om den.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 4,
          }}
        >
          {!loading && filteredProducts.length === 0 && (
            <Typography sx={{ gridColumn: "1 / -1" }}>
              {query
                ? "Inga varor matchade din sökning."
                : "Hyllorna är tomma just nu."}
            </Typography>
          )}
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product.id}`}
                sx={{
                  "&:hover .product-image-tint": { opacity: 0.16 },
                  "&:hover .product-title::after": { width: "100%" },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{ height: 240, objectFit: "cover" }}
                  />
                  <Box
                    className="product-image-tint"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: moomin.sage,
                      opacity: 0,
                      transition: "opacity 200ms ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: 14,
                      bottom: -12,
                      bgcolor: moomin.mustard,
                      color: moomin.ink,
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      px: 1.25,
                      py: 0.5,
                      transform: "rotate(-3deg)",
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
                      position: "relative",
                      display: "inline-block",
                      maxWidth: "100%",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -2,
                        height: "2px",
                        width: 0,
                        bgcolor: moomin.sage,
                        transition: "width 220ms ease",
                      },
                    }}
                  >
                    {product.title}
                  </Typography>
                  {product.imageCredit && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        color: "text.secondary",
                        fontStyle: "italic",
                      }}
                    >
                      {product.imageCredit}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ px: 2, pb: 2, mt: "auto" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    addItem({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                    });
                    setToastOpen(true);
                  }}
                >
                  Lägg i kundvagn
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        message="Tillagd i kundvagnen"
      />
    </Box>
  );
}
