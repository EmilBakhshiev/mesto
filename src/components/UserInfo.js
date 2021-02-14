export default class UserInfo {
    constructor(userNameSelector, userDescriptionSelector, avatar) {
        this._userName = userNameSelector;
        this._userDescription = userDescriptionSelector;
        this._avatar = avatar;
    }
    getUserInfo() {
        const userName = this._userName.textContent;
        const aboutMe = this._userDescription.textContent;
        return { userName: userName, aboutMe: aboutMe };
    }
    setUserInfo = ({ newUser, newDescription }) => {
        this._userName.textContent = newUser;
        this._userDescription.textContent = newDescription;
    }
    updateUserInfo = () => {
        this._userName.textContent = userNameSelector;
        this._userDescription.textContent = userDescriptionSelector;
    }
    updateAvatar(avatarValue){
       this._avatar.src = avatarValue;
    }

}