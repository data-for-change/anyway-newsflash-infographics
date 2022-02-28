import { runInAction, makeAutoObservable } from 'mobx';
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
    userApiError: boolean = false;
    userInfo: IAnywayUserDetails | null = null;
    isAdmin : boolean = false;
    usersInfoList : [IUserInfo] | null= null;


    logOutUser() {
    logoutUserFromSession().then((isOk) => {
      if (isOk) {
        runInAction(() => {
          this.isUserAuthenticated = false;
          this.userInfo = null;
          if(this.isAdmin){
            this.usersInfoList = null;
            this.isAdmin = false;
          }
        });
      }
    });
  }

  getUserLoginDetails() {
    fetchUserInfo()
      .then((userData) => {
        runInAction(() => {
          this.userInfo = userData;
          this.isAdmin = userData.data.roles.includes(ROLE_ADMIN_NAME);
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
  
  get usersManagementTableData() : any {
    return this.usersInfoList?.map(user => ({name :`${user.first_name} ${user.last_name}` , org: user.organizations[0] ?? ''  ,email : user.email}))
  }

  getUsersListInfo() {
    getUsersList().then( list => {
      this.usersInfoList = list
    }).catch(e => {
      console.log(`error getting user details :${JSON.stringify(e)}`);
    })
  }
}