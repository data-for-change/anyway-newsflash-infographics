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
  removeUsersCall
} from 'services/user.service';
import { IUserInfo } from 'models/user/IUserInfo';
import { ROLE_ADMIN_NAME, ROLE_LOCATION_APPROVER_NAME } from 'const/generalConst';
import { IFormInput } from 'components/molecules/UserUpdateForm';

export default class UserStore {
  isUserAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isLocationApprover: boolean = false;
  usersInfoList: [IUserInfo] | null = null;
  organizationsList: Array<string> | null = null;
  userInfo: IAnywayUserDetails | null = null;
  userApiError: boolean = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  checkuserstatus(): void {}

  getOrganizationsData() {
    getOrganizationsDataList()
      .then((list) => {
        this.organizationsList = list;
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
    return this.organizationsList;
  }

  get userOrganizations(){
    return this.userInfo?.data.organizations;
  }

  get isUserAdmin(){
    return this.isUserAuthenticated && this.isAdmin;
  }

  get isUserLocationApprover(){
    return this.isUserAuthenticated && this.isLocationApprover;
  }

  get usersManagementTableData(): any {
    return this.usersInfoList?.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      org: user.organizations[0] ?? '',
      email: user.email,
    }));
  }

  getUsersListInfo() {
    getUsersList()
      .then((list) => {
        this.usersInfoList = list;
      })
      .catch((e) => {
        console.log(`error getting user details :${JSON.stringify(e)}`);
      });
  }

  async removeUser (email:string) {
    try{
      await  removeUsersCall(email)
      if(this.usersInfoList !== null && this.usersInfoList.length >= 1){
        this.usersInfoList = this.usersInfoList.filter(p =>{
          return p.email !== email
        })
      }
    }
    catch(e){
      console.log(e);
    }
  }
  getUserLoginDetails() {
    fetchUserInfo()
      .then((userData) => {
        runInAction(() => {
          this.userInfo = userData;
          this.isAdmin = userData.data.roles.includes(ROLE_ADMIN_NAME);
          this.isLocationApprover = userData.data.roles.includes(ROLE_LOCATION_APPROVER_NAME);
          this.isUserAuthenticated = true;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.isUserAuthenticated = false;
        });
        console.error(err);
      });
  }

  async updateUserInfo(formInput: IFormInput) {
    runInAction(async () => {
      const isValid = await postUserInfo(formInput);
      if (isValid) {
        this.getUserLoginDetails();
        this.userApiError = false;
      } else {
        this.userApiError = true;
      }
    });
  }

  logOutUser() {
    logoutUserFromSession().then((isOk) => {
      if (isOk) {
        runInAction(() => {
          this.isUserAuthenticated = false;
          this.userInfo = null;
          if (this.isAdmin) {
            this.usersInfoList = null;
            this.isAdmin = false;
          }
        });
      }
    });
  }
}
