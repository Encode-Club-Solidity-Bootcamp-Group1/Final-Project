import { ReactElement } from 'react';

type OwnProps = {
  children: ReactElement;
};
export default function MainPage({ children }: OwnProps) {
  return <main className="bg-gradient-to-r from-green-400 to-blue-500 h-full px-5">{children}</main>;
}
