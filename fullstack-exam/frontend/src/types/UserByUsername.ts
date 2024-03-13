type UserByUsername = {
  id: string;
  username: string;
  email: string;
  roles: string[];
  posts: Array<{
    id: string;
    picUrl: string;
    description: string;
    createdAt: Date;
  }>;
};

export default UserByUsername;
