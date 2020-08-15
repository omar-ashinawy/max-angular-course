

export class UserModel {
  constructor(public email: string, public id: string, private _token, private _tokenExpirationDate) {}
  get token(){
    if(!this._tokenExpirationDate || this._tokenExpirationDate < new Date())
    {
      return null;
    }
    return this._token
  }
}
