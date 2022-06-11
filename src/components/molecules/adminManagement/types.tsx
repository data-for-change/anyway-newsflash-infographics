export const labels = ['Name', 'Email', 'Organization'];


export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  saveUserChanges: (action : UserManagementActions,userData : IUserAdminTableData) => void;
  loading: boolean;
}
export type IusersForUpdateMap = Record<string,IUserAdminTableData>


export interface IPropsSelectBox {
  itemOrg: string;
  itemEmail: string;
  usersToUpadte: IusersForUpdateMap;
  organizationsList: Array<string> | null;
  setUsersForUpdateFunction: (arg0: IusersForUpdateMap) => void;
}

export interface IPropsEditButtons {
  saveEditModeAndDelete: (arg0: IUserAdminTableData, action : UserManagementActions) => void;
  cancelEditMode: (arg0: string) => void;
  itemData: IUserAdminTableData;
}
export type UserManagementActions = 'DELETE' | 'EDIT';

export interface IUserAdminTableData {
  name :string,
  org: string,
  email: string
}
