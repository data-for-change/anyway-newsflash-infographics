import { makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { runInAction } from 'mobx';
import {
  IAnywayUserDetails,
  fetchUserInfo,
  logoutUserFromSession,
  postUserInfo,
  getUsersList,
  getOrganizationsDataList,
  updateUserOrganization,
} from 'services/user.service';
import { IUserInfo } from 'models/user/IUserInfo';
import { ROLE_ADMIN_NAME } from 'utils/utils';
import { IFormInput } from 'components/molecules/UserUpdateForm';

export default class UserStore {
  isUserAuthenticated: boolean = false;
  isAdmin: boolean = false;
  usersInfoList: [IUserInfo] | null = null;
  organizationsList: Array<String> | null = null;
  userInfo: IAnywayUserDetails | null = null;
  userApiError: boolean = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getOrganizationsData() {
    getOrganizationsDataList()
      .then((list) => {
        this.rootStore.userStore.organizationsList = list;
      })
      .catch((e) => {
        console.error(`error getting organization list :${JSON.stringify(e)}`);
      });
  }

  async setOrgToUser(org: string, email: string) {
    try {
      await updateUserOrganization(org, email);
    } catch (e) {
      console.error(`error adding user to org  :${JSON.stringify(e)}`);
    }
  }

  get orgNamesList() {
    return this.rootStore.userStore.organizationsList;
  }

  get usersManagementTableData(): any {
    return this.rootStore.userStore.usersInfoList?.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      org: user.organizations[0] ?? '',
      email: user.email,
    }));
  }

  getUsersListInfo() {
    getUsersList()
      .then((list) => {
        this.rootStore.userStore.usersInfoList = list;
      })
      .catch((e) => {
        console.log(`error getting user details :${JSON.stringify(e)}`);
      });
  }

  getUserLoginDetails() {
    fetchUserInfo()
      .then((userData) => {
        runInAction(() => {
          this.rootStore.userStore.userInfo = userData;
          this.rootStore.userStore.isAdmin = userData.data.roles.includes(ROLE_ADMIN_NAME);
          this.rootStore.userStore.isUserAuthenticated = true;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.rootStore.userStore.isUserAuthenticated = false;
        });
        console.error(err);
      });
  }

  async updateUserInfo(formInput: IFormInput) {
    runInAction(async () => {
      const isValid = await postUserInfo(formInput);
      if (isValid) {
        this.rootStore.userStore.getUserLoginDetails();
        this.rootStore.userStore.userApiError = false;
      } else {
        this.rootStore.userStore.userApiError = true;
      }
    });
  }

  logOutUser() {
    logoutUserFromSession().then((isOk) => {
      if (isOk) {
        runInAction(() => {
          this.rootStore.userStore.isUserAuthenticated = false;
          this.rootStore.userStore.userInfo = null;
          if (this.rootStore.userStore.isAdmin) {
            this.rootStore.userStore.usersInfoList = null;
            this.rootStore.userStore.isAdmin = false;
          }
        });
      }
    });
  }
}
