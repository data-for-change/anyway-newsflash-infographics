import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '../atoms/Menu';
import { useStore } from '../../store/storeConfig';
import languageSelector from '../../assets/language-selector.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { Typography, Box } from '../atoms';
import { oceanBlueColor, skyBlueColor } from '../../style';

const useStyles = makeStyles({
  item: {
    color: `${oceanBlueColor}`,
    '&:hover': {
      color: `${skyBlueColor}`,
    },
  },
});
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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const store = useStore();

  const languageHandler = (language: string) => {
    store.changeLanguage(language);
  };

  return (
    <div>
      <AnyWayButton onClick={openMenu}>
        <img alt="language selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        handleClose={closeMenu}
        anchorEl={anchorEl}
        items={LANGUAGES.map((language) => (
          <Box className={classes.item} onClick={languageHandler.bind(null, language.value)}>
            <Typography.Body5>{language.buttonText}</Typography.Body5>
          </Box>
        ))}
      />
    </div>
  );
};

export default LanguageMenu;
