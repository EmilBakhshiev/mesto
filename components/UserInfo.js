export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}){
        this._userName = userNameSelector;
        this._userDescription = userDescriptionSelector;
    }
    getUserInfo(){
        const userName = this._userName.textContent;
        const aboutMe = this._userDescription.textContent;
        return {userName : userName, aboutMe: aboutMe};
    }
    setUserInfo = ({newUser, newDescription}) =>{
        this._userName.textContent = newUser;
        this._userDescription.textContent = newDescription;
    }
} 