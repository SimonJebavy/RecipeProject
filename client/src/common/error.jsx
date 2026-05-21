import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";

const Error = ({ message }) => {
  return (
    <div>
      <Icon path={mdiAlertCircle} size={10} color={"red"} />
      {message}
    </div>
  );
};

export default Error;
