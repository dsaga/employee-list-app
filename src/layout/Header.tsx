import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

export function Header() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Employee Directory Demo
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            to="/"
            variant="button"
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/employees-archive"
            variant="button"
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
          >
            Employee Archive
          </Link>
        </nav>
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
