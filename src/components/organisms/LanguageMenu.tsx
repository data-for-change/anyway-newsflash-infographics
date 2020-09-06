import React, { FC, useState } from 'react';
import Menu from '../atoms/Menu';
import { useStore } from '../../store/storeConfig';
import languageSelector from '../../assets/language-selector.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { AnywayLink } from '../atoms';
import { Text, TextType } from '../atoms';

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
  const store = useStore();

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu}>
        <img alt="language selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map((language) => (
          <AnywayLink
            to={
              language.value === 'he'
                ? `/newsflash/${store.activeNewsFlashId}`
                : `/${language.value}/newsflash/${store.activeNewsFlashId}`
            }
          >
            <Text type={TextType.CONTENT_TITLE}>{language.buttonText}</Text>
          </AnywayLink>
        ))}
        handleClose={closeMenu}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default LanguageMenu;
