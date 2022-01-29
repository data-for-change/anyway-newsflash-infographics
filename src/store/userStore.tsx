import { IUserInfo, fetchUserInfo, logoutUserFromSession, postUserInfo } from 'services/user.service';
import { runInAction } from 'mobx';
import { IFormInput } from 'components/molecules/UserUpdateForm';


export default class userStore {
    isUserAuthenticated: boolean = false;
    userInfo: IUserInfo | null = null;
    userApiError: boolean = false;

    logOutUser() {
        logoutUserFromSession().then((isOk) => {
            if (isOk) {
                runInAction(() => {
                    this.isUserAuthenticated = false;
                    this.userInfo = null;
                });
            }
        });
    }

    getUserLoginDetails() {
        fetchUserInfo()
            .then((userData) => {
                runInAction(() => {
                    this.userInfo = userData;
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

}