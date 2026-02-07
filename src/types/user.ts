export type User = {
  id: string;
  name: string;
  email: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  roles: [
    {
      name: string;
    },
  ];
  userCredentials: {
    id: string;
    lastLoginAt: string | null;
  };
};
