import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
export default function ServiceCard({ item }) {
  return (
    <CardContent>
      <Typography
        variant="h1"
        component="div"
        align="center"
        sx={{ fontSize: 20, font: "inherit", marginBottom: 3 }}
        gutterBottom
      >
        {item.title}
      </Typography>
      <Typography
        variant="h3"
        component="div"
        align="center"
        sx={{ fontSize: 14 }}
        gutterBottom
      >
        {item.text}
      </Typography>
    </CardContent>
  );
}
