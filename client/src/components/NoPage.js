import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { noPageStrings } from "../resources/user_display_strings";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={6}>
            <Typography variant="h4">{noPageStrings.message}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {noPageStrings.link}
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg"
              alt=""
              width={500}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
