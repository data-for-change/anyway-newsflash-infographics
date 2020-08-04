import React, { FC, useState } from 'react';
import Menu from '../atoms/Menu';
import languageSelector from '../../assets/language-selector.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { AnywayLink } from '../atoms';
import { Text, TextType } from '../atoms';
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu}>
        <img alt="langauge selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map(language => (
          <AnywayLink
          // todo - link to the current url with appropiate language code in it using language.value
           to={location.pathname}
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
