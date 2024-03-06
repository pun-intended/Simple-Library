import { useState } from "react";
import { Alert } from "reactstrap";

function DismissableAlert(message, color, id, removeAlert) {
    return(
      <Alert color={color} isOpen={true} id={id} toggle={() => { removeAlert(id) }}>{message}</Alert>
    )
  }

export default DismissableAlert