import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = (props) => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={"avatars/no.jpg"} className="c-avatar-img" alt="beymen" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Hesap</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profil
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Ayarlar
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => props.onLogout()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Çıkış
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
