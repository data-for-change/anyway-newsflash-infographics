export const cancelEditModeHelper = (el: any, newObj: any) => {
  const { email } = el;
  delete newObj[email];
  return newObj;
};
export const saveEditModeHelper = (element: any, newObj: any) => {
  const { email } = element;
  newObj[email]['editMode'] = false;
  return newObj;
};

export const changeEditObjectHelper = (element: any, newObj: any) => {
  const { email, org } = element;
  if (!newObj[email]) {
    newObj[email] = {
      editMode: true,
      organizationValue: org,
    };
  } else {
    newObj[email]['editMode'] = true;
  }
  return newObj;
};

export const changeCurrentSelectedRoleHelper = (newObject: any, id: any, newCompanyValue: any) => {
  newObject[id] = {
    editMode: true,
    organizationValue: newCompanyValue,
  };
  return newObject;
};

export const sendDataToServer = (editObject: any) => {
  console.log(editObject);
  /// needs to send data to server
};

export type IeditObjList = Record<
  string,
  {
    editMode: boolean;
    organizationValue: string;
  }
>;

export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  defaultValues: Array<{ name: string; mail: string; roles: string; id: string }>;
  labels: Array<string>;
}
