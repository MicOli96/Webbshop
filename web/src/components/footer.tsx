import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: 3,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Mumin Webbshop &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
