export const cancelEditModeHelper = (email: string, newObj: any) => {
  delete newObj[email];
  return newObj;
};

export const changeEditObjectHelper = (element: any, newObj: any) => {
  const { email, org } = element;
  if (!newObj[email]) {
    newObj[email] = {
      organizationValue: org,
    };
  }
  return newObj;
};

export const changeCurrentSelectedRoleHelper = (newObject: any, id: any, newCompanyValue: any) => {
  newObject[id] = {
    organizationValue: newCompanyValue,
  };
  return newObject;
};

export type IeditObjList = Record<
  string,
  {
    organizationValue: string;
  }
>;

export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  defaultValues: Array<{ name: string; mail: string; roles: string; id: string }>;
  labels: Array<string>;
  saveEditModeHelper: any;
}
