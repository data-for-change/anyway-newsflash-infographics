import React, { FC, useState } from 'react';
import Menu from 'components/atoms/Menu';
import { useStore } from 'store/storeConfig';
import languageSelector from 'assets/language-selector.svg';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Typography, Button } from 'components/atoms';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const LangClickHangler = (lang: string) => {
    if (lang !== i18n.language) {
      const prefix = lang !== 'he' ? `/${lang}` : '';
      return window.location.assign(`${prefix}/newsflash/${store.activeNewsFlashId}`);
    }
  };
  const store = useStore();

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu}>
        <img alt="language selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map((language) => (
          <Button.Text onClick={() => LangClickHangler(language.value)}>
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
