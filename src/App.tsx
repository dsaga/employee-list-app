// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { Header } from "./layout/Header";
import { Router } from "./pages/Router";
import { Container } from "./layout/Container";
import { Footer } from "./layout/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { AlertToastProvider } from "./components/AlertToast";

function App() {
  return (
    <AlertToastProvider>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header />
      <Container>
        <Router />
      </Container>
      <Footer />
    </AlertToastProvider>
  );
}

export default App;
