import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./header";
import { CustomAvatar } from "../custom-avatar";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => {
        console.log(titleProps);
        return (
          <ThemedTitleV2
            {...titleProps}
            icon={<CustomAvatar name="Rayyan Naeem" />}
            text="Rayyan's Admin Panel"
          />
        );
      }}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
