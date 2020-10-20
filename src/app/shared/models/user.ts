import {Token} from "@app/shared/models/token.model";

export class User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  access: string;
  refresh: string;
}
