import React, { FC, useState } from 'react';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { makeStyles } from '@material-ui/core/styles';
import { onLinkColor, onLinkColorHover } from '../../style';
import Menu from '../atoms/Menu';
import languageSelector from '../../assets/language-selector.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';

const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
    cursor: 'pointer',
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
  const store: RootStore = useStore();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleLanguageChoice = (value: 'he' | 'en' | 'ar') => {
    //todo? - change url on click to reflect language
    store.changeLanguage(value);
  };

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu} className={classes.link}>
        <img src={languageSelector} />
      </AnyWayButton>
      <Menu data={LANGUAGES} handleChoice={handleLanguageChoice} handleClose={closeMenu} anchorEl={anchorEl} />
    </div>
  );
};

export default LanguageMenu;
