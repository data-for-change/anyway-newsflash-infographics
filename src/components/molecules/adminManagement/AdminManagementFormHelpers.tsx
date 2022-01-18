export const labels = ['Name', 'Email', 'Organization'];

export interface IeditObjList {
  [key: string]: string;
}

export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  saveUserChanges: any;
  loading: boolean;
}
