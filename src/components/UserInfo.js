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
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.about;
    }

    setAvatar(data){
       this._avatar.src = data.avatar;
    }

}