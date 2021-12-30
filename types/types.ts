export interface UserDetailsProps {
  success: boolean;
  data: {
    username: string;
    address: string;
    description: string;
    avatar: string;
    followers: Array<string>;
    following: Array<string>;
  };
}
