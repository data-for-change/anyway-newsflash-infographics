import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { onLinkColor, onLinkColorHover } from '../../style';
import Menu from '../atoms/Menu';
import languageSelector from '../../assets/language-selector.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { AnywayLink } from '../atoms';
import { Text, TextType } from '../atoms';

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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={openMenu} className={classes.link}>
        <img src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map(language => (
          <AnywayLink
          // todo - link to the current url with appropiate language code in it
           to={language.value}
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
