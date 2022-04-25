import { FC, useState } from 'react';
import Menu from 'components/atoms/Menu';
import { useStore } from 'store/storeConfig';
import languageSelector from 'assets/language-selector.svg';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Typography, Button } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { LANG } from 'const/languages.const';

const LANGUAGES = [
  {
    buttonText: 'English',
    value: LANG.EN,
  },
  {
    buttonText: 'עברית',
    value: LANG.HE,
  },
  {
    buttonText: 'العربية',
    value: LANG.AR,
  },
];

const LanguageMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();
  const store = useStore();
  const { newsFlashStore } = store;

  const LangClickHandler = (lang: string) => {
    if (lang !== i18n.language) {
      const prefix = lang !== 'he' ? `/${lang}` : '';
      let path = '';
      if (newsFlashStore.activeNewsFlashId) {
        path = `newsflash/${newsFlashStore.activeNewsFlashId}`;
      }
      if (store.locationId) {
        path = `location/${store.locationId}`;
      }
      if (store.cityAndStreet) {
        path = `cityAndStreet/${store.cityAndStreet.city}/${store.cityAndStreet.street}`;
      }
      return window.location.assign(`${prefix}/${path}`);
    }
  };

  return (
    <div>
      <AnyWayButton aria-controls="menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <img alt="language selection" src={languageSelector} />
      </AnyWayButton>
      <Menu
        items={LANGUAGES.map((language) => (
          <Button.Text onClick={() => LangClickHandler(language.value)}>
            <Typography.Body5>{language.buttonText}</Typography.Body5>
          </Button.Text>
        ))}
        handleClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default LanguageMenu;
