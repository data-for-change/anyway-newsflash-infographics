export const labels = ['Name', 'Email', 'Organization'];

export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  saveUserChanges: (email: string, prevOrgName: string, newOrgName: string) => void;
  loading: boolean;
}

export interface IusersForUpdateMap {
  [key: string]: string;
}

export interface ISingleOrgDetails {
  name: string;
  email: string;
  org: string;
}

export interface IPropsSelectBox {
  itemOrg: string;
  itemEmail: string;
  usersToUpadte: IusersForUpdateMap;
  organizationsList: Array<String> | null;
  setUsersForUpdateFunction: (arg0: IusersForUpdateMap) => void;
}

export interface IPropsEditButtons {
  saveEditModeAndDelete: (arg0: ISingleOrgDetails) => void;
  cancelEditMode: (arg0: string) => void;
  itemData: ISingleOrgDetails;
}
