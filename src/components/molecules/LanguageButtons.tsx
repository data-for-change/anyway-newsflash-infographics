import React, { FC } from 'react';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { makeStyles } from '@material-ui/core/styles';
import { onLinkColor, onLinkColorHover } from '../../style';
import Text, { TextType } from '../atoms/Text';
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
const LanguageButtons: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  return (
    <div>
      {languages.map((language) => {
        return (
          <AnyWayButton
            //todo - button should be disabled if it represents the current language
            className={classes.link}
            onClick={() => {
              store.changeLanguage(language.value);
            }}
          >
            <Text type={TextType.CONTENT_TITLE}>{language.buttonText}</Text>
          </AnyWayButton>
        );
      })}
    </div>
  );
};

export default LanguageButtons;
