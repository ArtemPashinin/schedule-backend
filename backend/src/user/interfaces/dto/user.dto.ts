import { Status } from 'src/user/enums/status';

export interface UserDto {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  status?: Status;
  topic_id?: number;
}
