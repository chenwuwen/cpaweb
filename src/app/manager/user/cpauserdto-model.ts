export class CpaUserDto {
  id: number;
  userName: string;
  email: string;
  sex: number;
  endRegisterDate: string;
  startRegisterDate: string;
  regDate: string;
  startLastLoginDate: string;
  endLastLoginDate: string;
  lastLoginDate: string;
  roles: [];
  status: number;

  constructor() {

  }
}
