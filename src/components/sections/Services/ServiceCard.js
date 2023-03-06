import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
export default function ServiceCard ()
{
    return (
        <Card 
                sx={{
                // minWidth: "150px",
                maxWidth: "400px",
                boxShadow: "none",
                // border: "2px solid #FF9666",
                }}>
              <CardContent>
                <Typography variant="h7" component="div" align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Services yet to be announced. 
                  Please Wait!
                </Typography> 
              </CardContent>
              </Card>
    )
}