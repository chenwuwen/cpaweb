export class CpaUserDto {
  id: number;
  userName: string;
  email: string;
  gender: number;
  endRegisterDate: string;
  startRegisterDate: string;
  regDate: string;
  startLastLoginDate: string;
  endLastLoginDate: string;
  lastLoginDate: string;
  roles: Array<string>;
  status: number;

  constructor() {

  }
}
