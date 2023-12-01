import { Box } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { FormControl, TextField } from "@mui/material";
import { Login } from "./Login";

import React from "react";
import Signup from "./Signup";

export const RightBar = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  return (
    <Box
      bgcolor={""}
      flex={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >{
      isLogin?(<Login setLogin = {setIsLogin} />):(<Signup setLogin = {setIsLogin} />)
    }
    </Box>
  );
};
