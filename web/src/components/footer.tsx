import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HillDivider from "./hillDivider";
import { moomin } from "../theme";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: "auto" }}>
      <HillDivider fill={moomin.ink} />
      <Box sx={{ bgcolor: moomin.ink, color: moomin.cream, py: 3 }}>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, textAlign: "center" }}
        >
          <Typography
            sx={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", fontSize: "1.05rem" }}
          >
            Mumindalen
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(242,236,221,0.7)" }}>
            Skatter från dalen sedan {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
