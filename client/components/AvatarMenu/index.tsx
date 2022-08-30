import {
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  Box,
  MenuList,
} from "@chakra-ui/react";
import { useIntl } from "client/hooks/useIntl";
import { useLogout, useMe } from "client/queries/user";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";

const AvatarMenu = () => {
  const { t } = useIntl("common");
  const { data } = useMe();
  const { mutate: logout } = useLogout();

  return (
    <Box>
      {data ? (
        <Menu>
          <MenuButton>
            <Avatar name={data.name!} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => logout()} icon={<FaPowerOff />}>
              {t("avatarMenu.logout")}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link href="/login">
          <a>
            <Avatar />
          </a>
        </Link>
      )}
    </Box>
  );
};

export default dynamic(Promise.resolve(AvatarMenu), { ssr: false });
