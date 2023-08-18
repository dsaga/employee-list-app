import Grid from "@mui/material/Grid";
import { default as MuiContainer } from "@mui/material/Container";
import styles from './Container.module.scss';

interface IContainerProps {
  children: React.ReactNode;
}
export function Container({ children }: IContainerProps) {
  return (
      <MuiContainer className={styles.container} maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {children}
        </Grid>
      </MuiContainer>
  );
}
