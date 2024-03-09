import { useState } from "react";
import { Alert } from "reactstrap";

function DismissableAlert(message, color, id, removeAlert) {
    window.setTimeout(() => {
      // TODO - cosmetic - Fade this out rather than abrupt change
      removeAlert(id)
    }, 5000)
    return(
      <Alert color={color} isOpen={true} id={id} toggle={() => { removeAlert(id) }}>{message}</Alert>
    )
  }

export default DismissableAlert