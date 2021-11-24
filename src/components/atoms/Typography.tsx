import { styled } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';
import MaterialTypography from '@mui/material/Typography';
import { ElementType, FC } from 'react';

const PREFIX = 'Typography';

const classes = {
  bold: `${PREFIX}-bold`,
};

const TypographyBase: FC<ITypographyBase> = ({ bold, variant, component, children }) => (
  <MaterialTypography className={useBold(bold)} variant={variant} component={component}>
    {children}
  </MaterialTypography>
);

const StyledTypographyBase = styled(TypographyBase)(() => ({
  [`& .${classes.bold}`]: {
    fontWeight: 'bold',
  },
}));

interface IBold {
  bold?: boolean;
}

interface IText {
  [property: string]: FC<IBold>;
}

interface ITypographyBase {
  bold?: boolean;
  variant: Variant;
  component: ElementType;
}

const useBold = (bold = false) => {
  return bold ? classes.bold : '';
};

// for styles of each variant - see 'theme.ts'
const Typography: IText = {
  Title1: (props) => <StyledTypographyBase variant="subtitle1" component="h2" {...props} />,
  Title2: (props) => <TypographyBase variant="subtitle2" component="h3" {...props} />,
  Body1: (props) => <TypographyBase variant="h1" component="span" {...props} />,
  Body2: (props) => <TypographyBase variant="h2" component="span" {...props} />,
  Body3: (props) => <TypographyBase variant="h3" component="span" {...props} />,
  Body4: (props) => <TypographyBase variant="h4" component="span" {...props} />,
  Body5: (props) => <TypographyBase variant="h5" component="span" {...props} />,
  Body6: (props) => <TypographyBase variant="h6" component="span" {...props} />,
};

export default Typography;
