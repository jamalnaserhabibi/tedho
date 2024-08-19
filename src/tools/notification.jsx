import { notification } from "antd";

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, msg, desc) => {
    api.open({
      message:
        msg === "Error" ? (
          <div style={{ color: "red", fontWeight: "700" }}>{msg}</div>
        ) : (
          <div style={{ color: "green", fontWeight: "700" }}>{msg}</div>
        ),
      description: desc,
      placement,
    });
  };

  return { openNotification, contextHolder };
};
