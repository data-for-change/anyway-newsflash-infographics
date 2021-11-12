import { FC, useState } from 'react';
import Menu from 'components/atoms/Menu';
import { useStore } from 'store/storeConfig';
import languageSelector from 'assets/language-selector.svg';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Typography, Button } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { ARABIC, ENGLISH, HEBREW } from 'const/languages.const';

const LANGUAGES = [
  {
    buttonText: 'English',
    value: ENGLISH,
  },
  {
    buttonText: 'עברית',
    value: HEBREW,
  },
  {
    buttonText: 'العربية',
    value: ARABIC,
  },
];

const LanguageMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();
  const store = useStore();

  const LangClickHandler = (lang: string) => {
    if (lang !== i18n.language) {
      const prefix = lang !== HEBREW ? `/${lang}` : '';
      return window.location.assign(`${prefix}/newsflash/${store.activeNewsFlashId}`);
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
