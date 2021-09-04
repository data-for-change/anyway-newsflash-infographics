import React, { FC, useState } from 'react';
import Menu from 'components/atoms/Menu';
import { useStore } from 'store/storeConfig';
import languageSelector from 'assets/language-selector.svg';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Typography, Button } from 'components/atoms';

const LANGUAGES = [
  {
    buttonText: 'English',
    value: 'en',
  },
  {
    buttonText: 'עברית',
    value: 'he',
  },
  {
    buttonText: 'العربية',
    value: 'ar',
  },
];

const LanguageMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const reloadLang = (value: string) => {
    if (value === 'he') {
      return window.location.assign(`/newsflash/${store.activeNewsFlashId}`);
    }
    return window.location.assign(`/${value}/newsflash/${store.activeNewsFlashId}`);
  };
  const store = useStore();

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu}>
        <img alt="language selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map((language) => (
          <Button.Text onClick={() => reloadLang(language.value)}>
            <Typography.Body5>{language.buttonText}</Typography.Body5>
          </Button.Text>
        ))}
        handleClose={closeMenu}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default LanguageMenu;
