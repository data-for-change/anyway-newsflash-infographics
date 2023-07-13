import {FormControl, FormControlLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {ReactComponent as CheckCircleIcon} from "assets/check_blue_24dp.svg";
import {oceanBlueColor, roseColor, silverGrayColor} from "style";
import {ReactComponent as CancelCircleIcon} from "assets/cancel_red_24dp.svg";


interface IProps {
  handleApproveStatusChange: (event : React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

const useStyles = makeStyles({
  icon: {
    height: 23,
    width:23,
  },
});

const ApproveLocationRadioButtons: FC<IProps> = ({ handleApproveStatusChange, defaultValue}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const checkedApproveIcon = <CheckCircleIcon fill={oceanBlueColor} className={classes.icon} />
  const uncheckedApproveIcon = <CheckCircleIcon fill={silverGrayColor} className={classes.icon} />
  const checkedRejectIcon = <CancelCircleIcon fill={roseColor} className={classes.icon} />
  const uncheckedRejectIcon = <CancelCircleIcon fill={silverGrayColor} className={classes.icon} />

  return (<FormControl>
    <RadioGroup defaultValue={defaultValue} name="location-approve" onChange={handleApproveStatusChange}>
      <FormControlLabel value={defaultValue}
                        control={<Radio checkedIcon={checkedApproveIcon} icon={uncheckedApproveIcon} />}
                        label={t('LocationApprove.verifyLocation')} />
      <FormControlLabel value="reject"
                        control={<Radio checkedIcon={checkedRejectIcon} icon={uncheckedRejectIcon} />}
                        label={t('LocationApprove.rejectLocation')} />
    </RadioGroup>
  </FormControl>
  );
};

export default ApproveLocationRadioButtons;
