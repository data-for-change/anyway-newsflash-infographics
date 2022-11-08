import React, { FC, useState } from 'react';
import DialogWithHeader from 'components/molecules/DialogWithHeader';
import { Typography } from 'components/atoms';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Papa from 'papaparse';

const maxWidth = 'sm';
const defaultNamesFile = '/thank-you-names.csv';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

async function getNames(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    return Papa.parse(process.env.REACT_APP_THANKYOU_NAMES_FILE || defaultNamesFile, {
      download: true,
      encoding: 'utf-8-sig',
      header: true,
      complete: results => {
        resolve(results.data.map((item: any) => item.Name as string));
      },
      error: reject
    });
  });
}

const ThankYouDialog: FC<IProps> = ({ isShowing, onClose }) => {
  const { t } = useTranslation();
  const [names, setNames] = useState<string | null>(null);

  // Load the names from the file when the component is initliazed
  // and then store the values inside state
  React.useEffect(() => {
    async function _getNames() {
      try {
        const names = await getNames();
        setNames(names.filter(name => name !== '').join(', '));
      } catch (error) {
        throw error;
      }
    }
    _getNames();
  }, []);

  return (
    <DialogWithHeader
      isShowing={isShowing}
      onClose={onClose}
      title={t('thankYouDialog.Acknowledgements')}
      maxWidth={maxWidth}
    >
      <article>
        <Box mb={1}>
          <Typography.Body5>{t('thankYouDialog.Developed by')}</Typography.Body5>
        </Box>
        {names !== null && <Typography.Body5>{names}</Typography.Body5>} 
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
