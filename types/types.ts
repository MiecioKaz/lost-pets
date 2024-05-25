export type Owner = {
  id: string;
  userName: string;
  userId: string;
  phoneNumber: string;
  town: string;
  email: string | null;
  pet: { status: string; breed: string; description: string };
  picture: { imgUrl: string; imgId: string }[];
  createdAt: Date;
};
