export const cancelEditModeHelper = (el: any, newObj: any) => {
  const { id } = el;
  newObj[id]['editMode'] = false;
  newObj[id]['organizationValue'] = el.organizationName;
  return newObj;
};
export const saveEditModeHelper = (element: any, newObj: any) => {
  const { id, organizationName } = element;
  newObj[id]['editMode'] = false;
  return newObj;
};

export const changeEditObjectHelper = (element: any, newObj: any) => {
  const { id, organizationName } = element;
  if (!newObj[id]) {
    newObj[id] = {
      editMode: true,
      organizationValue: organizationName,
    };
  } else {
    newObj[id]['editMode'] = true;
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
